import React, { useState, useEffect } from 'react';
import Question from './Question';
import Result from './Result';
import questionsData from '../questions.json';

const QuizContainer = () => {
    // State for managing quiz progress
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Index of the current question
    const [userAnswers, setUserAnswers] = useState([]); // Array to store user's answers
    const [violationCount, setViolationCount] = useState(0); // Count of violations (e.g., tab switching)
    const [isFullScreen, setIsFullScreen] = useState(false); // Flag to track full-screen mode

    // Load saved quiz state from local storage when component mounts
    useEffect(() => {
        const storedQuestionIndex = localStorage.getItem('currentQuestionIndex');
        if (storedQuestionIndex !== null) {
            setCurrentQuestionIndex(parseInt(storedQuestionIndex));
        }

        const storedUserAnswers = localStorage.getItem('userAnswers');
        if (storedUserAnswers !== null) {
            setUserAnswers(JSON.parse(storedUserAnswers));
        }

        const storedViolationCount = localStorage.getItem('violationCount');
        if (storedViolationCount !== null) {
            setViolationCount(parseInt(storedViolationCount));
        }

        // Event listeners to handle visibility and full-screen changes
        const handleVisibilityChange = () => {
            if (document.hidden && !document.fullscreenElement) {
                setViolationCount(prevCount => prevCount + 1); // Increment violation count
            }
        };

        const handleFullScreenChange = () => {
            setIsFullScreen(!!document.fullscreenElement); // Update full-screen mode flag
            if (!document.fullscreenElement) {
                setViolationCount(prevCount => prevCount + 1); // Increment violation count if exiting full-screen mode
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        document.addEventListener('fullscreenchange', handleFullScreenChange);

        // Cleanup function to remove event listeners when component unmounts
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            document.removeEventListener('fullscreenchange', handleFullScreenChange);
        };
    }, []);

    // Function to handle user's answer submission
    const handleAnswerSubmit = (answer) => {
        setUserAnswers([...userAnswers, answer]); // Add user's answer to the array
        setCurrentQuestionIndex(prevIndex => prevIndex + 1); // Move to the next question
        localStorage.setItem('currentQuestionIndex', currentQuestionIndex + 1); // Save the updated index to local storage
    };

    // Function to calculate the quiz result
    const calculateMarks = () => {
        let marks = 0;
        questionsData.forEach((question, index) => {
            if (question.correctAnswer === userAnswers[index]) {
                marks++; // Increment marks for correct answers
            }
        });
        return marks;
    };

    return (
        <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px', textAlign: 'center' }}>
            {/* Display blocker pop-up if not in full-screen mode */}
            {!isFullScreen && (
                <div style={{ position: 'fixed', top: '0', left: '0', right: '0', bottom: '0', background: 'rgba(0, 0, 0, 0.5)', zIndex: '9999' }}>
                    <p>Please enter full-screen mode to take the quiz.</p>
                    <button onClick={() => document.documentElement.requestFullscreen()}>Enter Fullscreen</button>
                </div>
            )}
            {/* Render either the Question or Result component based on quiz progress */}
            {currentQuestionIndex < questionsData.length ? (
                <Question
                    question={`${currentQuestionIndex + 1}. ${questionsData[currentQuestionIndex].question}`} // Numbering the questions
                    options={questionsData[currentQuestionIndex].options}
                    onSubmit={handleAnswerSubmit}
                />
            ) : (
                <Result marks={calculateMarks()} />
            )}
            {/* Display tab switch violation count */}
            {violationCount > 0 && (
                <p style={{ marginTop: '20px' }}>Tab switch violations: {violationCount}</p>
            )}
        </div>
    );
};

export default QuizContainer;
