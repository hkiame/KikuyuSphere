import React from "react";
import { Link } from "react-router-dom";
import { FaLanguage, FaUsers, FaBook } from "react-icons/fa";

const Intro: React.FC = () => {
  return (
    <div className="container landing-page">
      <section
        className="banner"
        style={{
          background: `url("/assets/banner/banner_kikuyusphere.png") no-repeat center`,
        }}
      ></section>
      <div className="hero">
        <h1 className="display-4 my-4">Explore the Kikuyu Language</h1>
        <p className="lead">
          Embark on a linguistic journey to discover the beauty and richness of
          the Kikuyu language.
        </p>
        <Link to="/register" className="btn btn-lg btn-primary">
          Get Started
        </Link>
      </div>
      <div className="features mt-5 d-flex justify-content-between">
        <div className="feature me-2">
          <h2>
            <FaLanguage className="feature-icon me-2" />
            Learn the Language
          </h2>
          <p>
            Access a wide range of resources to learn and practice Kikuyu, from
            beginner to advanced levels.
          </p>
        </div>
        <div className="feature me-2">
          <h2>
            <FaUsers className="feature-icon me-2" /> Connect with Others
          </h2>
          <p>
            Join a vibrant community of language enthusiasts, share knowledge,
            and engage in conversations.
          </p>
        </div>
        <div className="feature">
          <h2>
            <FaBook className="feature-icon" /> Preserve Culture
          </h2>
          <p>
            Contribute to the preservation of Kikuyu culture by keeping the
            language alive for future generations.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Intro;
