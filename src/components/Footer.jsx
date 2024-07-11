import React from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import img from "../assets/images/coffee_top.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
      <section>
        <Link to={"/"}>Home</Link>
        <Link to={"/products"}>Products</Link>
      </section>
      <section>
        <h1>Get In Touch</h1>
        <p>Phone: +880-18XXXXXXX</p>
        <div>
          <a href="https://x.com/">
            <FaXTwitter />
          </a>
          <a href="www.facebook.com">
            <FaFacebook />
          </a>
          <a href="www.instagram.com">
            <FaInstagram />
          </a>
        </div>
      </section>

      <section>
        <img src={img} alt="footer_Coffee_Png" />
      </section>
      <div>
        <p>&copy; 2024 Rigan Paul. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
