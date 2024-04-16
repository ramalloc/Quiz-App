import React, { useState, useEffect } from 'react';

const Question = ({ question, options, onSubmit }) => {
    // State to manage the selected option
    const [selectedOption, setSelectedOption] = useState('');

    // Load selected option from local storage when component mounts or when options change
    useEffect(() => {
        const storedSelectedOption = localStorage.getItem('selectedOption');
        if (storedSelectedOption !== null && options.includes(storedSelectedOption)) {
            setSelectedOption(storedSelectedOption);
        }
    }, [options]);

    // Function to handle option selection
    const handleOptionSelect = (option) => {
        setSelectedOption(option); // Update selected option state
        localStorage.setItem('selectedOption', option); // Save selected option to local storage
    };

    // Function to handle form submission
    const handleSubmit = () => {
        onSubmit(selectedOption); // Pass selected option to parent component
    };

    return (
        <div>
            <h3>{question}</h3>
            <ul style={{ listStyleType: 'none', padding: 0, textAlign: 'left' }}>
                {/* Render radio buttons for each option */}
                {options.map((option, index) => (
                    <li key={index} style={{ textAlign: 'left' }}>
                        <label>
                            <input
                                type="radio"
                                value={option}
                                checked={selectedOption === option}
                                onChange={() => handleOptionSelect(option)}
                            />
                            {option}
                        </label>
                    </li>
                ))}
            </ul>
            {/* Button to submit the answer */}
            <button onClick={handleSubmit}>Next</button>
        </div>
    );
};

export default Question;
