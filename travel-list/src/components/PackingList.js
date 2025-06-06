import { useState } from "react";
import PackingItem from "./PackingItem";

export default function PackingList({
  items,
  deleteHandler,
  packedHandler,
  clearHandler,
}) {
  const sortOptions = [
    { name: "sort by input order", field: "id" },
    { name: "sort by description", field: "description" },
    { name: "sort by packed status", field: "packed" },
  ];
  const [sortOption, setSortOption] = useState(0);

  items.sort((a, b) => {
    const field = sortOptions[sortOption].field;
    return a[field] === b[field] ? 0 : a[field] > b[field] ? 1 : -1;
  });
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <PackingItem
            key={item.id}
            item={item}
            deleteHandler={() => deleteHandler(item.id)}
            packedHandler={() => packedHandler(item.id)}
          />
        ))}
      </ul>
      <div className="actions">
        <select
          name="sortList"
          value={sortOption}
          onChange={(e) => setSortOption(+e.target.value)}
        >
          {sortOptions.map((opt, index) => (
            <option key={index} value={index}>
              {opt.name}
            </option>
          ))}
        </select>
        <button onClick={clearHandler}>Clear List</button>
      </div>
    </div>
  );
}
