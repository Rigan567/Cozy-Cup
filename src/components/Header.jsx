import React, { useState } from "react";
import { CiSearch, CiShoppingCart, CiHome } from "react-icons/ci";
import { FaBars } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineProduct } from "react-icons/ai";

const Header = () => {
  const location = useLocation();
  const [searchOn, setSearchOn] = useState(false);

  return (
    <nav>
      <button className="navBtn">
        <FaBars />
      </button>

      <div className="nav_others">
        <input
          type="text"
          placeholder="Search Here"
          className={`search_Box ${searchOn ? "searchOpen" : ""}`}
        />
        <NavLink
          to={"/"}
          icon={<CiHome />}
          active={location.pathname === "/"}
        />

        <NavLink
          to={"/products"}
          icon={<AiOutlineProduct />}
          active={location.pathname === "/products"}
        />
        <button
          className={`search_btn ${searchOn ? "active" : ""}`}
          onClick={() => setSearchOn(!searchOn)}
        >
          <CiSearch />
        </button>
        <NavLink
          to={"/cart"}
          icon={<CiShoppingCart />}
          active={location.pathname === "/cart"}
        />
      </div>
    </nav>
  );
};

export const NavLink = ({ to, icon, active }) => {
  return (
    <Link to={to} className={`nav-link ${active ? `active` : ""}`}>
      {icon}
    </Link>
  );
};

export default Header;
