import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Products from "./Products";

const ProductDetails = () => {
  const navigate = useNavigate();
  const { id_no } = useParams();
  const [coffeeDetails, setCoffeeDetails] = useState([]);
  const [filtercoffeeDetails, setFilterCoffeeDetails] = useState([]);

  const fetchCoffeeById = async () => {
    const res = await fetch("https://fake-coffee-api.vercel.app/api");
    const data = await res.json();
    setCoffeeDetails(data);
  };
  useEffect(() => {
    fetchCoffeeById();
  }, []);

  useEffect(() => {
    if (coffeeDetails.length) {
      filterById(id_no);
    }
  }, [coffeeDetails, id_no]);

  const filterById = (id_no) => {
    const filterId = coffeeDetails.filter((cof) => cof._id === id_no);
    setFilterCoffeeDetails(filterId);
  };
  return (
    <>
      <div className="productDetails">
        <h1>Product Details</h1>
        <button id="back" onClick={() => navigate("/products")}>
          <IoMdArrowRoundBack />
        </button>
        {filtercoffeeDetails.map((cof) => (
          <div key={cof._id}>
            <section>
              <img src={cof.image_url} alt={cof.name} />
            </section>
            <section>
              <h1 id="pro_name">{cof.name}</h1>
              <p>{cof.description}</p>
              <span>{cof.region}</span>
              <h3>{`$ ${cof.price}`}</h3>
              <h4>{`${cof.weight} g`}</h4>
              <p id="flavor">{`Flavor Profile: ${cof.flavor_profile.join(
                ", "
              )}`}</p>
              <p id="grind">{`Grind Option: ${cof.grind_option.join(", ")}`}</p>
              <button className="cart_btn">
                <MdOutlineAddShoppingCart />
              </button>
            </section>
          </div>
        ))}
      </div>
      <Products />
    </>
  );
};
export default ProductDetails;
