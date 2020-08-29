import React from 'react';
import { useDispatch } from 'react-redux';
import { selectedItem } from '../actions';
import history from '../history';
import { ReactComponent as ClearHeartIcon } from '../imgs/clearHeart.svg';
import { useState } from 'react';
import { useEffect } from 'react';

const ItemCard = (props) => {
  const dispatch = useDispatch();

  // Product Details from props
  const product = props.props;

  // Image AWS needed to complete image
  const aws = `https://theelites.s3.amazonaws.com/`;

  // Background Image For Card
  const backgroundImage = {
    background: 'url(' + aws + product.mainPicture + ') 100%/cover no-repeat',
  };

  //Rollover Image For Card
  const rolloverImage = {
    background: 'url(' + aws + product.subPicture1 + ') 100%/cover no-repeat',
  };

  const [currentPicture, setCurrentPicture] = useState(backgroundImage);

  const setPictureOnMouseOver = () => {
    setCurrentPicture(rolloverImage);
  };

  const setPictureOnMouseLeave = () => {
    setCurrentPicture(backgroundImage);
  };

  // On Click, push to Item Detail with Item details from api
  const selectItem = () => {
    dispatch(selectedItem(product.routeID));
    history.push(`/product/${product.routeID}`);
  };

  return (
    <div
      className="itemCard"
      onClick={selectItem}
      onMouseOver={setPictureOnMouseOver}
      onMouseLeave={setPictureOnMouseLeave}
    >
      <div className="itemCard__top">
        <div className="itemCard__top" style={currentPicture}></div>
        <div className="wishListHeart">
          <button className="wishListHeart__button">
            {/* <ClearHeartIcon className="wishListHeart__img" /> */}
          </button>
        </div>
      </div>
      <div className="itemCard__bottom">
        <ul className="itemCard__list">
          <li className="itemCard__item itemCard__item--1">{product.name}</li>
          <li className="itemCard__item itemCard__item--2">
            $ {product.price}
          </li>
        </ul>
      </div>
      {props.additional}
    </div>
  );
};

export default ItemCard;
