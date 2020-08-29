import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getCart, sideBarSearchTerm } from '../../actions';
import HomeHeader from './HomeHeader';
import AltHeader from './AltHeader';
import { ReactComponent as MenuIcon } from '../../imgs/menuIcon.svg';
import { ReactComponent as ShopIcon } from '../../imgs/shop.svg';
import { ReactComponent as CloseIcon } from '../../imgs/close.svg';
import { motion } from 'framer-motion';

const Header = () => {
  const dispatch = useDispatch();

  // Routes that will display alternate header
  const altHeaderRoutes = [
    'products',
    'product',
    'myaccount',
    'mywishlist',
    'myorders',
    'cart',
    'signup',
  ];

  // SideBar Search Term State
  const searchTerm = useSelector((state) => state.sideBarSearchTerm);

  // Check URL
  const [url, setCurrentUrl] = useState('');
  const currentUrl = useLocation().pathname.split('/')[1];

  //Check current URL in order to show correct header
  useEffect(() => {
    setCurrentUrl(currentUrl);
  }, [currentUrl]);

  //Search for Products
  const searchProducts = (value) => {
    if (value) {
      dispatch(sideBarSearchTerm(value.trim()));
    }
  };

  return <>{altHeaderRoutes.includes(url) ? <AltHeader /> : <HomeHeader />}</>;
};

export default Header;
