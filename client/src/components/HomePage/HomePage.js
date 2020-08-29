import React from 'react';
import VideoPlayer from '../VideoPlayer';
import HeaderGif from '../../imgs/header.gif';
import ImgTwo from '../../imgs/recordStore.jpg';
import ImgThree from '../../imgs/adRowThree.gif';
import ImgThreeTwo from '../../imgs/adRowThreeTwo.gif';
import ImgFour from '../../imgs/adRowFour.jpg';
import GalleryOne from '../../imgs/ads/denimJacket.jpeg';
import GalleryTwo from '../../imgs/ads/airJordan.jpeg';
import GalleryThree from '../../imgs/ads/sweaters.jpeg';
import GalleryFour from '../../imgs/ads/lifestyle.jpg';
import Footer from '../Footer';
import { useHistory } from 'react-router-dom';
import { motion, useViewportScroll, useTransform } from 'framer-motion';

const transition = { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] };

const HomeThreeRow = (props) => {
  return (
    <div className="homePage__three">
      <img src="" alt="" />
      <div className="homePage__three--text"></div>
      <img src="" alt="" />
    </div>
  );
};

const HomePage = () => {
  const history = useHistory();
  const { scrollYProgress } = useViewportScroll();
  const offsetY = useTransform(scrollYProgress, [0, 0.3], [100, 0]);

  return (
    <div
      className="homePage"
      animate={{ opacity: 0 }}
      transition={{ duration: 3, ease: [0.43, 0.13, 0.23, 0.96] }}
    >
      {/* TOP HEADER AND TITLE  */}
      <div className="homePage__main">
        <div className="homePage__header">
          <img className="homePage__header--img" src={HeaderGif} alt="" />
        </div>
        <motion.div
          className="homePage__title"
          animate={{ y: ['300px', '0px'], opacity: [0, 1] }}
          transition={{ duration: 2, ease: [0.43, 0.13, 0.23, 0.96] }}
        >
          <h2>
            Welcome To <br /> The Elites [ ih-leets, ey-leets ]
          </h2>
        </motion.div>
      </div>

      <motion.div
        className="homePage__content homePage__content--one"
        animate={{ opacity: [0, 1] }}
        transition={transition}
      >
        <div className="homePage__text homePage__text--rowOne">
          <h2>Because You Deserve The Best</h2>

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate
            eum sapiente ad, optio quia, quas consequatur libero, tempore
            reiciendis vero itaque aspernatur laboriosam consectetur soluta
            ducimus esse iusto nisi. Consequatur. Lorem ipsum dolor, sit amet
            consectetur adipisicing elit. Est nostrum deserunt, ab provident
            dolorem in, ratione impedit accusamus unde earum tempora eos!
            Facilis accusantium odio veritatis vitae at, repudiandae illum.
          </p>
        </div>
        <div className="homePage__img homePage__img--rowOne">
          <VideoPlayer src="https://vimeo.com/328808373" />
        </div>
      </motion.div>

      <div className="homePage__content homePage__content--two">
        <div className="homePage__img homePage__img--rowTwo">
          <img src={ImgTwo} alt="" />
          <h3 className="homePage__img--text homePage__img--text-1">
            Our Spotify Tunes
          </h3>
        </div>
        <div className="homePage__text homePage__text--rowTwo">
          <h2>Slight Differences Can Trigger Creativity</h2>
          <p>
            A unique space can be created if we opt to surround ourselves with
            superbly designed, user-friendly furniture, as opposed to
            nondescript, ordinary furniture. It is amazing to see how even the
            smallest touches of ingenuity can transform an area into a
            surprisingly refreshing space. Changing our perspective by just that
            extra one degree and creating that "little bit of fun" to be enjoyed
            every day can ultimately lead to a sweeping transformation of an
            entire space.
          </p>
        </div>
      </div>

      <div className="homePage__content homePage__content--three">
        <div className="homePage__img homePage__img--rowThree">
          <img src={ImgThreeTwo} alt="" />
        </div>
        <div className="homePage__text homePage__text--rowThree">
          <h2>Creations By theElites</h2>
          <p>
            There are many instances where direct communication can result in
            unforeseen breakthroughs or where a shared thinking and creative
            process can lead to the emergence of brand-new ideas. 201˚ came
            about in an effort to improve communication among people, thereby
            leading to new business opportunities, and to accommodate
            diversified ways of working. In the process of designing a wide
            range of spaces, our furniture has evolved organically to respond to
            the needs of people who want to work in a particular way and create
            their own unique work spaces.
          </p>
        </div>
        <div className="homePage__img homePage__img--rowThreeTwo">
          <img src={ImgThree} alt="" />
          <h3 className="homePage__img--text homePage__img--text-2">
            About Us
          </h3>
        </div>
      </div>

      <div className="homePage__content homePage__content--two">
        <div className="homePage__img homePage__img--rowFour">
          <img src={ImgFour} alt="" />
        </div>
        <div className="homePage__text homePage__text--rowTwo">
          <h2>Furniture that Interior Designer Dreams Up</h2>
          <p>
            DRAFT is a Tokyo-based design firm specializing in the spatial
            design of offices, retail stores and various commercial buildings.
            After determining the issues that our clients face and visualizing
            the type of people involved, we then create innovative, brand-new
            designs. Our goal is to ensure that all people affiliated with our
            design spaces feel both pleasure and comfort, thereby generating a
            cycle of happiness. We hope to give concrete form to the interesting
            furniture ideas that everyone dreams up.
          </p>
        </div>
      </div>

      <div className="homePage__content homePage__content--four">
        <div className="homePage__text homePage__text--rowFour">
          <h2>" Fashions fade, style is eternal. "</h2>
        </div>
      </div>

      <div className="homePage__content">
        <section className="gallery">
          <div className="gallery__item gallery__item--1">
            <h2>
              New products inspired by the changing working-style and times.
            </h2>
            <p>
              201˚ was designed to create a more flexible and free approach to
              people’s ways of working. In this age, people are called on to be
              creative, regardless of their occupations and industries.
              Achieving change in workplace and work styles is essential to
              business today. Through 201˚, we aim to create a new way of
              working that is not bound by convention.
            </p>
          </div>
          <figure
            className="gallery__item gallery__item--2"
            onClick={() => history.push('products/clothing')}
          >
            <img src={GalleryOne} alt="" />
            <h3 className="gallery__item--text gallery__item--text-1">
              Fashion Inspirations
            </h3>
          </figure>
          <figure
            className="gallery__item gallery__item--3"
            onClick={() => history.push('products/shoes')}
          >
            <img src={GalleryTwo} alt="" />
            <h3 className="gallery__item--text gallery__item--text-2">
              Selected Shoes
            </h3>
          </figure>
          <figure
            className="gallery__item gallery__item--4"
            onClick={() => history.push('products/inspiration')}
          >
            <img src={GalleryThree} alt="" />
            <h3 className="gallery__item--text gallery__item--text-3">
              Fall Prep
            </h3>
          </figure>
          <figure
            className="gallery__item gallery__item--5"
            onClick={() => history.push('products/lifestyle')}
          >
            <img src={GalleryFour} alt="" />
            <h3 className="gallery__item--text gallery__item--text-4">
              Lifestyle
            </h3>
          </figure>

          <button
            className="button button__allProductsLink button__allProductsLink-home gallery__item"
            onClick={() => history.push('products/new')}
          >
            See All Products
          </button>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
