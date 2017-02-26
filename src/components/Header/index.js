import React, { PropTypes } from 'react';
// import { Link } from 'react-router-dom';
import Nav from './Nav';
import MenuItem from './MenuItem';
import Toolbar from './Toolbar';
import cn from 'classnames';

import './styles.css';

const Header = ({sticky=false, children}) => {
  const className = cn({
    navbar: true,
    'navbar-sticky': sticky
  });
  return (
    // Header
    // Remove ".navbar-sticky" class to make navigation bar scrollable with the page.
    <header className={className}>
      {/* Navigation menu */}
      <Nav>
        <MenuItem name="Home">
          <MenuItem current href="/" name="Home Version 1"/>
          <MenuItem name="Home Version 2"/>
          <MenuItem name="Home Version 3"/>
        </MenuItem>
        <MenuItem name="Shop">
          <MenuItem name="Full Width Sidebar Left"/>
          <MenuItem name="Full Width Sidebar Right"/>
          <MenuItem name="Full Width Filters Top"/>
          <MenuItem name="Boxed Sidebar Left"/>
          <MenuItem name="Boxed Sidebar Right"/>
          <MenuItem name="Boxed Filters Top"/>
          <MenuItem name="Single Product"/>
        </MenuItem>
        <MenuItem name="Blog" href="/blog"/>
        <MenuItem name="About"/>
        <MenuItem name="Contacts"/>
        <MenuItem name="FAQ"/>
        <MenuItem name="Elements" href="/elements" />
      </Nav>

      {/* Toolbar */}
      <Toolbar>
        {/* Hamburger menu button */}
        {/* <Toolbar.MenuToggle /> */}

        {/* Shopping cart menu button */}
        <div className="cart-btn">
          <a href="shopping-cart.html">
            <i>
              {/* <Icon name="shopping_basket"/> */}
              <span className="count">2</span>
            </i>
          </a>
          {/* Cart Dropdown */}
          <div className="cart-dropdown">
            <div className="cart-item">
              <a href="shop-single.html" className="item-thumb">
                <img src="/assets/images/cart/item01.jpg" alt="Item"/>
              </a>
              <div className="item-details">
                <h3 className="item-title"><a href="shop-single.html">Concrete Lamp</a></h3>
                <h4 className="item-price">1 x $85.90</h4>
              </div>
              <a href="#" className="close-btn">
                X
              </a>
            </div>{/* .cart-item */}
            <div className="cart-item">
              <a href="shop-single.html" className="item-thumb">
                <img src="/assets/images/cart/item02.jpg" alt="Item"/>
              </a>
              <div className="item-details">
                <h3 className="item-title"><a href="shop-single.html">Storage Box</a></h3>
                <h4 className="item-price">2 x $38.00</h4>
              </div>
              <a href="#" className="close-btn">
                <i name="close"/>
              </a>
            </div>{/* .cart-item */}
            <div className="cart-subtotal">
              <div className="column">
                <span>Subtotal:</span>
              </div>
              <div className="column">
                <span className="amount">$161.90</span>
              </div>
            </div>
          </div>
        </div>
      </Toolbar>
    </header>
  );
}

Header.propTypes = {
  sticky: PropTypes.bool,
};

Header.displayName = 'Header';

export default Header;
