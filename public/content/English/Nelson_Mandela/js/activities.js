// Interactive activities for Nelson Mandela lesson

// Function to check answer for the apartheid country question
function checkAnswer(element, correctAnswer) {
    const selectedText = element.querySelector('.option-text').textContent;
    const feedbackElement = document.getElementById('country-feedback');
    
    if (selectedText === correctAnswer) {
        element.classList.add('correct');
        feedbackElement.innerHTML = 'Correct! South Africa had a system of apartheid until the early 1990s.';
        feedbackElement.classList.add('success');
        updateScore(5);
    } else {
        element.classList.add('incorrect');
        feedbackElement.innerHTML = `Incorrect. The correct answer is ${correctAnswer}.`;
        feedbackElement.classList.add('error');
    }
    
    document.querySelectorAll('.quiz-option').forEach(option => {
        option.onclick = null;
    });
}

// Function to handle expression matching
let selectedTerm = null;
let selectedDef = null;

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
            document.getElementById('matchFeedback').innerHTML = 'Correct match!';
            document.getElementById('matchFeedback').classList.add('success');
            
            // Award points
            updateScore(3);
            
            // Check if all items are matched
            const unmatchedTerms = document.querySelectorAll('.match-column:first-child .match-item:not(.matched)');
            if (unmatchedTerms.length === 0) {
                document.getElementById('matchFeedback').innerHTML = 'Excellent! You matched all the expressions correctly!';
                showAchievement('Vocabulary Master', 'You matched all expressions correctly!');
            }
        } else {
            // Incorrect match
            document.getElementById('matchFeedback').innerHTML = 'That\'s not a correct match. Try again.';
            document.getElementById('matchFeedback').classList.add('error');
        }
        
        // Reset selections
        selectedTerm.removeAttribute('data-selected');
        selectedDef.removeAttribute('data-selected');
        selectedTerm = null;
        selectedDef = null;
        
        // Clear feedback after a delay
        setTimeout(() => {
            document.getElementById('matchFeedback').innerHTML = '';
            document.getElementById('matchFeedback').classList.remove('success', 'error');
        }, 2000);
    }
}

// Function to select choice in multiple-choice questions
function selectChoice(element, correctAnswer) {
    const choiceLetter = element.querySelector('.choice-letter').textContent;
    const feedbackElement = document.getElementById('choiceFeedback');
    
    if (choiceLetter.toLowerCase() === correctAnswer) {
        element.classList.add('correct');
        feedbackElement.innerHTML = 'Correct! The proper noun with "the" and in plural refers to many people of the same kind or type.';
        feedbackElement.classList.add('success');
        updateScore(5);
    } else {
        element.classList.add('incorrect');
        feedbackElement.innerHTML = 'Incorrect. Try again.';
        feedbackElement.classList.add('error');
    }
    
    document.querySelectorAll('.choice-option').forEach(option => {
        if (option !== element) {
            option.classList.remove('correct', 'incorrect');
        }
    });
}

// Function to select idiom in matching exercise
function selectIdiom(element, correctAnswer) {
    const optionLetter = element.querySelector('.option-letter').textContent;
    
    if (optionLetter.toLowerCase() === correctAnswer) {
        // Clear previous selections in the same group
        const parent = element.parentElement;
        parent.querySelectorAll('.idiom-option').forEach(option => {
            option.classList.remove('correct', 'incorrect');
        });
        
        // Mark this option as correct
        element.classList.add('correct');
        updateScore(2);
        
        // Check if all idioms are correctly matched
        const totalIdioms = document.querySelectorAll('.idiom-item').length;
        const correctIdioms = document.querySelectorAll('.idiom-option.correct').length;
        
        if (correctIdioms === totalIdioms) {
            document.getElementById('idiomFeedback').innerHTML = 'Great job! You matched all the idioms correctly!';
            document.getElementById('idiomFeedback').classList.add('success');
            showAchievement('Idiom Expert', 'You matched all idiomatic expressions correctly!');
        }
    } else {
        // Mark as incorrect
        element.classList.add('incorrect');
        element.classList.remove('correct');
    }
}

