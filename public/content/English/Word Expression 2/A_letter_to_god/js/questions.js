/**
 * Questions and exercises for the interactive lesson
 */

// Thinking About the Text questions
const textThinkingQuestions = [
    {
        question: "1. Who does Lencho have complete faith in? Which sentences in the story tell you this?",
        type: "essay"
    },
    {
        question: "2. Why does the postmaster send money to Lencho? Why does he sign the letter 'God'?",
        type: "essay"
    },
    {
        question: "3. Did Lencho try to find out who had sent the money to him? Why/Why not?",
        type: "essay"
    },
    {
        question: "4. Who does Lencho think has taken the rest of the money? What is the irony in the situation?",
        type: "essay",
        hint: "Remember that the irony of a situation is an unexpected aspect of it. An ironic situation is strange or amusing because it is the opposite of what is expected."
    },
    {
        question: "5. Are there people like Lencho in the real world? What kind of a person would you say he is?",
        type: "multiselect",
        options: ["greedy", "naive", "stupid", "ungrateful", "selfish", "comical", "unquestioning"]
    },
    {
        question: "6. There are two kinds of conflict in the story: between humans and nature, and between humans themselves. How are these conflicts illustrated?",
        type: "essay"
    }
];

// Hope exercise data
const hopeExercises = [
    {
        sentence: "1. Will you get the subjects you want to study in college? I hope so.",
        options: [
            "a feeling that something good will probably happen",
            "thinking that this would happen (It may or may not have happened.)",
            "stopped believing that this good thing would happen",
            "wanting something to happen (and thinking it quite possible)",
            "showing concern that what you say should not offend or disturb the other person: a way of being polite",
            "wishing for something to happen, although this is very unlikely"
        ],
        correct: 3
    },
    {
        sentence: "2. I hope you don't mind my saying this, but I don't like the way you are arguing.",
        options: [
            "a feeling that something good will probably happen",
            "thinking that this would happen (It may or may not have happened.)",
            "stopped believing that this good thing would happen",
            "wanting something to happen (and thinking it quite possible)",
            "showing concern that what you say should not offend or disturb the other person: a way of being polite",
            "wishing for something to happen, although this is very unlikely"
        ],
        correct: 4
    },
    {
        sentence: "3. This discovery will give new hope to HIV/AIDS sufferers.",
        options: [
            "a feeling that something good will probably happen",
            "thinking that this would happen (It may or may not have happened.)",
            "stopped believing that this good thing would happen",
            "wanting something to happen (and thinking it quite possible)",
            "showing concern that what you say should not offend or disturb the other person: a way of being polite",
            "wishing for something to happen, although this is very unlikely"
        ],
        correct: 0
    },
    {
        sentence: "4. We were hoping against hope that the judges would not notice our mistakes.",
        options: [
            "a feeling that something good will probably happen",
            "thinking that this would happen (It may or may not have happened.)",
            "stopped believing that this good thing would happen",
            "wanting something to happen (and thinking it quite possible)",
            "showing concern that what you say should not offend or disturb the other person: a way of being polite",
            "wishing for something to happen, although this is very unlikely"
        ],
        correct: 5
    },
    {
        sentence: "5. I called early in the hope of speaking to her before she went to school.",
        options: [
            "a feeling that something good will probably happen",
            "thinking that this would happen (It may or may not have happened.)",
            "stopped believing that this good thing would happen",
            "wanting something to happen (and thinking it quite possible)",
            "showing concern that what you say should not offend or disturb the other person: a way of being polite",
            "wishing for something to happen, although this is very unlikely"
        ],
        correct: 3
    },
    {
        sentence: "6. Just when everybody had given up hope, the fishermen came back, seven days after the cyclone.",
        options: [
            "a feeling that something good will probably happen",
            "thinking that this would happen (It may or may not have happened.)",
            "stopped believing that this good thing would happen",
            "wanting something to happen (and thinking it quite possible)",
            "showing concern that what you say should not offend or disturb the other person: a way of being polite",
            "wishing for something to happen, although this is very unlikely"
        ],
        correct: 2
    }
];

// Relative clause exercises
const relativeClauseExercises = [
    {
        sentences: [
            "I often go to Mumbai.",
            "Mumbai is the commercial capital of India."
        ],
        pronoun: "which",
        answer: "I often go to Mumbai, which is the commercial capital of India."
    },
    {
        sentences: [
            "My mother is going to host a TV show on cooking.",
            "She cooks very well."
        ],
        pronoun: "who",
        answer: "My mother, who cooks very well, is going to host a TV show on cooking."
    },
    {
        sentences: [
            "These sportspersons are going to meet the President.",
            "Their performance has been excellent."
        ],
        pronoun: "whose",
        answer: "These sportspersons, whose performance has been excellent, are going to meet the President."
    },
    {
        sentences: [
            "Lencho prayed to God.",
            "His eyes see into our minds."
        ],
        pronoun: "whose",
        answer: "Lencho prayed to God, whose eyes see into our minds."
    },
    {
        sentences: [
            "This man cheated me.",
            "I trusted him."
        ],
        pronoun: "whom",
        answer: "This man, whom I trusted, cheated me."
    }
];

