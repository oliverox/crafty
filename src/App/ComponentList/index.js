import React from 'react';

import './styles.css';

const ComponentList = ({ list, onComponentClick }) => {
  const componentArr = [];
  Object.keys(list).forEach((key) => {
    componentArr.push({
      id: key,
      ...list[key]
    });
  });
  console.log('==== componentArr', componentArr);
  return (
    <div className="component-list">
      <h3>Component List</h3>
      <ul>
        {
          componentArr.map((component, index) => {
            console.log('component', component.id);
            return (
              <li 
                onClick={onComponentClick} 
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