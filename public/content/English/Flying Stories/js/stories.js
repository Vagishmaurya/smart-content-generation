// Stories content and related functionality for Flying Stories lesson

// Global variables to track narration state
let isReadingAloud = false;
let currentReadingStory = null;
let speechUtterance = null;
let paragraphTimeouts = [];

// Story content
const stories = {
    'his-first-flight': {
        title: "His First Flight",
        author: "Liam O'Flaherty",
        content: `
            <p>The young seagull was alone on his ledge. His two brothers and his sister had already flown away the day before. He had been afraid to fly with them. Somehow when he had taken a little run forward to the brink of the ledge and attempted to flap his wings he became afraid. The great expanse of sea stretched down beneath, and it was such a long way down — miles down. He felt certain that his wings would never support him; so he bent his head and ran away back to the little hole under the ledge where he slept at night.</p>
            
            <p>Even when each of his brothers and his little sister, whose wings were far shorter than his own, ran to the brink, flapped their wings, and flew away, he failed to muster up courage to take that plunge which appeared to him so desperate. His father and mother had come around calling to him shrilly, upbraiding him, threatening to let him starve on his ledge unless he flew away. But for the life of him he could not move.</p>
            
            <p>That was twenty-four hours ago. Since then nobody had come near him. The day before, all day long, he had watched his parents flying about with his brothers and sister, perfecting them in the art of flight, teaching them how to skim the waves and how to dive for fish. He had, in fact, seen his older brother catch his first herring and devour it, standing on a rock, while his parents circled around raising a proud cackle. And all the morning the whole family had walked about on the big plateau midway down the opposite cliff taunting him with his cowardice.</p>
            
            <p>The sun was now ascending the sky, blazing on his ledge that faced the south. He felt the heat because he had not eaten since the previous nightfall.</p>
            
            <p>He stepped slowly out to the brink of the ledge, and standing on one leg with the other leg hidden under his wing, he closed one eye, then the other, and pretended to be falling asleep. Still they took no notice of him. He saw his two brothers and his sister lying on the plateau dozing with their heads sunk into their necks. His father was preening the feathers on his white back. Only his mother was looking at him. She was standing on a little high hump on the plateau, her white breast thrust forward. Now and again, she tore at a piece of fish that lay at her feet and then scrapped each side of her beak on the rock. The sight of the food maddened him. How he loved to tear food that way, scrapping his beak now and again to whet it.</p>
            
            <p>"Ga, ga, ga," he cried begging her to bring him some food. "Gaw-col-ah," she screamed back derisively. But he kept calling plaintively, and after a minute or so he uttered a joyful scream. His mother had picked up a piece of the fish and was flying across to him with it.</p>
            
            <p>He leaned out eagerly, tapping the rock with his feet, trying to get nearer to her as she flew across. But when she was just opposite to him, she halted, her wings motionless, the piece of fish in her beak almost within reach of his beak. He waited a moment in surprise, wondering why she did not come nearer, and then, maddened by hunger, he dived at the fish. With a loud scream he fell outwards and downwards into space. Then a monstrous terror seized him and his heart stood still. He could hear nothing. But it only lasted a minute. The next moment he felt his wings spread outwards. The wind rushed against his breast feathers, then under his stomach, and against his wings. He could feel the tips of his wings cutting through the air. He was not falling headlong now. He was soaring gradually downwards and outwards. He was no longer afraid. He just felt a bit dizzy. Then he flapped his wings once and he soared upwards. "Ga, ga, ga, ga," he shouted, "ga, ga, ga, ga." His mother swooped past him, her wings making a loud noise. He answered her with another scream. Then his father flew over him screaming. He saw his two brothers and his sister flying around him curveting and banking and soaring and diving.</p>
            
            <p>Then he completely forgot that he had not always been able to fly, and commended himself to dive and soar and curve, shrieking shrilly.</p>
            
            <p>He was near the sea now, flying straight over it, facing straight out over the ocean. He saw a vast green sea beneath him, with little ridges moving over it and he turned his beak sideways and cawed amusedly.</p>
            
            <p>His parents and his brothers and sister had landed on this green floor in front of him. They were beckoning to him, calling shrilly. He dropped his legs to stand on the green sea. His legs sank into it. He screamed with fright and attempted to rise again flapping his wings. But he was tired and weak with hunger and he could not rise, exhausted by the strange exercise. His feet sank into the green sea, and then his belly touched it and he sank no farther. He was floating on it, and around him his family was screaming, praising him and their beaks were offering him scraps of dog-fish.</p>
            
            <p>He had made his first flight.</p>
        `,
        questions: `
            <div class="comprehension-questions">
                <h3>Thinking about the Text</h3>
                <div class="comprehension-question">
                    <p>1. Why was the young seagull afraid to fly? Do you think all young birds are afraid to make their first flight, or are some birds more timid than others? Do you think a human baby also finds it a challenge to take its first steps?</p>
                    <textarea class="answer-area" rows="4" placeholder="Write your answer here..."></textarea>
                </div>
                <div class="comprehension-question">
                    <p>2. "The sight of the food maddened him." What does this suggest? What compelled the young seagull to finally fly?</p>
                    <textarea class="answer-area" rows="4" placeholder="Write your answer here..."></textarea>
                </div>
                <div class="comprehension-question">
                    <p>3. "They were beckoning to him, calling shrilly." Why did the seagull's family members do this? What did they want him to do?</p>
                    <textarea class="answer-area" rows="4" placeholder="Write your answer here..."></textarea>
                </div>
                <div class="comprehension-question">
                    <p>4. Have you ever had a similar experience, where you had to try something new and difficult? Describe the experience and how you felt.</p>
                    <textarea class="answer-area" rows="4" placeholder="Write your answer here..."></textarea>
                </div>
            </div>
        `
    },
    'black-aeroplane': {
        title: "The Black Aeroplane",
        author: "Frederick Forsyth",
        content: `
            <p>The moon was coming up in the east, behind me, and stars were shining in the clear sky above me. There wasn't a cloud in the sky. I was flying my old Dakota aeroplane over France back to England. I was dreaming of my holiday and looking forward to being home. I looked at my watch: one thirty in the morning.</p>
            
            <p>'I should call Paris Control soon,' I thought. As I looked down past the nose of the aeroplane, I saw the lights of a big city in front of me.</p>
            
            <p>I switched on the radio and said, "Paris Control, Dakota DS 088 here. Can you hear me? I'm on my way to England. Over."</p>
            
            <p>The voice from the radio answered me immediately: "DS 088, I can hear you. You ought to turn twelve degrees west now, DS 088. Over."</p>
            
            <p>I checked the map and the compass, switched over to my second and last fuel tank, and turned the Dakota twelve degrees west towards England.</p>
            
            <p>'I'll be in time for breakfast,' I thought. A good big English breakfast! Everything was going well — it was an easy flight.</p>
            
            <p>Paris was about 150 kilometres behind me when I saw the clouds. Storm clouds. They were huge. They looked like black mountains standing in front of me across the sky. I knew I could not fly up and over them, and I did not have enough fuel to fly around them to the north or south.</p>
            
            <p>"I ought to go back to Paris," I thought, but I wanted to get home. I wanted that breakfast.</p>
            
            <p>'I'll take the risk,' I thought, and flew that old Dakota straight into the storm.</p>
            
            <p>Inside the clouds, everything was suddenly black. It was impossible to see anything outside the aeroplane. The old aeroplane jumped and twisted in the air. I looked at the compass. I couldn't believe my eyes: the compass was turning round and round and round. It was dead. It would not work! The other instruments were suddenly dead, too. I tried the radio.</p>
            
            <p>"Paris Control? Paris Control? Can you hear me?"</p>
            
            <p>There was no answer. The radio was dead too. I had no radio, no compass, and I could not see where I was. I was lost in the storm. Then, in the black clouds quite near me, I saw another aeroplane. It had no lights on its wings, but I could see it flying next to me through the storm. I could see the pilot's face — turned towards me. I was very glad to see another person. He lifted one hand and waved.</p>
            
            <p>"Follow me," he was saying. "Follow me."</p>
            
            <p>'He knows that I am lost,' I thought. 'He's trying to help me.'</p>
            
            <p>He turned his aeroplane slowly to the north, in front of my Dakota, so that it would be easier for me to follow him. I was very happy to go behind the strange aeroplane like an obedient child.</p>
            
            <p>After half an hour the strange black aeroplane was still there in front of me in the clouds. Now there was only enough fuel in the old Dakota's last tank to fly for five or ten minutes more. I was starting to feel frightened again. But then he started to go down and I followed through the storm.</p>
            
            <p>Suddenly I came out of the clouds and saw two long straight lines of lights in front of me. It was a runway! An airport! I was safe! I turned to look for my friend in the black aeroplane, but the sky was empty. There was nothing there. The black aeroplane was gone. I could not see it anywhere.</p>
            
            <p>I landed and was not sorry to walk away from the old Dakota near the control tower. I went and asked a woman in the control centre where I was and who the other pilot was. I wanted to say 'Thank you'.</p>
            
            <p>She looked at me very strangely, and then laughed.</p>
            
            <p>"Another aeroplane? Up there in this storm? No other aeroplanes were flying tonight. Yours was the only one I could see on the radar."</p>
            
            <p>So who helped me to arrive there safely without a compass or a radio, and without any more fuel in my tanks? Who was the pilot on the strange black aeroplane, flying in the storm, without lights?</p>
        `,
        questions: `
            <div class="comprehension-questions">
                <h3>Thinking about the Text</h3>
                <div class="comprehension-question">
                    <p>1. "I'll take the risk." What is the risk? Why does the narrator take it?</p>
                    <textarea class="answer-area" rows="4" placeholder="Write your answer here..."></textarea>
                </div>
                <div class="comprehension-question">
                    <p>2. Describe the narrator's experience as he flew the aeroplane into the storm.</p>
                    <textarea class="answer-area" rows="4" placeholder="Write your answer here..."></textarea>
                </div>
                <div class="comprehension-question">
                    <p>3. Why does the narrator say, "I landed and was not sorry to walk away from the old Dakota…"?</p>
                    <textarea class="answer-area" rows="4" placeholder="Write your answer here..."></textarea>
                </div>
                <div class="comprehension-question">
                    <p>4. Who do you think helped the narrator to reach safely? Discuss this among your group.</p>
                    <textarea class="answer-area" rows="4" placeholder="Write your answer here..."></textarea>
                </div>
            </div>
        `
    }
};

