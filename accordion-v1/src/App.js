import { useState } from "react";

export default function App() {
  const faqs = [
    {
      title: "Where are these chairs assembled?",
      text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus.",
    },
    {
      title: "How long do I have to return my chair?",
      text: "Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus.",
    },
    {
      title: "Do you ship to countries outside the EU?",
      text: "Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!",
    },
  ];

  return <Accordion faqs={faqs} />;
}

function Accordion({ faqs }) {
  return (
    <div className="accordion">
      {faqs.map((faq, index) => (
        <AccordionItem
          key={index}
          number={index + 1}
          title={faq.title}
          text={faq.text}
        />
      ))}
    </div>
  );
}

function AccordionItem({ number, title, text }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`item ${isOpen ? "open" : ""}`}
      onClick={() => setIsOpen(!isOpen)}
    >
      <p className="number">{number < 9 ? `0${number}` : `${number}`}</p>
      <h5 className="title">{title}</h5>
      <p className="icon">+</p>
      {isOpen && <p className={"content-box"}>{text}</p>}
    </div>
  );
}
