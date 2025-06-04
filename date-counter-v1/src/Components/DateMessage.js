import getShiftedDate from "../Utils/getShiftedDate";

export default function DateMessage({ shift }) {
  let message = "";

  if (shift === 0) message += "Today is ";
  else if (shift > 0) message += `${shift} days from today is `;
  else message += `${-shift} days ago was `;

  message += getShiftedDate(shift).toDateString();

  return <h4>{message}</h4>;
}
