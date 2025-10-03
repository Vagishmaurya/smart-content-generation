// Questions and exercises for Nelson Mandela lesson

// Thinking About the Text questions
const textQuestions = [
    {
        id: "text-q1",
        question: "Why did such a large number of international leaders attend the inauguration? What did it signify the triumph of?",
        type: "essay",
        points: 5
    },
    {
        id: "text-q2",
        question: "What does Mandela mean when he says he is "simply the sum of all those African patriots" who had gone before him?",
        type: "essay",
        points: 5
    },
    {
        id: "text-q3",
        question: "Would you agree that the "depths of oppression" create "heights of character"? How does Mandela illustrate this? Can you add your own examples to this argument?",
        type: "essay",
        points: 10
    },
    {
        id: "text-q4",
        question: "How did Mandela's understanding of freedom change with age and experience?",
        type: "essay",
        points: 5
    },
    {
        id: "text-q5",
        question: "How did Mandela's 'hunger for freedom' change his life?",
        type: "essay",
        points: 5
    }
];

// Thinking About the Poem questions for "A Tiger in the Zoo"
const tigerPoemQuestions = [
    {
        id: "poem-q1",
        question: "Find the words that describe the movements and actions of the tiger in the cage and in the wild. Arrange them in two columns.",
        type: "table",
        columns: ["In the Cage", "In the Wild"],
        points: 5
    },
    {
        id: "poem-q2",
        question: "Find the words that describe the two places, and arrange them in two columns.",
        type: "table",
        columns: ["The Zoo", "The Jungle"],
        points: 5
    },
    {
        id: "poem-q3",
        question: "Notice the use of a word repeated in lines such as these:<br>'On pads of velvet quiet, In his quiet rage.'<br>'And stares with his brilliant eyes At the brilliant stars.'<br>What do you think is the effect of this repetition?",
        type: "essay",
        points: 5
    },
    {
        id: "poem-q4",
        question: "Take a point of view for or against zoos, or even consider both points of view and write a couple of paragraphs.",
        type: "essay",
        points: 10
    }
];

// Hope exercise for Thinking About Language section
const hopeExercise = [
    {
        sentence: "I hope you don't mind if I go out tonight.",
        analysis: "Here 'hope' is a verb that means 'wish that something happens'."
    },
    {
        sentence: "They gave up hope of finding survivors after the earthquake.",
        analysis: "Here 'hope' is a noun that means 'a feeling that something good might happen'."
    },
    {
        sentence: "We are hoping for good weather tomorrow.",
        analysis: "Here 'hoping' is a verb form (present participle) that means 'wishing for'."
    },
    {
        sentence: "Our only hope is to find shelter before the storm arrives.",
        analysis: "Here 'hope' is a noun that means 'chance that something good will happen'."
    }
];

// Relative clause exercise for Thinking About Language section
const relativeClauseExercise = [
    {
        id: "rc-q1",
        instruction: "Join the following sentences using 'who', 'whom', 'whose', or 'which'.",
        examples: [
            {
                original: ["The man was late.", "He has a shop in the neighborhood."],
                joined: "The man who has a shop in the neighborhood was late."
            },
            {
                original: ["The lady is waiting outside.", "I want to see her."],
                joined: "The lady whom I want to see is waiting outside."
            }
        ],
        questions: [
            {
                original: ["Nelson Mandela fought against apartheid.", "He became the first black President of South Africa."],
                answer: "Nelson Mandela, who fought against apartheid, became the first black President of South Africa."
            },
            {
                original: ["The inauguration ceremony was attended by world leaders.", "It took place in the Union Buildings."],
                answer: "The inauguration ceremony, which took place in the Union Buildings, was attended by world leaders."
            },
            {
                original: ["The freedom fighters sacrificed their lives.", "Their courage inspired many."],
                answer: "The freedom fighters, whose courage inspired many, sacrificed their lives."
            }
        ]
    }
];

