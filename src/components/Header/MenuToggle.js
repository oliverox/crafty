import React from 'react';
// import { connect } from 'react-redux';
import { Icon } from '../../components';
// import { toggleNavMenu } from '../../redux/actions/ui';

const RawMenuToggle = ({toggleNavMenu}) => (
  /* Hamburger menu button */
  <a href="#" onClick={toggleNavMenu} className="mobile-menu-toggle"><Icon name="menu"/></a>
);
// const mapStateToProps = (state, ownProps) => ({
// });

// const mapDispatchToProps = {
//   toggleNavMenu,
// };

// const MenuToggle = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(RawMenuToggle);

export default RawMenuToggle;
