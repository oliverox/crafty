import React, { Component } from 'react';
import 'whatwg-fetch';

import './styles.css';

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.state = {app: []}
    this.componentList = {};
    this.handleFrameTasks = this.handleFrameTasks.bind(this);
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
  
  handleFrameTasks(msg) {
    console.log('[CANVAS]: message received:', msg);
    if (msg.type === 'message' && msg.data.action === 'append') {
      switch (msg.data.action) {
        case 'append':
          require.ensure([], function(require) {
            try {
              const NewComponent = require(`../../components/${this.componentList[msg.data.cid].name}/index.js`).default;
              const appState = this.state.app.slice(0);
              appState.push({
                cid: msg.data.cid,
                component: <NewComponent key={this.state.app.length + 1}>
                  {
                    msg.data.children 
                    ? msg.data.children 
                    : this.componentList[msg.data.cid].defaultChildren
                  }
                  </NewComponent>,
              });
              this.setState({app: appState});
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
  
  render() {
    const dom = this.state.app.map((element) => {
      return element.component;
    });
    return (
      <div className="canvas" ref={(el) => this.app = el}>{dom}</div>
    );
  };
}

export default Canvas;