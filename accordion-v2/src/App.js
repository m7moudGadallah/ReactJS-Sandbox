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

  return <Accordion data={faqs} />;
}

function Accordion({ data }) {
  const [currOpened, setCurrOpened] = useState(null);

  function handleOpen(index) {
    index >= 0 &&
      index < data.length &&
      setCurrOpened((s) => (s === index ? null : index));
  }

  return (
    <div className="accordion">
      {data.map((ele, index) => (
        <AccordionItem
          key={index}
          num={index + 1}
          title={ele.title}
          isOpened={currOpened === index}
          openHandler={() => handleOpen(index)}
        >
          {ele.text}
        </AccordionItem>
      ))}
    </div>
  );
}

function AccordionItem({ num, title, isOpened, openHandler, children }) {
  return (
    <div className={`item ${isOpened ? "open" : ""}`} onClick={openHandler}>
      <p className="number">{num < 9 ? `0${num}` : `${num}`}</p>
      <h5 className="title">{title}</h5>
      <p className="icon">{isOpened ? "-" : "+"}</p>
      {isOpened && <div className={"content-box"}>{children}</div>}
    </div>
  );
}
