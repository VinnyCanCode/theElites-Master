import React from 'react';
import { ReactComponent as DownArrowIcon } from '../imgs/arrow.svg';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { createRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sortProductsBy } from '../actions';

const DropdownMenu = () => {
  const sortProdBy = useSelector((state) => state.sortProductsBy);
  const [sortBy, setSortBy] = useState(sortProdBy);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(sortProductsBy(sortBy));
  }, [sortBy]);

  return (
    <div className="sort">
      <form className="sort__form">
        <h2>Sort By:</h2>

        <label className="sort__label">
          <input
            type="radio"
            name="Price"
            className="sort__item"
            checked={sortBy === ''}
            onChange={() => setSortBy('')}
          />
          None
        </label>

        <label className="sort__label">
          <input
            type="radio"
            name="Price"
            className="sort__item"
            checked={sortBy === 'price:low'}
            onChange={() => setSortBy('price:low')}
          />
          Price: Low To High
        </label>

        <label className="sort__label">
          <input
            type="radio"
            name="Price"
            className="sort__item"
            checked={sortBy === 'price:high'}
            onChange={() => setSortBy('price:high')}
          />
          Price: Hight To Low
        </label>
      </form>
    </div>
  );
};

const Sort = (props) => {
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
    <li className="filter__item" ref={node}>
      <button
        className="filter__navButton filter__navButton filter__navButton"
        onClick={() => {
          setOpen(!open);
        }}
      >
        Sort
        <span
          className={!open ? 'filter__icon--arrow' : 'filter__icon--arrow-open'}
        >
          {<DownArrowIcon />}
        </span>
      </button>

      {open ? <DropdownMenu /> : null}
    </li>
  );
};

export default Sort;
