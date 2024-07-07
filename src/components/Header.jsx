import React, { useState } from "react";
import { CiSearch, CiShoppingCart, CiHome } from "react-icons/ci";
import { FaBars } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineProduct } from "react-icons/ai";

const Header = () => {
  const location = useLocation();
  const [searchOn, setSearchOn] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/products?search=${searchQuery}`);
    }
    setSearchQuery("");
  };

  return (
    <nav>
      <button className="navBtn">
        <FaBars />
      </button>
      <NavigationBar
        location={location}
        searchOn={searchOn}
        setSearchOn={setSearchOn}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
      />
    </nav>
  );
};

export const NavigationBar = ({
  location,
  searchOn,
  setSearchOn,
  searchQuery,
  setSearchQuery,
  handleSearch,
}) => {
  return (
    <div className="nav_others" id="nav_others">
      <div className={`searchGroup ${searchOn ? "searchOpen" : ""}`}>
        <input
          type="text"
          placeholder="Search Here"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" onClick={handleSearch}>
          Search
        </button>
      </div>
      <NavLink to={"/"} icon={<CiHome />} active={location.pathname === "/"} />

      <NavLink
        to={"/products"}
        icon={<AiOutlineProduct />}
        active={location.pathname === "/products"}
      />
      <button
        className={`search_btn ${searchOn ? "active" : ""}`}
        onClick={() => {
          setSearchOn(!searchOn);
        }}
      >
        <CiSearch />
      </button>
      <NavLink
        to={"/cart"}
        icon={<CiShoppingCart />}
        active={location.pathname === "/cart"}
      />
    </div>
  );
};

export const NavLink = ({ to, icon, active }) => {
  return (
    <Link to={to} className={`nav-link ${active ? "active" : ""}`}>
      {icon}
    </Link>
  );
};

export default Header;
