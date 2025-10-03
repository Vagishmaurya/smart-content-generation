// Poems content and related functionality for Flying Stories lesson

// Global variables to track narration state
let isReadingPoemAloud = false;
let currentReadingPoem = null;
let poemSpeechUtterance = null;
let poemTimeouts = [];

// Poems content
const poems = {
    'wild-animals': {
        title: "How to Tell Wild Animals",
        author: "Carolyn Wells",
        content: `
            <p>If ever you should go by chance<br>
            To jungles in the east;<br>
            And if there should to you advance<br>
            A large and tawny beast,<br>
            If he roars at you as you're dyin'<br>
            You'll know it is the Asian Lion...</p>
            
            <p>Or if some time when roaming round,<br>
            A noble wild beast greets you,<br>
            With black stripes on a yellow ground,<br>
            Just notice if he eats you.<br>
            This simple rule may help you learn<br>
            The Bengal Tiger to discern.</p>
            
            <p>If strolling forth, a beast you view,<br>
            Whose hide with spots is peppered,<br>
            As soon as he has lept on you,<br>
            You'll know it is the Leopard.<br>
            'Twill do no good to roar with pain,<br>
            He'll only lep and lep again.</p>
            
            <p>If when you're walking round your yard<br>
            You meet a creature there,<br>
            Who hugs you very, very hard,<br>
            Be sure it is a Bear.<br>
            If you have any doubts, I guess<br>
            He'll give you just one more caress.</p>
            
            <p>Though to distinguish beasts of prey<br>
            A novice might nonplus,<br>
            The Crocodile you always may<br>
            Tell from the Hyena thus:<br>
            Hyenas come with merry smiles;<br>
            But if they weep they're Crocodiles.</p>
            
            <p>The true Chameleon is small,<br>
            A lizard sort of thing;<br>
            He hasn't any ears at all,<br>
            And not a single wing.<br>
            If there is nothing on the tree,<br>
            'Tis the chameleon you see.</p>
        `,
        glossary: `
            <h3>Glossary</h3>
            <dl>
                <dt>tawny</dt>
                <dd>yellowish-brown colour</dd>
                <dt>discern</dt>
                <dd>make out, identify</dd>
                <dt>peppered</dt>
                <dd>here, covered with spots</dd>
                <dt>nonplus</dt>
                <dd>puzzle, confuse</dd>
            </dl>
        `,
        questions: `
            <div class="poem-questions">
                <h3>Thinking about the Poem</h3>
                <div class="poem-question">
                    <p>1. Does 'dyin' really rhyme with 'lion'? Can you say it in such a way that it does?</p>
                    <textarea class="answer-area" rows="3" placeholder="Write your answer here..."></textarea>
                </div>
                <div class="poem-question">
                    <p>2. How does the poet suggest that you identify the lion and the tiger? When can you do so, according to him?</p>
                    <textarea class="answer-area" rows="3" placeholder="Write your answer here..."></textarea>
                </div>
                <div class="poem-question">
                    <p>3. Do you think the words 'lep' and 'lep' in the third stanza are spelt correctly? Why does the poet spell them like this?</p>
                    <textarea class="answer-area" rows="3" placeholder="Write your answer here..."></textarea>
                </div>
                <div class="poem-question">
                    <p>4. Do you know what a 'bear hug' is? It's a friendly and strong hug — such as bears are thought to give, as they attack you! Again, hyenas are thought to laugh, and crocodiles to weep ('crocodile tears') as they swallow their victims. Are there similar expressions and popular ideas about wild animals in your own language(s)?</p>
                    <textarea class="answer-area" rows="3" placeholder="Write your answer here..."></textarea>
                </div>
                <div class="poem-question">
                    <p>5. Look at the line "A novice might nonplus". How would you write this 'correctly'? Why is the poet's 'incorrect' line better in the poem?</p>
                    <textarea class="answer-area" rows="3" placeholder="Write your answer here..."></textarea>
                </div>
                <div class="poem-question">
                    <p>6. Can you find other examples of poets taking liberties with language, either in English or in your own language(s)? Can you find examples of humorous poems in your own language(s)?</p>
                    <textarea class="answer-area" rows="3" placeholder="Write your answer here..."></textarea>
                </div>
            </div>
        `
    },
    'ball-poem': {
        title: "The Ball Poem",
        author: "John Berryman",
        content: `
            <p>What is the boy now, who has lost his ball,<br>
            What, what is he to do? I saw it go<br>
            Merrily bouncing, down the street, and then<br>
            Merrily over — there it is in the water!<br>
            No use to say 'O there are other balls':<br>
            An ultimate shaking grief fixes the boy<br>
            As he stands rigid, trembling, staring down<br>
            All his young days into the harbour where<br>
            His ball went. I would not intrude on him,<br>
            A dime, another ball, is worthless. Now<br>
            He senses first responsibility<br>
            In a world of possessions. People will take<br>
            Balls, balls will be lost always, little boy,<br>
            And no one buys a ball back. Money is external.<br>
            He is learning, well behind his desperate eyes,<br>
            The epistemology of loss, how to stand up<br>
            Knowing what every man must one day know<br>
            And most know many days, how to stand up<br>
            And gradually light returns to the street,<br>
            A whistle blows, the ball is out of sight.<br>
            Soon part of me will explore the deep and dark<br>
            Floor of the harbour . . . I am everywhere,<br>
            I suffer and move, my mind and my heart move<br>
            With all that move me, under the water<br>
            Or whistling, I am not a little boy.</p>
        `,
        glossary: `
            <h3>Glossary</h3>
            <dl>
                <dt>dime</dt>
                <dd>a 10-cent coin</dd>
                <dt>epistemology</dt>
                <dd>understanding, knowledge</dd>
            </dl>
        `,
        questions: `
            <div class="poem-questions">
                <h3>Thinking about the Poem</h3>
                <div class="poem-question">
                    <p>1. Why does the poet say, "I would not intrude on him"? Why doesn't he offer him money to buy another ball?</p>
                    <textarea class="answer-area" rows="3" placeholder="Write your answer here..."></textarea>
                </div>
                <div class="poem-question">
                    <p>2. "... staring down/All his young days into the harbour where/His ball went ..." Do you think the boy has had the ball for a long time? Is it linked to the memories of days when he played with it?</p>
                    <textarea class="answer-area" rows="3" placeholder="Write your answer here..."></textarea>
                </div>
                <div class="poem-question">
                    <p>3. What does "in the world of possessions" mean?</p>
                    <textarea class="answer-area" rows="3" placeholder="Write your answer here..."></textarea>
                </div>
                <div class="poem-question">
                    <p>4. Do you think the boy has lost anything earlier? Pick out the words that suggest the answer.</p>
                    <textarea class="answer-area" rows="3" placeholder="Write your answer here..."></textarea>
                </div>
                <div class="poem-question">
                    <p>5. What does the poet say the boy is learning from the loss of the ball? Try to explain this in your own words.</p>
                    <textarea class="answer-area" rows="3" placeholder="Write your answer here..."></textarea>
                </div>
            </div>
        `
    }
};

