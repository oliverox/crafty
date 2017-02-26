import React from 'react';
import MenuToggle from './MenuToggle';

const Toolbar = ({children}) => (
  /* Toolbar: A top right component inside the Navbar to hold various menu icons */
  <div className="toolbar">
    <div className="inner">
      {children}
    </div>
  </div>
);

Toolbar.MenuToggle = MenuToggle;
export default Toolbar;
