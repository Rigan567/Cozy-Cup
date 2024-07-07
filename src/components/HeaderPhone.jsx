import React from "react";
import { NavigationBar } from "./Header";
import { useLocation } from "react-router-dom";

const HeaderPhone = () => {
  const location = useLocation();
  return (
    <nav className="navPhone">
      <NavigationBar location={location} />
    </nav>
  );
};

export default HeaderPhone;
