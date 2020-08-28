import React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ReactComponent as NinjaTurtleAvatar } from '../imgs/avatar/ninjaTurtle.svg';
import { useEffect } from 'react';
import { logIn, getCart, getCurrentUser, logoutUser } from '../actions';
import { useHistory, Link } from 'react-router-dom';
import history from '../history';

const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser);
  }, [auth]);

  if (!user) {
    return <div className="profile">No user Information</div>;
  }

  const logOutUser = () => {
    dispatch(logoutUser());
  };

  return (
    <div className="profile">
      <h1 className="profile__logIn">Account Info</h1>
      <div className="profile__card">
        <ul className="profile__nav">
          <li className="profile__item">
            <h3>Name:</h3>
            <span className="profile__item--span">{user.name}</span>
          </li>
          <li className="profile__item">
            <h3>Email:</h3>
            <span className="profile__item--span">{user.email}</span>
          </li>
        </ul>
        {/* <button className="button button__editInfo">Edit Info</button> */}
        <Link
          to="/myaccount"
          className="button button__editInfo"
          onClick={() => logOutUser()}
        >
          Sign Out
        </Link>
      </div>
    </div>
  );
};

const LoginPage = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(logIn(email, password));
    dispatch(getCart());
  };

  return (
    <div className="profile">
      <h1 className="profile__logIn">Log In</h1>
      <div className="profile__card">
        <form onSubmit={handleSubmit}>
          <label>
            <h3>Email:</h3>
            <br />
            <input
              type="text"
              value={email}
              className="profile__input"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </label>

          <label>
            <h3>Password:</h3>
            <br />
            <input
              type="text"
              value={password}
              className="profile__input"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <br />
          <br />
          <div className="profile__button">
            <button className="button button__editInfo">Log In</button>
          </div>
        </form>
        <Link to="/signup" className="button button__editInfo">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

const MyAccount = () => {
  const loggedIn = useSelector((state) => state.auth.auth);

  return (
    <div className="myaccount">{loggedIn ? <Profile /> : <LoginPage />}</div>
  );
};

export default MyAccount;
