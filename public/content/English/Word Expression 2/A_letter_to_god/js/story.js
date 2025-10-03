/**
 * Story content and functionality for A Letter to God
 */

// Global variables to track narration state
let autoNarrationEnabled = false;
let narrationDisabledByUser = false;

// Story parts data
const storyParts = [
    {
        title: "A LETTER TO GOD - Part 1",
        content: `
            <p>THE house — the only one in the entire valley — sat on the <span class="highlight-vocab">crest<span class="vocab-tooltip">top of a hill</span></span> of a low hill. From this height one could see the river and the field of ripe corn dotted with the flowers that always promised a good harvest. The only thing the earth needed was a downpour or at least a shower. Throughout the morning Lencho — who knew his fields intimately — had done nothing else but see the sky towards the north-east.</p>
            
            <div class="vocabulary-note">
                <div class="word">crest</div>
                <div class="definition">top of a hill</div>
            </div>
            
            <p>"Now we're really going to get some water, woman."</p>
            
            <p>The woman who was preparing supper, replied, "Yes, God willing". The older boys were working in the field, while the smaller ones were playing near the house until the woman called to them all, "Come for dinner". It was during the meal that, just as Lencho had predicted, big drops of rain began to fall. In the north-east huge mountains of clouds could be seen approaching. The air was fresh and sweet. The man went out for no other reason than to have the pleasure of feeling the rain on his body, and when he returned he exclaimed, "These aren't raindrops falling from the sky, they are new coins. The big drops are ten cent pieces and the little ones are fives."</p>
            
            <p>With a satisfied expression he regarded the field of ripe corn with its flowers, <span class="highlight-vocab">draped<span class="vocab-tooltip">covered (with cloth)</span></span> in a curtain of rain. But suddenly a strong wind began to blow and along with the rain very large hailstones began to fall. These truly did resemble new silver coins. The boys, exposing themselves to the rain, ran out to collect the frozen pearls.</p>
            
            <div class="vocabulary-note">
                <div class="word">draped</div>
                <div class="definition">covered (with cloth)</div>
            </div>
            
            <p>"It's really getting bad now," exclaimed the man. "I hope it passes quickly." It did not pass quickly. For an hour the hail rained on the house, the garden, the hillside, the cornfield, on the whole valley. The field was white, as if covered with salt. Not a leaf remained on the trees. The corn was totally destroyed. The flowers were gone from the plants. Lencho's soul was filled with sadness. When the storm had passed, he stood in the middle of the field and said to his sons, "A plague of <span class="highlight-vocab">locusts<span class="vocab-tooltip">insects which fly in big swarms and destroy crops</span></span> would</p>
            
            <div class="vocabulary-note">
                <div class="word">locusts</div>
                <div class="definition">insects which fly in big swarms (groups) and destroy crops</div>
            </div>
            
            <p>have left more than this. The hail has left nothing. This year we will have no corn."</p>
            
            <p>That night was a sorrowful one.</p>
            <p>"All our work, for nothing."</p>
            <p>"There's no one who can help us."</p>
            <p>"We'll all go hungry this year."</p>
            
            <div class="comprehension-check">
                <h3>📝 Oral Comprehension Check</h3>
                <div class="comprehension-question">1. What did Lencho hope for?</div>
                <div class="comprehension-question">2. Why did Lencho say the raindrops were like 'new coins'?</div>
                <div class="comprehension-question">3. How did the rain change? What happened to Lencho's fields?</div>
                <div class="comprehension-question">4. What were Lencho's feelings when the hail stopped?</div>
            </div>
        `
    },
    {
        title: "A LETTER TO GOD - Part 2",
        content: `
            <p>But in the hearts of all who lived in that solitary house in the middle of the valley, there was a single hope: help from God.</p>
            
            <p>"Don't be so upset, even though this seems like a total loss. Remember, no one dies of hunger."</p>
            <p>"That's what they say: no one dies of hunger."</p>
            
            <p>All through the night, Lencho thought only of his one hope: the help of God, whose eyes, as he had been instructed, see everything, even what is deep in one's <span class="highlight-vocab">conscience<span class="vocab-tooltip">an inner sense of right and wrong</span></span>. Lencho was an ox of a man, working like an animal in the fields, but still he knew how to write. The following Sunday, at daybreak, he began to write a letter which he himself would carry to town and place in the mail. It was nothing less than a letter to God.</p>
            
            <div class="vocabulary-note">
                <div class="word">peso</div>
                <div class="definition">currency of several Latin American countries</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">conscience</div>
                <div class="definition">an inner sense of right and wrong</div>
            </div>
            
            <p>"God," he wrote, "if you don't help me, my family and I will go hungry this year. I need a hundred pesos in order to sow my field again and to live until the crop comes, because the hailstorm...."</p>
            
            <p>He wrote 'To God' on the envelope, put the letter inside and, still troubled, went to town. At the post office, he placed a stamp on the letter and dropped it into the mailbox.</p>
            
            <p>One of the employees, who was a postman and also helped at the post office, went to his boss laughing heartily and showed him the letter to God. Never in his career as a postman had he known that address. The postmaster — a fat, <span class="highlight-vocab">amiable<span class="vocab-tooltip">friendly and pleasant</span></span> fellow — also broke out laughing, but almost immediately he turned serious and, tapping the letter on his desk, commented, "What faith! I wish I had the faith of the man who wrote this letter. Starting up a correspondence with God!"</p>
            
            <div class="vocabulary-note">
                <div class="word">amiable</div>
                <div class="definition">friendly and pleasant</div>
            </div>
            
            <p>So, in order not to shake the writer's faith in God, the postmaster came up with an idea: answer the letter. But when he opened it, it was evident that to answer it he needed something more than goodwill, ink and paper. But he stuck to his resolution: he asked for money from his employees, he himself gave part of his salary, and several friends of his were obliged to give something 'for an act of charity'.</p>
            
            <p>It was impossible for him to gather together the hundred pesos, so he was able to send the farmer only a little more than half. He put the money in an envelope addressed to Lencho and with it a letter containing only a single word as a signature: God.</p>
            
            <div class="comprehension-check">
                <h3>📝 Oral Comprehension Check</h3>
                <div class="comprehension-question">1. Who or what did Lencho have faith in? What did he do?</div>
                <div class="comprehension-question">2. Who read the letter?</div>
                <div class="comprehension-question">3. What did the postmaster do then?</div>
            </div>
        `
    },
    {
        title: "A LETTER TO GOD - Part 3",
        content: `
            <p>The following Sunday Lencho came a bit earlier than usual to ask if there was a letter for him. It was the postman himself who handed the letter to him while the postmaster, experiencing the <span class="highlight-vocab">contentment<span class="vocab-tooltip">satisfaction</span></span> of a man who has performed a good deed, looked on from his office.</p>
            
            <div class="vocabulary-note">
                <div class="word">contentment</div>
                <div class="definition">satisfaction</div>
            </div>
            
            <p>Lencho showed not the slightest surprise on seeing the money; such was his confidence — but he became angry when he counted the money. God could not have made a mistake, nor could he have denied Lencho what he had requested.</p>
            
            <p>Immediately, Lencho went up to the window to ask for paper and ink. On the public writing-table, he started to write, with much wrinkling of his brow, caused by the effort he had to make to express his ideas. When he finished, he went to the window to buy a stamp which he licked and then affixed to the envelope with a blow of his fist. The moment the letter fell into the mailbox the postmaster went to open it. It said: "God: Of the money that I asked for, only seventy pesos reached me. Send me the rest, since I need it very much. But don't send it to me through the mail because the post office employees are a bunch of crooks. Lencho."</p>
            
            <div class="comprehension-check">
                <h3>📝 Oral Comprehension Check</h3>
                <div class="comprehension-question">1. Was Lencho surprised to find a letter for him with money in it?</div>
                <div class="comprehension-question">2. What made him angry?</div>
            </div>
        `
    }
];

