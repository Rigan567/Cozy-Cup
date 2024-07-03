import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import coffeesample from "../assets/images/coffee_sample.png";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      const res = await fetch("https://api.sampleapis.com/coffee/hot");
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="home">
      <section>
        <Carousel
          showIndicators={false}
          showThumbs={false}
          autoPlay={true}
          infiniteLoop={true}
          showStatus={false}
          interval={3000}
          transitionTime={1000}
        >
          {products.map((product, index) => (
            <div key={index} className="carousel_img">
              <img src={product.image} alt={product.title} />
            </div>
          ))}
        </Carousel>
        <aside>
          <h5>--New Coffee--</h5>
          <h1>The Cozy Cup</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit
            veniam aliquid temporibus, esse cumque sapiente quos? Vitae,
            molestias ipsa. Error debitis inventore reiciendis perspiciatis
            necessitatibus, consequuntur voluptatem quam odit omnis.
          </p>
        </aside>
      </section>

      <section>
        <h5>Who we are !!</h5>
        <p>
          The Cozy Cup Coffee experience is about providing great coffee and
          great cafe hospitality to our loyal customers
        </p>
      </section>
      <article>
        <img src={coffeesample} alt="" />
      </article>
    </div>
  );
};

export default Home;
