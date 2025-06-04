import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { data } from "./data";

function App() {
  const { pizzas, shop } = data;

  return (
    <div className="container">
      <Header />
      <Menu pizzaList={pizzas} />
      <Footer {...shop} />
    </div>
  );
}

function Header() {
  return (
    <header className="header">
      <h1>Fast React Pizza co.</h1>
    </header>
  );
}

function Menu({ pizzaList }) {
  const loadPizzaList = () => (
    <ul className="pizzas">
      {pizzaList.map((pizza) => (
        <Pizza key={pizza.name} {...pizza} />
      ))}
    </ul>
  );
  return (
    <div className="menu">
      <h2>Our menu</h2>
      {pizzaList?.length ? (
        <>
          {" "}
          <p>
            Authentic italian cuisine. 6 creative dishes to choose from. All
            from our stone oven, all organic, all delicious.
          </p>
          {loadPizzaList()}
        </>
      ) : (
        <p>Sorry, There is no pizza available now!</p>
      )}
    </div>
  );
}

function Footer({ openHour, closeHour }) {
  const hour = new Date().getHours();
  const isOpen = hour >= openHour && hour <= closeHour;

  return (
    <footer className="footer">
      {isOpen ? (
        <Order closeHour={closeHour} />
      ) : (
        <p>
          We're happy to welcome you between {openHour}:00 and {closeHour}:00.
        </p>
      )}
    </footer>
  );
}

function Pizza({ name, ingredients, price, photoName, soldOut }) {
  return (
    <li className={`pizza ${soldOut ? "sold-out" : ""}`}>
      <img src={photoName} alt={name} />
      <div>
        <h3>{name}</h3>
        <p>{ingredients}</p>
        {soldOut ? <span>SOLD OUT</span> : <span>{price}$</span>}
      </div>
    </li>
  );
}

function Order({ closeHour }) {
  return (
    <div className="order">
      <p>We're open until {closeHour}:00. Come visit us or order online.</p>
      <button className="btn">Order</button>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
