import React from 'react';
import {
  AccountBar,
  AccountItem,
  LoggedInDropdown,
  LoggedOutDropdown,
} from '../AccountBar';
import Searchbar from './Searchbar';
import { ReactComponent as MenuIcon } from '../../imgs/menuIcon.svg';
import { ReactComponent as ShopIcon } from '../../imgs/shop.svg';
import { ReactComponent as CloseIcon } from '../../imgs/close.svg';
import { ReactComponent as CartIcon } from '../../imgs/cart.svg';
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import OpenMenu from './OpenMenu';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getCart } from '../../actions';

const AltHeader = () => {
  const [menu, setMenu] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const cart = useSelector((state) => state.cart);
  const isAuth = useSelector((state) => state.auth.auth);
  const loggedInStatus = useSelector((state) => state.auth.auth);
  const cartItemQuantity = useSelector((state) => state.cart.length);

  const CartHeaderIcon = () => {
    // If user logged in, go to cart. If not, go to log in page
    const linkTo = () => {
      if (!isAuth) {
        return '/myaccount';
      }

      return '/cart';
    };

    return (
      <Link to={linkTo} className="homeHeader__cartIcon">
        <CartIcon className="homeHeader__cartIcon--img" />
        <span className="homeHeader__cartIcon--quantity">
          {cartItemQuantity}
        </span>
      </Link>
    );
  };

  // Update Cart To Post Amount Of Items In Cart
  useEffect(() => {
    dispatch(getCart());
  }, [loggedInStatus]);

  return (
    <div className="homeHeader">
      {menu ? <OpenMenu menu={menu} setMenu={setMenu} /> : ''}

      <div className="homeHeader__left">
        <div className="homeHeader__menu">
          <MenuIcon
            className="homeHeader__menuIcon"
            onClick={() => setMenu(true)}
          />
          <h4>Menu</h4>
        </div>
        <AccountBar>
          <AccountItem title={loggedInStatus ? 'My Account' : 'My Account'}>
            {loggedInStatus ? <LoggedInDropdown /> : <LoggedOutDropdown />}
          </AccountItem>
        </AccountBar>
      </div>

      <div className="homeHeader__centerLogo">
        <div className="logo">
          <Link to="/">
            <img src="/crown.png" alt="" />
          </Link>
        </div>
      </div>

      <div className="homeHeader__rightCorner">
        <div className="homeHeader__shop">
          <Searchbar />
          {CartHeaderIcon()}
        </div>
      </div>
    </div>
  );
};

export default AltHeader;
