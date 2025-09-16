/**
 * Electoral Politics - Interactive Lesson
 * activities.js - Interactive activities and quizzes
 */

// Check answer for comprehension questions
function checkAnswer(button, selectedAnswer) {
    const questionElement = button.closest('.comprehension-question');
    const correctAnswer = questionElement.dataset.answer;
    const feedbackElement = questionElement.querySelector('.answer-feedback');
    
    // Disable all buttons in this question
    const buttons = questionElement.querySelectorAll('button');
    buttons.forEach(btn => {
        btn.disabled = true;
    });
    
    // Check if answer is correct
    if (selectedAnswer === correctAnswer) {
        feedbackElement.innerHTML = '✅ Correct!';
        feedbackElement.className = 'answer-feedback correct';
        button.classList.add('correct-answer');
        addPoints(2);
    } else {
        feedbackElement.innerHTML = '❌ Incorrect. Try again!';
        feedbackElement.className = 'answer-feedback incorrect';
        button.classList.add('incorrect-answer');
        
        // Re-enable buttons after a delay
        setTimeout(() => {
            buttons.forEach(btn => {
                btn.disabled = false;
                btn.classList.remove('incorrect-answer');
            });
            feedbackElement.innerHTML = '';
        }, 2000);
    }
}

// Handle match item click
let selectedMatchItem = null;

function handleMatchItemClick() {
    // If no item is currently selected
    if (!selectedMatchItem) {
        selectedMatchItem = this;
        this.classList.add('selected');
        return;
    }
    
    // If clicking the same item again, deselect it
    if (selectedMatchItem === this) {
        selectedMatchItem.classList.remove('selected');
        selectedMatchItem = null;
        return;
    }
    
    // If an item is already selected, check if it matches
    const firstItem = selectedMatchItem;
    const secondItem = this;
    
    // Get IDs for matching
    const firstId = firstItem.dataset.id;
    const secondId = secondItem.dataset.id;
    
    // Check if one has 'matches' attribute pointing to the other
    const isMatch = 
        (firstItem.dataset.matches && firstItem.dataset.matches === secondId) ||
        (secondItem.dataset.matches && secondItem.dataset.matches === firstId);
    
    if (isMatch) {
        // Match found
        firstItem.classList.remove('selected');
        firstItem.classList.add('correct');
        secondItem.classList.add('correct');
        
        // Disable matched items
        firstItem.style.pointerEvents = 'none';
        secondItem.style.pointerEvents = 'none';
        
        // Show feedback
        const feedbackElement = document.getElementById('match-feedback');
        feedbackElement.textContent = 'Correct match!';
        feedbackElement.className = 'feedback-message success show';
        
        // Add points
        addPoints(3);
        
        // Check if all items are matched
        const unmatchedItems = document.querySelectorAll('.match-item:not(.correct)');
        if (unmatchedItems.length === 0) {
            feedbackElement.textContent = 'All matches complete! Great job!';
            addPoints(5); // Bonus points for completing all matches
        }
        
        // Hide feedback after a delay
        setTimeout(() => {
            feedbackElement.classList.remove('show');
        }, 2000);
    } else {
        // No match
        firstItem.classList.remove('selected');
        firstItem.classList.add('incorrect');
        secondItem.classList.add('incorrect');
        
        // Show feedback
        const feedbackElement = document.getElementById('match-feedback');
        feedbackElement.textContent = 'Not a match. Try again!';
        feedbackElement.className = 'feedback-message error show';
        
        // Remove incorrect class after a delay
        setTimeout(() => {
            firstItem.classList.remove('incorrect');
            secondItem.classList.remove('incorrect');
            feedbackElement.classList.remove('show');
        }, 1000);
    }
    
    selectedMatchItem = null;
}

// Submit quiz
function submitQuiz() {
    const quizQuestions = document.querySelectorAll('.quiz-question');
    let score = 0;
    let totalQuestions = quizQuestions.length;
    
    quizQuestions.forEach(question => {
        const correctAnswer = parseInt(question.dataset.correct);
        const selectedOption = question.querySelector('input[type="radio"]:checked');
        const feedbackElement = question.querySelector('.quiz-feedback');
        
        if (!selectedOption) {
            feedbackElement.textContent = 'Please select an answer.';
            feedbackElement.className = 'quiz-feedback error';
            return;
        }
        
        const selectedAnswer = parseInt(selectedOption.value);
        
        if (selectedAnswer === correctAnswer) {
            feedbackElement.textContent = 'Correct!';
            feedbackElement.className = 'quiz-feedback correct';
            score++;
        } else {
            feedbackElement.textContent = 'Incorrect. The correct answer is option ' + 
                                         (correctAnswer + 1) + '.';
            feedbackElement.className = 'quiz-feedback incorrect';
        }
    });
    
    // Calculate percentage
    const percentage = Math.round((score / totalQuestions) * 100);
    
    // Show result
    const quizContainer = document.getElementById('quiz-container');
    const resultElement = document.createElement('div');
    resultElement.className = 'quiz-result';
    resultElement.innerHTML = `
        <h3>Quiz Result</h3>
        <p>You scored ${score} out of ${totalQuestions} (${percentage}%)</p>
    `;
    quizContainer.appendChild(resultElement);
    
    // Add points based on score
    addPoints(score * 5);
    
    // Show achievement if score is good
    if (percentage >= 80) {
        showAchievement('Quiz Master! 🏆', 'You scored ' + percentage + '% on the quiz!');
    } else if (percentage >= 50) {
        showAchievement('Good Effort! 👍', 'You scored ' + percentage + '% on the quiz.');
    }
    
    // Disable submit button
    const submitButton = quizContainer.querySelector('button');
    if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = 'Quiz Submitted';
    }
}

// Check Fair/Unfair activity
function checkFairUnfair(button, selected) {
    const itemElement = button.closest('.fair-unfair-item');
    const correctAnswer = itemElement.dataset.answer;
    const feedbackElement = itemElement.querySelector('.answer-feedback');
    
    // Disable all buttons in this item
    const buttons = itemElement.querySelectorAll('button');
    buttons.forEach(btn => {
        btn.disabled = true;
    });
    
    // Check if answer is correct
    if (selected === correctAnswer) {
        feedbackElement.innerHTML = '✅ Correct!';
        feedbackElement.className = 'answer-feedback correct';
        button.classList.add('correct-answer');
        addPoints(2);
    } else {
        feedbackElement.innerHTML = `❌ Incorrect. This practice is ${correctAnswer}.`;
        feedbackElement.className = 'answer-feedback incorrect';
        button.classList.add('incorrect-answer');
    }
}

// Read activity content aloud
function readActivityContent(activityId) {
    if (!state.audioEnabled) return;
    
    const activityElement = document.getElementById(activityId);
    if (!activityElement) return;
    
    const contentElement = activityElement.querySelector('.content-block');
    if (!contentElement) return;
    
    narrator.read(contentElement.textContent, activityElement);
}
