// SingleComponent.js

import React, { useState, useEffect } from 'react';
import '../src/first.css'; // Import the CSS file
import { Typography } from '@mui/material';
const Accordion = ({ title, questions, editable, onEditToggle }) => {
  const [answers, setAnswers] = useState(Array(questions.length).fill('No'));
  const [isEditing, setIsEditing] = useState(false);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false); // Initialize accordion as closed

  const handleRadioChange = (e, index) => {
    const newAnswers = [...answers];
    newAnswers[index] = e.target.value;
    setAnswers(newAnswers);
    setIsEditing(true);
    onEditToggle(newAnswers.every((answer) => answer === 'Yes' || answer === 'NA'));
  };

  const handleInputChange = (e, index) => {
    // Handle input change if needed
  };

  const handleSave = () => {
    setIsEditing(false);
    // Add logic here to save the updated answers or questions
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Add logic here to revert changes or cancel editing
  };

  const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };

  useEffect(() => {
    // Check if all questions in this accordion are set to 'Yes' or 'NA'
    onEditToggle(answers.every((answer) => answer === 'Yes' || answer === 'NA'));
  }, [answers, onEditToggle]);

  return (
    <div className={`accordion ${isAccordionOpen ? 'open' : 'closed'}`}>
      <div className="accordion-header" onClick={toggleAccordion}>
        <h3>{title}</h3>
      </div>
      {isAccordionOpen && (
        <div className="accordion-content">
          <form>
            {questions.map((question, index) => (
              <div key={index} className="question">
                {editable && isEditing ? (
                  <input
                    type="text"
                    value={questions[index]}
                    onChange={(e) => handleInputChange(e, index)}
                  />
                ) : (
                  <p>
                    <strong>Question {index + 1}:</strong> {question}
                  </p>
                )}
                <label>
                  <input
                    type="radio"
                    name={`answer-${index}`}
                    value="Yes"
                    checked={answers[index] === 'Yes'}
                    onChange={(e) => handleRadioChange(e, index)}
                    disabled={!editable} // Disable radio buttons if not editable
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name={`answer-${index}`}
                    value="No"
                    checked={answers[index] === 'No'}
                    onChange={(e) => handleRadioChange(e, index)}
                    disabled={!editable} // Disable radio buttons if not editable
                  />
                  No
                </label>
                <label>
                  <input
                    type="radio"
                    name={`answer-${index}`}
                    value="NA"
                    checked={answers[index] === 'NA'}
                    onChange={(e) => handleRadioChange(e, index)}
                    disabled={!editable} // Disable radio buttons if not editable
                  />
                  NA
                </label>
              </div>
            ))}
          </form>
          {isEditing && (
            <div className="accordion-actions">
              <button onClick={handleSave}>Save</button>
              <button onClick={handleCancel}>Cancel</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const FirstAccordion = () => {
  const [isAccordion2Editable, setIsAccordion2Editable] = useState(false);
  const [isAccordion3Editable, setIsAccordion3Editable] = useState(false);
  const [isAccordion4Editable, setIsAccordion4Editable] = useState(false); // Added Accordion 4 editable state

  const accordionData = [
    {
      title: 'Breakfast Choices',
      questions: ['Do you enjoy cereal for breakfast?',
      'Is toast with jam your morning favorite?',
      'Do you like a hearty omelet to start the day?',
      'Are you a fan of pancakes with syrup?',
      'do u like dosa?'
    ],
      editable: true,
      onEditToggle: setIsAccordion2Editable, // Pass the callback to update Accordion 2
    },
    {
      title: 'Lunch Preferences',
      questions: ['Do you often have a salad for lunch?',
      'Is a sandwich your go-to lunch option?',
      'Do you like a hot bowl of soup for lunch?',
      'Are you a fan of ordering pizza for lunch?',
      'do u like khichadi?'
    ],
      editable: isAccordion2Editable,
      onEditToggle: setIsAccordion3Editable, // Pass the callback to update Accordion 3
    },
    {
      title: 'Dinner Choices',
      questions: ['Do you enjoy cooking dinner at home?',
      'Is dining out at restaurants your dinner preference?',
      'Do you like to try different cuisines for dinner?',
      'Are you a fan of fast food for dinner?',
      'do you like chapati?'
    ],
      editable: isAccordion3Editable,
      onEditToggle: setIsAccordion4Editable, // Pass the callback to update Accordion 4
    },
    {
      title: 'Snack Habits',
      questions: ['Do you often snack on fruit between meals?',
      'Is chocolate your favorite snack?',
      'Do you enjoy chips or crisps as a snack?',
      'Are you a fan of healthy nuts for snacking?',
      'do you like non-vegroll?'
    ],
      editable: isAccordion4Editable,
      onEditToggle: () => {}, // No need to pass a callback for the last accordion
    },
  ];

  return (
    <div className="App"> 
    <Typography
                        variant="h5"
                        component="div"
                        sx={{
                            textAlign: 'center',
                            fontWeight: 'bold',
                            marginBottom: '16px',
                        }}
                    >
                        Food Preferences
                    </Typography>
      {accordionData.map((data, index) => (
        <Accordion
          key={index}
          title={data.title}
          questions={data.questions}
          editable={data.editable}
          onEditToggle={data.onEditToggle}
        />
      ))}
    </div>
  );
};

export default FirstAccordion;