// Load a specific poem
function loadPoem(poemId) {
    const poemContainers = document.querySelectorAll('.poem-container');
    
    // Hide all poems
    poemContainers.forEach(container => {
        container.classList.remove('active');
    });
    
    // Show selected poem
    const poemContainer = document.getElementById(`${poemId}-container`);
    if (poemContainer) {
        poemContainer.classList.add('active');
        
        // Update poem content if not already loaded
        if (!poemContainer.querySelector('.poem-content')) {
            const poem = poems[poemId];
            if (!poem) {
                console.error(`Poem with ID ${poemId} not found`);
                return;
            }
            
            poemContainer.innerHTML = `
                <h2 class="poem-title">${poem.title}</h2>
                <p class="poem-author">by ${poem.author}</p>
                <div class="poem-content">
                    ${poem.content}
                </div>
                <div class="poem-glossary">
                    ${poem.glossary}
                </div>
                <div class="poem-analysis">
                    ${poem.questions}
                </div>
                <div class="button-container">
                    <button class="interactive-btn" onclick="readPoemAloud('${poemId}')">🔊 Read Poem Aloud</button>
                </div>
            `;
        }
        
        // Update navigation buttons
        document.querySelectorAll('.poem-nav-btn').forEach(btn => {
            btn.classList.remove('active');
            btn.setAttribute('aria-pressed', 'false');
        });
        
        document.querySelector(`.poem-nav-btn[data-poem="${poemId}"]`).classList.add('active');
        document.querySelector(`.poem-nav-btn[data-poem="${poemId}"]`).setAttribute('aria-pressed', 'true');
    }
    
    // Stop any ongoing narration
    if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
        
        // Clear any reading indicators
        document.querySelectorAll('.reading-indicator').forEach(indicator => {
            if (indicator.parentNode) {
                indicator.parentNode.removeChild(indicator);
            }
        });
    }
    
    // Reset reading state
    isReadingPoemAloud = false;
    currentReadingPoem = null;
}

