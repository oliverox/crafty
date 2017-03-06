import React, { Component } from 'react';
import 'whatwg-fetch';
import shortid from 'shortid';

// Set Canvas theme
import '../../_theme/material-icons.min.css';

// Import Canvas styles
import './styles.css';

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appSchema: [],
      app: {
        instanceId: 0,
        children: []
      }
    }
    this.componentList = {};
    this.handleFrameTasks = this.handleFrameTasks.bind(this);
    this.processChild = this.processChild.bind(this);
    this.mapChildrenToDom = this.mapChildrenToDom.bind(this);
    this.mapJsonToDom = this.mapJsonToDom.bind(this);
  }

  componentDidMount() {
    fetch('/api/components').then(function(response) {
      return response.json()
    }).then(function(components) {
      components.forEach((c) => {
        this.componentList[c.id] = {
          name: c.name,
          defaultText: c.defaultText,
          defaultStyle: c.defaultStyle,
          allowCustomChildren: c.allowCustomChildren,
          children: c.children
        }
      });
    }.bind(this)).catch(function(ex) {
      console.log('parsing failed', ex)
    })

    window.addEventListener('message', this.handleFrameTasks);
  }

  componentWillUnmount() {
    window.removeEventListener('message', this.handleFrameTasks);
  }

  processChild(child, targetInstanceId, newChild) {
    if (child.instanceId === targetInstanceId) {
      child.children.push(newChild);
      return child;
    } else {
      if (child.children.length === 0) {
        return child;
      } else {
        return (child.children.map(function(child) {
          return this.processChild(child, targetInstanceId, newChild);
        }.bind(this)));
      }
    }
  }

  handleFrameTasks(msg) {
    console.log('[CANVAS]: message received:', msg);
    if (msg.type === 'message') {
      switch (msg.data.action) {
        case 'createApp':
          require.ensure([], function(require) {
            try {
              const AppComponent = this.componentList[0];
              const newAppSchema = this.state.appSchema.slice(0);
              newAppSchema.push(AppComponent);
              this.setState({
                appSchema: newAppSchema
              })
            } catch (err) {
              console.log('Error in createApp', err);
            }
          }.bind(this));
          break;

        case 'append':
          const targetInstanceId = parseInt(msg.data.targetInstanceId, 10);
          const appSchema = this.state.appSchema.slice(0);
          if (targetInstanceId === 0) {
            // If target is 'App'
            appSchema[0].children.push(this.componentList[msg.data.cid])
          } else {

          }
          this.setState({ appSchema });
          break;

        case 'updateTree':
          console.log('[CANVAS]: updating tree...', msg.data);
          break;
        default:

      }
    }
  }

  mapChildrenToDom(children) {
    if (children.length === 0) return [];
    return (children.map((childComponent) => {
      const { name, defaultText, style, defaultStyle, allowCustomChildren, children, ...rest} = childComponent;
      const Component2Craft = require(`../../components/${name}/index.js`).default;
      return (
        <Component2Craft key={shortid()} style={(style) ? {...style} : {...defaultStyle}} {...rest}>
          {
            (allowCustomChildren && children.length > 0)
            ? this.mapChildrenToDom(children)
            : defaultText || name
          }
        </Component2Craft>
      )
    }));
  }

  mapJsonToDom(json) {
    if (json.length === 0) { return '' }
    const { name, defaultText, style, defaultStyle, allowCustomChildren, children, ...rest} = json[0];
    const Component2Craft = require(`../../components/${name}/index.js`).default;
    return (
      <Component2Craft key={shortid()} style={(style || children.length > 0) ? {...style} : {...defaultStyle}} {...rest}>
        {
          (allowCustomChildren && children.length > 0)
          ? this.mapChildrenToDom(children)
          : defaultText || name
        }
      </Component2Craft>
    )
  }

  render() {
    console.log('rendering canvas with following json:', this.state.appSchema);
    return (
      <div className="app-container" ref={(el) => this.app = el}>{this.mapJsonToDom(this.state.appSchema)}</div>
    );
  };
}

export default Canvas;
