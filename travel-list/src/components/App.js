import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";
import { packingItems } from "../data";
import { useState } from "react";

export default function App() {
  const [items, setItems] = useState(packingItems);

  function handleAddItem(item) {
    item.id =
      items.reduce((acc, curr) => (acc = Math.max(curr.id, acc)), 0) + 1;
    setItems((items) => [...items, item]);
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((x) => x.id !== id));
  }

  function handleClearItemList() {
    window.confirm("Are you sure to delete all items?") && setItems([]);
  }

  function handlePackedCheck(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  const packedCount = items.reduce((acc, curr) => acc + curr.packed, 0);

  return (
    <div className="app">
      <Logo />
      <Form addItemHandler={handleAddItem} />
      <PackingList
        items={items}
        deleteHandler={handleDeleteItem}
        packedHandler={handlePackedCheck}
        clearHandler={handleClearItemList}
      />
      <Stats itemsCount={items.length} packedCount={packedCount} />
    </div>
  );
}
