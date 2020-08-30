import React from 'react';
import HeaderGif from '../imgs/header4.jpg';
import Logo from '../imgs/crown.svg';

const AboutUs = () => {
  return (
    <div className="about">
      {/* TOP HEADER AND TITLE  */}
      <div className="about__main">
        <div className="about__header">
          <img className="about__header--img" src={HeaderGif} alt="" />
          <div className="about__title">
            <h1>What's Your Message? </h1>
            <h1>What's Your Message? </h1>
          </div>
        </div>
      </div>

      <section className="aboutGrid aboutGrid__top">
        <div className="aboutGrid__story">
          <h1>Our Story</h1>
          <h3>"We Create To Design Your Story"</h3>
          <p>
            theElites offer a variety of clothing, shoes, accessories, and
            lifestyle products for everyday life. Our motivation isn't a fashion
            runway in Milan or a storefront in the middle of Times Square. We
            want to inspire the same kids from the same small cities we came
            from - excited about our first pair of Air Force Ones, distressed
            jeans, and retro dad hats.
          </p>
        </div>
        <div className="aboutGrid__ad--1"></div>
        <div className="aboutGrid__storyTwo">
          <p>
            While we are no longer those same kids, we know there are others
            like us. Fueled by a desire to tell the world who they are. To tell
            the world the story they were born to tell. A story of their
            greeatness.
            <br />
            <br />
          </p>
          <p>
            We endeavor to provide style, design, and a lifestyle that serves to
            show you at your best. At your elite.
          </p>
          <p> Welcome to theElites.</p>
        </div>
        <div className="aboutGrid__ad--2"></div>
      </section>

      <section className="aboutGrid aboutGrid__sectionTwo">
        <div className="aboutGrid__ad--3"></div>
        <div className="aboutGrid__competitive">
          <h1>Competitive Fire</h1>
          <h3>"Until It's Empty"</h3>
          <p>
            In every era, there are those that follow trends, those that set the
            trends, and those that compete with those that set the trends. From
            the outset of this venture we vowed to be the ones to always set the
            trends. We don't care to follow nor care to compete with other
            trendsetters. We compete with ourselves. Until there's nothing more
            to give. Until the fire is empty.
          </p>
        </div>
      </section>

      <section className="aboutGrid aboutGrid__sectionThree">
        <div className="aboutGrid__yourStory">
          <h1>Design Story</h1>
          <h3>Making a New Way to Look</h3>
          <p>
            The days of being forced to look and dress in a specific is coming
            to an end, and a new way to look in which people can wear styles of
            their choosing has come to the fore. The way that we live is
            constantly changing, and we believe that to meet the demands of our
            evolving world, a new kind of brand is necessary. Just as fashion
            changes with time, so too do the other creative products that we
            implement into our lives.
          </p>
        </div>
        <div className="aboutGrid__ad--4"></div>
      </section>

      <section className="aboutGrid aboutGrid__sectionFour">
        <div className="aboutGrid__ad--5"></div>
        <div className="aboutGrid__ad--6"></div>
        <div className="aboutGrid__ad--7"></div>
      </section>

      <div className="about__main about__main--sectionFive">
        <div className="aboutGrid__ad--8"></div>
        <div className="about__title about__title--sectionFive">
          <h1>What's Your Message? </h1>
        </div>
      </div>

      <div className="aboutGrid aboutGrid__sectionSix">
        <div className="aboutGrid__sectionSix--top">
          <div className="logo">
            <div className="logo__pic">
              <img src="/crown.png" alt="" />
            </div>
          </div>
          <h1 className="aboutGrid__sectionSix--name">TheElites</h1>
          <p>
            We named our brand theElites. Not because we think we are better
            than or even aim for that. We would like to expand our capabilities,
            our vision, our efforts, our very way of living the the highest
            pinnacle that we can. We want to change the wolrd around us for the
            better - even if only by 1% - to create entirely new "phenomena" in
            the way that we look & live. This idea is central to our naming,
            logo, and our products.
          </p>
        </div>

        <div className="aboutGrid__sectionSix--ceoImg"></div>
        <div className="aboutGrid__sectionSix--ceoDetail">
          <p>Fashion Designer / Creative Director theElites Inc. CEO</p>
          <h3>Stefania Lionetta </h3>
          <p>
            Born in Brooklyn, NYC, Stefania Lionetta established DRAFT Inc. in
            2020. She started activities as a pioneer of fashion design in Los
            Angeles and executed many projects that attracted keen attention. In
            recent years, she has widened the scope of her activity to design
            for everyday fashion design for theElites. She has received numerous
            international design awards, including the Designer of the Year
            Award, Emerging Designer Award, and Business Leader Award. As this
            indicates, she is highly acclaimed internationally as one of the
            world's foremost young designers.
          </p>
          <h5>PRIZES</h5>
          <span>
            <p>Designer of the Year</p>
            <p>Emerging Designer</p>
            <p>Business Leader</p>
          </span>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
