/**
 * Activities for Unit 4: Let's Begin interactive lesson
 */

// Initialize activities when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set up event listeners for activities
    setupActivityListeners();
});

// Set up event listeners for activities
function setupActivityListeners() {
    // Play listening activity button
    const listenBtn = document.querySelector('.listening-activity .interactive-btn');
    if (listenBtn) {
        listenBtn.addEventListener('click', playListeningActivity);
    }
    
    // Open writing pad button
    const writeBtn = document.querySelector('.writing-activity .interactive-btn');
    if (writeBtn) {
        writeBtn.addEventListener('click', openWritingPad);
    }
    
    // Save listening notes button
    const saveNotesBtn = document.querySelector('.listening-notes .interactive-btn');
    if (saveNotesBtn) {
        saveNotesBtn.addEventListener('click', saveListeningNotes);
    }
    
    // Save writing button
    const saveWritingBtn = document.querySelector('.writing-pad .interactive-btn');
    if (saveWritingBtn) {
        saveWritingBtn.addEventListener('click', saveWriting);
    }
    
    // Resource links
    const resourceLinks = document.querySelectorAll('.project-resources a');
    resourceLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const resourceId = this.getAttribute('onclick').match(/showResource\('(.+?)'\)/)[1];
            showResource(resourceId);
        });
    });
}

// Gautama Buddha and Angulimala story content for listening activity
const buddhaStoryContent = `
Gautama Buddha was journeying through the Kosala region. He was warned not to pass through the deep jungle, as it was the den of a famous robber chief, Angulimala. He was the terror of the whole countryside. He lived by plundering travellers and feared no one. He had committed many murders. All attempts to capture the inhuman Angulimala had failed. So he continued his crimes unpunished. The people of Kosala pleaded with the Buddha not to expose himself to the dangers of the robber's territory.

But Gautama Buddha knew no fear. The warnings of the people of Kosala did not affect him. He made his way into the jungle. Angulimala got enraged at this boldness. He was determined to kill the intruder. But when he saw the Buddha, calm and self-possessed, and heard his words of kindness, the robber hesitated. His arm, which had been uplifted to kill, fell helpless by his side. His wrath cooled, and he knelt down before the Buddha. He confessed all his sins and declared his faith in the Buddha.

When the people saw the new disciple following his Master, they were amazed and could not believe that this was the ferocious man who had been a terror for so long. Angulimala became a monk. His past was forgotten, and he was widely respected for his holiness.
`;

// Stephen Hawking information for project work
const hawkingInfo = {
    bio: `
        Stephen William Hawking (1942-2018) was an English theoretical physicist, cosmologist, and author who was director of research at the Centre for Theoretical Cosmology at the University of Cambridge. His scientific works included a collaboration with Roger Penrose on gravitational singularity theorems in the framework of general relativity and the theoretical prediction that black holes emit radiation, often called Hawking radiation.
        
        Despite being diagnosed with an early-onset slow-progressing form of motor neurone disease (MND) that gradually paralysed him over the decades, Hawking continued to work, communicate, and inspire people around the world. After the loss of his speech, he was able to communicate through a speech-generating device—initially through use of a handheld switch, and eventually by using a single cheek muscle.
    `,
    books: `
        Stephen Hawking authored several groundbreaking books that made complex scientific concepts accessible to general readers:
        
        1. "A Brief History of Time" (1988): His most famous work that explains cosmology, black holes, and the Big Bang for non-specialist readers. It became a bestseller with over 10 million copies sold.
        
        2. "The Universe in a Nutshell" (2001): A follow-up that updates readers on developments in theoretical physics.
        
        3. "A Briefer History of Time" (2005): A more accessible version of his original bestseller.
        
        4. "The Grand Design" (2010, co-authored with Leonard Mlodinow): Explores the major questions about the universe and existence.
        
        5. "Brief Answers to the Big Questions" (2018): His final book, published posthumously, addressing ten fundamental questions about our existence.
    `,
    achievements: `
        Stephen Hawking's scientific achievements include:
        
        1. Hawking Radiation: His theoretical discovery that black holes emit radiation due to quantum effects.
        
        2. Penrose-Hawking Singularity Theorems: Proved with Roger Penrose that if general relativity is correct and certain reasonable conditions are satisfied, then space-time must have singularities.
        
        3. No-Boundary Proposal: With James Hartle, he proposed that the universe has no boundary in imaginary time, suggesting the universe spontaneously appeared from nothing.
        
        4. Black Hole Information Paradox: His work on the paradox of information loss in black holes sparked decades of theoretical work.
        
        5. Scientific Communication: Perhaps his greatest achievement was making complex physics accessible to millions of people worldwide despite his physical limitations.
        
        In addition to his scientific work, he was awarded the Presidential Medal of Freedom, was a Fellow of the Royal Society, and a member of the US National Academy of Sciences.
    `
};

