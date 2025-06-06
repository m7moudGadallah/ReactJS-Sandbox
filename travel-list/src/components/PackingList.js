import PackingItem from "./PackingItem";

export default function PackingList({ items, deleteHandler, packedHandler }) {
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
    </div>
  );
}
