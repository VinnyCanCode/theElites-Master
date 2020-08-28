const express = require('express');
require('./db/mongoose');
const userRoutes = require('./routers/user');
const productRoutes = require('./routers/product');
const shopRoutes = require('./routers/shop');
const productImgRoutes = require('./routers/productImg');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(express.json());
app.use(cors());
app.use(productRoutes);
app.use(userRoutes);
app.use(shopRoutes);
app.use(productImgRoutes);

module.exports = app;
