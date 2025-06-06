export default function Stats({ itemsCount, packedCount }) {
  const packedPercentage = Math.round((packedCount / itemsCount) * 100);
  return (
    <footer className="stats">
      <em>
        💼 You have {itemsCount} items on your list, and you already packed{" "}
        {packedCount} ({packedPercentage}%)
      </em>
    </footer>
  );
}
