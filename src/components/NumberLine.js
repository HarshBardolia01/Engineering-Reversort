import React from "react";

function NumberLine(props) {
    const {curC, lowerLimit, upperLimit, from, to, message} = props;

    const numberLine= [];

    for (let i = lowerLimit; i <= upperLimit; i++) {
        if (i === curC) {
            numberLine.push(<div className="numberIsC" key={i}>{i}</div>);
        } else if (i >= from && i <= to) {
            numberLine.push(<div className="numbersHighlighted" key={i}>{i}</div>);
        } else {
            numberLine.push(<div className="numbersNormal" key={i}>{i}</div>);
        }
    }

    return (
        <div className="vertical">
            <h3>{message}</h3>
            <div className="numberLine">{numberLine}</div>
        </div>
    );
}

export default NumberLine;