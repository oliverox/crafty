import React from 'react';

import './styles.css';

const ComponentList = (props) => {
  return (
    <div className="component-list">
      <h3>Component List</h3>
      <ul>
        {
          props.list.map((component, index) => {
            console.log('component', component.id);
            return (
              <li 
                onClick={props.onComponentClick} 
                data-cid={component.id} 
                key={component.id}>{index} - {component.name}
              </li>
            );
          })
        }
      </ul>
    </div>
  );
}

export default ComponentList;