import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  AccountBar,
  AccountItem,
  LoggedInDropdown,
  LoggedOutDropdown,
} from './AccountBar';
import { ReactComponent as DownArrow } from '../imgs/shopping-cart.svg';
import { ReactComponent as CartIcon } from '../imgs/shopping-cart.svg';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getCart } from '../actions';

const Header = () => {
  const loggedInStatus = useSelector((state) => state.auth.auth);
  const cart = useSelector((state) => state.cart);
  const history = useHistory();
  const dispatch = useDispatch();

  // Update Cart To Post Amount Of Items In Cart
  useEffect(() => {
    dispatch(getCart());
  }, [loggedInStatus]);

  return (
    <div className="header">
      <Link to="/">
        <div className="header__logo">
          <div className="header__logo--pic">
            <img src="/crown.png" alt="" />
          </div>
        </div>
      </Link>
      <div className="header__searchbarContainer">
        <input
          type="text"
          className="header__searchbar"
          placeholder="      Search for items, brands, and inspiration"
        />
        {/* <img src="/imgs/search.png" alt="" className="header__searchbarImg" /> */}
      </div>

      <div className="header__rightCorner">
        <div
          className="header__rightCorner--cart"
          onClick={() => {
            history.push('/cart');
          }}
        >
          <span className="header__rightCorner--cartPic">
            <CartIcon />
          </span>
          Cart: {cart.length}
        </div>
        <AccountBar>
          <AccountItem
            icon={<DownArrow />}
            title={loggedInStatus ? 'My Account' : 'Log In'}
          >
            {loggedInStatus ? <LoggedInDropdown /> : <LoggedOutDropdown />}
          </AccountItem>
        </AccountBar>
      </div>
    </div>
  );
};

export default Header;
