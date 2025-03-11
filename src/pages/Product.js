import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Footer, Navbar } from "../components";
import productsData from "../components/product.json"; // Import products.json

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);

  useEffect(() => {
    const foundProduct = productsData.find((p) => p.id === parseInt(id));
    if (foundProduct) {
      setProduct(foundProduct);
      setSimilarProducts(
        productsData.filter(
          (p) => p.category === foundProduct.category && p.id !== foundProduct.id
        )
      );
    }
  }, [id]);

  if (!product) return <p className="text-center">Product not found</p>;

  return (
    <>
      <Navbar />
      <div className="container my-5">
        <div className="row">
          <div className="col-md-6">
            <img
              src={product.image}
              alt={product.title}
              className="img-fluid"
              width="400"
              height="400"
            />
          </div>
          <div className="col-md-6">
            <h4 className="text-uppercase text-muted">{product.category}</h4>
            <h1 className="display-5">{product.title}</h1>
            <h3 className="my-4">Ksh {product.price}</h3>
            <button className="btn btn-outline-dark">Add to Cart</button>
          </div>
        </div>

        <div className="mt-5">
          <h2>Similar Products</h2>
          <div className="row">
            {similarProducts.map((item) => (
              <div key={item.id} className="col-md-3">
                <div className="card">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="card-img-top"
                    height="200"
                  />
                  <div className="card-body text-center">
                    <h6>{item.title.substring(0, 20)}...</h6>
                    <p>Ksh {item.price}</p>
                    <button className="btn btn-dark">Add to Cart</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Product;
