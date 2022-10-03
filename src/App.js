import Questions from "./Questions";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";

function App() {
  // The questions displayed on the page
  const [display, setDisplay] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [triviaQuestions, setTriviaQuestions] = useState();
  const [showAnswers, setShowAnswers] = useState(false);
  const [restart, setRestart] = useState(false);
  const [score, setScore] = useState(
    JSON.parse(localStorage.getItem("score")) || 0
  );

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
  }, [restart]);

  useEffect(() => {
    localStorage.setItem("score", JSON.stringify(score));
    console.log(localStorage.getItem("score"));
  }, [showAnswers]);

  //display current questions on page
  function displayQuestionPage() {
    setDisplay(!display);
  }

  //set answer to selected
  function chooseAnswer(questionId, value, correctAnswer) {
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
              correctAnswer: correctAnswer,
            },
          ];
    });
  }
  function updateGame() {
    setShowAnswers(true);
    allTimeScore();
  }
  function countCorrectAnswers() {
    const correct = userAnswers.filter(
      (item) => item.correctAnswer === item.chosenAnswer
    );
    return correct.length;
  }
  function allTimeScore() {
    const correct = userAnswers.filter(
      (item) => item.correctAnswer === item.chosenAnswer
    );
    setScore(() => {
      return (correct.length / userAnswers.length) * 100;
    });
  }
  function playAgain() {
    setRestart(!restart);
    setShowAnswers(false);
    setUserAnswers([]);
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
          {" "}
          <p className="scoreP">Last Score: {`${score}%`}</p>
          <h1 className="Main_title">Movie Trivia</h1>
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
                />
              );
            }))
          }
          <span className="after_trivia">
            <button className="submit" onClick={updateGame}>
              Submit Answers
            </button>
            {showAnswers && <h2>You got {countCorrectAnswers()}/5 correct!</h2>}
            {showAnswers && (
              <button className="play_again" onClick={playAgain}>
                Play Again
              </button>
            )}
          </span>
        </div>
      )}
    </div>
  );
}

export default App;
