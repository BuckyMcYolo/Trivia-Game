import "./App.css";
import Questions from "./Questions";
import { useEffect, useState } from "react";
import { nanoid } from "https://cdn.jsdelivr.net/npm/nanoid/nanoid.js";

function App() {
  // The questions displayed on the page
  const [display, setDisplay] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [triviaQuestions, setTriviaQuestions] = useState();
  const [showAnswers, setShowAnswers] = useState(false);
  const [count, setCount] = useState(0);
  //getting the questions from API and logging them in state

  useEffect(() => {
    fetch(
      "https://opentdb.com/api.php?amount=5&category=11&difficulty=easy&type=multiple"
    )
      .then((response) => response.json())
      .then((data) => {
        const responseQuestions = data.results.map((question) => ({
          ...question,
          id: nanoid(),
          answers: [
            question.correct_answer,
            ...question.incorrect_answers,
          ].sort(() => Math.random() - 0.5),
        }));
        setTriviaQuestions(responseQuestions);
      });
  }, []);
  //display current questions on page

  function displayQuestionPage() {
    setDisplay(!display);
  }

  //set answer to selected
  function chooseAnswer(questionId, value) {
    let foundUserAnswer = userAnswers.find(
      (item) => item.questionId === questionId
    );
    setUserAnswers((prevAnswerState) => {
      return foundUserAnswer
        ? prevAnswerState.map((item) => {
            return item.questionId === questionId
              ? { ...item, chosenAnswer: value }
              : item;
          })
        : [
            ...prevAnswerState,
            {
              questionId: questionId,
              chosenAnswer: value,
            },
          ];
    });
  }

  let questionHTML;
  return (
    <div className="App">
      {!display && (
        <h1 className="title">
          Click here to play!
          <button onClick={displayQuestionPage} className="playBtn">
            Play Now!
          </button>
        </h1>
      )}

      {display && (
        <div>
          <h1>Movie Trivia</h1>
          {
            (questionHTML = triviaQuestions.map((question) => {
              const chosen = userAnswers.find(
                (item) => item.questionId === question.id
              );
              return (
                <Questions
                  isChosen={userAnswers.chosenAnswer}
                  userChoice={chosen && chosen.chosenAnswer}
                  trivia={question}
                  handleClick={chooseAnswer}
                  key={question.id}
                  showAnswers={showAnswers}
                  correct={() => setCount(count + 1)}
                />
              );
            }))
          }
          <button onClick={() => setShowAnswers(true)}>Submit Answers</button>
          {showAnswers && <h2>You got {count}/5 correct!</h2>}
        </div>
      )}
    </div>
  );
}

export default App;
