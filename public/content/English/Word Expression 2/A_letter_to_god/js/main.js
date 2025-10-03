/**
 * Main JavaScript for Interactive English Lesson: A Letter to God
 */

// Global Variables
let progress = 0;
let score = 0;
let modulesCompleted = [];
let currentModule = 'intro';
let audioEnabled = true;
let narrator = null;
let timeStarted = Date.now();
let selectedMatch = { term: null, def: null };
let userInteracted = false;

// Global narration state management
let globalNarrationState = {
    isEnabled: false,
    disabledByUser: false,
    currentModule: null,
    currentPart: null
};

// Initialize on load
window.addEventListener('load', () => {
    initializeNarrator();
    updateTimer();
    setInterval(updateTimer, 1000);
    
    // Add global user interaction tracking
    document.addEventListener('click', trackUserInteraction, { once: true });
    document.addEventListener('keydown', trackUserInteraction, { once: true });
    document.addEventListener('touchstart', trackUserInteraction, { once: true });
    
    // Don't speak immediately - wait for user interaction
    // Welcome message will be spoken when user clicks start
});

// Initialize Narrator
function initializeNarrator() {
    if ('speechSynthesis' in window) {
        console.log('Initializing narrator...');
        narrator = {
            synth: window.speechSynthesis,
            enabled: true,
            voice: null,
            isSafari: /^((?!chrome|android).)*safari/i.test(navigator.userAgent),
            isIOS: /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream,
            currentUtterance: null,
            onEndCallback: null,
            
            speak: function(text) {
                if (!this.enabled) return;
                
                // Ensure narrator is properly initialized
                if (!this.synth) {
                    console.error('Speech synthesis not available');
                    return;
                }
                
                // Check if user has interacted (required for autoplay policy)
                if (!userInteracted) {
                    console.log('Speech synthesis blocked - waiting for user interaction');
                    this.showFallbackMessage(text);
                    return;
                }
                
                // Cancel any ongoing speech
                this.synth.cancel();
                
                // Pre-process text for better narration quality
                const processedText = this.preprocessText(text);
                
                // Create new utterance
                const utterance = new SpeechSynthesisUtterance(processedText);
                
                // Set voice parameters based on browser
                this.optimizeVoiceParameters(utterance);
                
                // Select appropriate voice if available
                if (!this.voice) {
                    // Initialize voices if not done already
                    this.initializeVoices();
                }
                
                if (this.voice) {
                    utterance.voice = this.voice;
                }
                
                // Add error handling
                utterance.onerror = (event) => {
                    console.error('Speech synthesis error:', event);
                    if (event.error === 'not-allowed') {
                        console.log('Speech synthesis not allowed - showing fallback message');
                        userInteracted = false; // Reset interaction flag
                        this.showFallbackMessage(processedText);
                    } else if (event.error === 'interrupted') {
                        console.log('Speech synthesis was interrupted - this is normal when switching content');
                        // Don't show fallback message for interruptions as they're expected
                    } else {
                        console.log('Speech synthesis error - showing fallback message');
                        this.showFallbackMessage(processedText);
                    }
                };
                
            // Store current utterance for reference
            this.currentUtterance = utterance;
            
            // Set up end event handler
            utterance.onend = (event) => {
                console.log('Speech ended');
                // Clear current utterance reference
                this.currentUtterance = null;
                if (this.onEndCallback && typeof this.onEndCallback === 'function') {
                    this.onEndCallback();
                }
            };
            
            // Safari/iOS specific handling
            if (this.isSafari || this.isIOS) {
                this.speakForSafari(utterance, processedText);
            } else {
                // Speak the text for other browsers
                this.synth.speak(utterance);
            }
            },
            
            // Safari-specific speech handling
            speakForSafari: function(utterance, text) {
                // Safari has issues with long text, so we'll chunk it
                const chunks = this.chunkText(text);
                
                // Queue each chunk with a slight delay between them
                let i = 0;
                const speakNextChunk = () => {
                    if (i < chunks.length && this.enabled) {
                        const chunkUtterance = new SpeechSynthesisUtterance(chunks[i]);
                        // Copy properties from original utterance
                        chunkUtterance.voice = utterance.voice;
                        chunkUtterance.rate = utterance.rate;
                        chunkUtterance.pitch = utterance.pitch;
                        chunkUtterance.volume = utterance.volume;
                        
                        // Set up to speak next chunk when this one ends
                        chunkUtterance.onend = () => {
                            i++;
                            if (i < chunks.length) {
                                setTimeout(speakNextChunk, 50); // Small delay between chunks
                            } else {
                                // Last chunk finished, trigger the end callback
                                console.log('Safari speech completed');
                                if (this.onEndCallback && typeof this.onEndCallback === 'function') {
                                    this.onEndCallback();
                                }
                            }
                        };
                        
                        chunkUtterance.onerror = (event) => {
                            console.error('Speech synthesis error in chunk:', event);
                            i++;
                            if (i < chunks.length) {
                                setTimeout(speakNextChunk, 50);
                            } else {
                                // Last chunk errored, still trigger the end callback
                                if (this.onEndCallback && typeof this.onEndCallback === 'function') {
                                    this.onEndCallback();
                                }
                            }
                        };
                        
                        this.synth.speak(chunkUtterance);
                    }
                };
                
                speakNextChunk();
            },
            
            // Break text into smaller chunks for better Safari performance
            chunkText: function(text) {
                // Split by sentences and ensure chunks aren't too long
                const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
                const chunks = [];
                let currentChunk = '';
                
                sentences.forEach(sentence => {
                    // If adding this sentence would make the chunk too long, start a new chunk
                    if (currentChunk.length + sentence.length > 200) {
                        if (currentChunk) chunks.push(currentChunk);
                        currentChunk = sentence;
                    } else {
                        currentChunk += sentence;
                    }
                });
                
                if (currentChunk) chunks.push(currentChunk);
                return chunks.length ? chunks : [text];
            },
            
            // Preprocess text for better speech quality
            preprocessText: function(text) {
                // Replace abbreviations and symbols for better pronunciation
                let processed = text
                    .replace(/Mr\./g, "Mister ")
                    .replace(/Mrs\./g, "Missus ")
                    .replace(/Dr\./g, "Doctor ")
                    .replace(/St\./g, "Saint ")
                    .replace(/No\./g, "Number ")
                    .replace(/etc\./g, "etcetera ")
                    .replace(/\be\.g\./g, "for example ")
                    .replace(/\bi\.e\./g, "that is ")
                    .replace(/\&/g, " and ")
                    .replace(/\$/g, " dollars ")
                    .replace(/\%/g, " percent ");
                
                // Add pauses at punctuation for more natural speech
                // Use extra spacing for all browsers since SSML breaks don't work reliably
                processed = this.addNaturalPauses(processed);
                
                return processed;
            },
            
            // Set optimal voice parameters based on browser
            optimizeVoiceParameters: function(utterance) {
                if (this.isSafari || this.isIOS) {
                    // Safari/iOS needs different parameters
                    utterance.rate = 0.9;   // Slightly slower
                    utterance.pitch = 1.0;  // Normal pitch
                    utterance.volume = 1.0; // Full volume
                } else {
                    // Chrome/Firefox/Edge parameters
                    utterance.rate = 0.85;  // Slightly slower for better clarity
                    utterance.pitch = 1.05; // Slightly higher pitch for female voice
                    utterance.volume = 1.0; // Full volume
                }
            },
            
            initializeVoices: function() {
                // Get available voices
                const voices = this.synth.getVoices();
                console.log('Available voices:', voices.map(v => v.name + ' (' + v.lang + ')'));
                
                // Different voice selection strategy based on browser
                if (this.isSafari || this.isIOS) {
                    this.selectSafariVoice(voices);
                } else {
                    this.selectStandardVoice(voices);
                }
            },
            
            // Voice selection optimized for Safari/iOS
            selectSafariVoice: function(voices) {
                // Safari has good built-in voices
                let preferredVoice = voices.find(voice => 
                    voice.name.includes('Samantha') || // High quality US female voice on iOS
                    voice.name.includes('Moira') ||    // High quality Irish female voice on iOS
                    voice.name.includes('Tessa')       // High quality UK female voice on iOS
                );
                
                // Fallback to any English voice
                if (!preferredVoice) {
                    preferredVoice = voices.find(voice => voice.lang.startsWith('en'));
                }
                
                if (preferredVoice) {
                    this.voice = preferredVoice;
                    console.log('Selected Safari voice:', preferredVoice.name);
                }
            },
            
            // Voice selection for Chrome/Firefox/Edge
            selectStandardVoice: function(voices) {
                // Try to find a high-quality British female voice
                let preferredVoice = voices.find(voice => 
                    voice.name.includes('UK English Female') || 
                    voice.name.includes('Google UK English Female')
                );
                
                // Fallback to any British voice
                if (!preferredVoice) {
                    preferredVoice = voices.find(voice => voice.lang === 'en-GB');
                }
                
                // Fallback to any English female voice
                if (!preferredVoice) {
                    preferredVoice = voices.find(voice => 
                        voice.lang.startsWith('en') && 
                        (voice.name.includes('Female') || voice.name.includes('female'))
                    );
                }
                
                // Use any available voice as last resort
                if (!preferredVoice && voices.length > 0) {
                    preferredVoice = voices[0];
                }
                
                if (preferredVoice) {
                    this.voice = preferredVoice;
                    console.log('Selected voice:', preferredVoice.name);
                } else {
                    console.warn('No suitable voice found for narration');
                }
            },
            
            addNaturalPauses: function(text) {
                // Add extra spaces at punctuation for more natural speech pauses
                // SSML breaks don't work reliably across browsers, so we use spacing instead
                return text
                    .replace(/\.\s/g, '.  ')
                    .replace(/\!\s/g, '!  ')
                    .replace(/\?\s/g, '?  ')
                    .replace(/,\s/g, ',  ')
                    .replace(/;\s/g, ';  ')
                    .replace(/:\s/g, ':  ');
            },
            
            stop: function() {
                this.synth.cancel();
                
                // Clear current utterance reference
                this.currentUtterance = null;
                
                // Clear any callbacks
                if (this.onEndCallback) {
                    this.onEndCallback = null;
                }
                
                console.log('Speech synthesis stopped');
            },
            
            toggle: function() {
                this.enabled = !this.enabled;
                if (!this.enabled) this.stop();
                return this.enabled;
            },
            
            showFallbackMessage: function(text) {
                // Create a fallback message box if speech fails
                const fallback = document.createElement('div');
                fallback.className = 'narrator-fallback';
                fallback.innerHTML = `
                    <div class="fallback-header">
                        <h4>🔊 Narrator says:</h4>
                        <button class="fallback-close" onclick="this.parentNode.parentNode.remove()">×</button>
                    </div>
                    <p>${text}</p>
                `;
                document.body.appendChild(fallback);
                
                // Auto-remove after 8 seconds
                setTimeout(() => {
                    if (fallback.parentNode) {
                        fallback.classList.add('fade-out');
                        setTimeout(() => fallback.remove(), 500);
                    }
                }, 8000);
            }
        };
        
        // Make narrator available globally for other modules
        window.narrator = narrator;
        
        // Handle voices being loaded asynchronously in some browsers
        if (window.speechSynthesis.onvoiceschanged !== undefined) {
            window.speechSynthesis.onvoiceschanged = function() {
                narrator.initializeVoices();
            };
        } else {
            // For Safari which doesn't always fire onvoiceschanged
            setTimeout(() => {
                if (!narrator.voice) {
                    narrator.initializeVoices();
                }
            }, 1000);
        }
        
    } else {
        console.warn('Speech synthesis not supported in this browser');
    }
}