// Load a specific story
function loadStory(storyId) {
    const storyContainer = document.getElementById('story-container');
    const questionsContainer = document.getElementById('questions-container');
    
    if (!storyContainer || !questionsContainer) {
        console.error('Story or questions container not found');
        return;
    }
    
    const story = stories[storyId];
    if (!story) {
        console.error(`Story with ID ${storyId} not found`);
        return;
    }
    
    // Update story content
    storyContainer.innerHTML = `
        <h2 class="story-title">${story.title}</h2>
        <p class="story-author">by ${story.author}</p>
        <div class="story-content">
            ${story.content}
        </div>
        <div class="button-container">
            <button class="interactive-btn" onclick="readStoryAloud('${storyId}')">🔊 Read Aloud</button>
        </div>
    `;
    
    // Update questions
    questionsContainer.innerHTML = story.questions;
    
    // Stop any ongoing narration
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
        
        // Clear any timeouts
        paragraphTimeouts.forEach(timeout => clearTimeout(timeout));
        paragraphTimeouts = [];
    }
    
    // Reset reading state
    isReadingAloud = false;
    currentReadingStory = null;
}

// Read story aloud
function readStoryAloud(storyId) {
    // Check if audio is globally enabled
    if (typeof isAudioEnabled !== 'undefined' && !isAudioEnabled) {
        showFeedback('Audio narration is currently disabled. Please enable it first.');
        return;
    }

    if (!window.speechSynthesis) {
        showFeedback('Your browser does not support speech synthesis.');
        return;
    }
    
    const story = stories[storyId];
    if (!story) {
        console.error(`Story with ID ${storyId} not found`);
        return;
    }
    
    // If already reading this story, stop it
    if (isReadingAloud && currentReadingStory === storyId) {
        stopReading();
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
        
        // Clear any paragraph highlights
        document.querySelectorAll('.paragraph-highlight').forEach(p => {
            p.classList.remove('paragraph-highlight');
        });
        
        // Clear any timeouts
        paragraphTimeouts.forEach(timeout => clearTimeout(timeout));
        paragraphTimeouts = [];
    }
    
    // Set reading state
    isReadingAloud = true;
    currentReadingStory = storyId;
    
    // Get paragraphs from story content
    const storyContent = document.querySelector('.story-content');
    if (!storyContent) {
        console.error('Story content container not found');
        return;
    }
    
    // Get all paragraphs
    const paragraphs = Array.from(storyContent.querySelectorAll('p'))
        .filter(p => p.textContent.trim().length > 0);
    
    // Create reading indicator
    const readingIndicator = document.createElement('div');
    readingIndicator.className = 'reading-indicator';
    readingIndicator.innerHTML = '<div class="reading-spinner"></div> Reading aloud...';
    storyContent.appendChild(readingIndicator);
    
    // Update button state
    const readButton = document.querySelector(`[onclick="readStoryAloud('${storyId}')"]`);
    if (readButton) {
        readButton.innerHTML = '⏹️ Stop Reading';
        readButton.onclick = function() { stopReading(); };
    }
    
    // Read paragraphs sequentially with visual highlighting
    readParagraphsSequentially(paragraphs, readingIndicator, storyId);
}

