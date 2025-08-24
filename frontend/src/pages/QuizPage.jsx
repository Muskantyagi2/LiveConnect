import { useState } from "react";
import useAuthUser from "../hooks/useAuthUser";
import { SparklesIcon } from "lucide-react";

const QUIZ_QUESTIONS = {
  Hindi: [
    {
      question: "What is the meaning of 'पुस्तक'?",
      options: ["Book", "Pen", "Table", "Chair"],
      answer: 0,
    },
    {
      question: "Translate 'Water' to Hindi.",
      options: ["दूध", "पानी", "चाय", "नमक"],
      answer: 1,
    },
    {
      question: "What is 'Teacher' in Hindi?",
      options: ["शिक्षक", "डॉक्टर", "इंजीनियर", "छात्र"],
      answer: 0,
    },
    {
      question: "Translate 'Friend' to Hindi.",
      options: ["मित्र", "घर", "किताब", "खाना"],
      answer: 0,
    },
    {
      question: "What is the meaning of 'सूरज'?",
      options: ["Moon", "Star", "Sun", "Cloud"],
      answer: 2,
    },
  ],
  French: [
    {
      question: "What is the meaning of 'Bonjour'?",
      options: ["Goodbye", "Hello", "Please", "Thank you"],
      answer: 1,
    },
    {
      question: "Translate 'Apple' to French.",
      options: ["Pomme", "Banane", "Orange", "Poire"],
      answer: 0,
    },
    {
      question: "What is 'Merci' in English?",
      options: ["Sorry", "Thank you", "Welcome", "Hello"],
      answer: 1,
    },
    {
      question: "Translate 'Book' to French.",
      options: ["Livre", "Stylo", "Table", "Chaise"],
      answer: 0,
    },
    {
      question: "What is the meaning of 'École'?",
      options: ["School", "Home", "Car", "Street"],
      answer: 0,
    },
  ],
  English: [
    {
      question: "What is the synonym of 'Happy'?",
      options: ["Sad", "Joyful", "Angry", "Tired"],
      answer: 1,
    },
    {
      question: "What is the antonym of 'Big'?",
      options: ["Small", "Tall", "Wide", "Long"],
      answer: 0,
    },
    {
      question: "Choose the correct spelling:",
      options: ["Recieve", "Receive", "Receeve", "Receve"],
      answer: 1,
    },
    {
      question: "What is the plural of 'Child'?",
      options: ["Childs", "Children", "Childes", "Childrens"],
      answer: 1,
    },
    {
      question: "Which word means 'quick'?",
      options: ["Slow", "Fast", "Late", "Short"],
      answer: 1,
    },
  ],
};

function getRandomQuestions(language) {
  const all = QUIZ_QUESTIONS[language] || QUIZ_QUESTIONS["English"];
  return [...all].sort(() => Math.random() - 0.5).slice(0, 5);
}

function QuizPage() {
  const { authUser } = useAuthUser();
  const learningLanguage = authUser?.learningLanguage || "English";
  const [questions, setQuestions] = useState(() =>
    getRandomQuestions(learningLanguage)
  );
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);

  function handleOption(idx) {
    if (selected !== null) return;
    setSelected(idx);
    if (idx === questions[current].answer) {
      setScore((s) => s + 1);
    }
    setTimeout(() => {
      if (current === questions.length - 1) {
        setShowResult(true);
      } else {
        setCurrent((c) => c + 1);
        setSelected(null);
      }
    }, 2000);
  }

  function handleRetry() {
    setQuestions(getRandomQuestions(learningLanguage));
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setShowResult(false);
  }

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center p-4">
      <div className="card bg-base-200 w-full max-w-md shadow-xl rounded-2xl">
        <div className="card-body p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">
            Language Quiz
          </h1>
          <div className="mb-4 text-center font-semibold text-lg">
            Score: {score}/{questions.length}
          </div>
          {!showResult ? (
            <>
              <div className="mb-6 text-center text-base font-medium">
                {questions[current].question}
              </div>
              <div className="flex flex-col gap-3">
                {questions[current].options.map((opt, idx) => {
                  let btnClass = "btn-outline";
                  if (selected !== null) {
                    if (
                      selected === questions[current].answer &&
                      idx === selected
                    ) {
                      // Selected and correct
                      btnClass = "btn-success";
                    } else if (
                      selected !== questions[current].answer &&
                      idx === selected
                    ) {
                      // Selected and wrong
                      btnClass = "btn-error";
                    } else if (idx === questions[current].answer) {
                      // Show correct answer
                      btnClass = "btn-success";
                    }
                  }
                  return (
                    <button
                      key={idx}
                      className={`btn w-full text-base rounded-lg transition-all duration-200 ${btnClass}`}
                      onClick={() => handleOption(idx)}
                      disabled={selected !== null}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center gap-6">
              <div className="text-2xl font-bold text-success flex items-center justify-center gap-2">
                <SparklesIcon className="size-7 text-success" />
                You scored {score}/{questions.length} in {learningLanguage}!
              </div>
              <button className="btn btn-primary w-full" onClick={handleRetry}>
                Try Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default QuizPage;
