import React, { useState, useEffect } from "react";
import { Footer, Navbar } from "../components";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  const addItem = (product) => {
    const updatedCart = cart.map((item) =>
      item.id === product.id ? { ...item, qty: item.qty + 1 } : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeItem = (product) => {
    let updatedCart = cart
      .map((item) =>
        item.id === product.id ? { ...item, qty: item.qty - 1 } : item
      )
      .filter((item) => item.qty > 0); // Remove if qty is 0

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const EmptyCart = () => (
    <div className="container text-center">
      <h4 className="p-3 display-5">Your Cart is Empty</h4>
      <Link to="/" className="btn btn-outline-dark mx-4">
        <i className="fa fa-arrow-left"></i> Continue Shopping
      </Link>
    </div>
  );

  const ShowCart = () => {
    let subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
    let shipping = 30.0;
    let totalItems = cart.reduce((acc, item) => acc + item.qty, 0);

    return (
      <section className="h-100 gradient-custom">
        <div className="container py-5">
          <div className="row d-flex justify-content-center my-4">
            <div className="col-md-8">
              <div className="card mb-4">
                <div className="card-header py-3">
                  <h5 className="mb-0">Item List</h5>
                </div>
                <div className="card-body">
                  {cart.map((item) => (
                    <div key={item.id}>
                      <div className="row d-flex align-items-center">
                        <div className="col-lg-3">
                          <img src={item.image} alt={item.title} width={100} height={75} />
                        </div>

                        <div className="col-lg-5">
                          <p><strong>{item.title}</strong></p>
                        </div>

                        <div className="col-lg-4">
                          <div className="d-flex">
                            <button className="btn px-3" onClick={() => removeItem(item)}>
                              <i className="fas fa-minus"></i>
                            </button>
                            <p className="mx-3">{item.qty}</p>
                            <button className="btn px-3" onClick={() => addItem(item)}>
                              <i className="fas fa-plus"></i>
                            </button>
                          </div>
                          <p><strong>{item.qty} x Ksh {item.price}</strong></p>
                        </div>
                      </div>
                      <hr />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card mb-4">
                <div className="card-header bg-light">
                  <h5 className="mb-0">Order Summary</h5>
                </div>
                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      Products ({totalItems}) <span>Ksh {Math.round(subtotal)}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      Shipping <span>Ksh {shipping}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      <strong>Total Amount</strong>
                      <span><strong>Ksh {Math.round(subtotal + shipping)}</strong></span>
                    </li>
                  </ul>

                  <Link to="/checkout" className="btn btn-dark btn-lg btn-block">
                    Go to Checkout
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Cart</h1>
        <hr />
        {cart.length > 0 ? <ShowCart /> : <EmptyCart />}
      </div>
      <Footer />
    </>
  );
};

export default Cart;
