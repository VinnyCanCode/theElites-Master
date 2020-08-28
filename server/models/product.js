const mongoose = require('mongoose');
const validator = require('validator');

const validSubTypes = [
  'Hoodies & Pullovers',
  'Pants & Tights',
  'Jackets & Vests',
  'Tops & T-Shirts',
  'Shorts',
  'Compression & Baselayer',
  'Tracksuits',
  'Socks',
  'Surf & Swimwear',
  'Shoes',
];

const validTypes = [
  'clothing',
  'shoes',
  'accessories',
  'activewear',
  'lifestyle',
  'inspiration',
];

const validSizes = [
  'XS',
  'S',
  'M',
  'L',
  'XL',
  'XXL',
  'XXXL',
  1,
  1.5,
  2,
  3,
  3.5,
  4,
  5,
  5.5,
  6,
  6.5,
  7,
  7.5,
  8,
  9,
  9.5,
  10,
  11,
  11.5,
  12,
  13,
  14,
  14.5,
  15,
  16,
  17,
  18,
  19,
  20,
];

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  brand: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    trim: true,
  },
  color: {
    type: String,
    required: true,
    trim: true,
  },
  mainType: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if (!validTypes.includes(value)) {
        throw new Error('Invalid MainType');
      }
    },
  },
  gender: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if (value !== 'men' && value !== 'women' && value !== 'both') {
        throw new Error('invalid input for gender');
      }
    },
  },
  size: {
    type: Array,
    required: true,
    trim: true,
    uppercase: true,
    validate(value) {
      value.map((size) => {
        if (!validSizes.includes(size)) {
          throw new Error('Invalid Size input');
        }
      });
    },
  },
  new: {
    type: Boolean,
    required: true,
    trim: true,
  },
  onsale: {
    type: Boolean,
    required: true,
    trim: true,
  },
  mainPicture: {
    type: String,
    required: true,
    trim: true,
  },
  subPicture1: { type: String, required: true, trim: true },
  subPicture2: { type: String, required: true, trim: true },
  subPicture3: { type: String, required: true, trim: true },
  subPicture4: { type: String, required: true, trim: true },
  routeID: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
});

productSchema.index({ name: 'text', mainType: 'text', brand: 'text' });

//Capitalize first letter of every word for product names
productSchema.pre('save', async function (next) {
  const product = this;

  product.name = product.name
    .split(' ')
    .map((word) => {
      return word.trim()[0].toUpperCase() + word.slice(1);
    })
    .join(' ');
  next();
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
