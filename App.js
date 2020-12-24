import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./headar";
import Product from "./product";
import Cart from "./Cart";
import axios from "axios";
import { Slider } from "antd";

const App = () => {
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);
  const [cart, setCart] = useState([]);
  const [filterp, setFilterp] = useState([]);
  //const [maxPrice,setMaxPrice]=useState();

  useEffect(() => {
    axios
      .get("https://gocode-rn.glitch.me/products")
      .then(function (res) {
        setData(res.data);

        setFilterp([
          res.data.reduce(function (prev, current) {
            return prev.price < current.price ? prev : current;
          }).price,
          res.data.reduce(function (prev, current) {
            return prev.price > current.price ? prev : current;
          }).price,
        ]);

        console.log();

        //setFilterp(0,maxPrice);
      });
  }, []);
  console.log(data);

  function onChange(value) {
    console.log("onChange", value);
  }
  function onAfterChange(value) {
    // setFilterp(value);
    const min = value[0];
    const max = value[1];
    // console.log(data);
    const filterPrice = data.filter((product) => {
      return product.price <= max && product.price >= min;
    });
    setData(filterPrice);
    // console.log(filterp);
  }
  return (
    <div className="App">
      <header className="App-header">
        <Header />
      </header>
      <div className="products">
        <div className="product">
          {data
            .filter(
              (product) =>
                product.price <= filterp[1] && product.price >= filterp[0]
            )
            .map((p) => (
              <Product
                key={p.id}
                title={p.title}
                image={p.image}
                quantity={p.quantity}
                price={p.price}
                addtocart={() => {
                  setCount(count + 1);
                  p.quantity--;
                  const prodInCart = cart.find((prod) => prod.id === p.id);
                  if (!prodInCart) {
                    setCart([...cart, { ...p, count: 1 }]);
                  } else {
                    setCart(
                      cart.map((prod) =>
                        prod.id !== p.id
                          ? prod
                          : { ...prod, count: prod.count + 1 }
                      )
                    );
                  }
                }}
                lessCount={() => {
                  setCount(count - 1);
                }}
              />
            ))}
        </div>
      </div>
      {filterp[0] && filterp[1] ? (
        <Slider
          range
          step={10}
          defaultValue={filterp}
          min={filterp[0]}
          max={filterp[1]}
          onChange={onChange}
          onAfterChange={onAfterChange}
        />
      ) : null}
      <div className="cart">
        <p> cart: {count} </p>
        {cart.map((p, p_index) => (
          <Cart
            key={p.id}
            title={p.title}
            image={p.image}
            quantity={p.quantity}
            price={p.price}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
