/**
 * Electoral Politics - Interactive Lesson
 * main.js - Core functionality and narration features
 */

// Global state
const state = {
    activeModule: 'intro',
    modulesCompleted: 0,
    totalScore: 0,
    startTime: Date.now(),
    audioEnabled: true,
    userInteracted: false,
    currentNarration: null
};

// Narrator object for speech synthesis
const narrator = {
    // Voice configuration
    voice: null,
    
    // Initialize narrator and set up voice
    init: function() {
        // Check if speech synthesis is available
        if (!('speechSynthesis' in window)) {
            console.warn('Speech synthesis not supported');
            return false;
        }
        
        // Get available voices and set preferred voice
        const setVoice = () => {
            const voices = window.speechSynthesis.getVoices();
            
            // Attempt to find a female English voice (good for educational content)
            // Priority: 1) Safari Samantha 2) Any en-US female 3) Any English female 4) Any English voice
            
            // Safari's Samantha voice is excellent
            let voice = voices.find(v => v.name === 'Samantha');
            
            // Fallbacks for non-Safari browsers
            if (!voice) voice = voices.find(v => v.lang.includes('en-US') && v.name.includes('Female'));
            if (!voice) voice = voices.find(v => v.lang.includes('en') && v.name.includes('Female'));
            if (!voice) voice = voices.find(v => v.lang.includes('en'));
            
            if (voice) {
                this.voice = voice;
                console.log('Using voice: ' + voice.name);
                return true;
            } else {
                console.warn('No suitable English voice found');
                return false;
            }
        };
        
        // Chrome needs a slight delay to load voices
        if (window.speechSynthesis.getVoices().length === 0) {
            window.speechSynthesis.addEventListener('voiceschanged', setVoice);
        } else {
            setVoice();
        }
        
        return true;
    },
    
    // Preprocess text before reading
    preprocessText: function(text) {
        return text
            .replace(/\s+/g, ' ')           // Normalize whitespace
            .replace(/\(\s*fig\.\s*\d+\s*\)/gi, '') // Remove figure references
            .replace(/\[\s*\d+\s*\]/g, '')   // Remove citations
            .trim();
    },
    
    // Split long text into chunks to improve reading performance
    chunkText: function(text) {
        // Split text at punctuation marks (.!?)
        const chunks = text.split(/(?<=[.!?])\s+/g);
        
        // Group chunks to avoid too many small pieces
        const result = [];
        let currentChunk = '';
        
        chunks.forEach(chunk => {
            if (currentChunk.length + chunk.length < 200) {
                currentChunk += (currentChunk ? ' ' : '') + chunk;
            } else {
                if (currentChunk) result.push(currentChunk);
                currentChunk = chunk;
            }
        });
        
        if (currentChunk) result.push(currentChunk);
        return result;
    },
    
    // Read text with visual indicator
    read: function(text, parentElement = null) {
        // Don't read if audio is disabled
        if (!state.audioEnabled) return;
        
        // Stop any current narration
        this.stop();
        
        // Process text
        text = this.preprocessText(text);
        if (!text) return;
        
        // Create indicator if parent element is provided
        let indicator = null;
        if (parentElement) {
            indicator = document.createElement('div');
            indicator.className = 'reading-indicator';
            indicator.innerHTML = '<div class="reading-spinner"></div><div>Reading aloud...</div>';
            
            // Add stop button
            const stopButton = document.createElement('button');
            stopButton.className = 'interactive-btn stop-narration-btn';
            stopButton.innerText = '🛑 Stop';
            stopButton.addEventListener('click', e => {
                e.stopPropagation();
                this.stop();
            });
            indicator.appendChild(stopButton);
            
            parentElement.appendChild(indicator);
        }
        
        // Split into chunks for better performance
        const chunks = this.chunkText(text);
        let currentIndex = 0;
        
        const speakNextChunk = () => {
            if (currentIndex >= chunks.length) return;
            
            const utterance = new SpeechSynthesisUtterance(chunks[currentIndex]);
            
            // Set voice if available
            if (this.voice) {
                utterance.voice = this.voice;
            }
            
            // Configure speech parameters
            utterance.rate = 0.9;  // Slightly slower for educational content
            utterance.pitch = 1.0;
            
            // Handle events
            utterance.onend = () => {
                currentIndex++;
                if (currentIndex < chunks.length) {
                    speakNextChunk();
                } else {
                    // All chunks completed
                    if (indicator) {
                        indicator.classList.add('fade-out');
                        setTimeout(() => {
                            if (indicator.parentNode) {
                                indicator.parentNode.removeChild(indicator);
                            }
                        }, 300);
                    }
                    state.currentNarration = null;
                }
            };
            
            utterance.onerror = (e) => {
                console.error('Speech synthesis error:', e);
                if (indicator) {
                    indicator.innerHTML = '<div>⚠️ Speech synthesis error. Please try again.</div>';
                    setTimeout(() => {
                        if (indicator.parentNode) {
                            indicator.parentNode.removeChild(indicator);
                        }
                    }, 3000);
                }
                state.currentNarration = null;
            };
            
            // Store current narration
            state.currentNarration = utterance;
            
            // Speak the current chunk
            window.speechSynthesis.speak(utterance);
        };
        
        // Start speaking
        speakNextChunk();
    },
    
    // Read text paragraph by paragraph with highlighting
    readParagraphs: function(containerSelector) {
        if (!state.audioEnabled) return;
        
        // Get all paragraphs in the container
        const container = document.querySelector(containerSelector);
        if (!container) return;
        
        const paragraphs = container.querySelectorAll('p');
        if (paragraphs.length === 0) return;
        
        // Create reading indicator
        const indicator = document.createElement('div');
        indicator.className = 'reading-indicator';
        indicator.innerHTML = '<div class="reading-spinner"></div><div>Reading aloud...</div>';
        
        // Add stop button
        const stopButton = document.createElement('button');
        stopButton.className = 'interactive-btn stop-narration-btn';
        stopButton.innerText = '🛑 Stop';
        stopButton.addEventListener('click', e => {
            e.stopPropagation();
            this.stop();
            // Remove highlight from all paragraphs
            paragraphs.forEach(p => p.classList.remove('paragraph-highlight'));
        });
        indicator.appendChild(stopButton);
        
        container.appendChild(indicator);
        
        // Stop any current narration
        this.stop();
        
        // Read paragraphs sequentially
        let currentParaIndex = 0;
        
        const readNextParagraph = () => {
            if (currentParaIndex >= paragraphs.length) {
                // All paragraphs read
                indicator.classList.add('fade-out');
                setTimeout(() => indicator.remove(), 300);
                return;
            }
            
            // Highlight current paragraph
            paragraphs.forEach((p, i) => {
                p.classList.toggle('paragraph-highlight', i === currentParaIndex);
            });
            
            // Scroll to current paragraph if needed
            paragraphs[currentParaIndex].scrollIntoView({
                behavior: 'smooth', 
                block: 'center'
            });
            
            // Process text
            const text = this.preprocessText(paragraphs[currentParaIndex].textContent);
            
            const utterance = new SpeechSynthesisUtterance(text);
            
            // Set voice if available
            if (this.voice) {
                utterance.voice = this.voice;
            }
            
            // Configure speech parameters
            utterance.rate = 0.9;
            utterance.pitch = 1.0;
            
            // Handle events
            utterance.onend = () => {
                // Remove highlight
                paragraphs[currentParaIndex].classList.remove('paragraph-highlight');
                currentParaIndex++;
                if (currentParaIndex < paragraphs.length) {
                    readNextParagraph();
                } else {
                    // All paragraphs completed
                    indicator.classList.add('fade-out');
                    setTimeout(() => {
                        if (indicator.parentNode) {
                            indicator.parentNode.removeChild(indicator);
                        }
                    }, 300);
                    state.currentNarration = null;
                }
            };
            
            utterance.onerror = (e) => {
                console.error('Speech synthesis error:', e);
                indicator.innerHTML = '<div>⚠️ Speech synthesis error. Please try again.</div>';
                setTimeout(() => {
                    if (indicator.parentNode) {
                        indicator.parentNode.removeChild(indicator);
                    }
                }, 3000);
                state.currentNarration = null;
                
                // Remove highlight from all paragraphs
                paragraphs.forEach(p => p.classList.remove('paragraph-highlight'));
            };
            
            // Store current narration
            state.currentNarration = utterance;
            
            // Speak the current paragraph
            window.speechSynthesis.speak(utterance);
        };
        
        // Start reading the first paragraph
        readNextParagraph();
    },
    
    // Read quote block
    readQuote: function(quoteElement) {
        if (!state.audioEnabled) return;
        
        const quoteText = quoteElement.querySelector('.quote-text');
        if (!quoteText) return;
        
        this.read(quoteText.textContent, quoteElement);
    },
    
    // Stop current narration
    stop: function() {
        window.speechSynthesis.cancel();
        state.currentNarration = null;
        
        // Remove any existing indicators
        const indicators = document.querySelectorAll('.reading-indicator');
        indicators.forEach(indicator => {
            indicator.classList.add('fade-out');
            setTimeout(() => {
                if (indicator.parentNode) {
                    indicator.parentNode.removeChild(indicator);
                }
            }, 300);
        });
        
        // Remove any paragraph highlighting
        document.querySelectorAll('.paragraph-highlight').forEach(p => {
            p.classList.remove('paragraph-highlight');
        });
    }
};

