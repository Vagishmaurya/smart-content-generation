/**
 * Democracy Learning Lab - Main JavaScript
 * Handles core functionality, navigation and shared state
 */

// Global state management
const state = {
    progress: 0,
    activeModule: 'intro',
    completedSections: [],
    narrationEnabled: true,
    narrationSpeed: 1,
    narrator: null
};

// DOM ready function
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

// Initialize application
function initializeApp() {
    createParticles();
    setupEventListeners();
    updateProgress(10); // Initial progress
    initializeNarrator();
    loadModule('intro');
}

// Create background particles
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (20 + Math.random() * 10) + 's';
        container.appendChild(particle);
    }
}

// Setup global event listeners
function setupEventListeners() {
    // Tab navigation
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', (e) => {
            const moduleId = e.currentTarget.dataset.module;
            if (moduleId) {
                loadModule(moduleId);
            }
        });
    });

    // Audio controls
    document.getElementById('toggleNarration')?.addEventListener('click', toggleNarration);
    document.getElementById('playPause')?.addEventListener('click', togglePlayPause);
    
    // Help button
    document.getElementById('helpButton')?.addEventListener('click', showHelp);
}

// Navigate between modules
function loadModule(moduleId) {
    // Hide all modules
    document.querySelectorAll('.module').forEach(m => m.classList.remove('active'));
    
    // Show selected module
    const module = document.getElementById(moduleId);
    if (module) {
        module.classList.add('active');
        state.activeModule = moduleId;
        
        // Update active tab
        document.querySelectorAll('.tab').forEach(t => {
            t.classList.toggle('active', t.dataset.module === moduleId);
        });
        
        // If first time visiting this module, increase progress
        if (!state.completedSections.includes(moduleId)) {
            state.completedSections.push(moduleId);
            updateProgress(state.progress + 10);
        }
        
        // Start narration for this module
        startModuleNarration(moduleId);
        
        // Scroll to top
        window.scrollTo(0, 0);
    }
}

// Update progress bar
function updateProgress(value) {
    state.progress = Math.min(value, 100);
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
        progressBar.style.width = state.progress + '%';
        progressBar.textContent = Math.round(state.progress) + '%';
    }
}

// Help dialog
function showHelp() {
    alert('Welcome to Democracy Learning Lab!\n\n' +
          '📚 Explore each module to learn about democracy\n' +
          '🗳️ Try the voting simulator to experience elections\n' +
          '💬 Join the debate arena to explore arguments\n' +
          '📝 Test your knowledge with the quiz\n\n' +
          'Use the audio controls to enable/disable narration.\n\n' +
          'Your progress is tracked automatically!');
}

// Narration functionality
function initializeNarrator() {
    // Create speech synthesis instance
    if ('speechSynthesis' in window) {
        state.narrator = new SpeechSynthesizer();
    } else {
        console.warn("Speech synthesis not supported in this browser");
        document.querySelectorAll('.audio-controls').forEach(el => el.style.display = 'none');
    }
}

// Start narration for a specific module
function startModuleNarration(moduleId) {
    if (!state.narrator || !state.narrationEnabled) return;
    
    // Find narration element
    const narrationElement = document.getElementById(`${moduleId}-narration`);
    if (narrationElement) {
        const text = narrationElement.textContent.trim();
        state.narrator.speak(text);
    }
}

// Toggle narration on/off
function toggleNarration() {
    if (!state.narrator) return;
    
    state.narrationEnabled = !state.narrationEnabled;
    const btn = document.getElementById('toggleNarration');
    
    if (btn) {
        btn.innerHTML = state.narrationEnabled ? '<i class="fas fa-volume-up"></i>' : '<i class="fas fa-volume-mute"></i>';
        btn.setAttribute('aria-label', state.narrationEnabled ? 'Disable narration' : 'Enable narration');
    }
    
    if (state.narrationEnabled) {
        startModuleNarration(state.activeModule);
    } else {
        state.narrator.stop();
    }
}

// Toggle play/pause for narration
function togglePlayPause() {
    if (!state.narrator) return;
    
    const btn = document.getElementById('playPause');
    
    if (state.narrator.isPaused()) {
        state.narrator.resume();
        if (btn) btn.innerHTML = '<i class="fas fa-pause"></i>';
    } else if (state.narrator.isSpeaking()) {
        state.narrator.pause();
        if (btn) btn.innerHTML = '<i class="fas fa-play"></i>';
    } else {
        startModuleNarration(state.activeModule);
        if (btn) btn.innerHTML = '<i class="fas fa-pause"></i>';
    }
}

// Speech Synthesizer Class
class SpeechSynthesizer {
    constructor() {
        this.synth = window.speechSynthesis;
        this.utterance = null;
        this.voices = [];
        this.currentVoice = null;
        
        // Try to get voices right away
        this.loadVoices();
        
        // If voices aren't loaded immediately, wait for the event
        if (this.synth.onvoiceschanged !== undefined) {
            this.synth.onvoiceschanged = this.loadVoices.bind(this);
        }
    }
    
    loadVoices() {
        this.voices = this.synth.getVoices();
        
        // Try to find a British female voice
        let britishFemaleVoice = this.voices.find(voice => 
            voice.lang.includes('en-GB') && 
            voice.name.toLowerCase().includes('female')
        );
        
        // Fallback: any British voice
        if (!britishFemaleVoice) {
            britishFemaleVoice = this.voices.find(voice => 
                voice.lang.includes('en-GB')
            );
        }
        
        // Fallback: any English female voice
        if (!britishFemaleVoice) {
            britishFemaleVoice = this.voices.find(voice => 
                voice.lang.includes('en') && 
                voice.name.toLowerCase().includes('female')
            );
        }
        
        // Final fallback: first English voice
        if (!britishFemaleVoice) {
            britishFemaleVoice = this.voices.find(voice => 
                voice.lang.includes('en')
            );
        }
        
        this.currentVoice = britishFemaleVoice || this.voices[0];
    }
    
    speak(text) {
        this.stop();
        
        if (!text) return;
        
        this.utterance = new SpeechSynthesisUtterance(text);
        
        if (this.currentVoice) {
            this.utterance.voice = this.currentVoice;
        }
        
        // Set a slightly lower pitch for a more natural sound
        this.utterance.pitch = 1.0;
        this.utterance.rate = state.narrationSpeed;
        
        // Add events
        this.utterance.onend = () => {
            const btn = document.getElementById('playPause');
            if (btn) btn.innerHTML = '<i class="fas fa-play"></i>';
        };
        
        this.synth.speak(this.utterance);
        
        const btn = document.getElementById('playPause');
        if (btn) btn.innerHTML = '<i class="fas fa-pause"></i>';
    }
    
    stop() {
        this.synth.cancel();
        this.utterance = null;
    }
    
    pause() {
        this.synth.pause();
    }
    
    resume() {
        this.synth.resume();
    }
    
    isSpeaking() {
        return this.synth.speaking;
    }
    
    isPaused() {
        return this.synth.paused;
    }
}

// Export functions for use by other modules
window.democracyApp = {
    loadModule,
    updateProgress,
    showFeedback: function(type, message) {
        const feedback = document.createElement('div');
        feedback.className = `feedback ${type} show`;
        feedback.textContent = message;
        return feedback;
    }
};
