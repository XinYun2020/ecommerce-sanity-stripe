import React from "react";
import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";
import { Cart } from "./";
import { useStateContext } from "../context/StateContext";

const Navbar = () => {
  // cotext to change cart quantity dynamically
  const { showCart, setShowCart, totalQuantities } = useStateContext();
  return (
    <div className="sticky top-0 left-0 right-0 z-50 bg-white py-2 bg-opacity-50">
      <div className="navbar-container">
        <p className="logo">
          <Link href="/">Minimalist Keyboards</Link>
        </p>
        <button
          type="button"
          className="cart-icon"
          onClick={() => {
            setShowCart(true);
          }}
        >
          <AiOutlineShopping />
          <span className="cart-item-qty">{totalQuantities}</span>
        </button>
        {showCart && <Cart />}
      </div>
    </div>
  );
};

export default Navbar;
