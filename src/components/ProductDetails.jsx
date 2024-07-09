import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Products from "./Products";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const dispatch = useDispatch();
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

  const addToCartHandler = (options) => {
    dispatch({ type: "addToCart", payload: options });
    dispatch({ type: "calculatePrice" });
    toast.success("Added to Cart Successfully!");
  };
  return (
    <>
      <div className="productDetails">
        <button id="back" onClick={() => navigate("/products")}>
          <IoMdArrowRoundBack />
        </button>
        {filtercoffeeDetails.map((cof) => (
          <>
            {/* <h1>{`Details of ${cof.name}`}</h1> */}
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
                <p id="grind">{`Grind Option: ${cof.grind_option.join(
                  ", "
                )}`}</p>
                <button
                  className="cart_btn"
                  onClick={() =>
                    addToCartHandler({
                      id: cof._id,
                      name: cof.name,
                      price: cof.price,
                      image: cof.image_url,
                      weight: cof.weight,
                      region: cof.region,
                      quantity: 1,
                    })
                  }
                >
                  <MdOutlineAddShoppingCart />
                </button>
              </section>
            </div>
          </>
        ))}
      </div>
      <Products />
    </>
  );
};
export default ProductDetails;
