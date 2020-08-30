import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectedItem,
  addItemToCart,
  getWishList,
  getCart,
  removeFromWishlist,
  addToWishlist,
} from '../actions';
import { useState } from 'react';
import { ReactComponent as RightArrow } from '../imgs/rightArrow.svg';
import { Link } from 'react-router-dom';
import { createRef } from 'react';
import { useEffect } from 'react';

const ItemDetail = (props) => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.auth);
  const product = useSelector((state) => state.selectedItem);
  const wishlist = useSelector((state) => state.wishlist);
  const cart = useSelector((state) => state.cart);
  const [mainPicture, setMainPicture] = useState();

  if (window.performance) {
    if (performance.navigation.type == 1) {
      alert('This page is reloaded');
    } else {
      alert('This page is not reloaded');
    }
  }

  // Control component level state CSS and Words
  const [cartButtonClass, setCartButtonClass] = useState(
    'button button__itemDetail'
  );
  const [favoriteButtonClass, setFavoriteButtonClass] = useState(
    'button button__itemDetail'
  );
  const [cartButton, setCartButton] = useState('Add To Cart');
  const [favoriteButton, setFavoriteButton] = useState('Favorite');

  // Pull Wishlist State
  useEffect(() => {
    dispatch(getWishList());
  }, [wishlist]);

  // Change Cart Button Once Cart Has Updated Once
  useEffect(() => {
    selectedCartButton();
  }, [cart]);

  // Change Cart Button Once Cart Has Updated Once
  useEffect(() => {
    selectedFavoriteButton();
  }, [wishlist]);

  // IF Product is not sent via props than send url param to action and search for item
  if (!product) {
    dispatch(selectedItem(props.match.params.product));
  }

  // Set Main Picture To Product Once Product is loaded from state
  useEffect(() => {
    if (product) {
      setMainPicture(product.mainPicture);
    }
  }, [product]);

  const addToCart = (itemId) => {
    return dispatch(addItemToCart(itemId));
  };

  const addRemoveFromWishlist = (itemId) => {
    if (typeof wishlist === 'string') {
      return dispatch(addToWishlist(itemId));
    }

    const wishlistOne = wishlist.map((item) => item._id);

    if (wishlistOne.includes(product._id)) {
      return dispatch(removeFromWishlist(itemId));
    }

    return dispatch(addToWishlist(itemId));
  };

  const selectedCartButton = () => {
    const cartIds = cart.map((item) => item.product._id);

    if (cartIds.includes(product._id)) {
      setCartButton('Added To Cart');
      return setCartButtonClass(
        'button button__itemDetail button__itemDetail--selected'
      );
    }
    setCartButton('Add To Cart');
    return setCartButtonClass('button button__itemDetail');
  };

  const selectedFavoriteButton = () => {
    if (typeof wishlist === 'string') {
      setFavoriteButton('Add To Wishlist');
      return setFavoriteButtonClass('button button__itemDetail');
    }

    const wishlistOne = wishlist.map((item) => item._id);

    if (wishlistOne.includes(product._id)) {
      setFavoriteButton('Added To Wishlist');
      return setFavoriteButtonClass(
        'button button__itemDetail button__itemDetail--selected'
      );
    }

    if (!wishlistOne.includes(product._id)) {
      setFavoriteButton('Add To Wishlist');
      return setFavoriteButtonClass(
        'button button__itemDetail button__itemDetail'
      );
    }
  };

  // Image For Item to on card
  const backgroundImage = (pic) => {
    const backgroundImageCSS = {
      background:
        'url(' +
        'https://theelites.s3.amazonaws.com/' +
        pic +
        ') 100%/100% no-repeat',
    };
    return backgroundImageCSS;
  };

  // Map through available sizes of select item
  const sizeArray = product.size || [];

  const sizes = sizeArray.map((size) => (
    <button className="button button__size">{size}</button>
  ));

  // miniCard with item Picture
  const MiniCard = (props) => {
    return (
      <div
        className="itemDetail__cardCarousel--miniCard"
        style={backgroundImage(`${props.pic}`)}
        onClick={() => setMainPicture(props.pic)}
      ></div>
    );
  };

  const itemDetail = () => {
    return (
      <div className="itemDetail">
        <ul className="itemDetail__nav">
          <li>
            <Link to="/products/new">Products</Link>
          </li>
          <li className="itemDetail__nav--svg">
            <RightArrow />
          </li>
          <li>
            <Link to={`/products/${product.mainType}`}>{product.mainType}</Link>
          </li>
          <li className="itemDetail__nav--svg">
            <RightArrow />
          </li>
          <li>{product.name}</li>
        </ul>

        <div className="itemDetail__left">
          <div className="itemDetail__card">
            <img
              src={`https://theelites.s3.amazonaws.com/${mainPicture}`}
              alt=""
            />
          </div>
          <div className="itemDetail__cardCarousel">
            <MiniCard pic={product.mainPicture} />
            <MiniCard pic={product.subPicture1} />
            <MiniCard pic={product.subPicture2} />
            <MiniCard pic={product.subPicture3} />
            <MiniCard pic={product.subPicture4} />
          </div>
        </div>

        {/* RIGHT SIDE OF ITEM DETAIL SCREEN  */}

        <div className="itemDetail__right">
          <div className="itemDetail__name">
            {product.brand} {product.name}
          </div>
          <div className="itemDetail__price">${product.price}</div>
          {'  '}
          <p>
            Available Sizes <span>(size selection made in cart) </span>
          </p>
          <div className="itemDetail__sizes">{sizes}</div>
          <div className="itemDetail__buttons">
            <button
              className={cartButtonClass}
              onClick={() => {
                addToCart(product._id);
                selectedCartButton();
              }}
            >
              {cartButton}
            </button>
            <button
              className={favoriteButtonClass}
              onClick={() => {
                addRemoveFromWishlist(product._id);
                selectedFavoriteButton();
              }}
            >
              {favoriteButton}
              <img
                src="/imgs/clearHeart.png"
                alt=""
                className="wishListHeart wishListHeart__itemDetail"
              />
            </button>
          </div>
          <div className="itemDetail__description">{product.description}</div>
        </div>
      </div>
    );
  };

  return <>{itemDetail()}</>;
};

export default ItemDetail;