// Read poem aloud
function readPoemAloud(poemId) {
    // Check if audio is globally enabled
    if (typeof isAudioEnabled !== 'undefined' && !isAudioEnabled) {
        showFeedback('Audio narration is currently disabled. Please enable it first.');
        return;
    }

    if (!window.speechSynthesis) {
        showFeedback('Your browser does not support speech synthesis.');
        return;
    }
    
    const poem = poems[poemId];
    if (!poem) {
        console.error(`Poem with ID ${poemId} not found`);
        return;
    }
    
    // If already reading this poem, stop it
    if (isReadingPoemAloud && currentReadingPoem === poemId) {
        stopPoemReading();
        return;
    }
    
    // Stop any ongoing narration
    if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
        
        // Clear any reading indicators
        document.querySelectorAll('.reading-indicator').forEach(indicator => {
            if (indicator.parentNode) {
                indicator.parentNode.removeChild(indicator);
            }
        });
    }
    
    // Set reading state
    isReadingPoemAloud = true;
    currentReadingPoem = poemId;
    
    // Get poem content container
    const poemContent = document.querySelector(`#${poemId}-container .poem-content`);
    if (!poemContent) {
        console.error('Poem content container not found');
        return;
    }
    
    // Create a temporary div to extract clean text
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = poem.content;
    const poemText = tempDiv.textContent.trim();
    
    // Create reading indicator
    const readingIndicator = document.createElement('div');
    readingIndicator.className = 'reading-indicator';
    readingIndicator.innerHTML = '<div class="reading-spinner"></div> Reading poem aloud...';
    poemContent.appendChild(readingIndicator);
    
    // Update button state
    const readButton = document.querySelector(`[onclick="readPoemAloud('${poemId}')"]`);
    if (readButton) {
        readButton.innerHTML = '⏹️ Stop Reading';
        readButton.onclick = function() { stopPoemReading(); };
    }
    
    // Create utterance for the poem
    poemSpeechUtterance = new SpeechSynthesisUtterance(poemText);
    poemSpeechUtterance.rate = 0.8; // Slower for poetry
    poemSpeechUtterance.pitch = 1.0;
    
    // When poem is done
    poemSpeechUtterance.onend = () => {
        stopPoemReading();
    };
    
    // Error handling
    poemSpeechUtterance.onerror = (event) => {
        console.error('Speech synthesis error:', event);
        stopPoemReading();
    };
    
    // Start speaking the poem
    window.speechSynthesis.speak(poemSpeechUtterance);
    
    // Add stop button to reading indicator
    const stopButton = document.createElement('button');
    stopButton.className = 'stop-narration-btn';
    stopButton.textContent = 'Stop';
    stopButton.onclick = stopPoemReading;
    readingIndicator.appendChild(stopButton);
    
    // Fallback timeout (estimate 5 minutes max for a poem)
    const fallbackTimeout = setTimeout(() => {
        stopPoemReading();
    }, 300000); // 5 minutes
    
    poemTimeouts.push(fallbackTimeout);
}

// Stop poem reading function
function stopPoemReading() {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    // Update button state
    const poemId = currentReadingPoem;
    if (poemId) {
        const readButton = document.querySelector(`[onclick="readPoemAloud('${poemId}')"]`);
        if (readButton) {
            readButton.innerHTML = '🔊 Read Poem Aloud';
            readButton.onclick = function() { readPoemAloud(poemId); };
        }
    }
    
    // Remove reading indicator
    const readingIndicator = document.querySelector('.reading-indicator');
    if (readingIndicator && readingIndicator.parentNode) {
        readingIndicator.classList.add('fade-out');
        setTimeout(() => {
            if (readingIndicator.parentNode) {
                readingIndicator.parentNode.removeChild(readingIndicator);
            }
        }, 500);
    }
    
    // Clear any timeouts
    poemTimeouts.forEach(timeout => clearTimeout(timeout));
    poemTimeouts = [];
    
    // Reset reading state
    isReadingPoemAloud = false;
    currentReadingPoem = null;
    poemSpeechUtterance = null;
}