import React, { PropTypes } from 'react';
// import { connect } from 'react-redux';
import cn from 'classnames';

const Nav = ({position = 'center', isOpen , children}) => {
  const className = cn({
    'main-navigation': true,
    [`text-${position}`]: position,
    open: isOpen,
  });
  return (
    /* Main Navigation : Control the position of navigation */
    /* via modifier classes: "text-left, text-center, text-right" */
    <nav className={className}>
      <ul className="menu">
        {children}
      </ul>
    </nav> /* .main-navigation */
  );
}

Nav.propTypes = {
  position: PropTypes.oneOf(['left', 'center', 'right']),
};

// const mapStateToProps = (state, ownProps) => ({
//   isOpen: state.ui.navMenu.isOpen,
// });
//
// const Nav = connect(
//   mapStateToProps,
// )(RawNav);

export default Nav;
