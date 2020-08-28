import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sideBarSearchTerm } from '../actions';
import history from '../history';

//SVG ICONS
import { ReactComponent as NewIcon } from '../imgs/thunder.svg';
import { ReactComponent as ClothingIcon } from '../imgs/clothes.svg';
import { ReactComponent as ShoesIcon } from '../imgs/shoes.svg';
import { ReactComponent as AccessoriesIcon } from '../imgs/backpack.svg';
import { ReactComponent as ActiveWearIcon } from '../imgs/activewear.svg';
import { ReactComponent as LifestyleIcon } from '../imgs/lifestyle.svg';
import { ReactComponent as InspirationIcon } from '../imgs/inspiration.svg';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';

const Sidebar = () => {
  const [currentURL, setCurrentURL] = useState('none');
  const dispatch = useDispatch();
  const selectedItem = useSelector((state) => state.sideBarSearchTerm);

  // Check if current URL is on the products page
  const currentLocation = useLocation()
    .pathname.split('/')
    .includes('products');

  // ONLY show if ON products page function
  useEffect(() => {
    setCurrentURL(currentLocation ? 'initial' : 'none');
  }, [currentLocation]);

  const searchProducts = (value) => {
    dispatch(sideBarSearchTerm(value.trim()));
    history.push(`/products/${value.toLowerCase().trim()}`);
  };

  // Toggle Selected ClassName To Show Which Item Is Selected
  const toggleClass = (name) => {
    if (selectedItem === name) {
      return 'sidebar__selectedItem';
      // return 'sidebar__item';
    }

    return 'sidebar__item';
  };

  const SideBarItem = (props) => {
    return (
      <li
        className={toggleClass(props.name)}
        onClick={(e) => searchProducts(props.children)}
      >
        {props.children}
      </li>
    );
  };

  return (
    <div className="sidebar" style={{ display: currentURL }}>
      <h3>Category</h3>
      <ul className="sidebar__list">
        <SideBarItem name="new">New</SideBarItem>
        <SideBarItem name="clothing">Clothing</SideBarItem>
        <SideBarItem name="shoes">Shoes</SideBarItem>
        <SideBarItem name="accessories">Accessories</SideBarItem>
        <SideBarItem name="activewear">Activewear</SideBarItem>
        <SideBarItem name="lifestyle">Lifestyle</SideBarItem>
        <SideBarItem name="inspiration">Inspiration</SideBarItem>
      </ul>
    </div>
  );
};

export default Sidebar;
