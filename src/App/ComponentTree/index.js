import React from 'react';
import TreeView from 'react-treeview';

import './styles.css';

const ComponentTree = ({ tree, selectedInstanceId, onTreeItemClick }) => {
  const createTreeView = (component, targetInstanceId) => {
    console.log('[createTreeView]: component=', component);
    if (!component.props) return component;
    if (React.Children.count(component.props.children) > 0) {
      const cid = parseInt(component.props['data-cid'], 10);
      const instanceId = component.props.instanceId;
      return (
        <TreeView
          nodeLabel={component.type.displayName}
          defaultCollapsed={true}
          data-cid={cid}
          data-instanceId={instanceId}
          onClick={onTreeItemClick}
          style={{backgroundColor: (selectedInstanceId === instanceId) ? 'lightgrey' : ''}}
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
        style={{backgroundColor: (selectedInstanceId === '0') ? 'lightgrey' : ''}}
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
