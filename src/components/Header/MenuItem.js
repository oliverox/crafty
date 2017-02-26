import React, { Component, PropTypes } from 'react';
// import { Link } from 'react-router-dom';
import cn from 'classnames';

class MenuItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      active: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    const { children } = this.props;
    if (children) {
      // Since current menu has sub-menus, open them up when in mobile view
      e.preventDefault();
      this.setState({active: !this.state.active});
    }
  }

  render() {
    const { name, href='#', current, children} = this.props;
    let LinkTag, SubMenuTag;
    const className = cn({
      'menu-item-has-children': children && children.length > 0,
      'current-menu-item': current,
      'active': this.state.active,
    });

    if (href === '#') {
      LinkTag = <a href={href}>{name}</a>;
    } else {
      LinkTag = <a href={href}>{name}</a>;
    }

    if (children) {
      SubMenuTag = <ul className="sub-menu">{children}</ul>;
    }
    return (
      /* MenuItem : A menu link in the navigation bar with a dropdown menu if needed */
      <li onClick={this.handleClick} className={className}>
        {LinkTag}
        {SubMenuTag}
      </li>
    );
  }
}

MenuItem.propTypes = {
  name: PropTypes.string.isRequired,
  href: PropTypes.string,
  current: PropTypes.bool,
  children: PropTypes.node,
};

export default MenuItem;
