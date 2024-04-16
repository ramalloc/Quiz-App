import React from 'react';

const Result = ({ marks, onRestart }) => {
    return (
        <div>
            {/* Display quiz result */}
            <h2>Quiz Result</h2>
            <p>You achieved {marks} out of 10.</p>
            {/* Button to restart the quiz */}
            <button onClick={onRestart}>Restart</button>
        </div>
    );
};

export default Result;
