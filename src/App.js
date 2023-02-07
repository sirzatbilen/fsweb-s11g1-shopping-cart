import React, { useState } from "react";
import { Route } from "react-router-dom";
import { data } from "./data";
import { ProductContext } from "./contexts/ProductContext";
import { CartContext } from "./contexts/CartContext";
import { useEffect } from "react";

// Bileşenler
import Navigation from "./components/Navigation";
import Products from "./components/Products";
import ShoppingCart from "./components/ShoppingCart";

function App() {
  const [products, setProducts] = useState(data);
  const [cart, setCart] = useState([]);

  const addItem = (item) => {
    setCart([...cart, item]);
    // verilen itemi sepete ekleyin
  };
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const removeItem = (id) => {
    setCart([...cart.filter((item) => item.id !== id)]);
  };

  return (
    <div className="App">
      <ProductContext.Provider value={{ products, addItem }}>
        <CartContext.Provider value={{ cart, removeItem }}>
          <Navigation /*cart={cart}*/ />

          {/* Routelar */}
          <main className="content">
            <Route exact path="/">
              <Products />
            </Route>

            <Route path="/cart">
              <ShoppingCart /*cart={//cart}*/ />
            </Route>
          </main>
        </CartContext.Provider>
      </ProductContext.Provider>
    </div>
  );
}

export default App;
