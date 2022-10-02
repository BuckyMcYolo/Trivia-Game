import React from "react";

const Questions = (props) => {
  function setAnswer(choice) {
    if (choice === props.userChoice) {
      return "selected";
    } else if (choice !== props.userChoice) {
      return "answers";
    }
  }

  function finalAnswers(choice) {
    const classes = [];

    if (
      choice === props.userChoice &&
      props.userChoice === props.trivia.correct_answer
    ) {
      classes.push("correct_answer");
    } else if (
      choice === props.userChoice &&
      props.userChoice !== props.trivia.correct_answer
    ) {
      classes.push("incorrect_answer");
    } else {
      classes.push("answers_after_click");
    }
    return classes;
  }

  return (
    <div>
      <div className="container">
        <h2
          className="question"
          dangerouslySetInnerHTML={{ __html: props.trivia.question }}
        />
        <span className="btnHolder">
          <button
            disabled={props.showAnswers}
            onClick={() =>
              props.handleClick(
                props.trivia.id,
                props.trivia.answers[0],
                props.trivia.correct_answer
              )
            }
            className={
              props.showAnswers
                ? finalAnswers(props.trivia.answers[0])
                : setAnswer(props.trivia.answers[0])
            }
            dangerouslySetInnerHTML={{
              __html: props.trivia.answers[0],
            }}
          ></button>
          <button
            disabled={props.showAnswers}
            onClick={() =>
              props.handleClick(
                props.trivia.id,
                props.trivia.answers[1],
                props.trivia.correct_answer
              )
            }
            className={
              props.showAnswers
                ? finalAnswers(props.trivia.answers[1])
                : setAnswer(props.trivia.answers[1])
            }
            dangerouslySetInnerHTML={{
              __html: props.trivia.answers[1],
            }}
          />
          <button
            disabled={props.showAnswers}
            onClick={() =>
              props.handleClick(
                props.trivia.id,
                props.trivia.answers[2],
                props.trivia.correct_answer
              )
            }
            className={
              props.showAnswers
                ? finalAnswers(props.trivia.answers[2])
                : setAnswer(props.trivia.answers[2])
            }
            dangerouslySetInnerHTML={{
              __html: props.trivia.answers[2],
            }}
          />
          <button
            disabled={props.showAnswers}
            onClick={() =>
              props.handleClick(
                props.trivia.id,
                props.trivia.answers[3],
                props.trivia.correct_answer
              )
            }
            className={
              props.showAnswers
                ? finalAnswers(props.trivia.answers[3])
                : setAnswer(props.trivia.answers[3])
            }
            dangerouslySetInnerHTML={{ __html: props.trivia.answers[3] }}
          />
        </span>
      </div>
    </div>
  );
};

export default Questions;
