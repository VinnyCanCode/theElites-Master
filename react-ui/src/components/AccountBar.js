import React from 'react';
import { useState } from 'react';
import { ReactComponent as ThunderIcon } from '../imgs/thunder.svg';
import { ReactComponent as ShoesIcon } from '../imgs/shoes.svg';
import { ReactComponent as BackIcon } from '../imgs/backArrow.svg';
import { ReactComponent as AvatarIcon } from '../imgs/avatar.svg';
import { ReactComponent as WishlistIcon } from '../imgs/AccountWishList.svg';
import { ReactComponent as OrdersIcon } from '../imgs/product.svg';
import { ReactComponent as ExitIcon } from '../imgs/exit.svg';
import { ReactComponent as ProfileIcon } from '../imgs/profile.svg';
import { ReactComponent as IdIcon } from '../imgs/id.svg';
import { CSSTransition } from 'react-transition-group';
import { useHistory } from 'react-router-dom';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../actions';

const AccountBar = (props) => {
  return (
    <nav className="navbar">
      <ul className="navbar__nav">{props.children} </ul>
    </nav>
  );
};

const AccountItem = (props) => {
  const [open, setOpen] = useState(false);
  const node = useRef();

  const handleClick = (e) => {
    if (!node.current.contains(e.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);

  return (
    <li
      className="navbar__item"
      ref={node}
      onClick={(e) => e.stopPropagation()}
    >
      <a
        href="#"
        className="navbar__accountIcon"
        onClick={() => setOpen(!open)}
      >
        <span>{props.icon}</span>
        {props.title}
      </a>
      {open && props.children}
    </li>
  );
};

const LoggedInDropdown = () => {
  const [activeMenu, setActiveMenu] = useState('main');
  const [menuHeight, setMenuHeight] = useState(null);
  const history = useHistory();
  const dispatch = useDispatch();

  const calcHeight = (el) => {
    const height = el.offsetHeight;
    setMenuHeight(height + 20);
  };

  const redirect = (link) => {
    const path = link;
    history.push(link);
  };

  const logOutUser = (name) => {
    if (name === 'Sign Out') {
      dispatch(logoutUser());
      history.push('/');
    }
  };

  const DropdownItem = (props) => {
    return (
      <a
        href="#"
        className="navbar__menuItem"
        onClick={() => {
          props.goToMenu && setActiveMenu(props.goToMenu);
          redirect(props.path);
          logOutUser(props.children);
        }}
      >
        <span className="navbar__icon">{props.leftIcon}</span>
        {props.children}
        <span className="navbar__icon navbar__icon--right">
          {props.rightIcon}
        </span>
      </a>
    );
  };

  return (
    <div className="navbar__dropdown" style={{ height: menuHeight }}>
      <CSSTransition
        in={activeMenu == 'main'}
        timeout={500}
        classNames="navbar__menu--primary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="navbar__menu">
          <DropdownItem leftIcon={<ProfileIcon />} goToMenu="Profile Links">
            My Profile
          </DropdownItem>
          <DropdownItem leftIcon={<ExitIcon />}>Sign Out</DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu == 'Profile Links'}
        timeout={500}
        classNames="navbar__menu--secondary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="menu">
          <div className="navbar__menu">
            <DropdownItem leftIcon={<BackIcon />} goToMenu="main">
              Back
            </DropdownItem>
            <DropdownItem leftIcon={<IdIcon />} path="/myaccount">
              Account Info
            </DropdownItem>
            <DropdownItem leftIcon={<WishlistIcon />} path="/mywishlist">
              Wishlist
            </DropdownItem>
            <DropdownItem leftIcon={<OrdersIcon />} path="/myorders">
              Orders
            </DropdownItem>
          </div>
        </div>
      </CSSTransition>
    </div>
  );
};

const LoggedOutDropdown = () => {
  const [activeMenu, setActiveMenu] = useState('main');
  const [menuHeight, setMenuHeight] = useState(null);
  const history = useHistory();

  const calcHeight = (el) => {
    const height = el.offsetHeight;
    setMenuHeight(height + 20);
  };

  const redirect = (link) => {
    const path = link;
    history.push(link);
  };

  const DropdownItem = (props) => {
    return (
      <a
        href="#"
        className="navbar__menuItem"
        onClick={() => {
          props.goToMenu && setActiveMenu(props.goToMenu);
          redirect(props.path);
        }}
      >
        <span className="navbar__icon">{props.leftIcon}</span>
        {props.children}
        <span className="navbar__icon navbar__icon--right">
          {props.rightIcon}
        </span>
      </a>
    );
  };

  return (
    <div className="navbar__dropdown" style={{ height: menuHeight }}>
      <CSSTransition
        in={activeMenu == 'main'}
        timeout={500}
        classNames="navbar__menu--primary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="navbar__menu">
          <DropdownItem path="/myaccount">Log In</DropdownItem>
          <DropdownItem path="/signup"> Sign Up</DropdownItem>
        </div>
      </CSSTransition>
    </div>
  );
};

export { AccountBar, AccountItem, LoggedInDropdown, LoggedOutDropdown };
