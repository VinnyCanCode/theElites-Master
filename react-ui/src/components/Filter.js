import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { colorFilter, brandFilter, priceFilter } from '../actions';

import { ReactComponent as MoneyIcon } from '../imgs/money.svg';
import { ReactComponent as CrownIcon } from '../imgs/crown.svg';
import { ReactComponent as ColorIcon } from '../imgs/color-wheel.svg';
import { ReactComponent as BackIcon } from '../imgs/backArrow.svg';
import { ReactComponent as ColorDotIcon } from '../imgs/colorDot.svg';
import { ReactComponent as NikeIcon } from '../imgs/nike.svg';
import { ReactComponent as AdidasIcon } from '../imgs/adidas.svg';
import { ReactComponent as EmptyCheckIcon } from '../imgs/circle.svg';
import { ReactComponent as ClearIcon } from '../imgs/cross.svg';
import { CSSTransition } from 'react-transition-group';
import { useEffect } from 'react';
import { useRef } from 'react';

// FIlter by Brand, Color, Price

const FilterMenu = (props) => {
  const [activeMenu, setActiveMenu] = useState('main');
  const [menuHeight, setMenuHeight] = useState(190);
  const colorFilterState = useSelector((state) => state.colorFilter);
  const brandFilterState = useSelector((state) => state.brandFilter);
  const priceFilterState = useSelector((state) => state.priceFilter);
  const colorFilterLength = useSelector((state) => state.colorFilter.length);
  const brandFilterLength = useSelector(
    (state) => state.brandFilter.split().filter((item) => item !== '').length
  );
  const priceFilterLength = useSelector(
    (state) => state.priceFilter.split().filter((item) => item !== '').length
  );

  const calcHeight = (el) => {
    const height = el.offsetHeight;
    setMenuHeight(height);
  };

  const FilterByItem = (props) => {
    const dispatch = useDispatch();

    const addFilter = (filterType, value) => {
      if (filterType === 'color') {
        dispatch(colorFilter(value));
      }
      if (filterType === 'brand') {
        dispatch(brandFilter(value));
      }
      if (filterType === 'price') {
        dispatch(priceFilter(value));
      }

      if (filterType === 'clear') {
        dispatch(colorFilter('clear'));
        dispatch(brandFilter('clear'));
        dispatch(priceFilter('clear'));
      }
    };

    const itemSelected = (value) => {
      // If child menu item is in state, make it highlighted in css
      if (
        colorFilterState.includes(value) ||
        brandFilterState === value ||
        priceFilterState === value
      ) {
        return 'filter__dropdownItem filter__dropdownItem--selected';
      }

      // If parent menu item has a child in state, make it highligted in css
      if (colorFilterLength > 0 && value === 'Color') {
        return 'filter__dropdownItem filter__dropdownItem--selected';
      }
      if (brandFilterLength > 0 && value === 'Brand') {
        return 'filter__dropdownItem filter__dropdownItem--selected';
      }
      if (priceFilterLength > 0 && value === 'Price') {
        return 'filter__dropdownItem filter__dropdownItem--selected';
      }

      return 'filter__dropdownItem';
    };

    return (
      <a
        href="#"
        className={itemSelected(props.children)}
        onClick={() => {
          props.goToMenu && setActiveMenu(props.goToMenu);
          addFilter(props.filterType, props.children);
        }}
      >
        <span className="filter__icon">{props.icon}</span>
        {props.children}
      </a>
    );
  };

  return (
    <div className="filter__menu" style={{ height: menuHeight }}>
      <CSSTransition
        in={activeMenu == 'main'}
        timeout={500}
        classNames="filter__form--primary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <ul className="filter__form">
          <FilterByItem text="Color" icon={<ColorIcon />} goToMenu="color">
            Color
          </FilterByItem>
          <FilterByItem text="Brand" icon={<CrownIcon />} goToMenu="brand">
            Brand
          </FilterByItem>
          <FilterByItem text="Price" icon={<MoneyIcon />} goToMenu="price">
            Price
          </FilterByItem>
          <FilterByItem text="Price" icon={<ClearIcon />} filterType="clear">
            Clear Filters
          </FilterByItem>
        </ul>
      </CSSTransition>

      <CSSTransition
        in={activeMenu == 'color'}
        timeout={500}
        classNames="filter__form--secondary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <ul className="filter__form">
          <FilterByItem
            text="Color"
            icon={<BackIcon style={{ fill: 'white' }} />}
            goToMenu="main"
          >
            Back
          </FilterByItem>
          <FilterByItem
            text="Color"
            filterType="color"
            icon={<ColorDotIcon style={{ fill: 'blue' }} />}
          >
            Blue
          </FilterByItem>
          <FilterByItem
            text="color"
            filterType="color"
            icon={<ColorDotIcon style={{ fill: 'red' }} />}
          >
            Red
          </FilterByItem>
          <FilterByItem
            text="color"
            filterType="color"
            icon={<ColorDotIcon style={{ fill: 'white' }} />}
          >
            White
          </FilterByItem>
          <FilterByItem
            text="color"
            filterType="color"
            icon={<ColorDotIcon style={{ fill: 'Black' }} />}
          >
            Black
          </FilterByItem>
          <FilterByItem
            text="color"
            filterType="color"
            icon={<ColorDotIcon style={{ fill: 'Yellow' }} />}
          >
            Yellow
          </FilterByItem>
          <FilterByItem
            text="color"
            filterType="color"
            icon={<ColorDotIcon style={{ fill: 'Green' }} />}
          >
            Green
          </FilterByItem>
          <FilterByItem
            text="color"
            filterType="color"
            icon={<ColorDotIcon style={{ fill: 'purple' }} />}
          >
            Purple
          </FilterByItem>
        </ul>
      </CSSTransition>

      <CSSTransition
        in={activeMenu == 'brand'}
        timeout={500}
        classNames="filter__form--secondary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <ul className="filter__form">
          <FilterByItem
            text="Color"
            icon={<BackIcon style={{ fill: 'white' }} />}
            goToMenu="main"
          >
            Back
          </FilterByItem>
          <FilterByItem
            text="Color"
            filterType="brand"
            icon={<NikeIcon style={{ fill: 'white' }} />}
          >
            Nike
          </FilterByItem>
          <FilterByItem
            text="Brand"
            filterType="brand"
            icon={<AdidasIcon style={{ fill: 'white' }} />}
          >
            Adidas
          </FilterByItem>
        </ul>
      </CSSTransition>

      <CSSTransition
        in={activeMenu == 'price'}
        timeout={500}
        classNames="filter__form--secondary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <ul className="filter__form">
          <FilterByItem
            text="Color"
            icon={<BackIcon style={{ fill: 'white' }} />}
            goToMenu="main"
          >
            Back
          </FilterByItem>
          <FilterByItem
            text="Price"
            filterType="price"
            icon={<EmptyCheckIcon style={{ fill: 'white' }} />}
          >
            $0 - $25
          </FilterByItem>
          <FilterByItem
            text="Price"
            filterType="price"
            icon={<EmptyCheckIcon style={{ fill: 'white' }} />}
          >
            $25 - 50
          </FilterByItem>
          <FilterByItem
            text="Price"
            filterType="price"
            icon={<EmptyCheckIcon style={{ fill: 'white' }} />}
          >
            $50 - $100
          </FilterByItem>
          <FilterByItem
            text="Price"
            filterType="price"
            icon={<EmptyCheckIcon style={{ fill: 'white' }} />}
          >
            $100 - $150
          </FilterByItem>
          <FilterByItem
            text="Price"
            filterType="price"
            icon={<EmptyCheckIcon style={{ fill: 'white' }} />}
          >
            Over $150
          </FilterByItem>
        </ul>
      </CSSTransition>
    </div>
  );
};

const Filter = (props) => {
  const [filterCount, setFilterCount] = useState(0);
  const [open, setOpen] = useState(false);
  const node = useRef();
  const colorFilterLength = useSelector((state) => state.colorFilter.length);
  const brandFilterLength = useSelector(
    (state) => state.brandFilter.split().filter((item) => item !== '').length
  );
  const priceFilterLength = useSelector(
    (state) => state.priceFilter.split().filter((item) => item !== '').length
  );

  const handleClick = (e) => {
    if (!node.current.contains(e.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    setFilterCount(colorFilterLength + brandFilterLength + priceFilterLength);
  }, [colorFilterLength, brandFilterLength, priceFilterLength]);

  // Close menu when mouse is clicked outside of menu
  useEffect(() => {
    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);

  return (
    <li className="filter__item" ref={node}>
      <button className="filter__navButton" onClick={() => setOpen(!open)}>
        <span className="filter__filterCount">{filterCount}</span>
        Filter
      </button>

      {open ? <FilterMenu /> : null}
    </li>
  );
};

export default Filter;
