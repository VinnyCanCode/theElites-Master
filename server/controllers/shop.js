const express = require('express');
const Product = require('../models/product');
const User = require('../models/user');

exports.addProductsToCart = async (req, res, next) => {
  const _id = req.params.productId;
  const currentUser = req.user;

  try {
    const product = await Product.findById({ _id });

    if (!product) {
      return res.status(404).send();
    }

    await currentUser.addToCart(product);
    await currentUser.save();

    const user = await req.user.populate('cart.items.productId').execPopulate();

    if (!user) {
      return res.status(404).send();
    }

    const products = await user.cart.items.map((item) => {
      return { product: { ...item.productId._doc, quantity: item.quantity } };
    });

    let userProducts = products.map((item) => {
      delete item.product.__v,
        // delete item.product._id,
        delete item.product.mainType,
        delete item.product.gender,
        delete item.product.new,
        delete item.product.onsale;
    });

    res.send(products);
  } catch (error) {
    res.status(500).send();
  }
};

exports.showCartItems = async (req, res, next) => {
  try {
    const user = await req.user.populate('cart.items.productId').execPopulate();

    if (!user) {
      return res.status(404).send();
    }

    const products = await user.cart.items.map((item) => {
      return { product: { ...item.productId._doc, quantity: item.quantity } };
    });

    let userProducts = products.map((item) => {
      delete item.product.__v,
        // delete item.product._id,
        delete item.product.mainType,
        delete item.product.gender,
        delete item.product.new,
        delete item.product.onsale;
    });

    res.send(products);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.cartItemMinusOne = async (req, res, next) => {
  const id = req.params.id;
  const currentUser = req.user;

  try {
    // Populate User Cart
    const user = await currentUser
      .populate('cart.items.productId')
      .execPopulate();

    if (!user) {
      return res.status(404).send();
    }

    // Find Item In Cart
    const itemInCart = user.cart.items.find((item) => item.productId._id == id);
    // Subtract One from Item Quantity
    itemInCart.quantity = itemInCart.quantity - 1;

    // Save User
    await user.save();

    // Find all products
    const products = await user.cart.items.map((item) => {
      return { product: { ...item.productId._doc, quantity: item.quantity } };
    });

    let userProducts = products.map((item) => {
      delete item.product.__v,
        // delete item.product._id,
        delete item.product.mainType,
        delete item.product.gender,
        delete item.product.new,
        delete item.product.onsale;
    });

    // Return Products
    res.send(products);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.removeItemFromCart = async (req, res, next) => {
  try {
    const user = req.user;

    const validProduct = await Product.find({ _id: req.params.id });

    if (!validProduct) {
      res.status(400).send();
    }

    // Returns all items but the item to be removed
    const newCart = await user.cart.items.filter(
      (item) => item.productId.toString() !== req.params.id
    );

    user.cart.items = newCart;
    await user.save();

    const currentUser = await user
      .populate('cart.items.productId')
      .execPopulate();

    if (!currentUser) {
      return res.status(404).send();
    }

    const products = await currentUser.cart.items.map((item) => {
      return { product: { ...item.productId._doc, quantity: item.quantity } };
    });

    let userProducts = products.map((item) => {
      delete item.product.__v,
        // delete item.product._id,
        delete item.product.mainType,
        delete item.product.gender,
        delete item.product.new,
        delete item.product.onsale;
    });

    res.send(products);
  } catch (error) {
    res.status(500).send();
  }
};

exports.removeAllItemsFromCart = async (req, res, next) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(404).send();
    }

    user.clearCart();

    res.send(user);
  } catch (error) {
    res.status(400).send();
  }
};

exports.getWishlist = async (req, res, next) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(400).send('No user found');
    }

    const userWishlist = user.wishlist;
    const userWishListIDs = userWishlist.map((prod) =>
      prod.wishlistProduct.toString()
    );

    if (userWishlist.length === 0) {
      return res.status(200).send('User wishlist is empty');
    }

    const wishlist = await Product.find(
      {},
      { __v: 0, size: 0, mainType: 0, gender: 0, new: 0, onsale: 0 }
    )
      .where('_id')
      .in(userWishListIDs)
      .exec();

    res.status(200).send(wishlist);
  } catch (error) {
    res.status(400).send();
  }
};

exports.addToWishlist = async (req, res, next) => {
  const user = req.user;
  const product = req.params.id.toString();

  try {
    await user.addToWishlist(product);
    await user.save();

    res.status(200).send(user.wishlist);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.removeFromWishlist = async (req, res, next) => {
  const product = req.params.id;

  try {
    const user = await req.user
      .populate('wishlist[0].wishlistProduct')
      .execPopulate();

    const newWishlist = await user.wishlist.filter((item) => {
      return item.wishlistProduct.toString() !== product;
    });

    user.wishlist = newWishlist;
    user.save();

    res.send(user.wishlist);
  } catch (error) {
    res.status(500).send(error);
  }
};
