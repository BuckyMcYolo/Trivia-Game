import React, { useState } from "react";

const Questions = (props) => {
  props.click ? (className = "green") : (className = "answers");

  return (
    <div>
      {props.trivia.map((item) => {
        return (
          <div className="container">
            <h2
              className="question"
              dangerouslySetInnerHTML={{ __html: item.question }}
            />
            <span className="btnHolder">
              <button
                onClick={props.click}
                className="answers"
                dangerouslySetInnerHTML={{ __html: item.incorrect_answers[0] }}
              />
              <button
                className="answers"
                dangerouslySetInnerHTML={{ __html: item.incorrect_answers[1] }}
              />
              <button
                className="answers"
                dangerouslySetInnerHTML={{ __html: item.incorrect_answers[2] }}
              />
              <button
                className="answers"
                dangerouslySetInnerHTML={{ __html: item.correct_answer }}
              />
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default Questions;
