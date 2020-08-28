const express = require('express');
const Product = require('../models/product');
const { search } = require('../routers/product');

exports.createProduct = async (req, res, next) => {
  const product = new Product({
    ...req.body,
  });

  try {
    await product.save();
    res.status(201).send(product);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getAllProducts = async (req, res, next) => {
  const products = await Product.find({}, { _id: 0, __v: 0 });

  if (!products) {
    return res.status(500).send('Internal Server Error');
  }

  try {
    res.status(200).send(products);
  } catch (error) {
    res.status(400).send();
  }
};

exports.getNew = async (req, res, next) => {
  let sort = {};
  let query = { new: true };
  let priceRange;

  if (req.query.byPrice) {
    if (req.query.byPrice === '$0 - $25') {
      priceRange = { $lte: 25, $gte: 0 };
    }
    if (req.query.byPrice === '$25 - $50') {
      priceRange = { $lte: 50, $gte: 25 };
    }
    if (req.query.byPrice === '$50 - $100') {
      priceRange = { $lte: 100, $gte: 50 };
    }
    if (req.query.byPrice === '$100 - $150') {
      priceRange = { $lte: 150, $gte: 100 };
    }
    if (req.query.byPrice === '$Over $150') {
      priceRange = { $lte: 1000000000, $gte: 150 };
    }
  }

  if (req.query.sortBy) {
    //Get How to Sort
    const sortBy = req.query.sortBy.split(':')[0];

    // Sort from high to low OR low to high
    const sortFrom = req.query.sortBy.split(':')[1] === 'low' ? 1 : -1;

    // Add to sort object
    sort = { [sortBy]: sortFrom };
  }

  let payload = {
    new: true,
    brand: req.query.byBrand,
    color: req.query.byColor,
    price: req.query.byPrice,
  };
  if (payload.brand && payload.brand.length > 0)
    query.brand = { $in: payload.brand };
  if (payload.color && payload.color.length > 0)
    query.color = { $in: payload.color };
  if (payload.price && payload.price.length > 0) query.price = priceRange;

  try {
    /// RETURN ALL PRODUCTS THAT HAVE A MAINTYPE THAT MATCHES THE SEARCHTERM
    const searchResults = await Product.find(query, { __v: 0 }, { sort });

    if (!searchResults) {
      return res.status(400).send('No results found');
    }

    res.send(searchResults);
  } catch (error) {
    return res.status(500).send();
  }
};

exports.getAllClothing = async (req, res, next) => {
  let sort = {};
  let query = { mainType: 'clothing' };
  let priceRange;

  if (req.query.byPrice) {
    if (req.query.byPrice === '$0 - $25') {
      priceRange = { $lte: 25, $gte: 0 };
    }
    if (req.query.byPrice === '$25 - $50') {
      priceRange = { $lte: 50, $gte: 25 };
    }
    if (req.query.byPrice === '$50 - $100') {
      priceRange = { $lte: 100, $gte: 50 };
    }
    if (req.query.byPrice === '$100 - $150') {
      priceRange = { $lte: 150, $gte: 100 };
    }
    if (req.query.byPrice === '$Over $150') {
      priceRange = { $lte: 1000000000, $gte: 150 };
    }
  }

  if (req.query.sortBy) {
    //Get How to Sort
    const sortBy = req.query.sortBy.split(':')[0];

    // Sort from high to low OR low to high
    const sortFrom = req.query.sortBy.split(':')[1] === 'low' ? 1 : -1;

    // Add to sort object
    sort = { [sortBy]: sortFrom };
  }

  let payload = {
    brand: req.query.byBrand,
    color: req.query.byColor,
    price: req.query.byPrice,
  };
  if (payload.brand && payload.brand.length > 0)
    query.brand = { $in: payload.brand };
  if (payload.color && payload.color.length > 0)
    query.color = { $in: payload.color };
  if (payload.price && payload.price.length > 0) query.price = priceRange;

  try {
    /// RETURN ALL PRODUCTS THAT HAVE A MAINTYPE THAT MATCHES THE SEARCHTERM
    const searchResults = await Product.find(query, { __v: 0 }, { sort });

    if (!searchResults) {
      return res.status(400).send('No results found');
    }

    res.send(searchResults);
  } catch (error) {
    return res.status(500).send();
  }
};

exports.getAllShoes = async (req, res, next) => {
  let sort = {};
  let query = { mainType: 'shoes' };
  let priceRange;

  if (req.query.byPrice) {
    if (req.query.byPrice === '$0 - $25') {
      priceRange = { $lte: 25, $gte: 0 };
    }
    if (req.query.byPrice === '$25 - $50') {
      priceRange = { $lte: 50, $gte: 25 };
    }
    if (req.query.byPrice === '$50 - $100') {
      priceRange = { $lte: 100, $gte: 50 };
    }
    if (req.query.byPrice === '$100 - $150') {
      priceRange = { $lte: 150, $gte: 100 };
    }
    if (req.query.byPrice === '$Over $150') {
      priceRange = { $lte: 1000000000, $gte: 150 };
    }
  }

  if (req.query.sortBy) {
    //Get How to Sort
    const sortBy = req.query.sortBy.split(':')[0];

    // Sort from high to low OR low to high
    const sortFrom = req.query.sortBy.split(':')[1] === 'low' ? 1 : -1;

    // Add to sort object
    sort = { [sortBy]: sortFrom };
  }

  let payload = {
    brand: req.query.byBrand,
    color: req.query.byColor,
    price: req.query.byPrice,
  };
  if (payload.brand && payload.brand.length > 0)
    query.brand = { $in: payload.brand };
  if (payload.color && payload.color.length > 0)
    query.color = { $in: payload.color };
  if (payload.price && payload.price.length > 0) query.price = priceRange;

  try {
    /// RETURN ALL PRODUCTS THAT HAVE A MAINTYPE THAT MATCHES THE SEARCHTERM
    const searchResults = await Product.find(query, { __v: 0 }, { sort });

    if (!searchResults) {
      return res.status(400).send('No results found');
    }

    res.send(searchResults);
  } catch (error) {
    return res.status(500).send();
  }
};

exports.getAllAccessories = async (req, res, next) => {
  let sort = {};
  let query = { mainType: 'accessories' };
  let priceRange;

  if (req.query.byPrice) {
    if (req.query.byPrice === '$0 - $25') {
      priceRange = { $lte: 25, $gte: 0 };
    }
    if (req.query.byPrice === '$25 - $50') {
      priceRange = { $lte: 50, $gte: 25 };
    }
    if (req.query.byPrice === '$50 - $100') {
      priceRange = { $lte: 100, $gte: 50 };
    }
    if (req.query.byPrice === '$100 - $150') {
      priceRange = { $lte: 150, $gte: 100 };
    }
    if (req.query.byPrice === '$Over $150') {
      priceRange = { $lte: 1000000000, $gte: 150 };
    }
  }

  if (req.query.sortBy) {
    //Get How to Sort
    const sortBy = req.query.sortBy.split(':')[0];

    // Sort from high to low OR low to high
    const sortFrom = req.query.sortBy.split(':')[1] === 'low' ? 1 : -1;

    // Add to sort object
    sort = { [sortBy]: sortFrom };
  }

  let payload = {
    brand: req.query.byBrand,
    color: req.query.byColor,
    price: req.query.byPrice,
  };
  if (payload.brand && payload.brand.length > 0)
    query.brand = { $in: payload.brand };
  if (payload.color && payload.color.length > 0)
    query.color = { $in: payload.color };
  if (payload.price && payload.price.length > 0) query.price = priceRange;

  try {
    /// RETURN ALL PRODUCTS THAT HAVE A MAINTYPE THAT MATCHES THE SEARCHTERM
    const searchResults = await Product.find(query, { __v: 0 }, { sort });

    if (!searchResults) {
      return res.status(400).send('No results found');
    }

    res.send(searchResults);
  } catch (error) {
    return res.status(500).send();
  }
};

exports.getAllActivewear = async (req, res, next) => {
  let sort = {};
  let query = { mainType: 'activewear' };
  let priceRange;

  if (req.query.byPrice) {
    if (req.query.byPrice === '$0 - $25') {
      priceRange = { $lte: 25, $gte: 0 };
    }
    if (req.query.byPrice === '$25 - $50') {
      priceRange = { $lte: 50, $gte: 25 };
    }
    if (req.query.byPrice === '$50 - $100') {
      priceRange = { $lte: 100, $gte: 50 };
    }
    if (req.query.byPrice === '$100 - $150') {
      priceRange = { $lte: 150, $gte: 100 };
    }
    if (req.query.byPrice === '$Over $150') {
      priceRange = { $lte: 1000000000, $gte: 150 };
    }
  }

  if (req.query.sortBy) {
    //Get How to Sort
    const sortBy = req.query.sortBy.split(':')[0];

    // Sort from high to low OR low to high
    const sortFrom = req.query.sortBy.split(':')[1] === 'low' ? 1 : -1;

    // Add to sort object
    sort = { [sortBy]: sortFrom };
  }

  let payload = {
    brand: req.query.byBrand,
    color: req.query.byColor,
    price: req.query.byPrice,
  };
  if (payload.brand && payload.brand.length > 0)
    query.brand = { $in: payload.brand };
  if (payload.color && payload.color.length > 0)
    query.color = { $in: payload.color };
  if (payload.price && payload.price.length > 0) query.price = priceRange;

  try {
    /// RETURN ALL PRODUCTS THAT HAVE A MAINTYPE THAT MATCHES THE SEARCHTERM
    const searchResults = await Product.find(query, { __v: 0 }, { sort });

    if (!searchResults) {
      return res.status(400).send('No results found');
    }

    res.send(searchResults);
  } catch (error) {
    return res.status(500).send();
  }
};

exports.getAllLifestyle = async (req, res, next) => {
  let sort = {};
  let query = { mainType: 'lifestyle' };
  let priceRange;

  if (req.query.byPrice) {
    if (req.query.byPrice === '$0 - $25') {
      priceRange = { $lte: 25, $gte: 0 };
    }
    if (req.query.byPrice === '$25 - $50') {
      priceRange = { $lte: 50, $gte: 25 };
    }
    if (req.query.byPrice === '$50 - $100') {
      priceRange = { $lte: 100, $gte: 50 };
    }
    if (req.query.byPrice === '$100 - $150') {
      priceRange = { $lte: 150, $gte: 100 };
    }
    if (req.query.byPrice === '$Over $150') {
      priceRange = { $lte: 1000000000, $gte: 150 };
    }
  }

  if (req.query.sortBy) {
    //Get How to Sort
    const sortBy = req.query.sortBy.split(':')[0];

    // Sort from high to low OR low to high
    const sortFrom = req.query.sortBy.split(':')[1] === 'low' ? 1 : -1;

    // Add to sort object
    sort = { [sortBy]: sortFrom };
  }

  let payload = {
    brand: req.query.byBrand,
    color: req.query.byColor,
    price: req.query.byPrice,
  };
  if (payload.brand && payload.brand.length > 0)
    query.brand = { $in: payload.brand };
  if (payload.color && payload.color.length > 0)
    query.color = { $in: payload.color };
  if (payload.price && payload.price.length > 0) query.price = priceRange;

  try {
    /// RETURN ALL PRODUCTS THAT HAVE A MAINTYPE THAT MATCHES THE SEARCHTERM
    const searchResults = await Product.find(query, { __v: 0 }, { sort });

    if (!searchResults) {
      return res.status(400).send('No results found');
    }

    res.send(searchResults);
  } catch (error) {
    return res.status(500).send();
  }
};

exports.getAllInspiration = async (req, res, next) => {
  let sort = {};
  let query = { mainType: 'inspiration' };
  let priceRange;

  if (req.query.byPrice) {
    if (req.query.byPrice === '$0 - $25') {
      priceRange = { $lte: 25, $gte: 0 };
    }
    if (req.query.byPrice === '$25 - $50') {
      priceRange = { $lte: 50, $gte: 25 };
    }
    if (req.query.byPrice === '$50 - $100') {
      priceRange = { $lte: 100, $gte: 50 };
    }
    if (req.query.byPrice === '$100 - $150') {
      priceRange = { $lte: 150, $gte: 100 };
    }
    if (req.query.byPrice === '$Over $150') {
      priceRange = { $lte: 1000000000, $gte: 150 };
    }
  }

  if (req.query.sortBy) {
    //Get How to Sort
    const sortBy = req.query.sortBy.split(':')[0];

    // Sort from high to low OR low to high
    const sortFrom = req.query.sortBy.split(':')[1] === 'low' ? 1 : -1;

    // Add to sort object
    sort = { [sortBy]: sortFrom };
  }

  let payload = {
    brand: req.query.byBrand,
    color: req.query.byColor,
    price: req.query.byPrice,
  };
  if (payload.brand && payload.brand.length > 0)
    query.brand = { $in: payload.brand };
  if (payload.color && payload.color.length > 0)
    query.color = { $in: payload.color };
  if (payload.price && payload.price.length > 0) query.price = priceRange;

  try {
    /// RETURN ALL PRODUCTS THAT HAVE A MAINTYPE THAT MATCHES THE SEARCHTERM
    const searchResults = await Product.find(query, { __v: 0 }, { sort });

    if (!searchResults) {
      return res.status(400).send('No results found');
    }

    res.send(searchResults);
  } catch (error) {
    return res.status(500).send();
  }
};

exports.getProduct = async (req, res, next) => {
  const routeID = req.params.id;

  try {
    const product = await Product.find({ routeID }, { __v: 0 });

    res.send(product).status(200);
  } catch (error) {
    res.status(400).send();
  }
};

// Get products by gender
// Get ? products by specific gender
exports.getProductByGender = async (req, res, next) => {
  let sort = {};
  let query = {
    gender: req.params.gender,
    new: req.query.prod === 'new' ? true : false,
  };

  let priceRange;

  if (req.query.byPrice) {
    if (req.query.byPrice === '$0 - $25') {
      priceRange = { $lte: 25, $gte: 0 };
    }
    if (req.query.byPrice === '$25 - $50') {
      priceRange = { $lte: 50, $gte: 25 };
    }
    if (req.query.byPrice === '$50 - $100') {
      priceRange = { $lte: 100, $gte: 50 };
    }
    if (req.query.byPrice === '$100 - $150') {
      priceRange = { $lte: 150, $gte: 100 };
    }
    if (req.query.byPrice === '$Over $150') {
      priceRange = { $lte: 1000000000, $gte: 150 };
    }
  }

  if (req.query.sortBy) {
    //Get How to Sort
    const sortBy = req.query.sortBy.split(':')[0];

    // Sort from high to low OR low to high
    const sortFrom = req.query.sortBy.split(':')[1] === 'low' ? 1 : -1;

    // Add to sort object
    sort = { [sortBy]: sortFrom };
  }

  let payload = {
    mainType: req.query.prod,
    brand: req.query.byBrand,
    color: req.query.byColor,
    price: req.query.byPrice,
  };

  if (payload.mainType && payload.mainType.length > 0)
    query.mainType = { $in: payload.mainType };
  if (
    payload.mainType === 'new' &&
    payload.mainType &&
    payload.mainType.length > 0
  ) {
    query.mainType;
  }

  if (payload.brand && payload.brand.length > 0)
    query.brand = { $in: payload.brand };
  if (payload.color && payload.color.length > 0)
    query.color = { $in: payload.color };
  if (payload.price && payload.price.length > 0) query.price = priceRange;

  // If no productType given, fulfill search with gender only
  if (!query.new) {
    delete query.new;

    try {
      const products = await Product.find(query, { _id: 0, __v: 0 }, { sort });
      return res.send(products);
    } catch (error) {
      return res.status(500).send();
    }
  }

  // If ProductType is new
  if (query.new === true) {
    delete query.mainType;
    query.new = true;

    try {
      const products = await Product.find(query, { _id: 0, __v: 0 }, { sort });
      return res.send(products);
    } catch (error) {
      return res.status(500).send();
    }
  }
};

exports.searchProducts = async (req, res, next) => {
  const searchTerm = req.params.searchQuery;
  if (!searchTerm) {
    return res.status(400).send('Invalid Search');
  }

  // console.log(searchTerm);

  try {
    const products = await Product.find(
      { $text: { $search: searchTerm } },
      {
        size: 0,
        gender: 0,
        mainPicture: 0,
        subPicture1: 0,
        subPicture2: 0,
        subPicture3: 0,
        subPicture4: 0,
        __v: 0,
        _id: 0,
        color: 0,
        mainType: 0,
        new: 0,
        onsale: 0,
      }
    ).limit(5);

    return res.status(200).send(products);
  } catch (error) {
    return res.status(500).send();
  }
};

exports.editProduct = async (req, res, next) => {
  requestedUpdates = Object.keys(req.body);
  validUpdates = ['name, brand, price, color, gender, new, onsale'];

  const validRequest = requestedUpdates.filter((update) =>
    validUpdates.includes(requestedUpdates)
  );

  try {
    const _id = req.params.id;
    const product = await Product.findById(_id);

    if (!product) {
      return res.status(400).send('No product found');
    }

    requestedUpdates.forEach((update) => (product[update] = req.body[update]));
    product.save();
    res.send();
  } catch (error) {
    console.log(error);
  }
};

exports.deleteProduct = async (req, res, next) => {
  const _id = req.params.id;

  try {
    const product = await Product.findOneAndDelete(_id);

    if (!product) {
      res.status(404).send();
    }

    res.send(product);
  } catch (error) {
    res.status(500).send();
  }
};
