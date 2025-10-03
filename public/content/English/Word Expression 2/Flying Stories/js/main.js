// Main functionality for Flying Stories Lesson

// Global variables for tracking progress
let moduleProgress = {
    intro: false,
    prereading: false,
    story1: false,
    story2: false,
    'thinking-text': false,
    'thinking-language': false,
    poetry: false,
    activities: false
};

let currentScore = 0;
let startTime = null;
let timer = null;
let isAudioEnabled = true; // Enable audio by default
let userInteracted = false;

// Global narration state management
let globalNarrationState = {
    isEnabled: true,
    disabledByUser: false,
    currentModule: null,
    currentPart: null
};

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
    
    // Stop any ongoing audio
    if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
        
        // Clear any reading indicators
        document.querySelectorAll('.reading-indicator').forEach(indicator => {
            if (indicator.parentNode) {
                indicator.parentNode.removeChild(indicator);
            }
        });
        
        // Clear any paragraph highlights
        document.querySelectorAll('.paragraph-highlight').forEach(p => {
            p.classList.remove('paragraph-highlight');
        });
    }
    
    // Update global narration state
    globalNarrationState.currentModule = moduleId;
    
    // Handle specific module initialization
    switch(moduleId) {
        case 'story1':
            // Initialize first story if needed
            if (typeof loadStory === 'function') {
                loadStory('his-first-flight');
            }
            break;
        case 'story2':
            // Initialize second story if needed
            if (typeof loadStory === 'function') {
                loadStory('black-aeroplane');
            }
            break;
        case 'poetry':
            // Initialize poems if needed
            if (typeof loadPoem === 'function') {
                loadPoem('wild-animals');
            }
            break;
    }
    
    // Automatically start narrating the new module content if enabled
    setTimeout(() => {
        startModuleNarration(moduleId);
    }, 200); // Small delay to ensure module is fully loaded
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// Start module narration automatically
function startModuleNarration(moduleId) {
    if (!isAudioEnabled || globalNarrationState.disabledByUser) {
        console.log('Automatic narration disabled');
        return;
    }
    
    console.log(`Starting automatic narration for module: ${moduleId}`);
    
    switch(moduleId) {
        case 'intro':
            speak("Welcome to the Two Stories About Flying lesson. Learn about exciting adventures in the sky!");
            break;
            
        case 'prereading':
            speak("Welcome to the pre-reading activity. Let's explore some background information before we dive into the flying stories.");
            break;
            
        case 'story1':
            // Automatically start reading the first story
            if (typeof readStoryAloud === 'function') {
                readStoryAloud('his-first-flight');
            }
            break;
            
        case 'story2':
            // Automatically start reading the second story
            if (typeof readStoryAloud === 'function') {
                readStoryAloud('black-aeroplane');
            }
            break;
            
        case 'thinking-text':
            speak("Welcome to the thinking about the text section. Here you'll analyze the stories and answer comprehension questions.");
            break;
            
        case 'thinking-language':
            speak("Welcome to the thinking about language section. Here you'll explore vocabulary and grammar concepts from the stories.");
            break;
            
        case 'poetry':
            speak("Welcome to the poetry section. Here you'll read and analyze poems about animals and emotions.");
            break;
            
        case 'activities':
            speak("Welcome to the activities section. Here you'll practice writing, speaking, and creative skills related to the stories.");
            break;
            
        default:
            console.log(`No specific narration defined for module: ${moduleId}`);
            break;
    }
}

