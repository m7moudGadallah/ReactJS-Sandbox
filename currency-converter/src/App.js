// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useEffect, useState } from "react";

export default function App() {
  const [amount, setAmount] = useState("");
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EUR");
  const [output, setOutput] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function exchange({ amount, from, to, reqSignal }) {
      try {
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`,
          { signal: reqSignal }
        );

        if (!res.ok) return 0;

        const data = await res.json();
        console.log(data);
        return data?.rates?.[to] ?? 0;
      } catch (error) {
        if (error.name === "AbortError") return 0;
        else throw error;
      }
    }
    const currAmount = isNaN(Number(amount)) ? 0 : Number(amount);

    if (!currAmount || from === to) {
      setOutput(currAmount);
    } else {
      exchange({
        amount: currAmount,
        from,
        to,
        reqSignal: controller.signal,
      }).then((output) => setOutput(output));
    }

    return () => controller.abort();
  }, [amount, from, to]);

  return (
    <div>
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <select value={from} onChange={(e) => setFrom(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select value={to} onChange={(e) => setTo(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>{output}</p>
    </div>
  );
}
