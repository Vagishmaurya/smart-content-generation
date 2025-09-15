/**
 * Questions and exercises for the interactive lesson
 */

// Thinking About the Text questions
const textThinkingQuestions = [
    {
        question: "1. Why did such a large number of international leaders attend the inauguration? What did it signify the triumph of?",
        type: "essay"
    },
    {
        question: "2. What does Mandela mean when he says he is "simply the sum of all those African patriots" who had gone before him?",
        type: "essay"
    },
    {
        question: "3. Would you agree that the "depths of oppression" create "heights of character"? How does Mandela illustrate this? Can you add your own examples to this argument?",
        type: "essay"
    },
    {
        question: "4. How did Mandela's understanding of freedom change with age and experience?",
        type: "essay"
    },
    {
        question: "5. How did Mandela's 'hunger for freedom' change his life?",
        type: "essay"
    }
];

// Noun formation exercise data
const nounFormationExercises = [
    {
        verb: "rebel",
        noun: "rebellion"
    },
    {
        verb: "constitute",
        noun: "constitution"
    },
    {
        verb: "govern",
        noun: "government"
    },
    {
        verb: "form",
        noun: "formation"
    },
    {
        verb: "oppress",
        noun: "oppression"
    },
    {
        verb: "emancipate",
        noun: "emancipation"
    },
    {
        verb: "liberate",
        noun: "liberation"
    },
    {
        verb: "discriminate",
        noun: "discrimination"
    }
];

// Noun blank fill exercise
const nounBlankExercises = [
    {
        sentence: "Martin Luther King's ___________ (contribute) to our history as an outstanding leader began when he came to the ___________ (assist) of Rosa Parks, a seamstress who refused to give up her seat on a bus to a white passenger.",
        answers: ["contribution", "assistance"]
    },
    {
        sentence: "In those days American Blacks were confined to positions of second class citizenship by restrictive laws and customs. To break these laws would mean ___________ (subjugate) and ___________ (humiliate) by the police and the legal system.",
        answers: ["subjugation", "humiliation"]
    },
    {
        sentence: "Beatings, ___________ (imprison) and sometimes death awaited those who defied the System. Martin Luther King's tactics of protest involved non-violent ___________ (resist) to racial injustice.",
        answers: ["imprisonment", "resistance"]
    }
];

// Idiomatic expressions exercise
const idiomaticExpressions = [
    {
        phrase: "I was not unmindful of the fact",
        options: [
            "had not forgotten; was aware of the fact",
            "was not careful about the fact",
            "forgot or was not aware of the fact"
        ],
        correct: 0
    },
    {
        phrase: "when my comrades and I were pushed to our limits",
        options: [
            "pushed by the guards to the wall",
            "took more than our share of beatings",
            "felt that we could not endure the suffering any longer"
        ],
        correct: 2
    },
    {
        phrase: "to reassure me and keep me going",
        options: [
            "make me go on walking",
            "help me continue to live in hope in this very difficult situation",
            "make me remain without complaining"
        ],
        correct: 1
    },
    {
        phrase: "the basic and honourable freedoms of...earning my keep,...",
        options: [
            "earning enough money to live on",
            "keeping what I earned",
            "getting a good salary"
        ],
        correct: 0
    }
];

// Balance sentences exercise
const balanceSentencesExercise = [
    {
        start: "It requires such depths of oppression",
        end: "to create such heights of character."
    },
    {
        start: "Courage was not the absence of fear",
        end: "but the triumph over it."
    },
    {
        start: "The brave man is not he who does not feel afraid",
        end: "but he who conquers that fear."
    },
    {
        start: "If people can learn to hate",
        end: "they can be taught to love."
    },
    {
        start: "I was not born with a hunger to be free.",
        end: "I was born free."
    }
];

// Contrast completion exercise
const contrastExercises = [
    {
        start: "For decades the Union Buildings had been the seat of white supremacy, and now",
        answer: "it was the site of a rainbow gathering of different colours and nations for the installation of South Africa's first democratic, non-racial government."
    },
    {
        start: "Only moments before, the highest generals of the South African defence force and police ... saluted me and pledged their loyalty. ... not so many years before they would not have saluted",
        answer: "but arrested me."
    },
    {
        start: "Although that day neither group knew the lyrics of the anthem ..., they would soon",
        answer: "know the words by heart."
    },
    {
        start: "My country is rich in the minerals and gems that lie beneath its soil,",
        answer: "but I have always known that its greatest wealth is its people, finer and truer than the purest diamonds."
    },
    {
        start: "The Air Show was not only a display of pinpoint precision and military force, but",
        answer: "a demonstration of the military's loyalty to democracy, to a new government that had been freely and fairly elected."
    },
    {
        start: "It was this desire for the freedom of my people ... that transformed",
        answer: "a frightened young man into a bold one, that drove a law-abiding attorney to become a criminal, that turned a family-loving husband into a man without a home."
    }
];

