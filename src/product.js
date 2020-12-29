import React, { useState } from "react";
import App from "./App";
import "./App";
import "./Cart";

const Product = (props) => {
  const [quantity, setQuantity] = useState(props.quantity);
  return (
    <div>
      <div className="product">
        <h2>{props.title}</h2>
        <div>
          <img className="image" src={props.image} />
        </div>
        <div>quantity: {props.quantity}</div>
        <div>price: {props.price}</div>
        <div>description: {props.description}</div>
        <button onClick={() => props.addtocart()}> + </button>

        <button onClick={() => setQuantity(props.lessCount)}> - </button>
      </div>
    </div>
  );
};

export default Product;
