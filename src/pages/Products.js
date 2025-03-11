import React, { useState, useEffect } from "react";
import { Footer, Navbar } from "../components";
import productsData from "../components/product.json"; // Import products.json

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(productsData); // Load products directly from JSON
  }, []);

  return (
    <>
      <Navbar />
      <div className="container">
        <h2 className="my-4">All Products</h2>
        <div className="row">
          {products.map((product) => (
            <div key={product.id} className="col-md-4 mb-4">
              <div className="card">
                <img
                  src={product.image}
                  alt={product.title}
                  className="card-img-top"
                  height="250"
                />
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text">Ksh {product.price}</p>
                  <button className="btn btn-primary">Add to Cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Products;
