const express = require('express');

const productController = require('../controllers/product');

const router = express.Router();

router.post('/product/addNew', productController.createProduct);

router.get('/products', productController.getAllProducts);

router.get('/products/new', productController.getNew);

router.get('/products/clothing', productController.getAllClothing);

router.get('/products/shoes', productController.getAllShoes);

router.get('/products/accessories', productController.getAllAccessories);

router.get('/products/activewear', productController.getAllActivewear);

router.get('/products/lifestyle', productController.getAllLifestyle);

router.get('/products/inspiration', productController.getAllInspiration);

router.get('/products/all/:searchQuery', productController.searchProducts);

router.get('/product/:id', productController.getProduct);

router.get('/products/:gender', productController.getProductByGender);

router.patch('/product/:id', productController.editProduct);

router.delete('/product/:id', productController.deleteProduct);

module.exports = router;
