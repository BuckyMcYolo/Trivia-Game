import "./App.css";
import Questions from "./Questions";
import { useEffect, useState } from "react";

function App() {
  // The questions displayed on the page
  const [display, setDisplay] = useState(false);

  const [triviaQuestions, setTriviaQuestions] = useState();
  //getting the questions from API and logging them in state

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&category=11&difficulty=easy")
      .then((response) => response.json())
      .then((data) => {
        const responseQuestions = data.results;
        setTriviaQuestions(responseQuestions);
      });
  }, []);

  //display current questions on page

  function displayQuestionPage() {
    setDisplay(!display);
  }
  return (
    <div className="App">
      {!display && (
        <h1>
          Click here to play!
          <button onClick={displayQuestionPage}>whoop</button>
        </h1>
      )}
      {display && (
        <div>
          <h1>Movie Trivia</h1>
          <ol>
            {triviaQuestions &&
              triviaQuestions.map((item) => {
                console.log(item);
                return (
                  <div>
                    <h3>{item.question}</h3>
                    <p className="answers">{item.correct_answer}</p>
                    <p className="answers">{item.incorrect_answers}</p>
                  </div>
                );
              })}
          </ol>
        </div>
      )}
    </div>
  );
}

export default App;
