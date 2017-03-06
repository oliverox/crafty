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
  return (
    <div className="component-list">
      <h3>Component List</h3>
      <ul>
        {
          componentArr.slice(1).map((component, index) => {
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
