import React from "react";
import { Link } from "react-router-dom";

import Button from "../Button";

const HomePage = () => {
  return (
    <div className="home-page">
      <section className="hero">
        <div className="container">
          <div className="hero__content">
            <h1 className="heading text--light">Blood Glucose Diary</h1>
            <p>
              Diabetes is an everlasting battle. Keeping a record of your
              glucose levels will give you the upper hand.
            </p>
            <div className="hero__cta">
              <Link to="/login">
                <Button styleType="inverted">Log in</Button>
              </Link>
              <Link to="/signup">
                <Button>Sign up</Button>
              </Link>
            </div>
          </div>
        </div>

        <img className="hero__hands1" src="/assets/images/hero-hands1.png" />
      </section>
    </div>
  );
};

export default HomePage;
