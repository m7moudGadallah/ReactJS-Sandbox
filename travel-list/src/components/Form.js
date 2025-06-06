import { useState } from "react";

export default function Form({ addItemHandler }) {
  const initialItem = {
    description: "",
    packed: false,
    quantity: 1,
  };

  const [item, setItem] = useState(initialItem);

  function handleQuantityUpdate(event) {
    const quantity = +event.target.value;
    setItem((item) => ({ ...item, quantity }));
  }

  function handleDescriptionUpdate(event) {
    const description = event.target.value.trim();
    setItem((item) => ({ ...item, description }));
  }

  function isValidToSubmit() {
    if (!item.description) return false;
    return true;
  }

  function handleSubmit(event) {
    event.preventDefault();

    // form validation
    if (!isValidToSubmit()) return;

    addItemHandler(item);

    // Clear the form inputs
    setItem(initialItem);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select
        name="quantity"
        value={item.quantity}
        onChange={handleQuantityUpdate}
      >
        {Array.from({ length: 12 }, (val, index) => (val = index + 1)).map(
          (val, index) => (
            <option key={index} value={val}>
              {val}
            </option>
          )
        )}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={item.description}
        onChange={handleDescriptionUpdate}
      />
      <input
        type="submit"
        value="Add"
        disabled={!isValidToSubmit()}
        className={!isValidToSubmit() ? "submit-btn disabled" : "submit-btn"}
      />
    </form>
  );
}
