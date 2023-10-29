import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';

class CustomScroll extends Component {
  render() {
    const customScrollStyle = {
      width: '100%',
      height: '100vh',
    };

    return (
      <Scrollbars
        className='custom-scrollbar'
        autoHide
        style={customScrollStyle}
      >
        {this.props.children}
      </Scrollbars>
    );
  }
}

export default CustomScroll;
