import "./App.css";
import Questions from "./Questions";
import { useEffect, useState } from "react";

function App() {
  // The questions displayed on the page
  const [display, setDisplay] = useState(false);

  const [selected, setSelected] = useState(false);

  const [triviaQuestions, setTriviaQuestions] = useState([]);
  //getting the questions from API and logging them in state

  useEffect(() => {
    fetch(
      "https://opentdb.com/api.php?amount=5&category=11&difficulty=easy&type=multiple"
    )
      .then((response) => response.json())
      .then((data) => {
        const responseQuestions = data.results;
        setTriviaQuestions(responseQuestions);
        console.log(responseQuestions);
      });
  }, []);

  function handleClick() {
    setSelected(!selected);
  }

  //display current questions on page

  function displayQuestionPage() {
    setDisplay(!display);
  }
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
          <Questions trivia={triviaQuestions} click={handleClick} />
        </div>
      )}
    </div>
  );
}

export default App;
