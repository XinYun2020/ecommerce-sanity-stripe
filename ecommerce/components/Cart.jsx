import React, { useRef } from "react";
import Link from "next/link";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
  AiOutlineShopping,
} from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import toast from "react-hot-toast";

import { useStateContext } from "../context/StateContext";
import { urlFor } from "../lib/client";
import getStript from "../lib/getStripe";

const Cart = () => {
  const cartRef = useRef();
  const {
    totalPrice,
    totalQuantities,
    cartItems,
    setShowCart,
    toggleCartItemQuantity,
    onRemove,
  } = useStateContext();

  const handleCheckout = async () => {
    // get the instance of the STRIPE promise
    const stripe = await getStript();

    // Create response: make request to the backend
    const response = await fetch("/api/stripe", {
      // can also use axios
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
      // sendign the body with the request
      body: JSON.stringify(cartItems), // passing all the product in the cartItems
    });

    // something is wrong, exit the function
    if (response.statusCode === 500) return;

    // if nothing wrong => we get the data
    const data = await response.json();

    toast.loading("Redirecting...");

    // Create a instance of the checkout
    stripe.redirectToCheckout({ sessionId: data.id });
  };

  return (
    <div
      className="cart-wrapper w-24 bg-white bg-opacity-50 fixed right-0 top-0 z-50 transition-all duration-1000 ease-in-out"
      ref={cartRef}
    >
      <div className="cart-container h-screen w-[415px] bg-white float-right py-10 px-3 relative">
        <button
          type="button"
          className="cart-heading"
          onClick={() => setShowCart(false)}
        >
          <AiOutlineLeft />
          <span className="heading">Your Cart</span>
          <span className="cart-num-items">({totalQuantities} items)</span>
        </button>
        {/* show placeholder if nothing in cart */}
        {cartItems.length < 1 && (
          <div className="empty-cart ">
            <AiOutlineShopping
              size={150}
              className=""
            />
            <h3>Your shopping bag is empty</h3>
            <Link href="/">
              <button
                type="button"
                onClick={() => setShowCart(false)}
                className="btn"
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        )}
        {/* IF HAVE ITEM IN CART */}
        <div className="product-container">
          {cartItems.length >= 1 &&
            cartItems.map((item) => (
              <div
                className="product"
                key={item._id}
              >
                <img
                  src={urlFor(item?.image[0])}
                  className="cart-product-image"
                />
                <div className="item-desc">
                  <div className="flex top">
                    <h5>{item.name}</h5>
                    <h4>{item.price}</h4>
                  </div>
                  <div className="flex bottom">
                    <div>
                      <p className="quantity-desc">
                        <span
                          className="minus"
                          onClick={() =>
                            toggleCartItemQuantity(item._id, "dec")
                          }
                        >
                          <AiOutlineMinus />
                        </span>
                        <span
                          className="num"
                          onClick=""
                        >
                          {item.quantity}
                        </span>
                        <span
                          className="plus"
                          onClick={() =>
                            toggleCartItemQuantity(item._id, "inc")
                          }
                        >
                          <AiOutlinePlus />
                        </span>
                      </p>
                    </div>
                    <button
                      type="button"
                      className="remove-item"
                      onClick={() => onRemove(item)}
                    >
                      <TiDeleteOutline />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {cartItems.length >= 1 && (
          <div className="cart-bottom">
            <div className="total">
              <h3>Subtotal:</h3>
              <h3>${totalPrice}</h3>
            </div>
            <div className="btn-container">
              <button
                type="button"
                className="btn"
                onClick={handleCheckout}
              >
                Pay with Stripe
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