// Play the listening activity audio
function playListeningActivity() {
    if (window.narrator) {
        // Make sure the user has interacted with the page
        if (typeof trackUserInteraction === 'function') {
            trackUserInteraction();
        }
        
        // First stop any ongoing narration
        if (window.narrator.stop) {
            window.narrator.stop();
        }
        
        // Break content into smaller paragraphs to avoid interruption
        const contentParagraphs = buddhaStoryContent.split('\n\n').filter(p => p.trim().length > 0);
        
        // Function to speak paragraphs sequentially
        function speakSequentially(paragraphs, index = 0) {
            if (index >= paragraphs.length) {
                // All paragraphs spoken, now give instructions
                setTimeout(() => {
                    window.narrator.speak("Now please answer the questions in the form below.");
                }, 1000);
                return;
            }
            
            // Set callback for when this paragraph ends
            window.narrator.onEndCallback = function() {
                // Small pause between paragraphs
                setTimeout(() => {
                    speakSequentially(paragraphs, index + 1);
                }, 300);
            };
            
            // Speak the current paragraph
            window.narrator.speak(paragraphs[index]);
        }
        
        // Start speaking the first paragraph
        speakSequentially(contentParagraphs);
    } else {
        alert('Speech synthesis is not available in your browser. Please read the text about Gautama Buddha and Angulimala instead.');
    }
}

// Show resource information
function showResource(resourceId) {
    let content = '';
    
    switch(resourceId) {
        case 'hawking-bio':
            content = hawkingInfo.bio;
            break;
        case 'hawking-books':
            content = hawkingInfo.books;
            break;
        case 'hawking-achievements':
            content = hawkingInfo.achievements;
            break;
        default:
            content = 'Resource information not available.';
    }
    
    alert(content);
    
    if (window.narrator) {
        window.narrator.speak(content);
    }
}

// Open writing pad function
function openWritingPad() {
    const writingPad = document.querySelector('.writing-pad');
    if (writingPad) {
        writingPad.style.display = 'block';
        
        // Scroll to the writing pad
        writingPad.scrollIntoView({ behavior: 'smooth' });
        
        // Provide instructions via narrator
        if (window.narrator) {
            window.narrator.speak("Please prepare your debate outline in the sections below. Start with an introduction containing a quotation, then highlight your main points, elaborate your arguments, and conclude with your opinion.");
        }
    } else {
        console.error('Writing pad element not found');
    }
}

// Save writing function
function saveWriting() {
    const writingInputs = [
        document.getElementById('writingPad1'),
        document.getElementById('writingPad2'),
        document.getElementById('writingPad3'),
        document.getElementById('writingPad4')
    ];
    
    let allValid = true;
    let totalLength = 0;
    
    writingInputs.forEach(input => {
        if (!input) {
            console.error('Writing input not found');
            allValid = false;
            return;
        }
        
        const text = input.value.trim();
        totalLength += text.length;
        
        if (text.length < 20) {
            input.style.borderColor = '#f44336';
            allValid = false;
        } else {
            input.style.borderColor = '#4caf50';
        }
    });
    
    if (!allValid || totalLength < 100) {
        alert('Please write more detailed content in each section (at least 20 characters each, and 100 characters total).');
        return;
    }
    
    // Save the writing (in a real app, this would be sent to a server)
    alert('Your debate outline has been saved!');
    
    // Update progress
    score += 15;
    document.getElementById('totalScore').textContent = score;
    
    if (!modulesCompleted.includes('activities')) {
        modulesCompleted.push('activities');
        updateProgress();
        showAchievement('Speaking Activity Completed!');
    }
    
    if (window.narrator) {
        window.narrator.speak("Excellent work! Your debate outline has been saved.");
    }
}

// Save listening notes
function saveListeningNotes() {
    const textareas = document.querySelectorAll('.listening-notes .question-textarea');
    
    let allValid = true;
    
    textareas.forEach(textarea => {
        if (!textarea) {
            console.error('Textarea not found');
            allValid = false;
            return;
        }
        
        const text = textarea.value.trim();
        
        if (text.length < 20) {
            textarea.style.borderColor = '#f44336';
            allValid = false;
        } else {
            textarea.style.borderColor = '#4caf50';
        }
    });
    
    if (!allValid) {
        alert('Please provide more detailed answers to all questions (at least 20 characters each).');
        return;
    }
    
    // Save the notes (in a real app, this would be sent to a server)
    alert('Your answers have been saved!');
    
    // Update progress
    score += 15;
    document.getElementById('totalScore').textContent = score;
    
    if (!modulesCompleted.includes('activities')) {
        modulesCompleted.push('activities');
        updateProgress();
        showAchievement('Listening Activity Completed!');
    }
    
    if (window.narrator) {
        window.narrator.speak("Great job! Your answers have been saved.");
    }
}
