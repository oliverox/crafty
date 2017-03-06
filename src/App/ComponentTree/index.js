import React from 'react';
import TreeView from 'react-treeview';

import './styles.css';

const ComponentTree = ({ tree, selectedInstanceId, onTreeItemClick }) => {
  console.log('>>>>>>>>>>>tree.app.props=', tree.app.props);
  const createTreeView = (component, targetInstanceId) => {
    console.log('[createTreeView]: component=', component);
    if (!component.props) {
      return component;
    }
    if (React.Children.count(component.props.children) > 0) {
      const cid = parseInt(component.props['data-cid'], 10);
      const instanceId = component.props.instanceId;
      const selectedClass = (selectedInstanceId === instanceId) ? 'selected' : ''
      return (
        <TreeView
          nodeLabel={<span className="node" onClick={onTreeItemClick}>{component.type.displayName}</span>}
          defaultCollapsed={false}
          collapsed={false}
          data-cid={cid}
          data-instanceId={instanceId}
          onClick={onTreeItemClick}
          itemClassName={`tree-item ${selectedClass}`}
        >
          {
            React.Children.map(component.props.children, (childComponent) => {
              if (childComponent.props) {
                return createTreeView(childComponent);
              } else {
                return '';
              }
            })
          }
        </TreeView>
      )
    }
  }
  return (
    <div className="component-tree">
      <h3>Component Tree</h3>
      <TreeView
        nodeLabel={<span className="node" onClick={onTreeItemClick}>App</span>}
        defaultCollapsed={false}
        collapsed={false}
        data-cid={0}
        data-instanceId={'0'}
        onClick={onTreeItemClick}
        itemClassName={(selectedInstanceId === '0') ? 'tree-item selected' : 'tree-item'}
      >
        {
          React.Children.map(tree.app.props.children, (childComponent) => {
            console.log('>>>>>>>> will now createTreeView');
            return createTreeView(childComponent, selectedInstanceId);
          })
        }
      </TreeView>
    </div>
  );
}

export default ComponentTree;
