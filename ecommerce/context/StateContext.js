import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]); // fill from localStorage

  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  let foundProduct;
  let index;

  const onAdd = (product, quantity) => {
    // check is the itwm we want to add already in the cart
    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id
    );

    // update state for price and quantity
    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
    // check if the item adding is already in the cart => increment quantity
    if (checkProductInCart) {
      // update cart item with the new quantity (+ newly added quantity)
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id)
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          };
      });
      setCartItems(updatedCartItems);
      // show toast success
    } else {
      // if the item is not yet in the cart
      product.quantity = quantity; // = new quantity

      setCartItems([...cartItems, { ...product }]); // add the new product to the cart
    }
    toast.success(`${quantity} ${product.name} added to the cart.`);
  };

  const onRemove = (product) => {
    foundProduct = cartItems.find((item) => item._id === product._id);
    // array excluding the product we selected
    const newCartItems = cartItems.filter((item) => item._id !== product._id);

    setTotalPrice(
      (prevTotalPrice) =>
        prevTotalPrice - foundProduct.price * foundProduct.quantity
    );
    setTotalQuantities(
      (prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity
    );
    setCartItems(newCartItems); // udpate the cart excluding the selected
  };

  const toggleCartItemQuantity = (id, value) => {
    // get the product & index that we want action on
    foundProduct = cartItems.find((item) => item._id === id);
    index = cartItems.findIndex((product) => product._id === id);
    // include all the items except the one we are on => we need to update this item
    // filter does nto change the original array (splice change the original array and we should never mutate the state)
    const newCartItems = cartItems.filter((item) => item._id !== id);
    // inc / dec action
    if (value === "inc") {
      // update the quantity of the product

      // {...product}: spread all properties of the object, update the quantity of the object
      // access the cart items
      newCartItems.splice(index, 0, {
        ...foundProduct,
        quantity: foundProduct.quantity + 1,
      });
      setCartItems(newCartItems);
      //   setCartItems([
      //     ...newCartItems,
      //     { ...foundProduct, quantity: foundProduct.quantity + 1 },
      //   ]);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
      /* 
        DO NOT MUTATE STATE WITH EQUAL SIGN ALWAYS USE SET 
        cartItems[index] = foundProduct;
      */
    } else if (value === "dec") {
      // only able to dec when the quantity is greater than 1
      if (foundProduct.quantity > 1) {
        // {...product}: spread all properties of the object, update the quantity of the object
        // access the cart items
        newCartItems.splice(index, 0, {
          ...foundProduct,
          quantity: foundProduct.quantity - 1,
        });
        setCartItems(newCartItems);
        // setCartItems([
        //   ...newCartItems,
        //   { ...foundProduct, quantity: foundProduct.quantity - 1 },
        // ]);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
      }
    }
  };

  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };

  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;
      return prevQty - 1;
    });
  };

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        toggleCartItemQuantity,
        onRemove,
      }}
    >
      {children}
    </Context.Provider>
  );
};

// use our own context
export const useStateContext = () => useContext(Context);
