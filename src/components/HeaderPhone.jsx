import React, { useState } from "react";
import { NavigationBar } from "./Header";
import { useLocation, useNavigate } from "react-router-dom";
import { BsArrowRightCircle } from "react-icons/bs";
import { useSelector } from "react-redux";

const HeaderPhone = ({
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
    <div className={`navPhone ${menuOpen ? "navPhoneComes" : ""}`}>
      <NavigationBar
        location={location}
        searchOn={searchOn}
        setSearchOn={setSearchOn}
        subMenu={subMenu}
        setSubMenu={setSubMenu}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
        cartItems={cartItems}
      />
      {/* <div>
        <button
          onClick={() => {
            setSubMenu(!subMenu);
            console.log(subMenu);
          }}
        >
          <BsArrowRightCircle />
        </button>
      </div> */}
    </div>
  );
};

export default HeaderPhone;
