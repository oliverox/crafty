import React from 'react';
import TreeView from 'react-treeview';

import './styles.css';

const ComponentTree = ({ tree, selectedInstanceId, onTreeItemClick }) => {
  const createTreeView = (component, targetInstanceId) => {
    console.log('[createTreeView]: component=', component);
    console.log('[createTreeView]: tree.app.props.children', tree.app.props.children);
    if (!component.props) return component;
    if (React.Children.count(component.props.children) > 0) {
      const cid = parseInt(component.props['data-cid'], 10);
      const instanceId = component.props.instanceId;
      const selectedClass = (selectedInstanceId === instanceId) ? 'selected' : ''
      return (
        <TreeView
          nodeLabel={component.type.displayName}
          defaultCollapsed={true}
          data-cid={cid}
          data-instanceId={instanceId}
          onClick={onTreeItemClick}
          itemClassName={`tree-item ${selectedClass}`}
        >
          {React.Children.map(component.props.children, (childComponent) => {
            return createTreeView(childComponent);
          })}
        </TreeView>
      )
    } else {
      return (<div>{component.type.displayName}</div>);
    }
  }
  return (
    <div className="component-tree">
      <h3>Component Tree</h3>
      <TreeView
        nodeLabel="App"
        defaultCollapsed={false}
        data-cid={0}
        data-instanceId={'0'}
        onClick={onTreeItemClick}
        itemClassName={(selectedInstanceId === '0') ? 'tree-item selected' : 'tree-item'}
      >
        {
          React.Children.map(tree.app.props.children, (childComponent) => {
            return createTreeView(childComponent, selectedInstanceId);
          })
        }
      </TreeView>
    </div>
  );
}

export default ComponentTree;