// Poetry questions
const dustOfSnowQuestions = [
    {
        question: "1. What is a \"dust of snow\"? What does the poet say has changed his mood? How has the poet's mood changed?"
    },
    {
        question: "2. How does Frost present nature in this poem?",
        subQuestions: [
            "(i) What are the birds that are usually named in poems? Do you think a crow is often mentioned in poems? What images come to your mind when you think of a crow?",
            "(ii) Again, what is \"a hemlock tree\"? Why doesn't the poet write about a more 'beautiful' tree such as a maple, or an oak, or a pine?",
            "(iii) What do the 'crow' and 'hemlock' represent — joy or sorrow? What does the dust of snow that the crow shakes off a hemlock tree stand for?"
        ]
    },
    {
        question: "3. Have there been times when you felt depressed or hopeless? Have you experienced a similar moment that changed your mood that day?"
    }
];

const fireAndIceQuestions = [
    {
        question: "1. There are many ideas about how the world will 'end'. Do you think the world will end some day? Have you ever thought what would happen if the sun got so hot that it 'burst', or grew colder and colder?"
    },
    {
        question: "2. For Frost, what do 'fire' and 'ice' stand for? Here are some ideas:",
        options: ["greed", "avarice", "cruelty", "lust", "conflict", "fury", "intolerance", "rigidity", "insensitivity", "coldness", "indifference", "hatred"]
    },
    {
        question: "3. What is the rhyme scheme of the poem? How does it help in bringing out the contrasting ideas in the poem?"
    }
];

// Load Thinking About the Text questions
function loadTextThinkingQuestions() {
    const container = document.getElementById('textQuestions');
    if (!container) {
        console.error('textQuestions container not found');
        return;
    }
    
    let html = '';
    
    textThinkingQuestions.forEach((q, index) => {
        html += `<div class="thinking-question">
            <h3>${q.question}</h3>`;
            
        if (q.hint) {
            html += `<p class="question-hint">${q.hint}</p>`;
        }
        
        if (q.type === 'essay') {
            html += `<textarea class="question-answer" rows="4" placeholder="Write your answer here..."></textarea>`;
        } else if (q.type === 'multiselect') {
            html += `<div class="option-box">`;
            q.options.forEach(option => {
                html += `<label class="option-label">
                    <input type="checkbox" value="${option}"> ${option}
                </label>`;
            });
            html += `</div>`;
        }
        
        html += `</div>`;
    });
    
    html += `<div class="button-container">
        <button class="interactive-btn" onclick="saveTextAnswers()">Save Answers</button>
    </div>`;
    
    // Set the HTML content
    container.innerHTML = html;
    
    // Debug log
    console.log('Thinking About the Text questions loaded');
}

// Save Text Thinking answers
function saveTextAnswers() {
    // In a real implementation, this would save the answers
    showAchievement('Thinking About the Text Completed!');
    score += 25;
    document.getElementById('totalScore').textContent = score;
    
    if (narrator) {
        narrator.speak("Great job analyzing the text! Your answers have been saved.");
    }
}

// Load Hope exercises
function loadHopeExercises() {
    const container = document.getElementById('hopeExercise');
    if (!container) return;
    
    let html = '<h3>Match the sentences in Column A with the meanings of "hope" in Column B:</h3>';
    
    hopeExercises.forEach((exercise, index) => {
        html += `<div class="hope-item" id="hope-${index}">
            <p>${exercise.sentence}</p>
            <div class="hope-options">`;
            
        exercise.options.forEach((option, optIndex) => {
            html += `<div class="hope-option" onclick="selectHopeOption(${index}, ${optIndex})">${option}</div>`;
        });
        
        html += `</div>
        </div>`;
    });
    
    html += `<div class="button-container">
        <button class="interactive-btn" onclick="checkHopeAnswers()">Check Answers</button>
    </div>`;
    
    container.innerHTML = html;
}

// Select Hope option
function selectHopeOption(exerciseIndex, optionIndex) {
    const container = document.getElementById(`hope-${exerciseIndex}`);
    if (!container) return;
    
    // Clear previous selections
    container.querySelectorAll('.hope-option').forEach(option => {
        option.classList.remove('selected');
    });
    
    // Select the clicked option
    container.querySelectorAll('.hope-option')[optionIndex].classList.add('selected');
}

