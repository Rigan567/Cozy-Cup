import React, { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { BsCupHotFill } from "react-icons/bs";
import { NavLink } from "./Header";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const ProductCard = ({ name, id, image, weight, region, price, handler }) => {
  return (
    <div className="card">
      <div className="img_Card">
        <img src={image} />
      </div>
      <aside>
        <h5>{name}</h5>
        <p className="region_P">{region}</p>
        <span>{`${weight} g`}</span>

        <p>{`$ ${price}`}</p>
      </aside>
      <div className="card_btns">
        <Link to={`/productdetails/${id}`}>
          <BsCupHotFill />
          Show Details
        </Link>
        <button
          className="cart_btn"
          onClick={() =>
            handler({ name, price, id, image, weight, region, quantity: 1 })
          }
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

const Products = () => {
  const location = useLocation();
  const [coffee, setCoffee] = useState([]);
  const [filteredCoffee, setFilteredCoffee] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of items per page
  const { region } = useParams();
  const dispatch = useDispatch();

  const fetchCoffee = async () => {
    const res = await fetch("https://fake-coffee-api.vercel.app/api");
    const data = await res.json();
    setCoffee(data);
  };
  useEffect(() => {
    fetchCoffee();
  }, []);
  useEffect(() => {
    if (region) {
      filterCoffee(region);
      setCurrentPage(1);
    } else {
      setFilteredCoffee(coffee);
    }
  }, [region, coffee]);

  const filterCoffee = (region) => {
    if (!region) {
      setFilteredCoffee(coffee);
    } else {
      const filtered = coffee.filter((cof) => cof.region === region);
      setFilteredCoffee(filtered);
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get("search");
    if (searchQuery) {
      if (!isNaN(searchQuery)) {
        filterCoffeeByPrice(searchQuery);
        setCurrentPage(1);
      } else {
        filterCoffeeByName(searchQuery);
        setCurrentPage(1);
      }
    } else {
      filterCoffee(region);
    }
  }, [location.search, region, coffee]);

  const filterCoffeeByName = (query) => {
    const filtered = coffee.filter((cof) =>
      cof.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCoffee(filtered);
  };
  const filterCoffeeByPrice = (query) => {
    const filtered = coffee.filter((cof) => cof.price <= query);
    setFilteredCoffee(filtered);
  };

  // Get current items for the current page
  const indexOfLastItem = currentPage * itemsPerPage; //5
  const indexOfFirstItem = indexOfLastItem - itemsPerPage; //0
  const currentItems = filteredCoffee.slice(indexOfFirstItem, indexOfLastItem); // (0-5)

  //Change Pages
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  //Pagination Component
  const Pagination = ({ itemsPerPage, totalItems, currentPage, paginate }) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
      pageNumbers.push(i);
    }

    return (
      <div>
        <ul className="pagination">
          {pageNumbers.map((number) => (
            <li
              key={number}
              className={`page-item ${currentPage === number ? "active" : ""}`}
            >
              <button className="page-link" onClick={() => paginate(number)}>
                {number}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }; //Pagination Component

  //Manage Cart
  const addToCartHandler = (options) => {
    dispatch({ type: "addToCart", payload: options });
    dispatch({ type: "calculatePrice" });
    toast.success("Added to Cart Successfully!");
  };

  return (
    <div className="products">
      <aside>
        <h1>All Coffee</h1>
        <p>
          {" "}
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error
          architecto non sapiente quos soluta molestiae corporis atque dolorum
          totam possimus, reprehenderit ex magnam hic sunt maxime earum. Sint,
          sequi quibusdam.
        </p>
      </aside>
      <div className="category">
        <NavLink
          to={"/products/Central America"}
          icon={"Central America"}
          active={location.pathname === "/products/Central%20America"}
        />
        <NavLink
          to={"/products/South America"}
          icon={"South America"}
          active={location.pathname === "/products/South%20America"}
        />
        <NavLink
          to={"/products/Africa"}
          icon={"Africa"}
          active={location.pathname === "/products/Africa"}
        />
        <NavLink
          to={"/products/Asia Pacific"}
          icon={"Asia Pacific"}
          active={location.pathname === "/products/Asia%20Pacific"}
        />
      </div>
      <section className="products_container">
        {currentItems.map((cof) => (
          <ProductCard
            key={cof.name}
            id={cof._id}
            name={cof.name}
            image={cof.image_url}
            weight={cof.weight}
            price={cof.price}
            region={cof.region}
            handler={addToCartHandler}
          />
        ))}
      </section>

      <Pagination
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        totalItems={filteredCoffee.length}
        paginate={paginate}
      />
    </div>
  );
};

export default Products;
