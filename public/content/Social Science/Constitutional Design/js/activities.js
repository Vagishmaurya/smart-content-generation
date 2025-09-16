// Interactive activities for Constitutional Design lesson

// Variables to track matching activity
let selectedTerm = null;
let selectedDef = null;

// Function to check answer for quiz questions
function checkAnswer(questionIndex, optionIndex) {
    const question = quizQuestions[questionIndex];
    const feedbackElement = document.getElementById(`feedback-q${questionIndex}`);
    const options = document.querySelectorAll(`.quiz-question:nth-child(${questionIndex + 1}) .quiz-option`);
    
    if (optionIndex === question.correctAnswer) {
        options[optionIndex].classList.add('correct');
        feedbackElement.innerHTML = 'Correct!';
        feedbackElement.className = 'feedback-message success show';
        updateScore(5);
    } else {
        options[optionIndex].classList.add('incorrect');
        feedbackElement.innerHTML = 'Incorrect. Try again.';
        feedbackElement.className = 'feedback-message error show';
    }
    
    // Check if all questions are answered correctly
    const correctAnswers = document.querySelectorAll('.quiz-option.correct').length;
    if (correctAnswers === quizQuestions.length) {
        showAchievement('Quiz Master', 'You answered all questions correctly!');
        updateProgress('activities', 'quiz');
    }
    
    // Hide feedback after 3 seconds
    setTimeout(() => {
        feedbackElement.classList.remove('show');
    }, 3000);
}

// Function to handle matching activity
function selectMatch(element, type) {
    // Reset previously selected items of the same type
    document.querySelectorAll(`.match-item[data-selected="${type}"]`).forEach(item => {
        item.removeAttribute('data-selected');
    });
    
    // Mark this element as selected
    element.setAttribute('data-selected', type);
    
    if (type === 'term') {
        selectedTerm = element;
    } else {
        selectedDef = element;
    }
    
    // If we have both a term and definition selected, check if they match
    if (selectedTerm && selectedDef) {
        const termMatch = selectedTerm.getAttribute('data-match');
        const defMatch = selectedDef.getAttribute('data-match');
        
        if (termMatch === defMatch) {
            // Correct match
            selectedTerm.classList.add('matched');
            selectedDef.classList.add('matched');
            
            // Disable the matched items
            selectedTerm.onclick = null;
            selectedDef.onclick = null;
            
            // Show feedback
            showFeedback('Correct match!', 'success');
            
            // Award points
            updateScore(3);
            
            // Check if all items are matched
            const unmatchedTerms = document.querySelectorAll('#match-terms .match-item:not(.matched)');
            if (unmatchedTerms.length === 0) {
                showFeedback('Excellent! You matched all the terms correctly!', 'success');
                showAchievement('Vocabulary Master', 'You matched all terms correctly!');
                updateProgress('activities', 'match');
            }
        } else {
            // Incorrect match
            showFeedback('That\'s not a correct match. Try again.', 'error');
        }
        
        // Reset selections
        selectedTerm.removeAttribute('data-selected');
        selectedDef.removeAttribute('data-selected');
        selectedTerm = null;
        selectedDef = null;
    }
}

// Function to check comparison answers
function checkComparison() {
    const inputs = document.querySelectorAll('.comparison-input');
    let correctCount = 0;
    
    inputs.forEach(input => {
        const userAnswer = input.value.trim().toLowerCase();
        const correctAnswer = input.getAttribute('data-answer').toLowerCase();
        
        if (userAnswer === correctAnswer || correctAnswer.includes(userAnswer)) {
            input.classList.add('correct');
            input.classList.remove('incorrect');
            correctCount++;
        } else {
            input.classList.add('incorrect');
            input.classList.remove('correct');
        }
    });
    
    if (correctCount === inputs.length) {
        showFeedback('Excellent! All your answers are correct!', 'success');
        showAchievement('Comparison Expert', 'You completed the comparison activity perfectly!');
        updateScore(correctCount * 2);
    } else {
        showFeedback(`You got ${correctCount} out of ${inputs.length} correct!`, 'success');
        updateScore(correctCount);
    }
}