// Function to check completion exercise answers
function checkCompletion() {
    const inputs = document.querySelectorAll('.completion-input');
    let allCorrect = true;
    let correctCount = 0;
    
    inputs.forEach(input => {
        const userAnswer = input.value.trim().toLowerCase();
        const correctAnswer = input.getAttribute('data-answer').toLowerCase();
        
        if (userAnswer === correctAnswer) {
            input.classList.add('correct');
            input.classList.remove('incorrect');
            correctCount++;
        } else {
            input.classList.add('incorrect');
            input.classList.remove('correct');
            allCorrect = false;
        }
    });
    
    if (allCorrect) {
        showAchievement('Perfect Completion', 'You completed all blanks correctly!');
    } else {
        showFeedback(`You got ${correctCount} out of ${inputs.length} correct!`);
    }
    
    updateScore(correctCount);
}

// Function to check contrastive sentence completion
function checkContrastCompletion() {
    const inputs = document.querySelectorAll('.sentence-item input');
    let correctCount = 0;
    
    inputs.forEach(input => {
        const userAnswer = input.value.trim();
        const correctAnswer = input.getAttribute('data-answer');
        
        if (userAnswer === correctAnswer) {
            input.classList.add('correct');
            input.classList.remove('incorrect');
            correctCount++;
        } else {
            input.classList.add('incorrect');
            input.classList.remove('correct');
        }
    });
    
    if (correctCount === inputs.length) {
        showAchievement('Balance Master', 'You completed all contrast sentences correctly!');
        updateScore(correctCount * 2);
    } else {
        showFeedback(`You got ${correctCount} out of ${inputs.length} correct!`);
        updateScore(correctCount);
    }
}

// Function to check blanks in noun-verb exercise
function checkBlanks() {
    const inputs = document.querySelectorAll('.blank-input');
    let correctCount = 0;
    
    inputs.forEach(input => {
        const userAnswer = input.value.trim().toLowerCase();
        const correctAnswer = input.getAttribute('data-answer').toLowerCase();
        
        if (userAnswer === correctAnswer) {
            input.classList.add('correct');
            input.classList.remove('incorrect');
            correctCount++;
        } else {
            input.classList.add('incorrect');
            input.classList.remove('correct');
        }
    });
    
    if (correctCount === inputs.length) {
        showAchievement('Grammar Expert', 'You completed all noun forms correctly!');
        updateScore(correctCount * 2);
    } else {
        showFeedback(`You got ${correctCount} out of ${inputs.length} correct!`);
        updateScore(correctCount);
    }
}

// Function to toggle poem text details
function toggleMetaphor(element) {
    element.classList.toggle('expanded');
}

// Function to show research resources
function showResearchResources() {
    const topics = [
        {
            title: "Black Americans and their fight against discrimination",
            resources: [
                "Civil Rights Movement (1954-1968)",
                "Martin Luther King Jr.'s 'I Have a Dream' speech",
                "Rosa Parks and the Montgomery Bus Boycott",
                "The Black Lives Matter movement"
            ]
        },
        {
            title: "Women and their fight for equality",
            resources: [
                "Women's Suffrage Movement",
                "Equal Pay Movement",
                "Women's Rights Conventions",
                "Gender Equality in Education and Workplace"
            ]
        },
        {
            title: "The Vietnamese and their fight for independence",
            resources: [
                "Resistance against French colonization (1887-1954)",
                "The Vietnam War (1955-1975)",
                "Ho Chi Minh's leadership",
                "Post-war reconstruction and development"
            ]
        }
    ];
    
    // Create a modal to display research topics
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
    heading.textContent = 'Research Resources';
    modalContent.appendChild(heading);
    
    topics.forEach(topic => {
        const topicDiv = document.createElement('div');
        topicDiv.className = 'research-topic';
        
        const topicTitle = document.createElement('h3');
        topicTitle.textContent = topic.title;
        topicDiv.appendChild(topicTitle);
        
        const resourceList = document.createElement('ul');
        topic.resources.forEach(resource => {
            const resourceItem = document.createElement('li');
            resourceItem.textContent = resource;
            resourceList.appendChild(resourceItem);
        });
        topicDiv.appendChild(resourceList);
        
        modalContent.appendChild(topicDiv);
    });
    
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
}

