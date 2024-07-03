import React from "react";
import { CiSearch, CiShoppingCart, CiHome } from "react-icons/ci";
import { FaBars } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { AiOutlineProduct } from "react-icons/ai";

const Header = () => {
  return (
    <nav>
      <button className="navBtn">
        <FaBars />
      </button>
      <input type="text" placeholder="Search Here" className="search_Box" />
      <div className="nav_others">
        <Link to={"/"}>
          <CiHome />
        </Link>
        <Link to={"/products"}>
          <AiOutlineProduct />
        </Link>
        <CiSearch />
        <Link to={"/cart"}>
          <CiShoppingCart />
        </Link>
      </div>
    </nav>
  );
};

export default Header;
