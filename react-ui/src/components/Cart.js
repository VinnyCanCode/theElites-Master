import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  deleteItemFromCart,
  addItemToCart,
  subtractOneFromQuantity,
} from '../actions';
import CartSizeSelect from './CartSizeSelect';

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const [cartTotal, setCartTotal] = useState(0);
  const dispatch = useDispatch();

  //get CartTotal Price
  useEffect(() => {
    if (!cart) {
      return 0;
    }
    let cartPrices = [];
    // cartPrices = cart.map((item) => cartPrices.push(item.product.price));
    cartPrices = cart.map((item) => item.product.price * item.product.quantity);

    const cartTotal = cartPrices.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);

    return setCartTotal(cartTotal);
  });

  const minusOneFromCart = (itemId, quantity) => {
    if (quantity === 1) {
      return dispatch(deleteItemFromCart(itemId));
    }

    return dispatch(subtractOneFromQuantity(itemId));
  };

  const addToCart = (itemId) => {
    return dispatch(addItemToCart(itemId));
  };

  const deleteFromCart = (itemId) => {
    return dispatch(deleteItemFromCart(itemId));
  };

  const CartItems = cart.map((item) => {
    const prod = item.product;

    return (
      <div className="cart__item">
        <div className="cart__pic">
          <img
            src={`https://theelites.s3.amazonaws.com/${prod.mainPicture}`}
            alt={prod.name}
          />
        </div>
        <div className="cart__name">
          {prod.name}
          <br />
          <br />
          <button
            className="cart__delete"
            onClick={() => deleteFromCart(prod._id)}
          >
            x DELETE
          </button>
        </div>
        <div className="cart__quantity">
          <button
            className="cart__quantityButton"
            onClick={() => minusOneFromCart(prod._id, prod.quantity)}
          >
            -
          </button>
          <h3>{prod.quantity}</h3>
          <button
            className="cart__quantityButton"
            onClick={() => addToCart(prod._id)}
          >
            +
          </button>
        </div>
        <div className="cart__price">${prod.price}</div>
        <CartSizeSelect sizes={prod.size} maxValue={prod.quantity} />
      </div>
    );
  });

  return (
    <div className="cart">
      <div className="cart__title">Shopping Cart</div>
      {CartItems}

      <div className="cart__total">
        <h2>
          Product Total:{' '}
          <span className="cart__total--price"> ${cartTotal}</span>
        </h2>
        <h4 className="cart__description">
          Dear Elite,
          <br />
          We constantly endeavor to live and breathe our mission statement: "We
          exist to inspire others to look, feel and be their best". It’s a
          reminder that our mission encompasses everyone on the planet. <br />
          <br /> Right now, as we face daily reminders of our common humanity,
          our mission remains the same as we respond to the call by helping our
          communities in ways we never have before. <br />
          <br /> Because of this, we have paused all future orders as we focus
          our efforts and our production capabilites to help those on the
          frontlines. Thank you for your patience, understanding, and support
          during these times. We can't wait to see you on the otherside.
          <br />
          <br />
        </h4>
        <button className="cart__purchase">Purchase</button>
      </div>
      <Link to="/products/new" className="cart__continue">
        Continue Shopping
      </Link>
    </div>
  );
};

export default Cart;