// Function to show opinion writing prompt
function showOpinionPrompt(viewpoint) {
    const promptDiv = document.getElementById('opinionPrompt');
    let promptText = '';
    
    switch(viewpoint) {
        case 'for':
            promptText = `
                <h4>Writing Prompt: For Zoos</h4>
                <p>Consider these points in your writing:</p>
                <ul>
                    <li>Conservation of endangered species</li>
                    <li>Educational benefits for the public</li>
                    <li>Research opportunities</li>
                    <li>Breeding programs to increase populations</li>
                </ul>
                <textarea class="opinion-textarea" rows="5" placeholder="Write your opinion here..."></textarea>
            `;
            break;
        case 'against':
            promptText = `
                <h4>Writing Prompt: Against Zoos</h4>
                <p>Consider these points in your writing:</p>
                <ul>
                    <li>Confinement and its effects on animal behavior</li>
                    <li>Ethical concerns about captivity</li>
                    <li>Natural habitat preservation alternatives</li>
                    <li>Wildlife sanctuaries as alternatives</li>
                </ul>
                <textarea class="opinion-textarea" rows="5" placeholder="Write your opinion here..."></textarea>
            `;
            break;
        case 'both':
            promptText = `
                <h4>Writing Prompt: Considering Both Sides</h4>
                <p>Consider these points in your writing:</p>
                <ul>
                    <li>Benefits of zoos for conservation vs. limitations</li>
                    <li>Educational value vs. potential misrepresentation of wild animals</li>
                    <li>Improving zoo conditions vs. finding alternatives</li>
                    <li>Modern reforms in zoo design and management</li>
                </ul>
                <textarea class="opinion-textarea" rows="5" placeholder="Write your opinion here..."></textarea>
            `;
            break;
    }
    
    promptDiv.innerHTML = promptText;
    
    // Add a submit button
    const submitButton = document.createElement('button');
    submitButton.className = 'interactive-btn';
    submitButton.textContent = 'Submit Opinion';
    submitButton.onclick = function() {
        const textarea = document.querySelector('.opinion-textarea');
        if (textarea.value.trim().length > 50) {
            showAchievement('Critical Thinker', 'You wrote a thoughtful opinion on zoos!');
            updateScore(10);
        } else {
            showFeedback('Please write a more detailed response.');
        }
    };
    
    promptDiv.appendChild(submitButton);
}

// Function to toggle additional poems
function toggleAdditionalPoem(poemId) {
    const poemText = document.getElementById('additionalPoemText');
    
    // This function is implemented in story.js since it uses the additionalPoems object defined there
}

// Function to read poem aloud
function readAloudPoem(poemId) {
    let poemText = '';
    
    if (poemId === 'tiger') {
        poemText = document.querySelector('.poem-text').innerText;
    } else {
        // Get text from the currently displayed additional poem
        const additionalPoemText = document.getElementById('additionalPoemText');
        if (additionalPoemText && additionalPoemText.querySelector('.poem-text')) {
            poemText = additionalPoemText.querySelector('.poem-text').innerText;
        }
    }
    
    if (poemText) {
        const utterance = new SpeechSynthesisUtterance(poemText);
        utterance.rate = 0.8; // Slower rate for poetry
        window.speechSynthesis.speak(utterance);
    }
}

