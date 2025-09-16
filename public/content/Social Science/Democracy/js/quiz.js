/**
 * Democracy Learning Lab - Quiz Module
 * Handles quiz functionality, scoring, and feedback
 */

// Quiz state
const quizState = {
    currentQuestionIndex: 0,
    score: 0,
    answered: false,
    questions: [
        {
            question: "What is the most basic feature of democracy?",
            options: [
                "Rich people rule",
                "Rulers are elected by the people",
                "There are no rules",
                "One person decides everything"
            ],
            correct: 1,
            explanation: "Democracy means rule by the people, and at its most basic level, it requires that rulers are elected by the people."
        },
        {
            question: "Which of these is NOT a feature of democracy?",
            options: [
                "Free and fair elections",
                "One person, one vote",
                "Hereditary rule",
                "Rule of law"
            ],
            correct: 2,
            explanation: "Hereditary rule, where power is transferred within a family, is a characteristic of monarchy, not democracy."
        },
        {
            question: "Why is democracy considered better than dictatorship?",
            options: [
                "Decisions are always faster",
                "It is more accountable to people",
                "It costs less money",
                "Leaders are always smarter"
            ],
            correct: 1,
            explanation: "Democracy is considered better because governments must answer to the people. Bad leaders can be voted out peacefully through elections."
        },
        {
            question: "What does 'one person, one vote' mean?",
            options: [
                "Only one person can vote",
                "People vote only once in life",
                "Every citizen's vote has equal value",
                "One person decides for everyone"
            ],
            correct: 2,
            explanation: "One person, one vote is a democratic principle that ensures every citizen's vote carries the same weight regardless of wealth, education, or social status."
        },
        {
            question: "Which country is the world's largest democracy?",
            options: [
                "USA",
                "India",
                "China",
                "Russia"
            ],
            correct: 1,
            explanation: "India is the world's largest democracy with over 900 million eligible voters."
        },
        {
            question: "Which of these situations violates democratic principles?",
            options: [
                "A government losing an election",
                "Citizens protesting peacefully",
                "Military taking over the government",
                "Opposition parties criticizing the government"
            ],
            correct: 2,
            explanation: "Military takeovers are undemocratic because they replace elected officials with unelected military officers."
        },
        {
            question: "What is the main argument for democracy being better at preventing famines?",
            options: [
                "Democratic countries are always wealthier",
                "Democratic leaders are more intelligent",
                "Free media and opposition can highlight suffering",
                "Democratic countries receive more foreign aid"
            ],
            correct: 2,
            explanation: "In democracies, free media and opposition parties can report on suffering and pressure the government to respond to food shortages."
        },
        {
            question: "Which of these examples shows a democratic process?",
            options: [
                "A teacher deciding all classroom rules alone",
                "Parents allowing children to participate in family decisions",
                "A boss making decisions without consulting employees",
                "A ruler inheriting power from their parent"
            ],
            correct: 1,
            explanation: "Democracy involves consultation with and consent of those affected by decisions, such as parents including children in family decisions."
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
    window.democracyApp.updateProgress(quizState.progress + 5);
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
        feedbackMessage = 'Perfect! You\'re a democracy expert!';
    } else if (scorePercentage >= 75) {
        feedbackMessage = 'Excellent! You have a strong understanding of democracy.';
    } else if (scorePercentage >= 50) {
        feedbackMessage = 'Good job! You understand the basics of democracy well.';
    } else {
        feedbackMessage = 'Keep learning! Democracy is complex but important to understand.';
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
    window.democracyApp.updateProgress(100);
}
