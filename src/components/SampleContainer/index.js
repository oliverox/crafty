import React, { Component } from 'react';

class SampleContainer extends Component {
  render() {
    const { children } = this.props;
    const getRandomColor = () => {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i=0; i<6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }
    return (
      <div style={{backgroundColor: `${getRandomColor()}`}}>{children}</div>
    )
  }
}

export default SampleContainer;