// Function to record speaking activity
function recordSpeaking() {
    // Check if browser supports speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        // Create a simulated recording interface
        const modal = document.createElement('div');
        modal.className = 'recording-modal';
        
        const modalContent = document.createElement('div');
        modalContent.className = 'recording-modal-content';
        
        const closeButton = document.createElement('span');
        closeButton.className = 'close-modal';
        closeButton.innerHTML = '&times;';
        closeButton.onclick = function() {
            document.body.removeChild(modal);
        };
        modalContent.appendChild(closeButton);
        
        const heading = document.createElement('h2');
        heading.textContent = 'Record Your Speech';
        modalContent.appendChild(heading);
        
        const recordingStatus = document.createElement('div');
        recordingStatus.className = 'recording-status';
        recordingStatus.innerHTML = '<div class="recording-indicator"></div> Simulated Recording... Speak Now';
        modalContent.appendChild(recordingStatus);
        
        const recordingControls = document.createElement('div');
        recordingControls.className = 'recording-controls';
        
        const stopButton = document.createElement('button');
        stopButton.className = 'recording-btn stop';
        stopButton.textContent = 'Stop Recording';
        stopButton.onclick = function() {
            recordingStatus.innerHTML = '<div class="success-indicator"></div> Recording Saved!';
            
            // Replace controls with a new button
            recordingControls.innerHTML = '';
            const replayButton = document.createElement('button');
            replayButton.className = 'recording-btn play';
            replayButton.textContent = 'Replay Recording';
            replayButton.onclick = function() {
                recordingStatus.innerHTML = '<div class="play-indicator"></div> Playing Recording...';
                
                // Simulate playback
                setTimeout(() => {
                    recordingStatus.innerHTML = '<div class="success-indicator"></div> Recording Saved!';
                    showAchievement('Public Speaker', 'You recorded your speech about freedom!');
                    updateScore(10);
                }, 3000);
            };
            recordingControls.appendChild(replayButton);
            
            const doneButton = document.createElement('button');
            doneButton.className = 'recording-btn done';
            doneButton.textContent = 'Done';
            doneButton.onclick = function() {
                document.body.removeChild(modal);
                showAchievement('Public Speaker', 'You recorded your speech about freedom!');
                updateScore(10);
            };
            recordingControls.appendChild(doneButton);
        };
        recordingControls.appendChild(stopButton);
        
        modalContent.appendChild(recordingControls);
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
    } else {
        // Show message for browsers that don't support speech recognition
        showFeedback('Your browser does not support speech recording. Please consider using Chrome or Edge for this feature.');
    }
}

// Function to start listening activity
function playListeningActivity() {
    // Simulate audio playback for the letter
    const letterText = `
        Dear Friend,
        
        I am sorry I haven't written for so long but I've been really busy with my studies. I'm sending you a small gift for your birthday. I hope you like it.
        
        I sent it in the month of May, but it may reach you late. I couldn't write to you earlier because I was sick. Sarah goes to a new school now. She has made many friends and is happy there.
        
        I hope to see you soon. Remember the last time we met was at my grandmother's house in the summer of 2019.
        
        With best wishes,
        Your friend
        Sam
    `;
    
    // Create a simulated audio player modal
    const modal = document.createElement('div');
    modal.className = 'audio-modal';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'audio-modal-content';
    
    const closeButton = document.createElement('span');
    closeButton.className = 'close-modal';
    closeButton.innerHTML = '&times;';
    closeButton.onclick = function() {
        window.speechSynthesis.cancel(); // Stop any ongoing speech
        document.body.removeChild(modal);
    };
    modalContent.appendChild(closeButton);
    
    const heading = document.createElement('h2');
    heading.textContent = 'Listening Activity';
    modalContent.appendChild(heading);
    
    const letterDiv = document.createElement('div');
    letterDiv.className = 'letter-text';
    letterDiv.innerHTML = `<p>Listen carefully and fill in the table below:</p>`;
    modalContent.appendChild(letterDiv);
    
    const audioControls = document.createElement('div');
    audioControls.className = 'audio-controls';
    
    const playButton = document.createElement('button');
    playButton.className = 'audio-btn play';
    playButton.innerHTML = '▶ Play';
    playButton.onclick = function() {
        const utterance = new SpeechSynthesisUtterance(letterText);
        utterance.rate = 0.8; // Slower rate for better comprehension
        utterance.onstart = function() {
            playButton.innerHTML = '⏸ Pause';
            playButton.onclick = function() {
                window.speechSynthesis.pause();
                playButton.innerHTML = '▶ Resume';
                playButton.onclick = function() {
                    window.speechSynthesis.resume();
                    playButton.innerHTML = '⏸ Pause';
                };
            };
        };
        utterance.onend = function() {
            playButton.innerHTML = '🔁 Replay';
            playButton.onclick = function() {
                window.speechSynthesis.cancel();
                const newUtterance = new SpeechSynthesisUtterance(letterText);
                newUtterance.rate = 0.8;
                window.speechSynthesis.speak(newUtterance);
            };
        };
        window.speechSynthesis.speak(utterance);
    };
    audioControls.appendChild(playButton);
    
    const stopButton = document.createElement('button');
    stopButton.className = 'audio-btn stop';
    stopButton.innerHTML = '⏹ Stop';
    stopButton.onclick = function() {
        window.speechSynthesis.cancel();
        playButton.innerHTML = '▶ Play';
        playButton.onclick = function() {
            const utterance = new SpeechSynthesisUtterance(letterText);
            utterance.rate = 0.8;
            window.speechSynthesis.speak(utterance);
        };
    };
    audioControls.appendChild(stopButton);
    
    modalContent.appendChild(audioControls);
    
    const doneButton = document.createElement('button');
    doneButton.className = 'interactive-btn';
    doneButton.textContent = 'Done';
    doneButton.onclick = function() {
        window.speechSynthesis.cancel();
        document.body.removeChild(modal);
    };
    modalContent.appendChild(doneButton);
    
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
}

