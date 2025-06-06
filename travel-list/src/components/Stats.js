export default function Stats({ itemsCount, packedCount, packedPercentage }) {
  return (
    <footer className="stats">
      <em>
        💼 You have {itemsCount} items on your list, and you already packed{" "}
        {packedCount} ({packedPercentage}%)
      </em>
    </footer>
  );
}