// Update Timer
function updateTimer() {
    const elapsed = Math.floor((Date.now() - timeStarted) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    document.getElementById('timeSpent').textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

// Module Navigation
function showModule(moduleId) {
    console.log(`Showing module: ${moduleId}`);
    
    // Stop any ongoing narration when switching modules
    if (window.narrator && window.narrator.currentUtterance) {
        console.log('Stopping ongoing narration due to module switch');
        window.narrator.stop();
        
        // Clear any reading indicators from previous modules
        document.querySelectorAll('.reading-indicator').forEach(indicator => {
            indicator.classList.add('fade-out');
            setTimeout(() => {
                if (indicator.parentNode) indicator.remove();
            }, 500);
        });
        
        // Clear any paragraph highlights from previous modules
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
    
    // Hide all modules
    document.querySelectorAll('.module').forEach(m => m.classList.remove('active'));
    
    // Show selected module
    const moduleElement = document.getElementById(moduleId);
    if (!moduleElement) {
        console.error(`Module element not found: ${moduleId}`);
        return;
    }
    
    moduleElement.classList.add('active');
    
    // Update navigation
    document.querySelectorAll('.nav-item').forEach(n => {
        n.classList.remove('active');
        n.setAttribute('aria-pressed', 'false');
    });
    
    // Find and update the clicked nav item
    const navItems = document.querySelectorAll('.nav-item');
    for (let item of navItems) {
        if (item.onclick && item.onclick.toString().includes(moduleId)) {
            item.classList.add('active');
            item.setAttribute('aria-pressed', 'true');
            break;
        }
    }
    
    // Track completion
    if (!modulesCompleted.includes(moduleId)) {
        modulesCompleted.push(moduleId);
        updateProgress();
        showAchievement(`Module Completed: ${moduleId}`);
    }
    
    currentModule = moduleId;
    
    // Handle specific module initialization
    switch(moduleId) {
        case 'story':
            // Always show Part 1 when entering the story module
            showStoryPart(1);
            break;
        case 'thinking-text':
            console.log('Initializing thinking-text module');
            // Always reload thinking text questions to ensure they appear
            loadTextThinkingQuestions();
            break;
        case 'thinking-language':
            console.log('Initializing thinking-language module');
            // Load hope exercises if needed
            if (typeof loadHopeExercises === 'function') {
                loadHopeExercises();
            }
            // Load relative clause exercises if needed
            if (typeof loadRelativeClauseExercises === 'function') {
                loadRelativeClauseExercises();
            }
            break;
        case 'poetry':
            console.log('Initializing poetry module');
            // Always reload poetry questions to ensure they appear
            if (typeof loadPoetryQuestions === 'function') {
                loadPoetryQuestions();
            }
            break;
        case 'activities':
            console.log('Initializing activities module');
            // Initialize activities if needed
            if (typeof initializeWritingActivity === 'function') {
                initializeWritingActivity();
            }
            if (typeof initializeSpeakingActivity === 'function') {
                initializeSpeakingActivity();
            }
            break;
    }
    
    // Automatically start narrating the new module content
    setTimeout(() => {
        startModuleNarration(moduleId);
    }, 200); // Small delay to ensure module is fully loaded
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// Start module narration automatically
function startModuleNarration(moduleId) {
    if (!window.narrator || !window.narrator.enabled) {
        console.log('Narrator not available or disabled');
        return;
    }
    
    console.log(`Starting automatic narration for module: ${moduleId}`);
    
    switch(moduleId) {
        case 'prereading':
            if (window.narrator) {
                window.narrator.speak("Welcome to the pre-reading activity. Learn about the money order process that will be important in the story!");
            }
            break;
            
        case 'story':
            // Automatically start reading the first part of the story
            if (typeof readStoryPartAloud === 'function') {
                readStoryPartAloud(1, false); // false = automatic call
            }
            break;
            
        case 'thinking-text':
            if (window.narrator) {
                window.narrator.speak("Welcome to the thinking about the text section. Here you'll analyze the story and answer comprehension questions.");
            }
            break;
            
        case 'thinking-language':
            if (window.narrator) {
                window.narrator.speak("Welcome to the thinking about language section. Here you'll explore vocabulary and grammar concepts from the story.");
            }
            break;
            
        case 'poetry':
            if (window.narrator) {
                window.narrator.speak("Welcome to the poetry section. Here you'll read and analyze two beautiful poems by Robert Frost.");
            }
            break;
            
        case 'activities':
            if (window.narrator) {
                window.narrator.speak("Welcome to the activities section. Here you'll practice listening, writing, and speaking skills related to the story.");
            }
            break;
            
        default:
            console.log(`No specific narration defined for module: ${moduleId}`);
            break;
    }
}

// Update Progress
function updateProgress() {
    progress = (modulesCompleted.length / 7) * 100;
    const progressBar = document.getElementById('progressBar');
    progressBar.style.width = progress + '%';
    progressBar.textContent = Math.round(progress) + '%';
    document.getElementById('modulesComplete').textContent = modulesCompleted.length;
    
    // Update ARIA values
    const progressBarContainer = document.querySelector('.progress-bar');
    if (progressBarContainer) {
        progressBarContainer.setAttribute('aria-valuenow', Math.round(progress));
    }
}

// Show Achievement
function showAchievement(text) {
    const popup = document.getElementById('achievementPopup');
    document.getElementById('achievementDesc').textContent = text;
    popup.classList.add('show');
    
    score += 10;
    document.getElementById('totalScore').textContent = score;
    
    setTimeout(() => {
        popup.classList.remove('show');
    }, 3000);
}

// Track user interaction for speech synthesis
function trackUserInteraction() {
    if (!userInteracted) {
        userInteracted = true;
        console.log('User interaction detected - speech synthesis enabled');
    }
}

// Start Journey
function startJourney() {
    trackUserInteraction(); // Enable speech synthesis
    showModule('prereading');
    if (narrator) {
        narrator.speak("Welcome to the interactive English lesson on 'A Letter to God'. Let's begin with the pre-reading activity. Learn about the money order process that will be important in the story!");
    }
}

// Money Order Submission
function submitMoneyOrder() {
    const recipient = document.getElementById('recipientName').value;
    const amount = document.getElementById('amount').value;
    const feedback = document.getElementById('moFeedback');
    
    if (recipient && amount) {
        feedback.className = 'feedback-message success show';
        feedback.textContent = 'Excellent! You\'ve successfully filled the money order form!';
        score += 20;
        document.getElementById('totalScore').textContent = score;
        
        if (narrator) {
            narrator.speak("Great job! You've learned how to send money through post. This will help you understand the story better.");
        }
        
        setTimeout(() => {
            showModule('story');
        }, 3000);
    } else {
        feedback.className = 'feedback-message error show';
        feedback.textContent = 'Please fill all required fields!';
    }
}

// Check completion exercise
function checkCompletion() {
    const inputs = document.querySelectorAll('.completion-input');
    let allCorrect = true;
    let correctCount = 0;
    
    inputs.forEach(input => {
        const userAnswer = input.value.trim().toLowerCase();
        const correctAnswer = input.dataset.answer.toLowerCase();
        
        if (userAnswer === correctAnswer) {
            input.style.backgroundColor = '#c8e6c9';
            correctCount++;
        } else {
            input.style.backgroundColor = '#ffcdd2';
            allCorrect = false;
        }
    });
    
    if (allCorrect) {
        showAchievement('Completion Exercise Mastered!');
        score += 15;
        document.getElementById('totalScore').textContent = score;
        
        if (narrator) {
            narrator.speak("Perfect! All your answers are correct. You understand how the money order process works.");
        }
    } else {
        if (narrator) {
            narrator.speak(`You got ${correctCount} out of ${inputs.length} correct. Try again!`);
        }
    }
}

// Toggle Audio
function toggleAudio() {
    trackUserInteraction(); // Enable speech synthesis when user interacts with audio controls
    if (!narrator) return;
    
    const btn = document.getElementById('audioBtn');
    audioEnabled = narrator.toggle();
    btn.textContent = audioEnabled ? '🔊' : '🔇';
    btn.classList.toggle('muted', !audioEnabled);
    btn.setAttribute('aria-label', audioEnabled ? 'Mute audio narration' : 'Enable audio narration');
}

// Toggle Print Mode
function togglePrintMode() {
    document.body.classList.toggle('print-mode');
    
    if (document.body.classList.contains('print-mode')) {
        if (narrator) {
            narrator.speak("Print mode enabled. The page is now optimized for printing.");
        }
    } else {
        if (narrator) {
            narrator.speak("Print mode disabled.");
        }
    }
}

// Highlight Vocabulary
function highlightVocabulary() {
    document.querySelectorAll('.highlight-vocab').forEach(vocab => {
        vocab.style.background = '#ffeb3b';
    });
    
    if (narrator) {
        narrator.speak("Vocabulary words have been highlighted. Hover over them to see their meanings.");
    }
}

// Storm Matching Game
function selectMatch(element, type) {
    // Clear previous selections of same type
    document.querySelectorAll(`.match-item`).forEach(item => {
        if (item.parentElement === element.parentElement) {
            item.classList.remove('selected');
        }
    });
    
    element.classList.add('selected');
    selectedMatch[type] = element.dataset.match;
    
    // Check if both selected
    if (selectedMatch.term && selectedMatch.def) {
        checkMatch();
    }
}

// Check Match
function checkMatch() {
    const termElements = document.querySelectorAll(`.match-item[data-match="${selectedMatch.term}"]`);
    const defElements = document.querySelectorAll(`.match-item[data-match="${selectedMatch.def}"]`);
    
    if (selectedMatch.term === selectedMatch.def) {
        // Correct match
        termElements.forEach(el => {
            el.classList.add('correct');
            el.onclick = null; // Disable further clicks
        });
        
        defElements.forEach(el => {
            el.classList.add('correct');
            el.onclick = null; // Disable further clicks
        });
        
        score += 5;
        document.getElementById('totalScore').textContent = score;
        
        // Check if all matches are complete
        const allMatched = document.querySelectorAll('.match-item:not(.correct)').length === 0;
        if (allMatched) {
            showAchievement('Storm Vocabulary Mastered!');
            score += 15;
            document.getElementById('totalScore').textContent = score;
            
            if (narrator) {
                narrator.speak("Excellent! You've matched all the storm types with their descriptions!");
            }
        } else if (narrator) {
            narrator.speak("Perfect match!");
        }
    } else {
        // Incorrect match
        const selectedItems = document.querySelectorAll('.match-item.selected');
        selectedItems.forEach(el => {
            el.classList.add('incorrect');
            setTimeout(() => {
                el.classList.remove('incorrect', 'selected');
            }, 1000);
        });
        
        if (narrator) {
            narrator.speak("Not a match. Try again.");
        }
    }
    
    // Reset selection
    selectedMatch = { term: null, def: null };
}

// Toggle Metaphor
function toggleMetaphor(element) {
    element.classList.toggle('expanded');
    
    if (element.classList.contains('expanded')) {
        const explanation = element.querySelector('.metaphor-explanation').textContent.trim();
        if (narrator) {
            narrator.speak(explanation);
        }
    }
}

// Read Aloud Poem
function readAloudPoem(poem) {
    if (!narrator) return;
    
    // Stop any ongoing narration before starting poem narration
    if (narrator.currentUtterance) {
        console.log('Stopping ongoing narration before starting poem');
        narrator.stop();
        
        // Clear any reading indicators and highlights
        document.querySelectorAll('.reading-indicator').forEach(indicator => {
            indicator.classList.add('fade-out');
            setTimeout(() => {
                if (indicator.parentNode) indicator.remove();
            }, 500);
        });
        
        document.querySelectorAll('.paragraph-highlight').forEach(p => {
            p.classList.remove('paragraph-highlight');
        });
    }
    
    if (poem === 'dust') {
        const poemText = document.querySelector('.poem-container:first-of-type .poem-text').textContent;
        narrator.speak("Dust of Snow by Robert Frost. " + poemText);
    } else {
        const poemText = document.querySelector('.poem-container:last-of-type .poem-text').textContent;
        narrator.speak("Fire and Ice by Robert Frost. " + poemText);
    }
}

// Recording Speaking Activity
function recordSpeaking() {
    alert("Speaking activity: Share your story with the class!");
    
    if (narrator) {
        narrator.speak("Think about a difficult time in your life and how it was resolved. Share your experience with the class.");
    }
}

// Open Writing Pad
function openWritingPad() {
    alert("Writing activity: Create a water conservation poster!");
    
    if (narrator) {
        narrator.speak("Design a creative poster about saving water in your community. Think about drought and flood situations mentioned in the story.");
    }
}

// Play Listening Activity
function playListeningActivity() {
    if (narrator) {
        narrator.speak(`
            Bhatt House
            256, Circuit Road
            Kanpur, Uttar Pradesh, India
            25 January 2006
            
            Dear Arti,
            
            How are you? I'm sorry I haven't written for a very long time. I think I last sent you a birthday card in the month of September 2005.
            
            We have just moved house. This is our new home. Sarah has just about started going to school. We have admitted her to 'Little Feet' as this is very close to our new home.
            
            I'm sitting here by the window sill, writing to you. There is a slight drizzle outside and I'm reminded of the good times we had together at Bangalore last year.
            
            Do write back. Love,
            Jaya
        `);
    }
}
