const express = require('express');
const router = express.Router();
const productImgController = require('../controllers/productImg');

router.get('/product/img/:productId', productImgController.getProductMainImage);

module.exports = router;
