import "./Styles/app.scss";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Home from "./components/Home";
import Cart from "./components/Cart";
import Products from "./components/Products";
import ProductDetails from "./components/ProductDetails";
import HeaderPhone from "./components/HeaderPhone";
import { useState } from "react";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [subMenu, setSubMenu] = useState(false);
  const [searchOn, setSearchOn] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="App">
      <Router>
        <Header
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          subMenu={subMenu}
          setSubMenu={setSubMenu}
          searchOn={searchOn}
          setSearchOn={setSearchOn}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <HeaderPhone
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          subMenu={subMenu}
          setSubMenu={setSubMenu}
          searchOn={searchOn}
          setSearchOn={setSearchOn}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:region" element={<Products />} />
          <Route path="/productdetails/:id_no" element={<ProductDetails />} />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
