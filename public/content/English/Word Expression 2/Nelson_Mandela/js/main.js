// Main functionality for Nelson Mandela lesson

// Global variables for tracking progress
let moduleProgress = {
    intro: false,
    prereading: false,
    story: false,
    'thinking-text': false,
    'thinking-language': false,
    poetry: false,
    activities: false
};

let currentScore = 0;
let startTime = null;
let timer = null;

// Show a specific module
function showModule(moduleId) {
    // Hide all modules
    document.querySelectorAll('.module').forEach(module => {
        module.classList.remove('active');
    });
    
    // Show the selected module
    document.getElementById(moduleId).classList.add('active');
    
    // Update navigation button states
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        item.setAttribute('aria-pressed', 'false');
    });
    
    document.querySelector(`.nav-item[onclick="showModule('${moduleId}')"]`).classList.add('active');
    document.querySelector(`.nav-item[onclick="showModule('${moduleId}')"]`).setAttribute('aria-pressed', 'true');
    
    // Mark module as visited if it's the first time
    if (!moduleProgress[moduleId]) {
        moduleProgress[moduleId] = true;
        updateProgress(moduleId);
    }
}

// Start the learning journey
function startJourney() {
    showModule('prereading');
    
    if (!startTime) {
        startTime = new Date();
        timer = setInterval(updateTimer, 1000);
    }
    
    showAchievement('Journey Begins', 'You started your learning journey with Nelson Mandela!');
}

// Update progress tracker
function updateProgress(moduleId, submissionType = null) {
    // Count completed modules
    const completedModules = Object.values(moduleProgress).filter(Boolean).length;
    const totalModules = Object.keys(moduleProgress).length;
    
    // Update progress bar
    const progressPercentage = Math.round((completedModules / totalModules) * 100);
    document.getElementById('progressBar').style.width = `${progressPercentage}%`;
    document.getElementById('progressBar').textContent = `${progressPercentage}%`;
    document.getElementById('modulesComplete').textContent = completedModules;
    
    // Check if specific submission types should trigger achievements
    if (submissionType) {
        switch (submissionType) {
            case 'match':
                showAchievement('Vocabulary Expert', 'You matched all expressions correctly!');
                break;
            case 'quiz':
                showAchievement('Quiz Master', 'You completed the quiz successfully!');
                break;
        }
    }
    
    // Check if all modules are complete
    if (completedModules === totalModules) {
        showAchievement('Completion Hero', 'You completed all modules of the lesson!');
        clearInterval(timer); // Stop the timer
    }
}

// Update score
function updateScore(points) {
    currentScore += points;
    document.getElementById('totalScore').textContent = currentScore;
    
    // Achievement thresholds
    if (currentScore >= 50 && !document.querySelector('.score-50')) {
        showAchievement('Score 50', 'You reached 50 points!');
    }
    if (currentScore >= 100 && !document.querySelector('.score-100')) {
        showAchievement('Score 100', 'You reached 100 points!');
    }
}

// Update timer
function updateTimer() {
    if (!startTime) return;
    
    const currentTime = new Date();
    const elapsedTime = Math.floor((currentTime - startTime) / 1000);
    
    const minutes = Math.floor(elapsedTime / 60);
    const seconds = elapsedTime % 60;
    
    document.getElementById('timeSpent').textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Show achievement popup
function showAchievement(title, description) {
    const popup = document.getElementById('achievementPopup');
    document.getElementById('achievementDesc').textContent = description;
    
    popup.classList.add('show');
    
    // Add to score
    updateScore(10);
    
    // Hide popup after 3 seconds
    setTimeout(() => {
        popup.classList.remove('show');
    }, 3000);
}

// Show feedback message
function showFeedback(message) {
    // Create a temporary feedback element if it doesn't exist
    let feedbackElement = document.getElementById('tempFeedback');
    
    if (!feedbackElement) {
        feedbackElement = document.createElement('div');
        feedbackElement.id = 'tempFeedback';
        feedbackElement.className = 'temp-feedback';
        document.body.appendChild(feedbackElement);
    }
    
    feedbackElement.textContent = message;
    feedbackElement.classList.add('show');
    
    // Hide feedback after 3 seconds
    setTimeout(() => {
        feedbackElement.classList.remove('show');
    }, 3000);
}

// Toggle audio narration
let isAudioEnabled = false;

function toggleAudio() {
    isAudioEnabled = !isAudioEnabled;
    
    const audioBtn = document.getElementById('audioBtn');
    
    if (isAudioEnabled) {
        audioBtn.textContent = '🔇';
        audioBtn.setAttribute('aria-label', 'Disable audio narration');
        
        // If we're on the story page, start reading
        if (document.querySelector('.module.active#story')) {
            toggleReadAloud();
        }
    } else {
        audioBtn.textContent = '🔊';
        audioBtn.setAttribute('aria-label', 'Enable audio narration');
        
        // Stop any ongoing speech
        window.speechSynthesis.cancel();
    }
}

// Initialize function to set up the page
function initialize() {
    // Start timer
    startTime = new Date();
    timer = setInterval(updateTimer, 1000);
    
    // Set up event listeners
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function() {
            const moduleId = this.getAttribute('onclick').match(/'([^']+)'/)[1];
            showModule(moduleId);
        });
    });
    
    // Check for browser feature support
    if (!('SpeechSynthesisUtterance' in window) && !('speechSynthesis' in window)) {
        // Disable audio features if speech synthesis is not supported
        document.querySelectorAll('[onclick*="readAloud"], [onclick*="toggleReadAloud"]').forEach(btn => {
            btn.disabled = true;
            btn.title = 'Speech synthesis not supported in your browser';
        });
    }
}

// Run initialization when DOM is loaded
window.addEventListener('DOMContentLoaded', initialize);

// Submit Money Order form
function submitMoneyOrder() {
    const recipientName = document.getElementById('recipientName').value;
    const amount = document.getElementById('amount').value;
    const feedback = document.getElementById('moFeedback');
    
    if (!recipientName || !amount) {
        feedback.textContent = 'Please fill in at least the recipient name and amount.';
        feedback.className = 'feedback-message error';
    } else {
        feedback.textContent = 'Money order submitted successfully!';
        feedback.className = 'feedback-message success';
        updateScore(5);
        
        // Disable form fields
        document.querySelectorAll('.money-order-form input, .money-order-form textarea').forEach(input => {
            input.disabled = true;
        });
    }
}
