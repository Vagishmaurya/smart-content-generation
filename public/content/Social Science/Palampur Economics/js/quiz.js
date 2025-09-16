/**
 * Palampur Economics Lab - Quiz Module
 * Handles quiz functionality, scoring, and feedback
 */

// Quiz state
const quizState = {
    currentQuestionIndex: 0,
    score: 0,
    answered: false,
    questions: [
        {
            question: "What are the four factors of production mentioned in the Palampur village story?",
            options: [
                "Money, machines, farmers, and technology",
                "Land, labour, physical capital, and human capital",
                "Crops, livestock, tools, and water",
                "Seeds, fertilizers, irrigation, and markets"
            ],
            correct: 1,
            explanation: "The four factors of production are land (natural resources), labour (people who do the work), physical capital (tools, machines, etc.), and human capital (knowledge and enterprise)."
        },
        {
            question: "Why has there been no expansion of land area under cultivation in Palampur since 1960?",
            options: [
                "Due to government restrictions on farming",
                "Because farmers prefer to use existing land intensively",
                "Because all cultivable land including converted wasteland is already in use",
                "Due to lack of irrigation facilities"
            ],
            correct: 2,
            explanation: "By 1960, all the wastelands in the village had been converted to cultivable land, so there was no further scope to increase farm production by bringing new land under cultivation."
        },
        {
            question: "What is multiple cropping?",
            options: [
                "Growing only one crop on a piece of land",
                "Growing different crops in different fields",
                "Growing more than one crop on a piece of land during the year",
                "Growing crops for multiple markets"
            ],
            correct: 2,
            explanation: "Multiple cropping means growing more than one crop on a piece of land during the year. It is the most common way of increasing production on a given piece of land."
        },
        {
            question: "What impact did the Green Revolution have on farming in regions like Punjab and Haryana?",
            options: [
                "It reduced the use of chemical fertilizers",
                "It introduced traditional seeds that needed less irrigation",
                "It introduced high yielding varieties of seeds and modern farming methods",
                "It reduced the overall production of wheat"
            ],
            correct: 2,
            explanation: "The Green Revolution introduced high yielding varieties (HYVs) of seeds, along with chemical fertilizers, pesticides, and irrigation, which significantly increased crop yields in regions like Punjab and Haryana."
        },
        {
            question: "What percentage of families in Palampur are landless?",
            options: [
                "About one-third (33%)",
                "About half (50%)",
                "About one-fourth (25%)",
                "About two-thirds (67%)"
            ],
            correct: 0,
            explanation: "In Palampur, about one-third of the 450 families (approximately 150 families) are landless, most of them being dalits."
        },
        {
            question: "What problem is associated with the continuous use of groundwater for tubewell irrigation?",
            options: [
                "It increases soil fertility",
                "It causes depletion of the water table",
                "It makes crops grow too fast",
                "It reduces the need for fertilizers"
            ],
            correct: 1,
            explanation: "Continuous use of groundwater for tubewell irrigation has led to the depletion of the water table, which is an environmental concern as groundwater takes many years to replenish."
        },
        {
            question: "In the farming sector, who provides labour for medium and large farmers?",
            options: [
                "Family members only",
                "Machines and technology",
                "Government workers",
                "Farm labourers from landless families or small farmers"
            ],
            correct: 3,
            explanation: "Medium and large farmers hire farm labourers to work on their fields. These labourers typically come from landless families or families cultivating small plots of land."
        },
        {
            question: "What is working capital in farming?",
            options: [
                "Land and other natural resources",
                "Tools, machines, and buildings",
                "Raw materials and money in hand needed during production",
                "Knowledge and enterprise"
            ],
            correct: 2,
            explanation: "Working capital includes raw materials (like seeds, fertilizers) and money in hand needed during production. Unlike fixed capital (tools, machines, buildings), working capital is used up in production."
        }
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    // Initialize the quiz when DOM is ready
    initializeQuiz();
    
    // Add event listener for next question button
    document.getElementById('nextQuestion')?.addEventListener('click', nextQuestion);
    
    // Add event listener for reset quiz button
    document.getElementById('resetQuiz')?.addEventListener('click', resetQuiz);
});

// Initialize the quiz
function initializeQuiz() {
    loadQuestion();
}

