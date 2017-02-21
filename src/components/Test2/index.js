import React, { Component } from 'react';

class Test2 extends Component {  
  render() {
    return (
      <div className="test2">{this.props.children}</div>
    )
  }
}

Test2.displayName = 'Test2';

export default Test2;