// Function to load text questions
function loadTextQuestions() {
    const questionSection = document.getElementById('textQuestions');
    
    // Clear existing content
    questionSection.innerHTML = '';
    
    // Create header
    const header = document.createElement('h3');
    header.textContent = 'Answer the following questions:';
    questionSection.appendChild(header);
    
    // Create questions
    textQuestions.forEach(q => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question-item';
        
        const questionText = document.createElement('p');
        questionText.className = 'question-text';
        questionText.innerHTML = q.question;
        questionDiv.appendChild(questionText);
        
        const answerArea = document.createElement('textarea');
        answerArea.className = 'answer-area';
        answerArea.rows = 5;
        answerArea.placeholder = 'Write your answer here...';
        answerArea.dataset.points = q.points;
        answerArea.addEventListener('input', function() {
            // Award points when the user starts typing
            if (this.value.trim().length > 10 && !this.dataset.scored) {
                updateScore(parseInt(this.dataset.points));
                this.dataset.scored = 'true';
            }
        });
        questionDiv.appendChild(answerArea);
        
        questionSection.appendChild(questionDiv);
    });
    
    // Create submit button
    const submitButton = document.createElement('button');
    submitButton.className = 'interactive-btn';
    submitButton.textContent = 'Submit Answers';
    submitButton.addEventListener('click', () => {
        showAchievement('Critical Thinker', 'You completed the Thinking About the Text questions!');
    });
    questionSection.appendChild(submitButton);
}

// Function to load tiger poem questions
function loadTigerPoemQuestions() {
    const questionSection = document.getElementById('tigerPoemQuestions');
    
    // Clear existing content
    questionSection.innerHTML = '';
    
    // Create questions
    tigerPoemQuestions.forEach(q => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question-item';
        
        const questionText = document.createElement('p');
        questionText.className = 'question-text';
        questionText.innerHTML = q.question;
        questionDiv.appendChild(questionText);
        
        if (q.type === 'table') {
            // Create table for comparison
            const table = document.createElement('table');
            table.className = 'comparison-table';
            
            // Create header row
            const headerRow = document.createElement('tr');
            q.columns.forEach(colTitle => {
                const th = document.createElement('th');
                th.textContent = colTitle;
                headerRow.appendChild(th);
            });
            table.appendChild(headerRow);
            
            // Create input rows (3 rows for input)
            for (let i = 0; i < 5; i++) {
                const tr = document.createElement('tr');
                q.columns.forEach(() => {
                    const td = document.createElement('td');
                    const input = document.createElement('input');
                    input.type = 'text';
                    input.className = 'table-input';
                    td.appendChild(input);
                    tr.appendChild(td);
                });
                table.appendChild(tr);
            }
            
            questionDiv.appendChild(table);
        } else {
            // Essay question
            const answerArea = document.createElement('textarea');
            answerArea.className = 'answer-area';
            answerArea.rows = 5;
            answerArea.placeholder = 'Write your answer here...';
            questionDiv.appendChild(answerArea);
        }
        
        questionSection.appendChild(questionDiv);
    });
}

// Function to load Dust of Snow poem questions
function loadDustOfSnowQuestions() {
    const questionSection = document.getElementById('dustOfSnowQuestions');
    
    if (!questionSection) return;
    
    const questions = [
        {
            question: "What is a "dust of snow"? What does the poet say has changed his mood? How has his mood changed?",
            type: "essay"
        },
        {
            question: "How does Frost present nature in this poem? The following questions may help you to think of an answer.<br>(i) What are the birds that are usually associated with good/bad omens?<br>(ii) What does 'a crow' represent in this poem?<br>(iii) What is the meaning of 'a hemlock tree'?",
            type: "essay"
        }
    ];
    
    // Clear existing content
    questionSection.innerHTML = '';
    
    // Create questions
    questions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question-item';
        
        const questionNumber = document.createElement('div');
        questionNumber.className = 'question-number';
        questionNumber.textContent = (index + 1).toString();
        questionDiv.appendChild(questionNumber);
        
        const questionText = document.createElement('p');
        questionText.className = 'question-text';
        questionText.innerHTML = q.question;
        questionDiv.appendChild(questionText);
        
        const answerArea = document.createElement('textarea');
        answerArea.className = 'answer-area';
        answerArea.rows = 4;
        answerArea.placeholder = 'Write your answer here...';
        questionDiv.appendChild(answerArea);
        
        questionSection.appendChild(questionDiv);
    });
}

