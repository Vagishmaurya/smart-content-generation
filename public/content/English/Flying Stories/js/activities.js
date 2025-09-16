// Interactive activities for Two Stories About Flying lesson

// Function to record presentation for speaking activity
function recordPresentation() {
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
    heading.textContent = 'Record Your Presentation';
    modalContent.appendChild(heading);
    
    // Get selected topic
    const topics = document.querySelectorAll('.activity-topic');
    const selectedTopics = [];
    
    topics.forEach(topic => {
        const textarea = topic.querySelector('.notes-area');
        if (textarea && textarea.value.trim().length > 0) {
            selectedTopics.push({
                title: topic.querySelector('h4').textContent,
                notes: textarea.value
            });
        }
    });
    
    if (selectedTopics.length === 0) {
        const noTopicMessage = document.createElement('p');
        noTopicMessage.className = 'warning-message';
        noTopicMessage.textContent = 'Please make notes for at least one topic before recording.';
        modalContent.appendChild(noTopicMessage);
        
        const okButton = document.createElement('button');
        okButton.className = 'interactive-btn';
        okButton.textContent = 'OK';
        okButton.onclick = function() {
            document.body.removeChild(modal);
        };
        modalContent.appendChild(okButton);
        
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        return;
    }
    
    const topicSelector = document.createElement('div');
    topicSelector.className = 'topic-selector';
    
    const topicLabel = document.createElement('label');
    topicLabel.textContent = 'Select your presentation topic:';
    topicSelector.appendChild(topicLabel);
    
    const topicSelect = document.createElement('select');
    topicSelect.className = 'topic-dropdown';
    selectedTopics.forEach((topic, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = topic.title;
        topicSelect.appendChild(option);
    });
    topicSelector.appendChild(topicSelect);
    
    modalContent.appendChild(topicSelector);
    
    const notesDisplay = document.createElement('div');
    notesDisplay.className = 'notes-display';
    
    const notesLabel = document.createElement('h3');
    notesLabel.textContent = 'Your Notes:';
    notesDisplay.appendChild(notesLabel);
    
    const notesContent = document.createElement('p');
    notesContent.className = 'notes-content';
    notesContent.textContent = selectedTopics[0].notes;
    notesDisplay.appendChild(notesContent);
    
    modalContent.appendChild(notesDisplay);
    
    // Update notes display when topic changes
    topicSelect.onchange = function() {
        const selectedIndex = parseInt(topicSelect.value);
        notesContent.textContent = selectedTopics[selectedIndex].notes;
    };
    
    // Audio narration button for notes
    const narrationButton = document.createElement('button');
    narrationButton.className = 'interactive-btn';
    narrationButton.innerHTML = '🔊 Narrate Notes';
    narrationButton.onclick = function() {
        if (typeof isAudioEnabled !== 'undefined' && !isAudioEnabled) {
            showFeedback('Audio narration is currently disabled. Please enable it first.');
            return;
        }
        
        if (!window.speechSynthesis) {
            showFeedback('Your browser does not support speech synthesis.');
            return;
        }
        
        const selectedIndex = parseInt(topicSelect.value);
        const notesToNarrate = selectedTopics[selectedIndex].notes;
        
        // Create reading indicator
        let readingIndicator = document.querySelector('.reading-indicator');
        if (readingIndicator) {
            readingIndicator.remove();
        }
        
        readingIndicator = document.createElement('div');
        readingIndicator.className = 'reading-indicator';
        readingIndicator.innerHTML = '<div class="reading-spinner"></div> Reading notes aloud...';
        notesDisplay.appendChild(readingIndicator);
        
        const utterance = new SpeechSynthesisUtterance(notesToNarrate);
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
    
    const recordingStatus = document.createElement('div');
    recordingStatus.className = 'recording-status';
    recordingStatus.innerHTML = '<div class="recording-indicator"></div> Click "Start Recording" when ready';
    modalContent.appendChild(recordingStatus);
    
    const recordingControls = document.createElement('div');
    recordingControls.className = 'recording-controls';
    
    const recordButton = document.createElement('button');
    recordButton.className = 'recording-btn record';
    recordButton.textContent = 'Start Recording';
    recordButton.onclick = function() {
        recordingStatus.innerHTML = '<div class="recording-indicator"></div> Recording... (Simulated)';
        recordButton.style.display = 'none';
        
        // Simulate recording time
        setTimeout(() => {
            recordingStatus.innerHTML = '<div class="success-indicator"></div> Recording Saved!';
            
            const replayButton = document.createElement('button');
            replayButton.className = 'recording-btn play';
            replayButton.textContent = 'Replay Recording';
            replayButton.onclick = function() {
                recordingStatus.innerHTML = '<div class="play-indicator"></div> Playing Recording...';
                
                // Simulate playback
                setTimeout(() => {
                    recordingStatus.innerHTML = '<div class="success-indicator"></div> Recording Saved!';
                }, 3000);
            };
            recordingControls.appendChild(replayButton);
            
            const doneButton = document.createElement('button');
            doneButton.className = 'recording-btn done';
            doneButton.textContent = 'Done';
            doneButton.onclick = function() {
                document.body.removeChild(modal);
                showAchievement('Public Speaker', 'You recorded your presentation!');
                updateScore(15);
            };
            recordingControls.appendChild(doneButton);
        }, 5000);
    };
    recordingControls.appendChild(recordButton);
    
    modalContent.appendChild(recordingControls);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
}

// Function to open writing pad for different writing activities
function openWritingPad(type) {
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
    
    let heading = document.createElement('h2');
    let instructions = document.createElement('div');
    instructions.className = 'writing-instructions';
    
    // Set content based on activity type
    let instructionText, instructionItems;
    switch(type) {
        case 'skill':
            heading.textContent = 'Write About Learning a New Skill';
            instructionText = 'Write a short composition on your initial attempts at learning a skill. You could describe the challenges of learning to ride a bicycle or learning to swim. Make it as humorous as possible.';
            instructionItems = [
                'Describe how you felt when you first started learning',
                'Include any funny incidents or mistakes',
                'Explain how you overcame challenges',
                'Share what you learned from the experience'
            ];
            break;
        case 'storm':
            heading.textContent = 'Write About Your Experience During a Thunderstorm';
            instructionText = 'Have you ever been alone or away from home during a thunderstorm? Narrate your experience in a paragraph.';
            instructionItems = [
                'Describe the setting and situation',
                'Share what you saw, heard, and felt',
                'Explain any challenges or fears you experienced',
                'Tell what happened in the end'
            ];
            break;
        case 'loss':
            heading.textContent = 'Write About Something You Lost';
            instructionText = 'Have you ever lost something you liked very much? Write a paragraph describing how you felt then, and saying whether — and how — you got over your loss.';
            instructionItems = [
                'Describe what you lost and why it was important to you',
                'Share how you felt when you realized it was lost',
                'Explain what you did in response',
                'Reflect on what you learned from the experience'
            ];
            break;
    }
    
    // Build instructions HTML
    const instructionsPara = document.createElement('p');
    instructionsPara.textContent = instructionText;
    instructions.appendChild(instructionsPara);
    
    const instructionsList = document.createElement('ul');
    instructionItems.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = item;
        instructionsList.appendChild(listItem);
    });
    instructions.appendChild(instructionsList);
    
    modalContent.appendChild(heading);
    modalContent.appendChild(instructions);
    
    // Audio narration button for instructions
    const narrationButton = document.createElement('button');
    narrationButton.className = 'interactive-btn';
    narrationButton.innerHTML = '🔊 Narrate Instructions';
    narrationButton.onclick = function() {
        if (typeof isAudioEnabled !== 'undefined' && !isAudioEnabled) {
            showFeedback('Audio narration is currently disabled. Please enable it first.');
            return;
        }
        
        if (!window.speechSynthesis) {
            showFeedback('Your browser does not support speech synthesis.');
            return;
        }
        
        // Create text to narrate
        const textToNarrate = instructionText + ' Here are some tips: ' + 
            instructionItems.map((item, index) => `Tip ${index + 1}: ${item}`).join('. ');
        
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
    
    const textareaDiv = document.createElement('div');
    textareaDiv.className = 'writing-area';
    
    const textarea = document.createElement('textarea');
    textarea.rows = 12;
    textarea.placeholder = 'Start writing here...';
    textareaDiv.appendChild(textarea);
    
    modalContent.appendChild(textareaDiv);
    
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'button-container';
    
    const saveButton = document.createElement('button');
    saveButton.className = 'interactive-btn';
    saveButton.textContent = 'Save Writing';
    saveButton.onclick = function() {
        if (textarea.value.trim().length > 50) {
            // Define different achievements based on activity type
            let achievementTitle, achievementDesc, points;
            
            switch(type) {
                case 'skill':
                    achievementTitle = 'Skilled Writer';
                    achievementDesc = 'You wrote about learning a new skill!';
                    points = 10;
                    break;
                case 'storm':
                    achievementTitle = 'Storm Narrator';
                    achievementDesc = 'You wrote about your experience during a thunderstorm!';
                    points = 10;
                    break;
                case 'loss':
                    achievementTitle = 'Reflective Writer';
                    achievementDesc = 'You wrote about dealing with loss!';
                    points = 10;
                    break;
            }
            
            showAchievement(achievementTitle, achievementDesc);
            updateScore(points);
            document.body.removeChild(modal);
        } else {
            showFeedback('Please write at least a few sentences.');
        }
    };
    buttonContainer.appendChild(saveButton);
    
    // Narrate Essay button
    const narrationEssayBtn = document.createElement('button');
    narrationEssayBtn.className = 'interactive-btn';
    narrationEssayBtn.innerHTML = '🔊 Narrate Your Writing';
    narrationEssayBtn.onclick = function() {
        if (typeof isAudioEnabled !== 'undefined' && !isAudioEnabled) {
            showFeedback('Audio narration is currently disabled. Please enable it first.');
            return;
        }
        
        if (!window.speechSynthesis) {
            showFeedback('Your browser does not support speech synthesis.');
            return;
        }
        
        const textToNarrate = textarea.value.trim();
        
        if (textToNarrate.length < 1) {
            showFeedback('Please write something first.');
            return;
        }
        
        // Create reading indicator
        let readingIndicator = document.querySelector('.writing-reading-indicator');
        if (readingIndicator) {
            readingIndicator.remove();
        }
        
        readingIndicator = document.createElement('div');
        readingIndicator.className = 'reading-indicator writing-reading-indicator';
        readingIndicator.innerHTML = '<div class="reading-spinner"></div> Reading your writing aloud...';
        textareaDiv.appendChild(readingIndicator);
        
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
    buttonContainer.appendChild(narrationEssayBtn);
    
    modalContent.appendChild(buttonContainer);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
}

// Initialize activities
window.addEventListener('DOMContentLoaded', () => {
    // Add any initialization code for activities here
});