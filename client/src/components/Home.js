import React from 'react';
import { Helmet } from 'react-helmet';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { sideBarSearchTerm, genSelect } from '../actions';
import { ReactComponent as ClearHeartIcon } from '../imgs/clearHeart.svg';

const TITLE = 'theElites - Home';

const Home = () => {
  const dispatch = useDispatch();

  // Clear sideBarSearchTerm when on home page
  useEffect(() => {
    dispatch(sideBarSearchTerm(''));
    dispatch(genSelect(''));
  }, []);

  return (
    <main className="home">
      <Helmet>
        <title> {TITLE} </title>
      </Helmet>
      <div className="home__ad home__ad--one">
        {' '}
        <h4> NEW GRAPHIC Ts</h4>
      </div>
      {/* <div className="home__ad home__ad--two"></div> */}
      <div className="home__ad home__ad--three">
        <div className="wishListHeart">
          <button className="wishListHeart__button">
            <ClearHeartIcon className="wishListHeart__img" />
          </button>
        </div>
        <h4>
          {' '}
          Adidas Originals LXCON 94 <br /> trainers in white
        </h4>
      </div>

      <div className="home__ad home__ad--four">
        <div className="wishListHeart">
          <button className="wishListHeart__button">
            <ClearHeartIcon className="wishListHeart__img" />
          </button>
        </div>
        <h4>
          Nike Air Max 200 <br /> Vast Grey{' '}
        </h4>
      </div>

      <div className="home__ad home__ad--five"></div>

      <div className="home__ad home__ad--six">
        <div className="home__ad--sixWords">
          <h4>New-In Knitwear</h4>
          <p> Layers. On. Layers</p>
        </div>
      </div>

      <div className="home__ad home__ad--seven">
        <div className="wishListHeart">
          <button className="wishListHeart__button ">
            <ClearHeartIcon className="wishListHeart__img" />
          </button>
        </div>
        <h4>Nike React Infinity</h4>
      </div>

      <div className="home__ad home__ad--eight">
        <h4>
          New-Season <br /> Textures
        </h4>
      </div>
    </main>
  );
};

export default Home;