// Poetry questions for A Tiger in the Zoo
const tigerInZooQuestions = [
    {
        question: "1. Read the poem again, and work in pairs or groups to do the following tasks.",
        subQuestions: [
            "(i) Find the words that describe the movements and actions of the tiger in the cage and in the wild. Arrange them in two columns.",
            "(ii) Find the words that describe the two places, and arrange them in two columns."
        ]
    },
    {
        question: "2. Notice the use of a word repeated in lines such as these:",
        subQuestions: [
            "(i) On pads of velvet quiet, In his quiet rage.",
            "(ii) And stares with his brilliant eyes At the brilliant stars."
        ],
        additionalContent: "What do you think is the effect of this repetition?"
    },
    {
        question: "3. Read the following two poems — one about a tiger and the other about a panther. Then discuss: Are zoos necessary for the protection or conservation of some species of animals? Are they useful for educating the public? Are there alternatives to zoos?"
    },
    {
        question: "4. Take a point of view for or against zoos, or even consider both points of view and write a couple of paragraphs or speak about this topic for a couple of minutes in class."
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

// Load Noun Formation Exercises
function loadNounFormationExercises() {
    const container = document.getElementById('nounFormationExercise');
    if (!container) return;
    
    let html = '<div class="table-container"><table class="noun-table"><thead><tr><th>Verb</th><th>Noun</th></tr></thead><tbody>';
    
    nounFormationExercises.forEach((pair, index) => {
        html += `<tr>
            <td>${pair.verb}</td>
            <td>${pair.noun}</td>
        </tr>`;
    });
    
    html += '</tbody></table></div>';
    container.innerHTML = html;
    
    // Load the blanks exercise
    const blankContainer = document.getElementById('nounBlankExercise');
    if (blankContainer) {
        let blanksHtml = '';
        
        nounBlankExercises.forEach((exercise, index) => {
            const parts = exercise.sentence.split('___________');
            let questionHtml = '';
            
            for (let i = 0; i < parts.length; i++) {
                questionHtml += parts[i];
                if (i < parts.length - 1) {
                    const verb = exercise.sentence.match(/\(([^)]+)\)/g)[i];
                    questionHtml += `<input type="text" class="blank-input" data-answer="${exercise.answers[i]}" placeholder="${verb}">`;
                }
            }
            
            blanksHtml += `<div class="blank-exercise">${questionHtml}</div>`;
        });
        
        blanksHtml += `<div class="button-container">
            <button class="interactive-btn" onclick="checkNounBlanks()">Check Answers</button>
        </div>`;
        
        blankContainer.innerHTML = blanksHtml;
    }
}

// Check Noun Blanks
function checkNounBlanks() {
    const inputs = document.querySelectorAll('.blank-input');
    let correctCount = 0;
    
    inputs.forEach(input => {
        const userAnswer = input.value.trim().toLowerCase();
        const correctAnswer = input.dataset.answer.toLowerCase();
        
        if (userAnswer === correctAnswer) {
            input.style.backgroundColor = '#c8e6c9';
            correctCount++;
        } else {
            input.style.backgroundColor = '#ffcdd2';
        }
    });
    
    if (correctCount === inputs.length) {
        showAchievement('Noun Formation Mastered!');
        score += 15;
        document.getElementById('totalScore').textContent = score;
        
        if (narrator) {
            narrator.speak("Perfect! You've mastered noun formation.");
        }
    } else {
        if (narrator) {
            narrator.speak(`You got ${correctCount} out of ${inputs.length} correct. Try again!`);
        }
    }
}

// Load Definitive Article Exercise
function loadDefinitiveArticleExercise() {
    const container = document.getElementById('definitiveArticleExercise');
    if (!container) return;
    
    let html = `
        <p>When 'the' is used with proper nouns in this way, it refers to:</p>
        <div class="option-box">
            <label class="option-label">
                <input type="radio" name="article" value="a"> (a) for example Oliver Tambo, Walter Sisulu, ...
            </label>
            <label class="option-label">
                <input type="radio" name="article" value="b"> (b) many other men like Oliver Tambo, Walter Sisulu .../many men of their type or kind, whose names may not be as well known.
            </label>
        </div>
        
        <p>Here are some more examples of 'the' used with proper names. What do these sentences mean?</p>
        
        <div class="example-box">
            <p>1. Mr Singh regularly invites the Amitabh Bachchans and the Shah Rukh Khans to his parties.</p>
            <textarea class="question-answer" rows="2" placeholder="What does this mean?"></textarea>
        </div>
        
        <div class="example-box">
            <p>2. Many people think that Madhuri Dixit is the Madhubala of our times.</p>
            <textarea class="question-answer" rows="2" placeholder="What does this mean?"></textarea>
        </div>
        
        <div class="example-box">
            <p>3. History is not only the story of the Alexanders, the Napoleons and the Hitlers, but of ordinary people as well.</p>
            <textarea class="question-answer" rows="2" placeholder="What does this mean?"></textarea>
        </div>
        
        <div class="button-container">
            <button class="interactive-btn" onclick="checkArticleAnswers()">Check Answers</button>
        </div>
    `;
    
    container.innerHTML = html;
}

// Check Article Answers
function checkArticleAnswers() {
    const radioAnswer = document.querySelector('input[name="article"]:checked');
    
    if (radioAnswer && radioAnswer.value === 'b') {
        showAchievement('Definite Article Usage Understood!');
        score += 10;
        document.getElementById('totalScore').textContent = score;
        
        if (narrator) {
            narrator.speak("Correct! Using 'the' with proper nouns in plural refers to people of similar qualities or characteristics.");
        }
    } else {
        if (narrator) {
            narrator.speak("That's not quite right. Try again!");
        }
    }
    
    // In a real implementation, we would also check the text area explanations
}

// Load Idiomatic Expressions Exercise
function loadIdiomaticExpressionExercise() {
    const container = document.getElementById('idiomaticExpressionExercise');
    if (!container) return;
    
    let html = '<div class="match-container"><div class="match-column"><h4>Column A</h4>';
    
    idiomaticExpressions.forEach((expression, index) => {
        html += `<div class="match-item term" data-match="${index}" onclick="selectIdiomMatch(this, 'term')">
            ${expression.phrase}
        </div>`;
    });
    
    html += '</div><div class="match-column"><h4>Column B</h4>';
    
    idiomaticExpressions.forEach((expression, index) => {
        expression.options.forEach((option, optionIndex) => {
            if (optionIndex === expression.correct) {
                html += `<div class="match-item def" data-match="${index}" onclick="selectIdiomMatch(this, 'def')">
                    ${option}
                </div>`;
            }
        });
    });
    
    html += '</div></div>';
    
    container.innerHTML = html;
}

// Select Idiom Match
function selectIdiomMatch(element, type) {
    // Same logic as in selectMatch function from main.js
    // Clear previous selections of same type
    document.querySelectorAll(`.match-item`).forEach(item => {
        if (item.parentElement === element.parentElement) {
            item.classList.remove('selected');
        }
    });
    
    element.classList.add('selected');
    selectedMatch[type] = element.dataset.match;
    
    // Check if both selected
    if (selectedMatch.term && selectedMatch.def) {
        checkIdiomMatch();
    }
}

// Check Idiom Match
function checkIdiomMatch() {
    // Similar logic to checkMatch function in main.js
    const termElements = document.querySelectorAll(`.match-item[data-match="${selectedMatch.term}"]`);
    const defElements = document.querySelectorAll(`.match-item[data-match="${selectedMatch.def}"]`);
    
    if (selectedMatch.term === selectedMatch.def) {
        // Correct match
        termElements.forEach(el => {
            el.classList.add('correct');
            el.onclick = null; // Disable further clicks
        });
        
        defElements.forEach(el => {
            el.classList.add('correct');
            el.onclick = null; // Disable further clicks
        });
        
        score += 5;
        document.getElementById('totalScore').textContent = score;
        
        // Check if all matches are complete
        const allMatched = document.querySelectorAll('.match-item:not(.correct)').length === 0;
        if (allMatched) {
            showAchievement('Idiomatic Expressions Mastered!');
            score += 15;
            document.getElementById('totalScore').textContent = score;
            
            if (narrator) {
                narrator.speak("Excellent! You've matched all the idiomatic expressions with their meanings!");
            }
        } else if (narrator) {
            narrator.speak("Perfect match!");
        }
    } else {
        // Incorrect match
        const selectedItems = document.querySelectorAll('.match-item.selected');
        selectedItems.forEach(el => {
            el.classList.add('incorrect');
            setTimeout(() => {
                el.classList.remove('incorrect', 'selected');
            }, 1000);
        });
        
        if (narrator) {
            narrator.speak("Not a match. Try again.");
        }
    }
    
    // Reset selection
    selectedMatch = { term: null, def: null };
}

// Load Poetry questions
function loadPoetryQuestions() {
    const container = document.getElementById('tigerQuestions');
    if (!container) return;
    
    let html = '';
    
    tigerInZooQuestions.forEach((q, index) => {
        html += `<div class="poem-question">
            <h4>${q.question}</h4>`;
            
        if (q.subQuestions) {
            q.subQuestions.forEach(subQ => {
                html += `<p class="sub-question">${subQ}</p>`;
            });
        }
        
        if (q.additionalContent) {
            html += `<p>${q.additionalContent}</p>`;
        }
        
        html += `<textarea class="question-answer" rows="4" placeholder="Write your answer here..."></textarea>
        </div>`;
    });
    
    html += `<div class="button-container">
        <button class="interactive-btn" onclick="savePoetryAnswers()">Save Answers</button>
    </div>`;
    
    container.innerHTML = html;
}

// Save Poetry answers
function savePoetryAnswers() {
    showAchievement('Poetry Analysis Completed!');
    score += 20;
    document.getElementById('totalScore').textContent = score;
    
    if (narrator) {
        narrator.speak("Great job analyzing the poem! Your answers have been saved.");
    }
}
