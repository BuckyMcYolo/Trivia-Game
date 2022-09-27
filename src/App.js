import "./App.css";
import Questions from "./Questions";
import { useEffect, useState } from "react";
import { nanoid } from "https://cdn.jsdelivr.net/npm/nanoid/nanoid.js";

function App() {
  // The questions displayed on the page
  const [display, setDisplay] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [triviaQuestions, setTriviaQuestions] = useState();
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
              ? { ...item, chooseAnswer: value }
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
    console.log(questionId, value);
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
              return (
                <Questions
                  trivia={triviaQuestions}
                  handleClick={chooseAnswer}
                  key={question.id}
                />
              );
            }))
          }
        </div>
      )}
    </div>
  );
}

export default App;