// Load the current question
function loadQuestion() {
    const quizContent = document.getElementById('quizContent');
    if (!quizContent) return;
    
    // Check if we've reached the end of the quiz
    if (quizState.currentQuestionIndex >= quizState.questions.length) {
        showQuizResults();
        return;
    }
    
    // Get the current question
    const q = quizState.questions[quizState.currentQuestionIndex];
    
    // Create the question container
    quizContent.innerHTML = `
        <div class="quiz-question">
            Question ${quizState.currentQuestionIndex + 1}: ${q.question}
        </div>
        <div class="quiz-options">
            ${q.options.map((opt, idx) => `
                <div class="quiz-option" data-index="${idx}">${opt}</div>
            `).join('')}
        </div>
    `;
    
    // Add event listeners to options
    document.querySelectorAll('.quiz-option').forEach(option => {
        option.addEventListener('click', () => {
            if (!quizState.answered) {
                checkAnswer(parseInt(option.dataset.index));
            }
        });
    });
    
    // Reset the answered flag
    quizState.answered = false;
    
    // Hide any existing feedback
    const feedback = document.getElementById('quizFeedback');
    if (feedback) {
        feedback.classList.remove('show');
    }
}

// Check the selected answer
function checkAnswer(selectedIndex) {
    if (quizState.answered) return;
    
    const currentQuestion = quizState.questions[quizState.currentQuestionIndex];
    const correctIndex = currentQuestion.correct;
    const options = document.querySelectorAll('.quiz-option');
    const feedback = document.getElementById('quizFeedback');
    
    // Mark as answered
    quizState.answered = true;
    
    // Apply classes to show correct/incorrect
    options[selectedIndex].classList.add(selectedIndex === correctIndex ? 'correct' : 'incorrect');
    if (selectedIndex !== correctIndex) {
        options[correctIndex].classList.add('correct');
    }
    
    // Update score and show feedback
    if (selectedIndex === correctIndex) {
        quizState.score++;
        if (feedback) {
            feedback.className = 'feedback success show';
            feedback.textContent = 'Correct! ' + currentQuestion.explanation;
        }
    } else {
        if (feedback) {
            feedback.className = 'feedback error show';
            feedback.textContent = 'Not quite. ' + currentQuestion.explanation;
        }
    }
    
    // Disable further clicks
    options.forEach(opt => opt.style.pointerEvents = 'none');
    
    // Update progress
    window.palampurApp.updateProgress(quizState.progress + 5);
}

// Move to the next question
function nextQuestion() {
    quizState.currentQuestionIndex++;
    loadQuestion();
}

// Reset the quiz
function resetQuiz() {
    quizState.currentQuestionIndex = 0;
    quizState.score = 0;
    quizState.answered = false;
    
    loadQuestion();
    
    const quizScore = document.getElementById('quizScore');
    if (quizScore) {
        quizScore.style.display = 'none';
    }
    
    const feedback = document.getElementById('quizFeedback');
    if (feedback) {
        feedback.classList.remove('show');
    }
}

// Show the final quiz results
function showQuizResults() {
    const quizContent = document.getElementById('quizContent');
    const quizScore = document.getElementById('quizScore');
    
    if (!quizScore) return;
    
    quizScore.style.display = 'block';
    quizContent.innerHTML = '';
    
    const totalQuestions = quizState.questions.length;
    const scorePercentage = Math.round((quizState.score / totalQuestions) * 100);
    
    let feedbackMessage;
    if (scorePercentage === 100) {
        feedbackMessage = 'Perfect! You\'re an economics expert!';
    } else if (scorePercentage >= 75) {
        feedbackMessage = 'Excellent! You have a strong understanding of the Palampur village economy.';
    } else if (scorePercentage >= 50) {
        feedbackMessage = 'Good job! You understand the basics of economics well.';
    } else {
        feedbackMessage = 'Keep learning! Economics is complex but important to understand.';
    }
    
    quizScore.innerHTML = `
        <h3 style="color: #4caf50;">Quiz Complete!</h3>
        <p style="font-size: 2rem; margin: 20px 0;">
            Your Score: ${quizState.score}/${totalQuestions} (${scorePercentage}%)
        </p>
        <p style="color: #666;">
            ${feedbackMessage}
        </p>
    `;
    
    // Update progress to show completion
    window.palampurApp.updateProgress(100);
}