// Check Hope answers
function checkHopeAnswers() {
    let correctCount = 0;
    
    hopeExercises.forEach((exercise, index) => {
        const container = document.getElementById(`hope-${index}`);
        if (!container) return;
        
        const selectedOption = container.querySelector('.hope-option.selected');
        if (!selectedOption) return;
        
        const selectedIndex = Array.from(container.querySelectorAll('.hope-option')).indexOf(selectedOption);
        
        if (selectedIndex === exercise.correct) {
            selectedOption.classList.add('correct');
            correctCount++;
        } else {
            selectedOption.classList.add('incorrect');
            container.querySelectorAll('.hope-option')[exercise.correct].classList.add('correct');
        }
    });
    
    if (correctCount === hopeExercises.length) {
        showAchievement('Hope Exercise Mastered!');
        score += 20;
        document.getElementById('totalScore').textContent = score;
        
        if (narrator) {
            narrator.speak("Perfect! You understand all the different uses of the word 'hope'.");
        }
    } else {
        if (narrator) {
            narrator.speak(`You got ${correctCount} out of ${hopeExercises.length} correct. Review the correct answers highlighted in green.`);
        }
    }
}

// Load Relative Clause exercises
function loadRelativeClauseExercises() {
    const container = document.getElementById('relativeClauseExercise');
    if (!container) return;
    
    let html = `<div class="clause-example">
        <p><strong>Example:</strong></p>
        <p>1. I often go to Mumbai. Mumbai is the commercial capital of India. (which)</p>
        <p style="color: #4caf50;">→ I often go to Mumbai, which is the commercial capital of India.</p>
    </div>`;
    
    relativeClauseExercises.forEach((exercise, index) => {
        html += `<div class="clause-exercise" id="clause-${index}">
            <p>${index + 1}. ${exercise.sentences[0]} ${exercise.sentences[1]} (${exercise.pronoun})</p>
            <input type="text" class="clause-input" placeholder="Join the sentences using ${exercise.pronoun}..." data-answer="${exercise.answer}">
            <div class="clause-feedback"></div>
        </div>`;
    });
    
    html += `<div class="button-container">
        <button class="interactive-btn" onclick="checkClauseAnswers()">Check Answers</button>
    </div>`;
    
    container.innerHTML = html;
}

// Check Relative Clause answers
function checkClauseAnswers() {
    let correctCount = 0;
    
    relativeClauseExercises.forEach((exercise, index) => {
        const input = document.querySelector(`#clause-${index} .clause-input`);
        const feedback = document.querySelector(`#clause-${index} .clause-feedback`);
        
        if (!input || !feedback) return;
        
        const userAnswer = input.value.trim();
        const correctAnswer = input.dataset.answer;
        
        // Simple check - could be improved with more flexible matching
        if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
            input.style.backgroundColor = '#c8e6c9';
            feedback.textContent = '✓ Correct!';
            feedback.style.color = '#4caf50';
            correctCount++;
        } else {
            input.style.backgroundColor = '#ffcdd2';
            feedback.textContent = `✗ Correct answer: ${correctAnswer}`;
            feedback.style.color = '#f44336';
        }
    });
    
    if (correctCount === relativeClauseExercises.length) {
        showAchievement('Relative Clauses Mastered!');
        score += 20;
        document.getElementById('totalScore').textContent = score;
        
        if (narrator) {
            narrator.speak("Excellent! You've mastered relative clauses.");
        }
    } else {
        if (narrator) {
            narrator.speak(`You got ${correctCount} out of ${relativeClauseExercises.length} correct. Review the correct answers.`);
        }
    }
}

// Load Poetry questions
function loadPoetryQuestions() {
    // Load Dust of Snow questions
    const dustContainer = document.getElementById('dustOfSnowQuestions');
    if (dustContainer) {
        let html = '';
        
        dustOfSnowQuestions.forEach((q, index) => {
            html += `<div class="poem-question">
                <h4>${q.question}</h4>`;
                
            if (q.subQuestions) {
                q.subQuestions.forEach(subQ => {
                    html += `<p class="sub-question">${subQ}</p>`;
                });
            }
            
            html += `<textarea class="question-answer" rows="4" placeholder="Write your answer here..."></textarea>
            </div>`;
        });
        
        dustContainer.innerHTML = html;
    }
    
    // Load Fire and Ice questions
    const fireContainer = document.getElementById('fireAndIceQuestions');
    if (fireContainer) {
        let html = '';
        
        fireAndIceQuestions.forEach((q, index) => {
            html += `<div class="poem-question">
                <h4>${q.question}</h4>`;
                
            if (q.options) {
                html += `<div class="option-box">`;
                q.options.forEach(option => {
                    html += `<label class="option-label">
                        <input type="checkbox" value="${option}"> ${option}
                    </label>`;
                });
                html += `</div>`;
            }
            
            html += `<textarea class="question-answer" rows="4" placeholder="Write your answer here..."></textarea>
            </div>`;
        });
        
        fireContainer.innerHTML = html;
    }
}
