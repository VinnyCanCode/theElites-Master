import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signUp, getCurrentUser } from '../actions';

const SignUp = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(signUp(name, email, password));
    dispatch(getCurrentUser);
  };

  return (
    <div className="myaccount">
      <div className="profile profile__signup">
        <h1 className="profile__logIn">Sign Up</h1>
        <div className="profile__card">
          <form onSubmit={handleSubmit}>
            <label>
              <h3>Name:</h3>
              <br />
              <input
                type="text"
                value={name}
                className="profile__input"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </label>

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
              <button className="button button__editInfo">Sign Up</button>
            </div>
          </form>
          <br />
          <br />
          <Link to="/myaccount" className="button button__editInfo">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
