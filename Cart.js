import React, { useEffect, useState } from "react";
import App from "./App";
import "./App";
import "./product";
import Product from "./product";

function Cart(props) {
  const [cart, setCart] = useState([null]);

  useEffect(() => <Product />, [props.cart]);

  return (
    <div>
      {cart}
      <div className="carts">
        <h2>{props.title}</h2>
        <div>
          <img className="image" src={props.image} />
        </div>

        <button onClick={() => setCart(props.addtocart())}> + </button>

        <button onClick={() => setCart(props.lessCount)}> - </button>
      </div>
      <div>sum: {cart.length}</div>
    </div>
  );
}

export default Cart;
