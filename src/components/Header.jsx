import React, { useState } from "react";
import { CiSearch, CiShoppingCart, CiHome } from "react-icons/ci";
import { FaBars } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineProduct } from "react-icons/ai";
import { useSelector } from "react-redux";

const Header = ({
  menuOpen,
  setMenuOpen,
  subMenu,
  setSubMenu,
  searchOn,
  setSearchOn,
  searchQuery,
  setSearchQuery,
}) => {
  const location = useLocation();
  const { cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/products?search=${searchQuery}`);
    }
    setSearchQuery("");
  };

  return (
    <>
      <button className="navBtn" onClick={() => setMenuOpen(!menuOpen)}>
        <FaBars />
      </button>
      <nav>
        <NavigationBar
          location={location}
          searchOn={searchOn}
          setSearchOn={setSearchOn}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
          subMenu={subMenu}
          setSubMenu={setSubMenu}
          setMenuOpen={setMenuOpen}
          cartItems={cartItems}
        />
      </nav>
    </>
  );
};

export const NavigationBar = ({
  setMenuOpen,
  location,
  searchOn,
  setSearchOn,
  searchQuery,
  setSearchQuery,
  handleSearch,
  subMenu,
  setSubMenu,
  cartItems,
}) => {
  return (
    <div className={`nav_others ${subMenu ? "navOthersExtends" : ""}`}>
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
      <NavLink
        setMenuOpen={setMenuOpen}
        to={"/"}
        icon={<CiHome />}
        active={location.pathname === "/"}
      />

      <NavLink
        setMenuOpen={setMenuOpen}
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
        setMenuOpen={setMenuOpen}
        to={"/cart"}
        icon={<CiShoppingCart />}
        active={location.pathname === "/cart"}
        className="cart_Icon"
      />
      {cartItems?.length > 0 && (
        <p className="cart_count">{cartItems.length}</p>
      )}

      {/* <p>{cartItems.length}</p> */}
    </div>
  );
};

export const NavLink = ({ to, icon, active, setMenuOpen }) => {
  return (
    <Link
      to={to}
      className={`nav-link ${active ? "active" : ""}`}
      onClick={() => setMenuOpen(false)}
    >
      {icon}
    </Link>
  );
};

export default Header;
