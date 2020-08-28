import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { genSelect } from '../actions';
import { ReactComponent as WishlistIcon } from '../imgs/AccountWishList.svg';
import { ReactComponent as OrdersIcon } from '../imgs/product.svg';
import { ReactComponent as WomanIcon } from '../imgs/woman.svg';
import { ReactComponent as ManIcon } from '../imgs/man.svg';
import { ReactComponent as IdIcon } from '../imgs/id.svg';
import Sort from './Sort';
import Filter from './Filter';

const Nav = () => {
  const dispatch = useDispatch();
  const selectedGen = useSelector((state) => state.genSelect);
  const isAuth = useSelector((state) => state.auth.auth);
  const history = useHistory();

  // Return current path in URL
  const { pathname } = useLocation();

  // Returns current pathname to use for filter header
  const filterTitle = (pathname) => {
    switch (pathname) {
      case '/':
        return 'Home';
      case '/myaccount':
        return 'Account';
      case '/myorders':
        return 'Account';
      case '/mywishlist':
        return 'Account';
      case '/products/new':
        return 'New';
      case '/products/clothing':
        return 'Clothing';
      case '/products/shoes':
        return 'Shoes';
      case '/products/accessories':
        return 'Accessories';
      case '/products/activewear':
        return 'Activewear';
      case '/products/lifestyle':
        return 'Lifestyle';
      case '/products/inspiration':
        return 'Inspiration';
      default:
        break;
    }
  };

  // Set Gen state
  const setGen = (value) => {
    if (selectedGen === value.toLowerCase()) {
      return dispatch(genSelect(''));
    }

    return dispatch(genSelect(value.toLowerCase()));
  };

  // set class name depending on gen for products page
  const setGenClassName = (gen) => {
    if (selectedGen === gen.toLowerCase()) {
      return 'filter__item filter__item--selected';
    }
    return 'filter__item';
  };

  const accountNavSelection = (name) => {
    if (pathname === name) {
      return 'profile__navbar--li profile__navbar--li-selected';
    }
    return 'profile__navbar--li';
  };

  // Nav for Products Page
  const ProductNav = (props) => {
    return (
      <li
        className={setGenClassName(props.children)}
        onClick={() => setGen(props.children)}
      >
        <button
          className={`filter__navButton filter__navButton--${props.children.toLowerCase()} filter__navButton`}
        >
          <span className="filter__icon">{props.icon}</span>
          {props.children}
        </button>
      </li>
    );
  };

  // Nav for My Acccont
  const MyAccountNav = (props) => {
    const history = useHistory();

    return (
      <li
        className={accountNavSelection(props.path)}
        onClick={() => history.push(props.path)}
      >
        {props.children}
      </li>
    );
  };

  const renderNav = (pathname) => {
    pathname = pathname.split('/')[1];

    if (!isAuth && pathname === 'products') {
      return (
        <>
          <h3>Filter </h3>
          <ul className="filter__ul">
            <ProductNav icon={<WomanIcon />}>Women</ProductNav>
            <ProductNav icon={<ManIcon />}>Men</ProductNav>
            <Sort />
            <Filter />
          </ul>
        </>
      );
    }

    if (
      pathname === 'myaccount' ||
      pathname === 'mywishlist' ||
      pathname === 'myorders'
    ) {
      return (
        <div className="profile__navbar">
          <ul className="profile__navbar--ul">
            <MyAccountNav path="/myaccount">My Account</MyAccountNav>
            <MyAccountNav path="/mywishlist">Wishlist</MyAccountNav>
            <MyAccountNav path="/myorders">Orders</MyAccountNav>
          </ul>
        </div>
      );
    }
    if (pathname === 'products') {
      return (
        <>
          <h3>Filter </h3>
          <ul className="filter__ul">
            <ProductNav icon={<WomanIcon />}>Women</ProductNav>
            <ProductNav icon={<ManIcon />}>Men</ProductNav>
            <Sort />
            <Filter />
          </ul>
        </>
      );
    }
  };

  return (
    <div className="filter">
      <nav className="filter__navButtons">{renderNav(pathname)}</nav>
    </div>
  );
};

export default Nav;
