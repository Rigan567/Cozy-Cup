import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BsCupHotFill } from "react-icons/bs";

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
        <button className="cart_btn">Add to Cart</button>
      </div>
    </div>
  );
};

const Products = () => {
  const [coffee, setCoffee] = useState([]);
  const [filteredCoffee, setFilteredCoffee] = useState([]);
  const { region } = useParams();

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
        <Link to={"/products/Central America"}>Central America</Link>
        <Link to={"/products/South America"}>South America</Link>
        <Link to={"/products/Africa"}>Africa</Link>
        <Link to={"/products/Asia Pacific"}>Asia Pacific</Link>
      </div>
      <section className="products_container">
        {filteredCoffee.map((cof) => (
          <ProductCard
            key={cof.name}
            id={cof._id}
            name={cof.name}
            image={cof.image_url}
            weight={cof.weight}
            price={cof.price}
            region={cof.region}
          />
        ))}
      </section>
    </div>
  );
};

export default Products;