// Track user interaction to enable audio
function trackUserInteraction() {
    if (!state.userInteracted) {
        state.userInteracted = true;
        console.log('User interaction detected - audio can now play');
    }
}

// Show a module
function showModule(moduleId) {
    // Hide all modules
    document.querySelectorAll('.module').forEach(module => {
        module.classList.remove('active');
    });
    
    // Show selected module
    const moduleElement = document.getElementById(moduleId);
    if (moduleElement) {
        moduleElement.classList.add('active');
        state.activeModule = moduleId;
        
        // Update navigation
        document.querySelectorAll('.nav-item').forEach(navItem => {
            navItem.setAttribute('aria-pressed', 'false');
        });
        
        const activeNavItem = document.querySelector(`.nav-item[onclick="showModule('${moduleId}')"]`);
        if (activeNavItem) {
            activeNavItem.setAttribute('aria-pressed', 'true');
            activeNavItem.classList.add('active');
        }
        
        // Stop any current narration
        narrator.stop();
        
        // Start narration for module introduction
        if (state.audioEnabled && state.userInteracted) {
            startModuleNarration(moduleId);
        }
        
        // Mark module as visited if not already
        if (!moduleElement.dataset.visited) {
            moduleElement.dataset.visited = 'true';
            updateProgress();
        }
    }
}