// Function to check preamble comparison
function checkPreambleComparison() {
    const inputs = document.querySelectorAll('.preamble-comparison-input');
    let correctCount = 0;
    
    inputs.forEach(input => {
        const userAnswer = input.value.trim().toLowerCase();
        const correctAnswer = input.getAttribute('data-answer').toLowerCase();
        
        if (userAnswer === correctAnswer || correctAnswer.includes(userAnswer)) {
            input.classList.add('correct');
            input.classList.remove('incorrect');
            correctCount++;
        } else {
            input.classList.add('incorrect');
            input.classList.remove('correct');
        }
    });
    
    if (correctCount === inputs.length) {
        showFeedback('Excellent! All your answers are correct!', 'success');
        showAchievement('Preamble Expert', 'You completed the preamble comparison perfectly!');
        updateScore(correctCount * 2);
    } else {
        showFeedback(`You got ${correctCount} out of ${inputs.length} correct!`, 'success');
        updateScore(correctCount);
    }
}

// Function to open research activity
function openResearchActivity() {
    // Create a modal for research activity
    const modal = document.createElement('div');
    modal.className = 'research-modal';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'research-modal-content';
    
    const closeButton = document.createElement('span');
    closeButton.className = 'close-modal';
    closeButton.innerHTML = '&times;';
    closeButton.onclick = function() {
        document.body.removeChild(modal);
    };
    modalContent.appendChild(closeButton);
    
    const heading = document.createElement('h2');
    heading.textContent = 'Research Activity: Comparing Constitutions';
    modalContent.appendChild(heading);
    
    const instructions = document.createElement('div');
    instructions.className = 'research-instructions';
    instructions.innerHTML = `
        <p>Research and compare the constitutions of India and any other country of your choice. Focus on the following aspects:</p>
        <ul>
            <li>When was each constitution created?</li>
            <li>What historical circumstances led to their creation?</li>
            <li>What are the key values emphasized in each preamble?</li>
            <li>How are rights of citizens protected in each?</li>
            <li>What are the major differences between them?</li>
        </ul>
        <p>Use the template below to organize your research:</p>
    `;
    modalContent.appendChild(instructions);
    
    const template = document.createElement('div');
    template.className = 'research-template';
    template.innerHTML = `
        <div class="comparison-table">
            <table>
                <tr>
                    <th>Aspect</th>
                    <th>Indian Constitution</th>
                    <th>Constitution of _____________</th>
                </tr>
                <tr>
                    <td>Year of Creation</td>
                    <td>1949 (Adopted)<br>1950 (Enforced)</td>
                    <td><textarea rows="2" placeholder="Enter year"></textarea></td>
                </tr>
                <tr>
                    <td>Historical Context</td>
                    <td>Post-independence, partition</td>
                    <td><textarea rows="3" placeholder="Enter historical context"></textarea></td>
                </tr>
                <tr>
                    <td>Key Values</td>
                    <td>Justice, Liberty, Equality, Fraternity</td>
                    <td><textarea rows="3" placeholder="Enter key values"></textarea></td>
                </tr>
                <tr>
                    <td>Rights Protection</td>
                    <td>Fundamental Rights (Articles 12-35)</td>
                    <td><textarea rows="3" placeholder="Enter rights protection"></textarea></td>
                </tr>
                <tr>
                    <td>Major Differences</td>
                    <td colspan="2"><textarea rows="4" placeholder="Enter major differences between the two constitutions"></textarea></td>
                </tr>
            </table>
        </div>
    `;
    modalContent.appendChild(template);
    
    // Narration button
    const narrationButton = document.createElement('button');
    narrationButton.className = 'interactive-btn';
    narrationButton.innerHTML = '🔊 Narrate Instructions';
    narrationButton.onclick = function() {
        if (!isAudioEnabled) {
            showFeedback('Audio narration is currently disabled. Please enable it first.', 'error');
            return;
        }
        
        if (!window.speechSynthesis) {
            showFeedback('Your browser does not support speech synthesis.', 'error');
            return;
        }
        
        // Create text to narrate
        const textToNarrate = instructions.textContent;
        
        // Create reading indicator
        let readingIndicator = document.querySelector('.reading-indicator');
        if (readingIndicator) {
            readingIndicator.remove();
        }
        
        readingIndicator = document.createElement('div');
        readingIndicator.className = 'reading-indicator';
        readingIndicator.innerHTML = '<div class="reading-spinner"></div> Reading instructions aloud...';
        instructions.appendChild(readingIndicator);
        
        const utterance = new SpeechSynthesisUtterance(textToNarrate);
        utterance.rate = 0.9;
        
        // When done reading
        utterance.onend = function() {
            if (readingIndicator && readingIndicator.parentNode) {
                readingIndicator.parentNode.removeChild(readingIndicator);
            }
        };
        
        // Error handling
        utterance.onerror = function(event) {
            console.error('Speech synthesis error:', event);
            if (readingIndicator && readingIndicator.parentNode) {
                readingIndicator.parentNode.removeChild(readingIndicator);
            }
        };
        
        // Stop any ongoing speech
        if (window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
        }
        
        // Start speaking
        window.speechSynthesis.speak(utterance);
        
        // Add stop button to reading indicator
        const stopButton = document.createElement('button');
        stopButton.className = 'stop-narration-btn';
        stopButton.textContent = 'Stop';
        stopButton.onclick = () => {
            window.speechSynthesis.cancel();
            if (readingIndicator && readingIndicator.parentNode) {
                readingIndicator.parentNode.removeChild(readingIndicator);
            }
        };
        readingIndicator.appendChild(stopButton);
    };
    modalContent.appendChild(narrationButton);
    
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'button-container';
    
    const saveButton = document.createElement('button');
    saveButton.className = 'interactive-btn';
    saveButton.textContent = 'Save Research';
    saveButton.onclick = function() {
        showAchievement('Constitutional Researcher', 'You completed the constitution comparison research!');
        updateScore(15);
        document.body.removeChild(modal);
    };
    buttonContainer.appendChild(saveButton);
    
    const printButton = document.createElement('button');
    printButton.className = 'interactive-btn';
    printButton.textContent = 'Print Template';
    printButton.onclick = function() {
        window.print();
    };
    buttonContainer.appendChild(printButton);
    
    modalContent.appendChild(buttonContainer);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
}

