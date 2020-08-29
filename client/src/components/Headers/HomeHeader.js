import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { ReactComponent as MenuIcon } from '../../imgs/menuIcon.svg';
import { ReactComponent as ShopIcon } from '../../imgs/shop.svg';

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { sideBarSearchTerm } from '../../actions';
import OpenMenu from './OpenMenu';
import { motion } from 'framer-motion';

const transition = { duration: 1, ease: [0.43, 0.13, 0.23, 0.96] };
const initial = { y: -100, opacity: -1 };
const animate = { y: 0, opacity: 1 };

const HomeHeader = () => {
  const [menu, setMenu] = useState(false);

  return (
    <motion.div
      className="homeHeader"
      animate={{ height: ['0vh', '14.2vh'] }}
      transition={transition}
    >
      {menu ? <OpenMenu menu={menu} setMenu={setMenu} /> : ''}

      <motion.div
        className="homeHeader__menu"
        initial={initial}
        animate={animate}
        transition={transition}
      >
        <MenuIcon
          className="homeHeader__menuIcon"
          onClick={() => setMenu(true)}
        />
        <h4>Menu</h4>
      </motion.div>

      <motion.h1 initial={initial} animate={animate} transition={transition}>
        TheElites
      </motion.h1>

      <motion.div
        className="homeHeader__rightCorner"
        initial={initial}
        animate={animate}
        transition={transition}
      >
        <Link to="/">
          <div className="logo logo--homeHeader">
            <div className="logo__pic">
              <img src="/crown.png" alt="" />
            </div>
          </div>
        </Link>
        <Link to="/products/new" className="homeHeader__shop">
          <div className="homeHeader__shopIcon">
            <ShopIcon className="homeHeader__shopIcon--img" />
          </div>
          <h3>Online Store</h3>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default HomeHeader;
