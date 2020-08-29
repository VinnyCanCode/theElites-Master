import React from 'react';
import { ReactComponent as InstagramIcon } from '../imgs/instagram.svg';
import { ReactComponent as PinterestIcon } from '../imgs/pinterest.svg';
import { ReactComponent as UpArrowIcon } from '../imgs/upArrow.svg';
import { useHistory } from 'react-router-dom';

const Footer = () => {
  const history = useHistory();

  return (
    <footer className="footer">
      <nav className="footer__nav">
        <div className="footer__nav--left">
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramIcon
              className="footer__icon footer__icon--ig"
              fill="red"
            />
          </a>
          <a
            href="https://www.pinterest.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <PinterestIcon className="footer__icon footer__icon--pin" />
          </a>
        </div>
        <div className="footer__nav--right">
          <a href="#">
            <UpArrowIcon className="footer__icon footer__icon--up" />
          </a>
        </div>
      </nav>

      <div className="footer__center">
        <h2>Want to Know More About Us?</h2>
        <h2 onClick={() => history.push('/contact')}>Get In Touch</h2>

        <p>Privacy Policy | ©theElites</p>
      </div>
    </footer>
  );
};

export default Footer;