// Function to open debate activity
function openDebateActivity() {
    // Create a modal for debate activity
    const modal = document.createElement('div');
    modal.className = 'debate-modal';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'debate-modal-content';
    
    const closeButton = document.createElement('span');
    closeButton.className = 'close-modal';
    closeButton.innerHTML = '&times;';
    closeButton.onclick = function() {
        document.body.removeChild(modal);
    };
    modalContent.appendChild(closeButton);
    
    const heading = document.createElement('h2');
    heading.textContent = 'Debate Activity: Constitutional Values';
    modalContent.appendChild(heading);
    
    const instructions = document.createElement('div');
    instructions.className = 'debate-instructions';
    instructions.innerHTML = `
        <p>Select one of the following debate topics and prepare arguments for both sides:</p>
        <ol>
            <li>"The Constitution should be changed according to the needs of the time."</li>
            <li>"Rights of minorities need special protection in a democracy."</li>
            <li>"A country's constitution reflects its historical experiences."</li>
        </ol>
        <p>Use the template below to organize your arguments:</p>
    `;
    modalContent.appendChild(instructions);
    
    // Topic selector
    const topicSelector = document.createElement('div');
    topicSelector.className = 'topic-selector';
    
    const topicLabel = document.createElement('label');
    topicLabel.textContent = 'Select debate topic:';
    topicSelector.appendChild(topicLabel);
    
    const topicSelect = document.createElement('select');
    topicSelect.className = 'topic-dropdown';
    
    const topics = [
        "The Constitution should be changed according to the needs of the time.",
        "Rights of minorities need special protection in a democracy.",
        "A country's constitution reflects its historical experiences."
    ];
    
    topics.forEach((topic, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = topic;
        topicSelect.appendChild(option);
    });
    
    topicSelector.appendChild(topicSelect);
    modalContent.appendChild(topicSelector);
    
    const template = document.createElement('div');
    template.className = 'debate-template';
    template.innerHTML = `
        <div class="debate-arguments">
            <div class="argument-section">
                <h3>Arguments FOR:</h3>
                <textarea rows="6" placeholder="Enter arguments supporting this position..."></textarea>
            </div>
            <div class="argument-section">
                <h3>Arguments AGAINST:</h3>
                <textarea rows="6" placeholder="Enter arguments opposing this position..."></textarea>
            </div>
            <div class="argument-section">
                <h3>Your Conclusion:</h3>
                <textarea rows="4" placeholder="What is your personal conclusion on this topic?"></textarea>
            </div>
        </div>
    `;
    modalContent.appendChild(template);
    
    // Narration button
    const narrationButton = document.createElement('button');
    narrationButton.className = 'interactive-btn';
    narrationButton.innerHTML = '🔊 Narrate Instructions';
    narrationButton.onclick = function() {
        if (!isAudioEnabled) {
            showFeedback('Audio narration is currently disabled. Please enable it first.', 'error');
            return;
        }
        
        if (!window.speechSynthesis) {
            showFeedback('Your browser does not support speech synthesis.', 'error');
            return;
        }
        
        // Create text to narrate
        const textToNarrate = instructions.textContent;
        
        // Create reading indicator
        let readingIndicator = document.querySelector('.reading-indicator');
        if (readingIndicator) {
            readingIndicator.remove();
        }
        
        readingIndicator = document.createElement('div');
        readingIndicator.className = 'reading-indicator';
        readingIndicator.innerHTML = '<div class="reading-spinner"></div> Reading instructions aloud...';
        instructions.appendChild(readingIndicator);
        
        const utterance = new SpeechSynthesisUtterance(textToNarrate);
        utterance.rate = 0.9;
        
        // When done reading
        utterance.onend = function() {
            if (readingIndicator && readingIndicator.parentNode) {
                readingIndicator.parentNode.removeChild(readingIndicator);
            }
        };
        
        // Error handling
        utterance.onerror = function(event) {
            console.error('Speech synthesis error:', event);
            if (readingIndicator && readingIndicator.parentNode) {
                readingIndicator.parentNode.removeChild(readingIndicator);
            }
        };
        
        // Stop any ongoing speech
        if (window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
        }
        
        // Start speaking
        window.speechSynthesis.speak(utterance);
        
        // Add stop button to reading indicator
        const stopButton = document.createElement('button');
        stopButton.className = 'stop-narration-btn';
        stopButton.textContent = 'Stop';
        stopButton.onclick = () => {
            window.speechSynthesis.cancel();
            if (readingIndicator && readingIndicator.parentNode) {
                readingIndicator.parentNode.removeChild(readingIndicator);
            }
        };
        readingIndicator.appendChild(stopButton);
    };
    modalContent.appendChild(narrationButton);
    
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'button-container';
    
    const saveButton = document.createElement('button');
    saveButton.className = 'interactive-btn';
    saveButton.textContent = 'Save Debate';
    saveButton.onclick = function() {
        showAchievement('Constitutional Debater', 'You completed the constitutional debate activity!');
        updateScore(15);
        document.body.removeChild(modal);
    };
    buttonContainer.appendChild(saveButton);
    
    modalContent.appendChild(buttonContainer);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
}

// Initialize activities
window.addEventListener('DOMContentLoaded', () => {
    // Add any initialization code for activities here
});