// Start the learning journey
function startJourney() {
    showModule('prereading');
    
    if (!startTime) {
        startTime = new Date();
        timer = setInterval(updateTimer, 1000);
    }
    
    // Enable user interaction for speech synthesis
    userInteracted = true;
    
    showAchievement('Journey Begins', 'You started your learning journey with Flying Stories!');
    speak("Welcome to the interactive English lesson on Two Stories About Flying. Let's begin with some background information.");
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
    document.getElementById('achievementTitle').textContent = title;
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
function showFeedback(message, type = 'success') {
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
    
    // Add appropriate class based on type
    feedbackElement.className = `temp-feedback ${type} show`;
    
    // Hide feedback after 3 seconds
    setTimeout(() => {
        feedbackElement.classList.remove('show');
    }, 3000);
}

// Toggle audio narration globally
function toggleAudio() {
    isAudioEnabled = !isAudioEnabled;
    globalNarrationState.isEnabled = isAudioEnabled;
    globalNarrationState.disabledByUser = !isAudioEnabled;
    
    const audioBtn = document.getElementById('audioBtn');
    
    if (isAudioEnabled) {
        audioBtn.textContent = '🔊';
        audioBtn.setAttribute('aria-label', 'Disable audio narration');
        
        // Enable user interaction for speech synthesis
        userInteracted = true;
        
        // Auto-start narration if in certain sections
        const activeModule = document.querySelector('.module.active');
        if (activeModule) {
            if (activeModule.id === 'story1') {
                if (typeof readStoryAloud === 'function') {
                    readStoryAloud('his-first-flight');
                }
            } else if (activeModule.id === 'story2') {
                if (typeof readStoryAloud === 'function') {
                    readStoryAloud('black-aeroplane');
                }
            } else if (activeModule.id === 'poetry') {
                if (typeof readPoemAloud === 'function') {
                    const activePoem = document.querySelector('.poem-container.active');
                    if (activePoem) {
                        const poemId = activePoem.id.replace('-container', '');
                        readPoemAloud(poemId);
                    }
                }
            }
        }
    } else {
        audioBtn.textContent = '🔇';
        audioBtn.setAttribute('aria-label', 'Enable audio narration');
        
        // Stop any ongoing speech
        if (window.speechSynthesis) {
            window.speechSynthesis.cancel();
            
            // Clear any reading indicators
            document.querySelectorAll('.reading-indicator').forEach(indicator => {
                if (indicator.parentNode) {
                    indicator.parentNode.removeChild(indicator);
                }
            });
            
            // Clear any paragraph highlights
            document.querySelectorAll('.paragraph-highlight').forEach(p => {
                p.classList.remove('paragraph-highlight');
            });
        }
    }
}

// Read text content aloud
function readText(elementId) {
    // Check if audio is globally enabled
    if (!isAudioEnabled) {
        showFeedback('Audio narration is currently disabled. Please enable it first.', 'error');
        return;
    }

    if (!window.speechSynthesis) {
        showFeedback('Your browser does not support speech synthesis.', 'error');
        return;
    }
    
    const contentElement = document.getElementById(elementId);
    if (!contentElement) {
        console.error(`Element with ID ${elementId} not found`);
        return;
    }
    
    // Stop any ongoing speech
    if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
        
        // Remove any existing reading indicators
        document.querySelectorAll('.reading-indicator').forEach(indicator => {
            indicator.parentNode.removeChild(indicator);
        });
        return;
    }
    
    // Create paragraphs for better narration
    const paragraphs = contentElement.innerText.split('\n\n').filter(p => p.trim().length > 0);
    let currentParagraphIndex = 0;
    
    // Create feedback indicator
    const readingIndicator = document.createElement('div');
    readingIndicator.className = 'reading-indicator';
    readingIndicator.innerHTML = '<div class="reading-spinner"></div> Reading aloud...';
    contentElement.appendChild(readingIndicator);
    
    // Function to read each paragraph
    const readNextParagraph = () => {
        if (currentParagraphIndex < paragraphs.length) {
            const paragraph = paragraphs[currentParagraphIndex];
            
            // Create utterance for this paragraph
            const speechUtterance = new SpeechSynthesisUtterance(paragraph);
            speechUtterance.rate = 0.9;
            speechUtterance.pitch = 1.0;
            
            // When paragraph is done, move to next one
            speechUtterance.onend = () => {
                currentParagraphIndex++;
                readNextParagraph();
            };
            
            // Error handling
            speechUtterance.onerror = (event) => {
                console.error('Speech synthesis error:', event);
                stopReading();
            };
            
            // Start speaking this paragraph
            window.speechSynthesis.speak(speechUtterance);
            
        } else {
            // All paragraphs complete
            stopReading();
        }
    };
    
    // Function to stop reading
    const stopReading = () => {
        // Remove reading indicator
        if (readingIndicator.parentNode) {
            readingIndicator.parentNode.removeChild(readingIndicator);
        }
    };
    
    // Add stop button to reading indicator
    const stopButton = document.createElement('button');
    stopButton.className = 'stop-narration-btn';
    stopButton.textContent = 'Stop';
    stopButton.onclick = () => {
        window.speechSynthesis.cancel();
        stopReading();
    };
    readingIndicator.appendChild(stopButton);
    
    // Start the reading process
    readNextParagraph();
}

// Generic speak function for simple narration
function speak(text) {
    if (!isAudioEnabled || !window.speechSynthesis) {
        return;
    }
    
    // Enable user interaction for speech synthesis
    userInteracted = true;
    
    // Stop any ongoing speech
    if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
    }
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1.0;
    
    window.speechSynthesis.speak(utterance);
}

// Toggle print mode
function togglePrintMode() {
    document.body.classList.toggle('print-mode');
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
    if (!window.SpeechSynthesisUtterance || !window.speechSynthesis) {
        // Disable audio features if speech synthesis is not supported
        document.querySelectorAll('[onclick*="readText"], [onclick*="readStoryAloud"], [onclick*="readPoemAloud"]').forEach(btn => {
            btn.disabled = true;
            btn.title = 'Speech synthesis not supported in your browser';
        });
        
        showFeedback('Speech synthesis is not supported in your browser. Some audio features will be disabled.', 'error');
    } else {
        // Initialize speech synthesis
        window.speechSynthesis.getVoices(); // Trigger voice loading
        
        // Handle voices being loaded asynchronously in some browsers
        if (window.speechSynthesis.onvoiceschanged !== undefined) {
            window.speechSynthesis.onvoiceschanged = function() {
                console.log('Voices loaded:', window.speechSynthesis.getVoices().length);
            };
        }
    }
    
    // Add listeners for answer inputs to award points when answers are provided
    document.addEventListener('input', function(event) {
        const target = event.target;
        
        // Check if this is an answer input
        if (target.classList.contains('answer-area') && !target.dataset.scored) {
            if (target.value.trim().length > 10) {
                updateScore(1);
                target.dataset.scored = 'true';
            }
        }
    });
    
    // Add global user interaction tracking for speech synthesis
    document.addEventListener('click', function() {
        userInteracted = true;
    });
    document.addEventListener('keydown', function() {
        userInteracted = true;
    });
}

// Run initialization when DOM is loaded
window.addEventListener('DOMContentLoaded', initialize);