// Start narration for a module
function startModuleNarration(moduleId) {
    // Each module has different content to narrate
    switch (moduleId) {
        case 'intro':
            narrator.readParagraphs('#intro .content-block');
            break;
        case 'why-elections':
            narrator.readParagraphs('#why-elections .content-block:first-of-type');
            break;
        case 'election-system':
            narrator.readParagraphs('#election-system-intro');
            break;
        case 'democratic-elections':
            narrator.readParagraphs('#democratic-elections-intro');
            break;
        case 'election-commission':
            narrator.readParagraphs('#ec-intro');
            break;
        case 'participation':
            narrator.readParagraphs('#participation-intro');
            break;
        case 'activities':
            // No automatic narration for activities module
            break;
    }
}

// Toggle audio narration
function toggleAudio() {
    state.audioEnabled = !state.audioEnabled;
    
    const audioBtn = document.getElementById('audioBtn');
    
    if (!state.audioEnabled) {
        // Stop current narration
        narrator.stop();
        audioBtn.innerHTML = '🔇';
        audioBtn.classList.add('muted');
        audioBtn.setAttribute('aria-label', 'Enable audio narration');
    } else {
        audioBtn.innerHTML = '🔊';
        audioBtn.classList.remove('muted');
        audioBtn.setAttribute('aria-label', 'Disable audio narration');
    }
    
    // Show message
    showAchievement('Audio ' + (state.audioEnabled ? 'Enabled' : 'Disabled'), 
                   'Narration has been ' + (state.audioEnabled ? 'enabled' : 'disabled'));
}