// Show a specific part of the story
function showStoryPart(partNumber) {
    if (partNumber < 1 || partNumber > storyParts.length) return;
    
    console.log(`Loading story part ${partNumber}`);
    
    // Update navigation buttons
    document.querySelectorAll('.story-nav-btn').forEach((btn, index) => {
        btn.classList.toggle('active', index + 1 === partNumber);
        btn.setAttribute('aria-pressed', index + 1 === partNumber ? 'true' : 'false');
    });
    
    // Get the story content container
    const storyContent = document.getElementById('storyContent');
    if (!storyContent) {
        console.error('Story content container not found');
        return;
    }
    
    // Create a container for this part if it doesn't exist
    let partContainer = document.getElementById(`storyPart${partNumber}`);
    if (!partContainer) {
        partContainer = document.createElement('div');
        partContainer.id = `storyPart${partNumber}`;
        partContainer.className = 'story-part';
        storyContent.appendChild(partContainer);
    }
    
    // Hide all parts and show the selected one
    document.querySelectorAll('.story-part').forEach(part => {
        part.classList.remove('active');
    });
    partContainer.classList.add('active');
    
    // Load content if not already loaded
    if (!partContainer.innerHTML.trim()) {
        const part = storyParts[partNumber - 1];
        if (!part) {
            console.error(`Story part ${partNumber} not found`);
            return;
        }
        
        partContainer.innerHTML = `
            <h3 class="story-part-title">${part.title}</h3>
            ${part.content}
        `;
        
        // Add event listeners to vocabulary terms
        partContainer.querySelectorAll('.highlight-vocab').forEach(term => {
            term.addEventListener('click', function() {
                const word = this.textContent.split('\n')[0].trim();
                const definition = this.querySelector('.vocab-tooltip').textContent;
                
                if (window.narrator) {
                    window.narrator.speak(`${word}: ${definition}`);
                }
            });
        });
        
        // Add read aloud button for this part
        const readAloudBtn = document.createElement('button');
        readAloudBtn.className = 'interactive-btn read-part-btn';
        readAloudBtn.innerHTML = '🔊 Read This Part Aloud';
        readAloudBtn.setAttribute('aria-label', `Read part ${partNumber} aloud`);
        readAloudBtn.onclick = function() { readStoryPartAloud(partNumber, true); }; // true = manual call
        
        // Add button to the end of the part
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'button-container';
        buttonContainer.appendChild(readAloudBtn);
        partContainer.appendChild(buttonContainer);
    }
    
    // Scroll to top of story
    storyContent.scrollTop = 0;
    
    // Stop any ongoing narration when switching parts
    if (window.narrator && window.narrator.currentUtterance) {
        console.log('Stopping ongoing narration due to part switch');
        window.narrator.stop();
        
        // Clear any reading indicators from previous parts
        document.querySelectorAll('.reading-indicator').forEach(indicator => {
            indicator.classList.add('fade-out');
            setTimeout(() => {
                if (indicator.parentNode) indicator.remove();
            }, 500);
        });
        
        // Clear any paragraph highlights from previous parts
        document.querySelectorAll('.paragraph-highlight').forEach(p => {
            p.classList.remove('paragraph-highlight');
        });
    }
    
    // Announce part change with narrator if available
    if (window.narrator) {
        // Small delay to ensure the previous narration has stopped
        setTimeout(() => {
            // Automatically start reading the new part when switching within story module
            console.log(`Auto-starting narration for story part ${partNumber}`);
            readStoryPartAloud(partNumber, false); // false = automatic call
        }, 100);
    }
}

