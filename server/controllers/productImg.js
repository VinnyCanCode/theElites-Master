const express = require('express');
const Product = require('../models/product');
// const awsGetImage = require('../util/awsGetImage');

exports.getProductMainImage = async (req, res, next) => {
  const _id = req.params.productId;

  try {
    const product = await Product.findById({ _id });

    if (!product) {
      return res.status(400).send();
    }

    const imgAddress =
      process.env.PRODUCT_ADDRESS + (await product.mainPicture);

    res.status(200).send({ imgAddress });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getProductImages = async (req, res, next) => {};
