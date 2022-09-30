import React, { useState } from "react";

const Questions = (props) => {
  const [selected, setSelected] = useState(false);

  const classStyle = {};

  return (
    <div>
      <div className="container">
        <h2
          className="question"
          dangerouslySetInnerHTML={{ __html: props.trivia.question }}
        />
        <span className="btnHolder">
          <button
            onClick={() =>
              props.handleClick(
                props.trivia.id,
                props.trivia.answers[0],
                props.trivia.answers[0]
              )
            }
            className="answers"
            dangerouslySetInnerHTML={{
              __html: props.trivia.answers[0],
            }}
          />
          <button
            onClick={() =>
              props.handleClick(props.trivia.id, props.trivia.answers[1])
            }
            className="answers"
            dangerouslySetInnerHTML={{
              __html: props.trivia.answers[1],
            }}
          />
          <button
            onClick={() =>
              props.handleClick(props.trivia.id, props.trivia.answers[2])
            }
            className="answers"
            dangerouslySetInnerHTML={{
              __html: props.trivia.answers[2],
            }}
          />
          <button
            onClick={() =>
              props.handleClick(props.trivia.id, props.trivia.answers[3])
            }
            className="answers"
            dangerouslySetInnerHTML={{ __html: props.trivia.answers[3] }}
          />
        </span>
      </div>
    </div>
  );
};

export default Questions;
