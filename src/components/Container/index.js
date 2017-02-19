import React from 'react';

import './styles.css';

const Container = ({children, ...rest}) => {
  return (
    <div className="container" {...rest}>{children}</div>
  );
}

export default Container;