import React, { Component } from 'react';
import 'whatwg-fetch';
import { ComponentList, ComponentTree } from '../../App';

import './styles.css';

class Crafty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      componentList: []
    }
    this.onComponentListClick = this.onComponentListClick.bind(this);
  }
  
  componentDidMount() {
    if (!this.canvasEl) return;
    fetch('/api/components').then(function(response) {
      return response.json()
    }).then(function(json) {
      this.setState({
        componentList: json
      });      
    }.bind(this)).catch(function(ex) {
      console.log('parsing failed', ex)
    });
  }
  
  onComponentListClick(event) {
    event.preventDefault();
    console.log('clicked on component', event.target.getAttribute('data-cid'));
    this.canvasEl.contentWindow.postMessage({
      action: 'append',
      target: 'app',
      cid: event.target.getAttribute('data-cid')
    }, '*');
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

          <ComponentTree />

          <div className="canvas">
            <iframe ref={(el) => this.canvasEl = el} width="100%" height="100%" src="/canvas.html"/>
          </div>
        </div>
      </div>
    );
  }
}

export default Crafty;
