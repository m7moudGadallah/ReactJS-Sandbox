import { questions } from "../data";
import Flashcard from "./Flashcard";

export default function App() {
  return (
    <div className="flashcards">
      {questions.map((question) => (
        <Flashcard
          key={question.id}
          frontSideContent={question.question}
          backSideContent={question.answer}
        />
      ))}
    </div>
  );
}
