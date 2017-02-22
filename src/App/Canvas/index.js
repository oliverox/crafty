import React, { Component } from 'react';
import 'whatwg-fetch';
import shortid from 'shortid';

import './styles.css';

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      app: {
        instanceId: 0,
        children: []
      }
    }
    this.componentList = {};
    this.handleFrameTasks = this.handleFrameTasks.bind(this);
    this.processChild = this.processChild.bind(this);
  }

  componentDidMount() {
    fetch('/api/components').then(function(response) {
      return response.json()
    }).then(function(components) {
      components.forEach((c) => {
        this.componentList[c.id] = {
          name: c.name,
          defaultChildren: c.defaultChildren
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
        return (child.children.map((child) => {
          return this.processChild(child, targetInstanceId, newChild);
        }).bind(this));
      }
    }
  }

  handleFrameTasks(msg) {
    console.log('[CANVAS]: message received:', msg);
    if (msg.type === 'message' && msg.data.action === 'append') {
      switch (msg.data.action) {
        case 'append':
          require.ensure([], function(require) {
            try {
              const NewComponent = require(`../../components/${this.componentList[msg.data.cid].name}/index.js`).default;
              const targetInstanceId = msg.data.targetInstanceId;
              const appState = Object.assign({}, this.state.app);
              const appChildren = appState.children.slice(0);
              console.log('origin appChildren', appChildren);
              if (targetInstanceId === '0') {
                appChildren.push({
                  cid: msg.data.cid,
                  instanceId: msg.data.instanceId,
                  component: <NewComponent key={shortid()} />,
                  children: []
                });
              } else {
                const newAppChildren = [];
                appChildren.forEach((child) => {
                  newAppChildren.push(this.processChild(child, targetInstanceId, {
                    cid: msg.data.cid,
                    instanceId: msg.data.instanceId,
                    component: <NewComponent key={shortid()} />,
                    children: []
                  }));
                  console.log('newAppChildren', newAppChildren);
                });
              }
              console.log('new appChildren:', appChildren);
              appState.children = appChildren;
              this.setState({
                app: appState
              });
            } catch(err) {
              console.log('ERROR:', err);
            }
          }.bind(this));
          break;

        case 'updateTree':
          console.log('[CANVAS]: updating tree...', msg.data);
          break;
        default:

      }
    }
  }

  getChildren(childrenArr, cid) {
    // debugger;
    if (!Array.isArray(childrenArr) || childrenArr.length === 0) {
      if (this.componentList[cid]) {
        return this.componentList[cid].defaultChildren || childrenArr;
      } else {
        return '';
      }
    }
    return childrenArr.map((child) => {
      return (<child.component.type key={child.instanceId}>{this.getChildren(child.children, child.cid)}</child.component.type>);
    });
  }

  render() {
    return (
      <div className="canvas" ref={(el) => this.app = el}>{this.getChildren(this.state.app.children, 0)}</div>
    );
  };
}

export default Canvas;
