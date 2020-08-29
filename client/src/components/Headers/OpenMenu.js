import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';
import { useState } from 'react';
import { sideBarSearchTerm } from '../../actions';
import { ReactComponent as ShopIcon } from '../../imgs/shop.svg';
import { ReactComponent as CloseIcon } from '../../imgs/close.svg';

const OpenMenu = (props) => {
  const dispatch = useDispatch();
  const currentUrl = useLocation().pathname.split('/')[1];
  const searchTerm = useSelector((state) => state.sideBarSearchTerm);
  const searchProducts = (value) => {
    if (value) {
      dispatch(sideBarSearchTerm(value.trim()));
    }
  };

  // Menu Item for Open Menu
  const MenuItem = (props) => {
    return (
      <Link
        to={props.to}
        onClick={() => {
          searchProducts(props.searchTerm);
        }}
      >
        <li className={currentUrl === props.path ? 'openMenu__currentUrl' : ''}>
          {props.children}
        </li>
      </Link>
    );
  };

  return (
    <div className="openMenu">
      <ul className="openMenu__top">
        <li className="openMenu__top--left">
          <CloseIcon
            className="openMenu__closeIcon"
            onClick={() => {
              props.setMenu(false);
            }}
          />
          theElites
        </li>
        <li className="openMenu__top--right">
          <Link
            to="/products/new"
            onClick={() => {
              props.setMenu(false);
            }}
            className="openMenu__top--shop"
          >
            <ShopIcon className="openMenu__shopIcon" />
            <h3>Online Store</h3>{' '}
          </Link>

          <span className="openMenu__top--divide">|</span>
          <div className="openMenu__top--account">
            <Link
              to="/myaccount"
              onClick={() => {
                props.setMenu(false);
              }}
            >
              My Account
            </Link>
          </div>
        </li>
      </ul>

      <ul className="openMenu__bottom">
        <span
          onClick={() => {
            props.setMenu(false);
          }}
        >
          <MenuItem path="" to="/">
            Home
          </MenuItem>
          <MenuItem path="about" to="/about">
            About Us
          </MenuItem>
          <MenuItem path="products" to="/products/new" searchTerm="new">
            Products
          </MenuItem>
          <MenuItem path="contact" to="/contact">
            Contact
          </MenuItem>
        </span>
      </ul>
    </div>
  );
};

export default OpenMenu;
