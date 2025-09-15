/**
 * Activities functionality for the interactive lesson
 */

// Listening activity letter content
const listeningLetterContent = `
Bhatt House
256, Circuit Road
Kanpur, Uttar Pradesh, India
25 January 2006

Dear Arti,

How are you? I'm sorry I haven't written for a very long time. I think I last sent you a birthday card in the month of September 2005.

We have just moved house (see our new address above). This is our new home. Sarah has just about started going to school. We have admitted her to 'Little Feet' as this is very close to our new home.

I'm sitting here by the window sill, writing to you. There is a slight drizzle outside and I'm reminded of the good times we had together at Bangalore last year.

Do write back. Love,
Jaya
`;

// Listening activity answers
const listeningAnswers = {
    "The writer apologises (says sorry) because": "not writing for a very long time",
    "The writer has sent this to the reader": "a letter",
    "The writer sent it in the month of": "January",
    "The reason for not writing earlier": "not specified/mentioned",
    "Sarah goes to": "Little Feet school",
    "Who is writing to whom?": "Jaya to Arti",
    "Where and when were they last together?": "Bangalore last year"
};

// Check listening activity answers
function checkListeningAnswers() {
    const inputs = document.querySelectorAll('.listening-table input');
    let correctCount = 0;
    
    inputs.forEach((input, index) => {
        const question = input.parentNode.previousElementSibling.textContent;
        const userAnswer = input.value.trim().toLowerCase();
        const correctAnswer = listeningAnswers[question].toLowerCase();
        
        if (userAnswer.includes(correctAnswer) || correctAnswer.includes(userAnswer)) {
            input.style.backgroundColor = '#c8e6c9';
            correctCount++;
        } else {
            input.style.backgroundColor = '#ffcdd2';
        }
    });
    
    if (correctCount === inputs.length) {
        showAchievement('Listening Activity Mastered!');
        score += 20;
        document.getElementById('totalScore').textContent = score;
        
        if (narrator) {
            narrator.speak("Perfect! You've correctly identified all the information from the letter.");
        }
    } else {
        if (narrator) {
            narrator.speak(`You got ${correctCount} out of ${inputs.length} correct. Listen to the letter again and try to fill in the missing information.`);
        }
    }
}

// Writing activity for water conservation poster
function initializeWritingActivity() {
    const container = document.querySelector('.writing-activity');
    if (!container) return;
    
    // Create writing pad
    const writingPad = document.createElement('div');
    writingPad.className = 'writing-pad';
    writingPad.innerHTML = `
        <h4>Water Conservation Poster</h4>
        <div class="poster-container">
            <div class="poster-header">
                <input type="text" class="poster-title" placeholder="Enter your poster title...">
            </div>
            <textarea class="poster-content" rows="10" placeholder="Design your water conservation poster here. Include tips for saving water during summer and managing excess water during monsoons..."></textarea>
            <div class="poster-footer">
                <input type="text" class="poster-author" placeholder="Your name...">
            </div>
        </div>
        <div class="button-container">
            <button class="interactive-btn" onclick="saveWaterPoster()">Save Poster</button>
        </div>
    `;
    
    // Add to container after the existing content
    container.appendChild(writingPad);
}

// Save water conservation poster
function saveWaterPoster() {
    const title = document.querySelector('.poster-title').value;
    const content = document.querySelector('.poster-content').value;
    
    if (title && content) {
        showAchievement('Water Conservation Poster Created!');
        score += 20;
        document.getElementById('totalScore').textContent = score;
        
        if (narrator) {
            narrator.speak("Great job creating your water conservation poster! Your ideas will help raise awareness about water management.");
        }
    } else {
        if (narrator) {
            narrator.speak("Please add a title and content to your poster before saving.");
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
            <p>Have you ever been in great difficulty, and felt that only a miracle could help you? How was your problem solved?</p>
        </div>
        <div class="speaking-notes">
            <h4>Preparation Notes</h4>
            <textarea class="notes-area" rows="6" placeholder="Jot down some notes about your experience..."></textarea>
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
        narrator.speak("Recording started. Share your experience about a difficult time and how it was resolved.");
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
        narrator.speak("Recording saved. Thank you for sharing your experience!");
    }
}
