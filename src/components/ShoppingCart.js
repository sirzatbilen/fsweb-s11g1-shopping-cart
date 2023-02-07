import React from "react";
import { ScCartCheckout } from "./scParts";
import { useContext } from "react";

// Components
import Item from "./ShoppingCartItem";
import { CartContext } from "../contexts/CartContext";
import { useHistory } from "react-router-dom";

const ShoppingCart = () => {
  const history = useHistory();
  const { cart } = useContext(CartContext);
  const getCartTotal = () => {
    return cart
      .reduce((acc, value) => {
        return acc + value.price;
      }, 0)
      .toFixed(2);
  };

  return (
    <div>
      {cart.map((item) => (
        <Item key={item.id} {...item} />
      ))}

      <ScCartCheckout>
        <p>Total: ${getCartTotal()}</p>
        <button onClick={() => history.push("/")}>Checkout</button>
      </ScCartCheckout>
    </div>
  );
};

export default ShoppingCart;