// Function to open writing pad for the water conservation poster activity
function openWritingPad() {
    // Create a writing pad modal
    const modal = document.createElement('div');
    modal.className = 'writing-modal';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'writing-modal-content';
    
    const closeButton = document.createElement('span');
    closeButton.className = 'close-modal';
    closeButton.innerHTML = '&times;';
    closeButton.onclick = function() {
        document.body.removeChild(modal);
    };
    modalContent.appendChild(closeButton);
    
    const heading = document.createElement('h2');
    heading.textContent = 'Design a Poster for Water Conservation';
    modalContent.appendChild(heading);
    
    const instructions = document.createElement('div');
    instructions.className = 'writing-instructions';
    instructions.innerHTML = `
        <p>Create a poster design to promote water conservation. Your poster should:</p>
        <ul>
            <li>Include a catchy slogan</li>
            <li>Provide practical water saving tips</li>
            <li>Explain why water conservation is important</li>
            <li>Include ideas for both drought periods and excessive rainfall</li>
        </ul>
        <p>You can use the text area below to write your poster content.</p>
    `;
    modalContent.appendChild(instructions);
    
    const textareaDiv = document.createElement('div');
    textareaDiv.className = 'writing-area';
    
    const textarea = document.createElement('textarea');
    textarea.rows = 10;
    textarea.placeholder = 'Write your poster content here...';
    textareaDiv.appendChild(textarea);
    
    modalContent.appendChild(textareaDiv);
    
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'button-container';
    
    const saveButton = document.createElement('button');
    saveButton.className = 'interactive-btn';
    saveButton.textContent = 'Save Poster';
    saveButton.onclick = function() {
        if (textarea.value.trim().length > 50) {
            showAchievement('Conservation Champion', 'You created a water conservation poster!');
            updateScore(10);
            document.body.removeChild(modal);
        } else {
            showFeedback('Please write more content for your poster.');
        }
    };
    buttonContainer.appendChild(saveButton);
    
    modalContent.appendChild(buttonContainer);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
}

// Function to show sample responses for the definite article exercise
function showSampleResponses() {
    const responses = [
        "Mr Singh regularly invites famous actors/celebrities like Amitabh Bachchan and Shah Rukh Khan to his parties.",
        "Many people think that Madhuri Dixit has the same qualities, talent, or status as Madhubala did in her time.",
        "History is not only about famous rulers and dictators but also about ordinary people."
    ];
    
    // Add sample responses beneath each textarea
    const textareas = document.querySelectorAll('.meaning-input');
    textareas.forEach((textarea, index) => {
        const responseDiv = document.createElement('div');
        responseDiv.className = 'sample-response';
        responseDiv.innerHTML = `<strong>Sample response:</strong> ${responses[index]}`;
        
        // Check if a sample response already exists
        const existingResponse = textarea.parentNode.querySelector('.sample-response');
        if (existingResponse) {
            textarea.parentNode.removeChild(existingResponse);
        }
        
        textarea.parentNode.insertBefore(responseDiv, textarea.nextSibling);
    });
    
    // Award points for checking answers
    updateScore(5);
}

// Initialize activities when the page loads
window.addEventListener('DOMContentLoaded', () => {
    // Add any initialization code for activities here
});
