import React, { Component } from 'react';
import 'whatwg-fetch';
import shortid from 'shortid';
import { ComponentList, ComponentTree } from '../../App';
// import { App } from '../../components';

import './styles.css';

class Crafty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      componentList: [],
      tree: {
        app: <div className="app"></div>,
        selectedInstanceId: '0'
      } 
    }
    this.onComponentListClick = this.onComponentListClick.bind(this);
    this.onTreeItemClick = this.onTreeItemClick.bind(this);
  }
  
  componentDidMount() {
    if (!this.canvasEl) return;
    fetch('/api/components').then(function(response) {
      return response.json()
    }).then(function(components) {
      const componentList = {};
      components.forEach((c) => {
        componentList[c.id] = {
          name: c.name,
          defaultChildren: c.defaultChildren
        }
      });
      this.setState({componentList: componentList});      
    }.bind(this)).catch(function(ex) {
      console.log('parsing failed', ex)
    });
  }
    
  onComponentListClick(event) {
    event.preventDefault();
    const cid = event.target.getAttribute('data-cid');
    const instanceId = shortid();
    const component = this.state.componentList[cid];
    console.log('clicked on component', cid, component.name, component);
    require.ensure([], function(require) {
      try {
        const NewComponent = require(`../../components/${component.name}/index.js`).default;
        console.log('NewComponent=', NewComponent);
        // Add component to App for POC
        console.log('app:', this.state.tree.app);
        const appChildren = React.Children.toArray(this.state.tree.app.props.children);
        const NewChild = <NewComponent />;
        appChildren.push(
          <NewChild.type
            instanceId={instanceId}
            data-cid={cid}
            key={appChildren.length + 1} 
            {...component.props}>
              {component.defaultChildren}
          </NewChild.type>
        );
        console.log('appChildren appended:', appChildren);
        const newState = Object.assign({}, this.state);
        newState.tree.app = <div data-cid={0} className="app">{appChildren}</div>;
        this.setState(newState);
      } catch(err) { 
        console.log('ERROR:', err); 
      }
    }.bind(this));
    
    this.canvasEl.contentWindow.postMessage({
      action: 'append',
      target: 'app',
      cid,
      instanceId
    }, '*');
  }
  
  onTreeItemClick(event) {
    event.preventDefault();
    console.log('Clicked on tree item cid:', event.target.getAttribute('data-cid'), 'instanceId:', event.target.getAttribute('data-instanceId'));
    const selectedInstanceId = event.target.getAttribute('data-instanceId');
    const newState = Object.assign({}, this.state);
    newState.tree.selectedInstanceId = selectedInstanceId;
    this.setState(newState);
  }
  
  render() {
    return (
      <div className="crafty">
        <div className="crafty-header">
          <h2>Welcome to Crafty</h2>
        </div>
        <div className="column-container">
          <ComponentList 
            onComponentClick={this.onComponentListClick}
            list={this.state.componentList} />

          <ComponentTree 
            tree={this.state.tree} 
            selectedInstanceId={this.state.tree.selectedInstanceId}
            onTreeItemClick={this.onTreeItemClick}
          />

          <div className="canvas">
            <iframe ref={(el) => this.canvasEl = el} width="100%" height="100%" src="/canvas.html" />
          </div>
        </div>
      </div>
    );
  }
}

export default Crafty;