// Read a specific story part aloud
function readStoryPartAloud(partNumber, isManualCall = true) {
    console.log(`Reading story part ${partNumber} aloud (manual: ${isManualCall})`);
    
    // Enable auto-narration only when user manually starts reading
    if (isManualCall) {
        autoNarrationEnabled = true;
        narrationDisabledByUser = false; // Re-enable auto-narration when user manually starts
    }
    
    // Track user interaction for speech synthesis
    if (typeof trackUserInteraction === 'function') {
        trackUserInteraction();
    }
    
    // Stop any ongoing narration first to avoid interruption errors
    if (window.narrator && window.narrator.currentUtterance) {
        console.log('Stopping ongoing narration before starting new one');
        window.narrator.stop();
    }
    
    if (partNumber < 1 || partNumber > storyParts.length) {
        console.error(`Invalid part number: ${partNumber}`);
        return;
    }
    
    const part = storyParts[partNumber - 1];
    if (!part) {
        console.error(`Story part ${partNumber} not found`);
        return;
    }
    
    // Extract plain text from the story part
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = part.content;
    
    // Get all paragraphs and remove vocabulary notes
    const paragraphs = tempDiv.querySelectorAll('p');
    
    // Filter out empty paragraphs and those that are part of vocabulary notes
    const validParagraphs = Array.from(paragraphs).filter(p => {
        // Skip if it's empty
        if (p.textContent.trim().length === 0) return false;
        
        // Skip if it's inside a vocabulary note
        if (p.closest('.vocabulary-note')) return false;
        
        // Skip if it's inside a comprehension check
        if (p.closest('.comprehension-check')) return false;
        
        // Skip if it's a button or interactive element
        if (p.closest('button') || p.tagName === 'BUTTON') return false;
        
        return true;
    });
    
    // Extract text from valid paragraphs, cleaning up the content
    const storyText = validParagraphs
        .map(p => {
            let text = p.textContent.trim();
            // Remove vocabulary tooltip content that might be included
            text = text.replace(/\s+/g, ' '); // Normalize whitespace
            return text;
        })
        .filter(text => text.length > 0) // Remove empty strings
        .join(' ');
    
    // Add title to the beginning
    const fullText = `${part.title}. ${storyText}`;
    console.log(`Prepared text for narration (${fullText.length} characters)`);
    
    // Read the text aloud
    if (window.narrator && window.narrator.enabled) {
        try {
            // Show reading indicator
            const partContainer = document.getElementById(`storyPart${partNumber}`);
            if (partContainer) {
                // Remove any existing reading indicators
                const existingIndicators = partContainer.querySelectorAll('.reading-indicator');
                existingIndicators.forEach(indicator => indicator.remove());
                
                // Create new reading indicator
                const readingIndicator = document.createElement('div');
                readingIndicator.className = 'reading-indicator';
                readingIndicator.id = `reading-indicator-${partNumber}`;
                readingIndicator.innerHTML = '<div class="reading-spinner"></div> Reading aloud...';
                
                // Find button container or create one if it doesn't exist
                let buttonContainer = partContainer.querySelector('.button-container');
                if (!buttonContainer) {
                    buttonContainer = document.createElement('div');
                    buttonContainer.className = 'button-container';
                    partContainer.appendChild(buttonContainer);
                }
                
                buttonContainer.appendChild(readingIndicator);
                
                // Add stop button
                const stopButton = document.createElement('button');
                stopButton.className = 'interactive-btn stop-narration-btn';
                stopButton.innerHTML = '⏹️ Stop Reading';
                stopButton.onclick = stopNarration;
                readingIndicator.appendChild(stopButton);
                
                // Remove indicator when narration ends or after timeout
                window.readingTimeout = setTimeout(() => {
                    if (readingIndicator.parentNode) {
                        readingIndicator.classList.add('fade-out');
                        setTimeout(() => readingIndicator.remove(), 500);
                    }
                }, Math.min(fullText.length * 100, 60000)); // Dynamic timeout based on text length, max 1 minute
            }
            
            // Register narration end event
            if (window.narrator.onEndCallback) {
                window.narrator.onEndCallback = null;
            }
            
            window.narrator.onEndCallback = function() {
                const indicator = document.getElementById(`reading-indicator-${partNumber}`);
                if (indicator) {
                    indicator.classList.add('fade-out');
                    setTimeout(() => {
                        if (indicator.parentNode) indicator.remove();
                    }, 500);
                }
                
                if (window.readingTimeout && typeof clearTimeout === 'function') {
                    clearTimeout(window.readingTimeout);
                }
            };
            
            // Start narration
            window.narrator.speak(fullText);
            console.log('Narration started');
            
            // Highlight paragraphs as they are being read
            highlightParagraphsSequentially(validParagraphs);
            
        } catch (error) {
            console.error('Error starting narration:', error);
            alert('Sorry, there was an error starting the narration. Please try again.');
        }
    } else {
        console.error('Narrator not available');
        alert('Speech synthesis is not available in your browser.');
    }
}

