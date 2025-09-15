/**
 * Activities functionality for the interactive lesson
 */

// Balance sentences data
const balanceSentences = [
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

// Contrast sentences data
const contrastSentences = [
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

// Homophones data
const homophoneExamples = [
    {
        sentence: "The bandage was <span class='homophone'>wound</span> around the <span class='homophone'>wound</span>.",
        explanation: "First 'wound' (rhymes with 'tuned'): wrapped; Second 'wound' (rhymes with 'found'): injury"
    },
    {
        sentence: "The soldier decided to <span class='homophone'>desert</span> his <span class='homophone'>dessert</span> in the <span class='homophone'>desert</span>.",
        explanation: "First 'desert' (dih-ZURT): abandon; 'dessert' (dih-ZERT): sweet food; Second 'desert' (DEZ-ert): arid land"
    }
];

// Initialize writing activity for contrasting sentences
function initializeWritingActivity() {
    const container = document.getElementById('contrastSentencesExercise');
    if (!container) return;
    
    let html = `<p>Complete the following sentences by adding the appropriate ending from the options below:</p>
    <div class="contrast-sentences">`;
    
    balanceSentences.forEach((sentence, index) => {
        html += `<div class="contrast-item">
            <p>${index + 1}. ${sentence.start} _______________</p>
            <select class="contrast-select" id="contrast-${index}">
                <option value="">-- Select the appropriate ending --</option>
                <option value="i">they can be taught to love.</option>
                <option value="ii">I was born free.</option>
                <option value="iii">but the triumph over it.</option>
                <option value="iv">but he who conquers that fear.</option>
                <option value="v">to create such heights of character.</option>
            </select>
        </div>`;
    });
    
    html += `</div>
    <div class="button-container">
        <button class="interactive-btn" onclick="checkContrastSentences()">Check Answers</button>
    </div>`;
    
    container.innerHTML = html;
}

// Check contrast sentences
function checkContrastSentences() {
    const correctAnswers = ['v', 'iii', 'iv', 'i', 'ii'];
    let correctCount = 0;
    
    balanceSentences.forEach((sentence, index) => {
        const select = document.getElementById(`contrast-${index}`);
        const userAnswer = select.value;
        
        if (userAnswer === correctAnswers[index]) {
            select.style.backgroundColor = '#c8e6c9';
            correctCount++;
        } else {
            select.style.backgroundColor = '#ffcdd2';
        }
    });
    
    if (correctCount === balanceSentences.length) {
        showAchievement('Balanced Sentences Mastered!');
        score += 15;
        document.getElementById('totalScore').textContent = score;
        
        if (narrator) {
            narrator.speak("Perfect! You've mastered Nelson Mandela's balanced writing style.");
        }
    } else {
        if (narrator) {
            narrator.speak(`You got ${correctCount} out of ${balanceSentences.length} correct. Try again!`);
        }
    }
}

// Initialize speaking activity
function initializeSpeakingActivity() {
    const container = document.querySelector('.speaking-activity');
    if (!container) return;
    
    // Create speaking activity interface
    const speakingInterface = document.createElement('div');
    speakingInterface.className = 'speaking-interface';
    speakingInterface.innerHTML = `
        <div class="speaking-prompt">
            <h4>Speaking Prompt</h4>
            <p>True liberty is freedom from poverty, deprivation and all forms of discrimination.</p>
            <ul>
                <li>causes of poverty and means of overcoming it</li>
                <li>discrimination based on gender, religion, class, etc.</li>
                <li>constitutionally guaranteed human rights</li>
            </ul>
        </div>
        <div class="speaking-notes">
            <h4>Preparation Notes</h4>
            <textarea class="notes-area" rows="6" placeholder="Jot down some notes for your speech..."></textarea>
        </div>
        <div class="speaking-controls">
            <button class="interactive-btn" id="startRecordingBtn">🎤 Start Recording</button>
            <button class="interactive-btn" id="stopRecordingBtn" disabled>⏹️ Stop Recording</button>
            <div class="recording-status">Not recording</div>
        </div>
    `;
    
    // Add to container after the existing content
    container.appendChild(speakingInterface);
    
    // Set up recording buttons
    document.getElementById('startRecordingBtn').addEventListener('click', startRecording);
    document.getElementById('stopRecordingBtn').addEventListener('click', stopRecording);
}

// Simulate starting a recording
function startRecording() {
    document.getElementById('startRecordingBtn').disabled = true;
    document.getElementById('stopRecordingBtn').disabled = false;
    document.querySelector('.recording-status').textContent = 'Recording... (simulated)';
    document.querySelector('.recording-status').style.color = '#f44336';
    
    if (narrator) {
        narrator.speak("Recording started. Present your speech about freedom, liberty and human rights.");
    }
}

// Simulate stopping a recording
function stopRecording() {
    document.getElementById('startRecordingBtn').disabled = false;
    document.getElementById('stopRecordingBtn').disabled = true;
    document.querySelector('.recording-status').textContent = 'Recording saved';
    document.querySelector('.recording-status').style.color = '#4caf50';
    
    showAchievement('Speaking Activity Completed!');
    score += 15;
    document.getElementById('totalScore').textContent = score;
    
    if (narrator) {
        narrator.speak("Recording saved. Thank you for your thoughtful speech!");
    }
}

// Initialize homophones activity
function initializeHomophonesActivity() {
    const container = document.getElementById('homophonesExercise');
    if (!container) return;
    
    let html = '<div class="homophone-examples">';
    
    homophoneExamples.forEach((example, index) => {
        html += `<div class="homophone-item">
            <p>${example.sentence}</p>
            <input type="text" class="homophone-input" placeholder="Explain the meanings of the homophones...">
            <div class="homophone-feedback"></div>
        </div>`;
    });
    
    html += `</div>
    <div class="button-container">
        <button class="interactive-btn" onclick="checkHomophones()">Check Understanding</button>
    </div>`;
    
    container.innerHTML = html;
}

// Check homophones understanding
function checkHomophones() {
    const inputs = document.querySelectorAll('.homophone-input');
    const feedbacks = document.querySelectorAll('.homophone-feedback');
    
    homophoneExamples.forEach((example, index) => {
        if (inputs[index].value.trim() !== '') {
            feedbacks[index].textContent = example.explanation;
            feedbacks[index].style.color = '#28a745';
        } else {
            feedbacks[index].textContent = "Please provide an explanation.";
            feedbacks[index].style.color = '#dc3545';
        }
    });
    
    if (Array.from(inputs).every(input => input.value.trim() !== '')) {
        showAchievement('Homophones Activity Completed!');
        score += 10;
        document.getElementById('totalScore').textContent = score;
        
        if (narrator) {
            narrator.speak("Great job understanding homophones! They are words that sound alike but have different meanings.");
        }
    }
}

// Initialize research activity
function initializeResearchActivity() {
    const container = document.querySelector('.research-activity');
    if (!container) return;
    
    // Create research activity interface
    const researchInterface = document.createElement('div');
    researchInterface.className = 'research-interface';
    researchInterface.innerHTML = `
        <div class="research-topics">
            <div class="research-topic">
                <h4>Black Americans, and their fight against discrimination</h4>
                <textarea class="research-notes" rows="4" placeholder="Record key facts and figures here..."></textarea>
            </div>
            <div class="research-topic">
                <h4>Women, and their fight for equality</h4>
                <textarea class="research-notes" rows="4" placeholder="Record key facts and figures here..."></textarea>
            </div>
            <div class="research-topic">
                <h4>The Vietnamese, and their fight for independence</h4>
                <textarea class="research-notes" rows="4" placeholder="Record key facts and figures here..."></textarea>
            </div>
        </div>
        <div class="button-container">
            <button class="interactive-btn" onclick="saveResearchNotes()">Save Research Notes</button>
        </div>
    `;
    
    // Add to container after the existing content
    container.appendChild(researchInterface);
}

// Save research notes
function saveResearchNotes() {
    const notes = document.querySelectorAll('.research-notes');
    let allFilled = true;
    
    notes.forEach(note => {
        if (note.value.trim() === '') {
            allFilled = false;
            note.style.borderColor = '#dc3545';
        } else {
            note.style.borderColor = '#28a745';
        }
    });
    
    if (allFilled) {
        showAchievement('Research Activity Completed!');
        score += 15;
        document.getElementById('totalScore').textContent = score;
        
        if (narrator) {
            narrator.speak("Excellent research! Your notes have been saved.");
        }
    } else {
        if (narrator) {
            narrator.speak("Please complete all research topics before saving.");
        }
    }
}
