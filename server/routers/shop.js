const express = require('express');
const shopController = require('../controllers/shop');
const router = express.Router();
const auth = require('../middleware/auth');

router.post('/cart/:productId', auth, shopController.addProductsToCart);

router.get('/cart', auth, shopController.showCartItems);

router.patch('/cart/minus/:id', auth, shopController.cartItemMinusOne);

router.patch('/cart/:id', auth, shopController.removeItemFromCart);

router.post('/cart-clearCart', auth, shopController.removeAllItemsFromCart);

router.get('/wishlist', auth, shopController.getWishlist);

router.post('/wishlist/:id', auth, shopController.addToWishlist);

router.patch('/wishlist-remove/:id', auth, shopController.removeFromWishlist);

module.exports = router;
