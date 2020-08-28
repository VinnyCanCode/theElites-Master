import React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getWishList, addItemToCart, removeFromWishlist } from '../actions';
import { useEffect } from 'react';
import ItemCard from './ItemCard';

const WishlistItems = (...itemList) => {
  const wishListItems = itemList[0].itemList;
  const dispatch = useDispatch();
  const aws = `https://theelites.s3.amazonaws.com/`;

  const addToCart = (itemId) => {
    dispatch(addItemToCart(itemId));
  };

  const removeItemFromWishlist = (itemId) => {
    dispatch(removeFromWishlist(itemId));
  };

  const addAndDeleteButtons = (itemId) => {
    return (
      <div className="itemCard__wishlist">
        <div
          className="itemCard__wishlist--button"
          onClick={(e) => {
            e.stopPropagation();
            addToCart(itemId);
          }}
        >
          Add To Order
        </div>
        <div
          className="itemCard__wishlist--button"
          onClick={(e) => {
            e.stopPropagation();
            removeItemFromWishlist(itemId);
          }}
        >
          Delete Item
        </div>
      </div>
    );
  };

  const wishListMap = () => {
    if (wishListItems === 'User wishlist is empty') {
      return (
        <div className="orders">
          <p>No Items Added To Your Wishist</p>
        </div>
      );
    }

    return wishListItems.map((item) => {
      return (
        <div className="wishlist__item">
          <ItemCard props={item} additional={addAndDeleteButtons(item._id)} />
        </div>
      );
    });
  };

  return <div className="wishlist__list">{wishListMap()}</div>;
};

const Wishlist = () => {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist);

  //Update state if length of wishlist changes
  useEffect(() => {
    dispatch(getWishList());
  }, [wishlist.length]);

  return (
    <div className="wishlist">
      <h1 className="wishlist__title">Wishlist</h1>
      <WishlistItems itemList={wishlist} />
    </div>
  );
};

export default Wishlist;