// Read text for a specific section
function readText(sectionId) {
    if (!state.userInteracted) trackUserInteraction();
    
    // Map section IDs to their corresponding module IDs
    const moduleMapping = {
        'why-elections-content': 'why-elections',
        'election-system-content': 'election-system',
        'democratic-elections-content': 'democratic-elections',
        'ec-content': 'election-commission',
        'participation-content': 'participation'
    };
    
    // Get the module ID from the mapping or use the sectionId directly
    const moduleId = moduleMapping[sectionId] || sectionId;
    
    // Get the module element
    const moduleElement = document.getElementById(moduleId);
    if (!moduleElement) return;
    
    // Find all content blocks and readable elements within the module
    const contentElements = [];
    
    // Add all content blocks
    const contentBlocks = moduleElement.querySelectorAll('.content-block');
    contentBlocks.forEach(block => {
        if (block.textContent.trim()) {
            contentElements.push(block);
        }
    });
    
    // Add other readable elements like condition cards, quote blocks, etc.
    const otherReadableElements = moduleElement.querySelectorAll('.condition-card, .quote-block, .nvd-pledge .pledge-text');
    otherReadableElements.forEach(element => {
        if (element.textContent.trim()) {
            contentElements.push(element);
        }
    });
    
    // If we have elements to read
    if (contentElements.length > 0) {
        // Create a container for all paragraphs
        const tempContainer = document.createElement('div');
        tempContainer.className = 'temp-reading-container';
        tempContainer.style.display = 'none';
        
        // Extract all paragraphs from content elements
        contentElements.forEach(element => {
            const paragraphs = element.querySelectorAll('p, li, h3, h4');
            paragraphs.forEach(para => {
                if (para.textContent.trim()) {
                    const clonedPara = para.cloneNode(true);
                    tempContainer.appendChild(clonedPara);
                }
            });
        });
        
        // Add the container to the module temporarily
        moduleElement.appendChild(tempContainer);
        
        // Read the paragraphs
        narrator.readParagraphs('.temp-reading-container');
        
        // Set up removal of the container after narration ends
        setTimeout(() => {
            const container = document.querySelector('.temp-reading-container');
            if (container && container.parentNode) {
                container.parentNode.removeChild(container);
            }
        }, 1000);
    }
}

// Start the journey - call when user clicks start button
function startJourney() {
    if (!state.userInteracted) trackUserInteraction();
    showModule('why-elections');
    showAchievement('Journey Started', 'You\'ve begun your learning journey!');
}

// Update progress
function updateProgress() {
    const totalModules = document.querySelectorAll('.module').length;
    const completedModules = document.querySelectorAll('.module[data-visited="true"]').length;
    
    state.modulesCompleted = completedModules;
    
    // Update UI
    document.getElementById('modulesComplete').textContent = completedModules;
    document.getElementById('progressBar').textContent = Math.round((completedModules / totalModules) * 100) + '%';
    document.getElementById('progressBar').style.width = (completedModules / totalModules) * 100 + '%';
    
    // Update time spent
    const timeInSeconds = Math.floor((Date.now() - state.startTime) / 1000);
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    document.getElementById('timeSpent').textContent = minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}

// Show achievement popup
function showAchievement(title, desc) {
    const popup = document.getElementById('achievementPopup');
    document.getElementById('achievementTitle').textContent = title;
    document.getElementById('achievementDesc').textContent = desc;
    
    popup.classList.add('show');
    
    setTimeout(() => {
        popup.classList.remove('show');
    }, 3000);
}

// Add points to score
function addPoints(points) {
    state.totalScore += points;
    document.getElementById('totalScore').textContent = state.totalScore;
    updateProgress();
    
    if (points > 0) {
        showAchievement('Points Earned!', `You earned ${points} points!`);
    }
}

// Open discussion activity
function openDiscussionActivity() {
    // Implement modal or expansion of content
    alert('Discussion Activity: What electoral reforms would you suggest to make elections more free and fair?');
}

// Take the NVD pledge
function takePledge() {
    showAchievement('Pledge Taken!', 'You\'ve committed to participating in our democracy!');
    addPoints(5);
}

// EVM Simulation
function startEVMSimulation() {
    // Implement EVM simulation or redirect
    alert('EVM Simulation coming soon!');
}

// Check timeline activity
function checkTimeline() {
    // Implement timeline checking logic
    alert('Good job on creating the election timeline!');
    addPoints(10);
}

// Read quote aloud
function readQuote(quoteElement) {
    if (!state.userInteracted) trackUserInteraction();
    narrator.readQuote(quoteElement);
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Initialize narrator
    narrator.init();
    
    // Set up event handlers for user interaction tracking
    const interactionEvents = ['click', 'keydown', 'touchstart'];
    interactionEvents.forEach(eventType => {
        document.addEventListener(eventType, trackUserInteraction, { once: true });
    });
    
    // Start timer for progress tracking
    setInterval(updateProgress, 1000);
    
    // Show initial module
    showModule('intro');
});
