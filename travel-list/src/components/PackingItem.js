export default function PackingItem({ item, deleteHandler, packedHandler }) {
  const { description, quantity, packed } = item;
  return (
    <li>
      <input type="checkbox" checked={packed} onChange={packedHandler} />
      <span
        style={packed ? { textDecoration: "line-through" } : {}}
      >{`${quantity} ${description}`}</span>
      <button onClick={deleteHandler}>❌</button>
    </li>
  );
}