// Read paragraphs sequentially with visual highlighting
function readParagraphsSequentially(paragraphs, readingIndicator, storyId) {
    // Stop any ongoing speech first
    window.speechSynthesis.cancel();
    
    // Clear any existing timeouts
    paragraphTimeouts.forEach(timeout => clearTimeout(timeout));
    paragraphTimeouts = [];
    
    // Remove any existing paragraph highlights
    document.querySelectorAll('.paragraph-highlight').forEach(p => {
        p.classList.remove('paragraph-highlight');
    });
    
    let currentIndex = 0;
    let totalDuration = 0;
    
    // Function to read the next paragraph
    const readNextParagraph = () => {
        if (currentIndex < paragraphs.length && isReadingAloud) {
            const paragraph = paragraphs[currentIndex];
            
            // Remove highlight from previous paragraph
            if (currentIndex > 0) {
                paragraphs[currentIndex - 1].classList.remove('paragraph-highlight');
            }
            
            // Add highlight to current paragraph
            paragraph.classList.add('paragraph-highlight');
            
            // Scroll paragraph into view
            paragraph.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Get clean text content
            const text = paragraph.textContent.trim();
            
            // Create utterance for this paragraph
            speechUtterance = new SpeechSynthesisUtterance(text);
            speechUtterance.rate = 0.9;
            speechUtterance.pitch = 1.0;
            
            // When paragraph is done, move to next one
            speechUtterance.onend = () => {
                currentIndex++;
                if (currentIndex < paragraphs.length) {
                    readNextParagraph();
                } else {
                    // All paragraphs complete
                    stopReading();
                }
            };
            
            // Error handling
            speechUtterance.onerror = (event) => {
                console.error('Speech synthesis error:', event);
                stopReading();
            };
            
            // Start speaking this paragraph
            window.speechSynthesis.speak(speechUtterance);
            
            // Estimate duration for fallback timeout (200ms per word)
            const wordCount = text.split(/\s+/).length;
            const estimatedDuration = wordCount * 200;
            
            // Fallback to move to next paragraph if speech synthesis fails silently
            const fallbackTimeout = setTimeout(() => {
                if (window.speechSynthesis.speaking) {
                    // Still speaking, do nothing
                    return;
                }
                
                // If not speaking anymore but we didn't get the onend event
                currentIndex++;
                if (currentIndex < paragraphs.length) {
                    readNextParagraph();
                } else {
                    // All paragraphs complete
                    stopReading();
                }
            }, estimatedDuration + 1000); // Add 1 second buffer
            
            paragraphTimeouts.push(fallbackTimeout);
            
            totalDuration += estimatedDuration;
        } else {
            // All paragraphs complete or reading stopped
            stopReading();
        }
    };
    
    // Add stop button to reading indicator
    const stopButton = document.createElement('button');
    stopButton.className = 'stop-narration-btn';
    stopButton.textContent = 'Stop';
    stopButton.onclick = stopReading;
    readingIndicator.appendChild(stopButton);
    
    // Start the reading process
    readNextParagraph();
    
    // Fallback to stop reading after estimated total duration plus buffer
    const totalTimeout = setTimeout(() => {
        stopReading();
    }, totalDuration + 10000); // Add 10 second buffer
    
    paragraphTimeouts.push(totalTimeout);
}

// Stop reading function
function stopReading() {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    // Update button state
    const storyId = currentReadingStory;
    if (storyId) {
        const readButton = document.querySelector(`[onclick="readStoryAloud('${storyId}')"]`);
        if (readButton) {
            readButton.innerHTML = '🔊 Read Aloud';
            readButton.onclick = function() { readStoryAloud(storyId); };
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
    
    // Remove paragraph highlights
    document.querySelectorAll('.paragraph-highlight').forEach(p => {
        p.classList.remove('paragraph-highlight');
    });
    
    // Clear any timeouts
    paragraphTimeouts.forEach(timeout => clearTimeout(timeout));
    paragraphTimeouts = [];
    
    // Reset reading state
    isReadingAloud = false;
    currentReadingStory = null;
    speechUtterance = null;
}