// Function to load Fire and Ice poem questions
function loadFireAndIceQuestions() {
    const questionSection = document.getElementById('fireAndIceQuestions');
    
    if (!questionSection) return;
    
    const questions = [
        {
            question: "For Frost, what do 'fire' and 'ice' stand for? Here are some ideas:<br>• greed<br>• avarice<br>• cruelty<br>• lust<br>• conflict<br>• hatred<br>• indifference<br>• rigidity<br>• insensitivity<br>• coldness<br>• intolerance",
            type: "essay"
        },
        {
            question: "What is the rhyme scheme of the poem? How does it help in bringing out the contrasting ideas in the poem?",
            type: "essay"
        }
    ];
    
    // Clear existing content
    questionSection.innerHTML = '';
    
    // Create questions
    questions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question-item';
        
        const questionNumber = document.createElement('div');
        questionNumber.className = 'question-number';
        questionNumber.textContent = (index + 1).toString();
        questionDiv.appendChild(questionNumber);
        
        const questionText = document.createElement('p');
        questionText.className = 'question-text';
        questionText.innerHTML = q.question;
        questionDiv.appendChild(questionText);
        
        const answerArea = document.createElement('textarea');
        answerArea.className = 'answer-area';
        answerArea.rows = 4;
        answerArea.placeholder = 'Write your answer here...';
        questionDiv.appendChild(answerArea);
        
        questionSection.appendChild(questionDiv);
    });
}

// Function to load the hope exercise
function loadHopeExercise() {
    const hopeSection = document.getElementById('hopeExercise');
    
    if (!hopeSection) return;
    
    // Clear existing content
    hopeSection.innerHTML = '';
    
    // Create title and instructions
    const instructions = document.createElement('div');
    instructions.className = 'content-block';
    instructions.innerHTML = '<p>Match the following sentences with their analysis to understand how the word "hope" is used:</p>';
    hopeSection.appendChild(instructions);
    
    // Create matching exercise
    const matchingDiv = document.createElement('div');
    matchingDiv.className = 'hope-matching';
    
    // Shuffle the analyses for the exercise
    const analyses = hopeExercise.map(item => item.analysis);
    const shuffledAnalyses = shuffleArray([...analyses]);
    
    hopeExercise.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'hope-item';
        
        const sentenceDiv = document.createElement('div');
        sentenceDiv.className = 'hope-sentence';
        sentenceDiv.textContent = item.sentence;
        itemDiv.appendChild(sentenceDiv);
        
        const selectDiv = document.createElement('div');
        selectDiv.className = 'hope-select';
        
        const select = document.createElement('select');
        select.className = 'hope-dropdown';
        select.dataset.correct = item.analysis;
        
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = '-- Select the correct analysis --';
        select.appendChild(defaultOption);
        
        shuffledAnalyses.forEach(analysis => {
            const option = document.createElement('option');
            option.value = analysis;
            option.textContent = analysis;
            select.appendChild(option);
        });
        
        select.addEventListener('change', function() {
            if (this.value === this.dataset.correct) {
                this.parentElement.classList.add('correct');
                this.parentElement.classList.remove('incorrect');
                updateScore(2);
            } else if (this.value) {
                this.parentElement.classList.add('incorrect');
                this.parentElement.classList.remove('correct');
            } else {
                this.parentElement.classList.remove('correct', 'incorrect');
            }
        });
        
        selectDiv.appendChild(select);
        itemDiv.appendChild(selectDiv);
        matchingDiv.appendChild(itemDiv);
    });
    
    hopeSection.appendChild(matchingDiv);
    
    // Create check button
    const checkButton = document.createElement('button');
    checkButton.className = 'interactive-btn';
    checkButton.textContent = 'Check Answers';
    checkButton.addEventListener('click', function() {
        let allCorrect = true;
        document.querySelectorAll('.hope-dropdown').forEach(select => {
            if (select.value !== select.dataset.correct) {
                allCorrect = false;
            }
        });
        
        if (allCorrect) {
            showAchievement('Word Master', 'You correctly identified all uses of "hope"!');
        } else {
            showFeedback('Try again! Some of your answers are incorrect.');
        }
    });
    hopeSection.appendChild(checkButton);
}