// Stop ongoing narration
function stopNarration() {
    if (window.narrator) {
        window.narrator.stop();
        console.log('Narration stopped');
        
        // Disable auto-narration when user manually stops
        autoNarrationEnabled = false;
        narrationDisabledByUser = true; // Mark that user has disabled narration
        
        // Remove all reading indicators
        document.querySelectorAll('.reading-indicator').forEach(indicator => {
            indicator.classList.add('fade-out');
            setTimeout(() => {
                if (indicator.parentNode) indicator.remove();
            }, 500);
        });
        
        // Remove all paragraph highlights
        document.querySelectorAll('.paragraph-highlight').forEach(p => {
            p.classList.remove('paragraph-highlight');
        });
        
        // Clear any timeouts
        if (window.readingTimeout && typeof clearTimeout === 'function') {
            clearTimeout(window.readingTimeout);
        }
        
        if (window.highlightTimeouts && typeof clearTimeout === 'function') {
            window.highlightTimeouts.forEach(timeout => clearTimeout(timeout));
            window.highlightTimeouts = [];
        }
    }
}

// Highlight paragraphs sequentially as they are being read
function highlightParagraphsSequentially(paragraphs) {
    // Clear any existing highlight timeouts
    if (window.highlightTimeouts && typeof clearTimeout === 'function') {
        window.highlightTimeouts.forEach(timeout => clearTimeout(timeout));
    }
    
    window.highlightTimeouts = [];
    
    // Remove any existing highlights
    document.querySelectorAll('.paragraph-highlight').forEach(p => {
        p.classList.remove('paragraph-highlight');
    });
    
    // Calculate approximate time per paragraph based on length
    const totalTextLength = paragraphs.reduce((sum, p) => sum + p.textContent.length, 0);
    let cumulativeLength = 0;
    
    // Estimate total reading time (about 15 characters per second)
    const totalReadingTime = totalTextLength / 15 * 1000;
    
    // Highlight each paragraph at the appropriate time
    paragraphs.forEach((paragraph, index) => {
        const textLength = paragraph.textContent.length;
        const startPercentage = cumulativeLength / totalTextLength;
        cumulativeLength += textLength;
        
        // Calculate when to highlight this paragraph
        const highlightTime = startPercentage * totalReadingTime;
        
        // Set timeout to add highlight
        const highlightTimeout = setTimeout(() => {
            // Remove highlight from previous paragraphs
            if (index > 0) {
                paragraphs[index - 1].classList.remove('paragraph-highlight');
            }
            
            // Add highlight to current paragraph
            paragraph.classList.add('paragraph-highlight');
            
            // Scroll to the paragraph
            paragraph.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, highlightTime);
        
        window.highlightTimeouts.push(highlightTimeout);
    });
    
    // Clear highlights when done
    const clearHighlightsTimeout = setTimeout(() => {
        paragraphs.forEach(p => p.classList.remove('paragraph-highlight'));
    }, totalReadingTime + 1000);
    
    window.highlightTimeouts.push(clearHighlightsTimeout);
}
