import React from 'react';
import { useState } from 'react';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [tel, setTel] = useState('');
  const [url, setUrl] = useState('');

  const FormInput = (props) => {
    return (
      <div className="contact__input">
        <input type="text" placeholder={props.placeholder} />
      </div>
    );
  };

  return (
    <div className="contact">
      <div className="contact__title">
        <h1>HELLO.</h1>
      </div>
      <div className="contact__form">
        <h4>Asterisk ( * ) are required items.</h4>
        <FormInput placeholder="*Name" />
        <FormInput placeholder="*Email" />
        <FormInput placeholder="Postal Code" />
        <FormInput placeholder="Tel" />
        <FormInput placeholder="URL" />

        <span>
          <textarea placeholder="*Message" />
        </span>

        <div className="contact__info">
          <p>Contact Info</p>
          <p>TheElites Customer Service </p>
          <h3>347-798-9297 (Toll Free) </h3>
          <p>Open Hours : Mon to Fri: 9:30 a.m. - 5:00 p.m. EST </p>
          <p>Sat, Sun, and Holidays: Closed</p>
        </div>

        <button type="submit" className="button button__contact gallery__item">
          Confirm
        </button>
      </div>
    </div>
  );
};

export default Contact;
