export default function getShiftedDate(diff) {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + diff);
  return currentDate;
}