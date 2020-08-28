import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import history from '../history';

import Header from './Headers/Header';
import Home from './HomePage/Home';
import AboutUs from './AboutUs';
import Contact from './Contact';
import ProductsPage from './ProductsPage';
import Nav from './Nav';
import Sidebar from './Sidebar';
import MyAccount from './MyAccount';
import ItemDetail from './ItemDetail';
import Wishlist from './Wishlist';
import Orders from './Orders';
import Cart from './Cart';

import '../stylesheets/main.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from '../actions';
import { useEffect } from 'react';
import HomeHeader from './Headers/HomeHeader';
import HomePage from './HomePage/HomePage';
import Footer from './Footer';
import SignUp from './SignUp';
import { AnimatePresence } from 'framer-motion';

const App = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.auth);

  // Dispatch getCurrentUser to backend and check if auth checks out
  // If it does, return user and log in auth set to true.
  // If not, no auth accessibility and clear localStorage
  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(getCurrentUser());
    }
  }, []);

  // Every time auth is changed to true (like user sign up), getCurrentUser is ran
  useEffect(() => {
    if (isAuth) {
      dispatch(getCurrentUser());
    }
  }, [isAuth]);

  return (
    <div className="app">
      <Router history={history}>
        <Header />
        <Sidebar />
        <Nav />
        <AnimatePresence initial={false} exitBeforeEnter>
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/about" exact component={AboutUs} />
            <Route path="/contact" exact component={Contact} />
            <Route path="/products/:query" exact component={ProductsPage} />
            <Route path="/product/:product" exact component={ItemDetail} />
            <Route path="/myaccount" exact component={MyAccount} />
            <Route path="/mywishlist" exact component={Wishlist} />
            <Route path="/myorders" exact component={Orders} />
            <Route path="/cart" exact component={Cart} />
            <Route path="/signup" exact component={SignUp} />
          </Switch>
        </AnimatePresence>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