// Function to load the relative clause exercise
function loadRelativeClauseExercise() {
    const rcSection = document.getElementById('relativeClauseExercise');
    
    if (!rcSection) return;
    
    // Clear existing content
    rcSection.innerHTML = '';
    
    relativeClauseExercise.forEach(exercise => {
        const exerciseDiv = document.createElement('div');
        exerciseDiv.className = 'relative-clause-exercise';
        
        const instructionDiv = document.createElement('div');
        instructionDiv.className = 'instruction-block';
        instructionDiv.textContent = exercise.instruction;
        exerciseDiv.appendChild(instructionDiv);
        
        // Examples
        const examplesDiv = document.createElement('div');
        examplesDiv.className = 'examples-block';
        
        const examplesTitle = document.createElement('h4');
        examplesTitle.textContent = 'Examples:';
        examplesDiv.appendChild(examplesTitle);
        
        exercise.examples.forEach(example => {
            const exampleDiv = document.createElement('div');
            exampleDiv.className = 'example-item';
            
            const originalDiv = document.createElement('div');
            originalDiv.className = 'original-sentences';
            originalDiv.innerHTML = `<strong>Original:</strong> ${example.original.join(' ')}`;
            exampleDiv.appendChild(originalDiv);
            
            const joinedDiv = document.createElement('div');
            joinedDiv.className = 'joined-sentence';
            joinedDiv.innerHTML = `<strong>Joined:</strong> ${example.joined}`;
            exampleDiv.appendChild(joinedDiv);
            
            examplesDiv.appendChild(exampleDiv);
        });
        
        exerciseDiv.appendChild(examplesDiv);
        
        // Questions
        const questionsDiv = document.createElement('div');
        questionsDiv.className = 'rc-questions';
        
        const questionsTitle = document.createElement('h4');
        questionsTitle.textContent = 'Now join these sentences:';
        questionsDiv.appendChild(questionsTitle);
        
        exercise.questions.forEach((q, index) => {
            const questionDiv = document.createElement('div');
            questionDiv.className = 'rc-question-item';
            
            const questionNumber = document.createElement('div');
            questionNumber.className = 'question-number';
            questionNumber.textContent = (index + 1).toString();
            questionDiv.appendChild(questionNumber);
            
            const originalDiv = document.createElement('div');
            originalDiv.className = 'original-sentences';
            originalDiv.textContent = q.original.join(' ');
            questionDiv.appendChild(originalDiv);
            
            const answerInput = document.createElement('input');
            answerInput.type = 'text';
            answerInput.className = 'rc-answer-input';
            answerInput.placeholder = 'Write the joined sentence here...';
            answerInput.dataset.answer = q.answer;
            questionDiv.appendChild(answerInput);
            
            questionsDiv.appendChild(questionDiv);
        });
        
        exerciseDiv.appendChild(questionsDiv);
        
        // Check button
        const checkButton = document.createElement('button');
        checkButton.className = 'interactive-btn';
        checkButton.textContent = 'Check Answers';
        checkButton.addEventListener('click', function() {
            let correctCount = 0;
            document.querySelectorAll('.rc-answer-input').forEach(input => {
                const userAnswer = input.value.trim().toLowerCase();
                const correctAnswer = input.dataset.answer.toLowerCase();
                
                if (userAnswer === correctAnswer || similarEnough(userAnswer, correctAnswer)) {
                    input.classList.add('correct');
                    input.classList.remove('incorrect');
                    correctCount++;
                } else {
                    input.classList.add('incorrect');
                    input.classList.remove('correct');
                }
            });
            
            if (correctCount === exercise.questions.length) {
                showAchievement('Grammar Expert', 'You successfully used relative clauses!');
                updateScore(correctCount * 3);
            } else {
                showFeedback(`You got ${correctCount} out of ${exercise.questions.length} correct!`);
            }
        });
        
        exerciseDiv.appendChild(checkButton);
        
        rcSection.appendChild(exerciseDiv);
    });
}

// Helper function to check if two strings are similar enough
function similarEnough(str1, str2) {
    // This is a simple implementation that checks if the key parts match
    // A more sophisticated implementation might use string similarity metrics
    const keywords1 = str1.match(/\b(who|whom|whose|which)\b/gi) || [];
    const keywords2 = str2.match(/\b(who|whom|whose|which)\b/gi) || [];
    
    if (keywords1.length !== keywords2.length) return false;
    
    for (let i = 0; i < keywords1.length; i++) {
        if (keywords1[i].toLowerCase() !== keywords2[i].toLowerCase()) return false;
    }
    
    return true;
}

// Helper function to shuffle an array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Initialize all question sections when the page loads
window.addEventListener('DOMContentLoaded', () => {
    loadTextQuestions();
    loadTigerPoemQuestions();
    loadDustOfSnowQuestions();
    loadFireAndIceQuestions();
    loadHopeExercise();
    loadRelativeClauseExercise();
});
