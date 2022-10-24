import React from "react";
import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";

const Navbar = () => {
  // cotext to change cart quantity dynamically
  return (
    <div className="sticky top-0 left-0 right-0 z-50 bg-white py-2 bg-opacity-50">
      <div className="navbar-container">
        <p className="logo">
          <Link href="/">Minimalist Keyboards</Link>
        </p>
        <button
          type="button"
          className="cart-icon"
          onClick=""
        >
          <AiOutlineShopping />
          <span className="cart-item-qty">1</span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
