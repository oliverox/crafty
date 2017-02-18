import React, { Component } from 'react';
import './styles.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to Crafty</h2>
        </div>
        <div className="column-container">
            <div className="component-list"></div>
            <div className="canvas"></div>
            <div className="component-tree"></div>
        </div>
      </div>
    );
  }
}

export default App;
