import React, { useState } from "react";

const Questions = (props) => {
  const [picked, setPicked] = useState();
  const styles = {
    backgroundColor: picked ? "black" : "darkgray",
  };

  const selected = () => {
    setPicked(!picked);
  };

  const pageData = props.trivia.map((item) => {
    // console.log(item.id)
    return (
      <div className="container">
        <h2
          className="question"
          dangerouslySetInnerHTML={{ __html: item.question }}
        />
        <span className="btnHolder">
          <button
            onClick={selected}
            style={styles}
            className="answers"
            dangerouslySetInnerHTML={{ __html: item.answers[0] }}
          ></button>
          <button
            className="answers"
            dangerouslySetInnerHTML={{ __html: item.answers[1] }}
          ></button>{" "}
          <button
            className="answers"
            dangerouslySetInnerHTML={{ __html: item.answers[2] }}
          ></button>{" "}
          <button
            className="answers"
            dangerouslySetInnerHTML={{ __html: item.answers[3] }}
          ></button>
          {/* {item.answers.map((elem) => {
            return (
              <button
                className="answers"
                dangerouslySetInnerHTML={{ __html: elem }}
              ></button>
            );
          })} */}
        </span>
      </div>
    );
  });
  return <div>{pageData}</div>;
};

export default Questions;
