/**
 * Democracy Learning Lab - Simulation Module
 * Handles interactive simulations like voting and debate
 */

// Simulation state
const simState = {
    voting: {
        selectedPolicy: null,
        votes: { 
            sports: 0, 
            tech: 0, 
            library: 0, 
            arts: 0 
        },
        hasVoted: false
    },
    debate: {
        expanded: [],
        showConclusion: false
    },
    govTypes: {
        selected: null
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all simulators
    initSimulators();
    
    // Add event listener for vote button
    document.getElementById('voteButton')?.addEventListener('click', castVote);
    
    // Add event listener for debate conclusion button
    document.getElementById('debateConclusionBtn')?.addEventListener('click', showDebateConclusion);
});

// Initialize all interactive simulators
function initSimulators() {
    // Add event listeners for voting options
    document.querySelectorAll('.candidate').forEach(candidate => {
        candidate.addEventListener('click', () => {
            selectCandidate(candidate, candidate.dataset.policy);
        });
    });
    
    // Add event listeners for debate arguments
    document.querySelectorAll('.argument').forEach(argument => {
        argument.addEventListener('click', () => {
            expandArgument(argument);
        });
    });
    
    // Add event listeners for government type cards
    document.querySelectorAll('.gov-card').forEach(card => {
        card.addEventListener('click', () => {
            exploreGovType(card.dataset.type);
        });
    });
    
    // Add event listeners for classroom thought experiment
    document.querySelectorAll('.option-card').forEach(card => {
        card.addEventListener('click', () => {
            selectOption(card, card.dataset.type);
        });
    });
}

// Classroom thought experiment
function selectOption(element, type) {
    // Reset all options
    document.querySelectorAll('.option-card').forEach(card => {
        card.style.background = 'rgba(255,255,255,0.2)';
    });
    
    // Highlight selected option
    element.style.background = 'rgba(255,255,255,0.4)';
    
    // Show response
    const responseDiv = document.getElementById('thoughtResponse');
    if (!responseDiv) return;
    
    responseDiv.style.display = 'block';
    
    // Different responses based on selection
    if (type === 'vote') {
        responseDiv.innerHTML = `
            <strong>Great choice!</strong> You've chosen democracy! 
            This means everyone has a say in decisions that affect them.
        `;
    } else if (type === 'teacher') {
        responseDiv.innerHTML = `
            <strong>That's like a benevolent dictatorship.</strong> 
            It might work well with a good teacher, but what if the teacher makes unfair decisions?
        `;
    } else {
        responseDiv.innerHTML = `
            <strong>That's meritocracy.</strong> 
            But who decides who's smartest? And are the smartest always right about everything?
        `;
    }
}

// Voting simulator
function selectCandidate(element, policy) {
    // Reset all candidates
    document.querySelectorAll('.candidate').forEach(c => c.classList.remove('selected'));
    
    // Highlight selected candidate
    element.classList.add('selected');
    simState.voting.selectedPolicy = policy;
}

function castVote() {
    if (!simState.voting.selectedPolicy) {
        alert('Please select a policy before voting!');
        return;
    }
    
    if (simState.voting.hasVoted) {
        alert('You have already voted!');
        return;
    }
    
    // Record the vote
    simState.voting.votes[simState.voting.selectedPolicy]++;
    simState.voting.hasVoted = true;
    
    // Simulate other votes
    Object.keys(simState.voting.votes).forEach(key => {
        if (key !== simState.voting.selectedPolicy) {
            simState.voting.votes[key] += Math.floor(Math.random() * 5);
        }
    });
    
    // Show results
    const resultsDiv = document.getElementById('electionResults');
    if (!resultsDiv) return;
    
    resultsDiv.style.display = 'block';
    
    const total = Object.values(simState.voting.votes).reduce((a, b) => a + b, 0);
    const winner = Object.keys(simState.voting.votes).reduce((a, b) => 
        simState.voting.votes[a] > simState.voting.votes[b] ? a : b
    );
    
    resultsDiv.innerHTML = `
        <h3><i class="fas fa-chart-bar"></i> Election Results</h3>
        <div class="results-container">
            ${Object.keys(simState.voting.votes).map(key => {
                const percentage = Math.round(simState.voting.votes[key]/total*100);
                return `
                <div class="result-item">
                    <div class="result-header">
                        <span class="result-icon">${getIconForPolicy(key)}</span>
                        <div class="result-title">
                            <strong>${getPolicyName(key)}</strong> 
                            <div class="result-value">${simState.voting.votes[key]} votes (${percentage}%)</div>
                            ${key === winner ? '<span class="winner-badge"><i class="fas fa-trophy"></i> WINNER</span>' : ''}
                        </div>
                    </div>
                    <div class="result-bar-container">
                        <div class="result-bar" style="width: ${percentage}%; background: ${getColorForPolicy(key)};"></div>
                    </div>
                </div>
                `;
            }).join('')}
        </div>
        <div class="results-note">
            <i class="fas fa-info-circle"></i> In democracy, the majority choice wins, but minority voices are still protected and respected.
        </div>
    `;
    
    // Add CSS for the results visualization
    if (!document.getElementById('results-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'results-styles';
        styleSheet.innerHTML = `
            .results-container {
                margin: 1.5rem 0;
            }
            .result-item {
                margin-bottom: 1.2rem;
            }
            .result-header {
                display: flex;
                align-items: center;
                margin-bottom: 0.5rem;
            }
            .result-icon {
                width: 2.5rem;
                height: 2.5rem;
                background: rgba(30, 60, 114, 0.05);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-right: 1rem;
                font-size: 1.2rem;
                color: #1e3c72;
            }
            .result-title {
                flex: 1;
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                justify-content: space-between;
            }
            .result-value {
                font-size: 0.9rem;
                color: #666;
                margin-top: 0.2rem;
            }
            .result-bar-container {
                height: 0.8rem;
                background: #f5f5f5;
                border-radius: 1rem;
                overflow: hidden;
                box-shadow: inset 0 1px 3px rgba(0,0,0,0.1);
            }
            .result-bar {
                height: 100%;
                border-radius: 1rem;
                transition: width 1s ease-in-out;
            }
            .winner-badge {
                background: #ffd700;
                color: #333;
                padding: 0.3rem 0.7rem;
                border-radius: 1rem;
                font-size: 0.8rem;
                font-weight: bold;
                display: inline-flex;
                align-items: center;
                margin-left: 1rem;
            }
            .winner-badge i {
                margin-right: 0.3rem;
            }
            .results-note {
                background: rgba(30, 60, 114, 0.05);
                padding: 1rem;
                border-radius: 0.5rem;
                margin-top: 1.5rem;
                text-align: center;
                font-style: italic;
            }
        `;
        document.head.appendChild(styleSheet);
    }
    
    // Update progress
    window.democracyApp.updateProgress(window.democracyApp.progress + 15);
}

function getPolicyName(key) {
    const names = {
        sports: 'More Sports Facilities',
        tech: 'Technology Upgrade',
        library: 'Library Expansion',
        arts: 'Arts Program'
    };
    
    return names[key] || key.charAt(0).toUpperCase() + key.slice(1);
}

function getIconForPolicy(key) {
    const icons = {
        sports: '<i class="fas fa-futbol"></i>',
        tech: '<i class="fas fa-laptop-code"></i>',
        library: '<i class="fas fa-book-reader"></i>',
        arts: '<i class="fas fa-palette"></i>'
    };
    
    return icons[key] || '<i class="fas fa-check"></i>';
}

function getColorForPolicy(key) {
    const colors = {
        sports: '#4CAF50',  // green
        tech: '#2196F3',    // blue
        library: '#9C27B0', // purple
        arts: '#FF5722'     // orange
    };
    
    return colors[key] || '#607D8B'; // default gray
}

// Debate arena
function expandArgument(element) {
    const detail = element.querySelector('p');
    if (!detail) return;
    
    const isExpanded = detail.style.display !== 'none';
    detail.style.display = isExpanded ? 'none' : 'block';
    
    // Track expanded state
    const argumentId = element.dataset.id;
    if (argumentId) {
        if (isExpanded) {
            simState.debate.expanded = simState.debate.expanded.filter(id => id !== argumentId);
        } else {
            simState.debate.expanded.push(argumentId);
        }
    }
}

function showDebateConclusion() {
    const conclusionDiv = document.getElementById('debateConclusion');
    if (!conclusionDiv) return;
    
    conclusionDiv.style.display = 'block';
    simState.debate.showConclusion = true;
    
    conclusionDiv.innerHTML = `
        <h3>📊 The Verdict</h3>
        <p>
            While democracy has its challenges, it remains the best system we know for:
            <br><br>
            ✅ Protecting human dignity and rights<br>
            ✅ Allowing peaceful change of power<br>
            ✅ Giving voice to all citizens<br>
            ✅ Correcting its own mistakes<br>
            <br>
            As Winston Churchill said: "Democracy is the worst form of government, except for all the others that have been tried."
        </p>
    `;
}

// Government types explorer
function exploreGovType(type) {
    simState.govTypes.selected = type;
    
    let title, description, features, examples;
    
    switch(type) {
        case 'democracy':
            title = 'Democracy';
            description = 'Government of the people, by the people, for the people';
            features = [
                'Rulers elected by the people',
                'Free and fair elections',
                'One person, one vote',
                'Rule of law'
            ];
            examples = 'Examples: India, United States, South Africa';
            break;
        case 'monarchy':
            title = 'Monarchy';
            description = 'Rule by a king or queen, usually hereditary';
            features = [
                'Power inherited',
                'No elections or limited elections',
                'Subjects, not citizens',
                'Royal decrees'
            ];
            examples = 'Examples: Saudi Arabia, United Kingdom (Constitutional Monarchy)';
            break;
        case 'dictatorship':
            title = 'Dictatorship';
            description = 'Rule by one person with absolute power';
            features = [
                'No free elections',
                'Suppression of opposition',
                'Limited rights',
                'Military control'
            ];
            examples = 'Examples: North Korea, Myanmar (military junta)';
            break;
        default:
            return;
    }
    
    // Display information about the government type
    const infoModal = document.createElement('div');
    infoModal.className = 'gov-info-modal';
    infoModal.innerHTML = `
        <div class="gov-info-content">
            <h3>${title}</h3>
            <p>${description}</p>
            <h4>Key Features:</h4>
            <ul>
                ${features.map(f => `<li>${f}</li>`).join('')}
            </ul>
            <p>${examples}</p>
            <button class="btn close-modal">Close</button>
        </div>
    `;
    
    document.body.appendChild(infoModal);
    
    // Add close functionality
    infoModal.querySelector('.close-modal').addEventListener('click', () => {
        infoModal.remove();
    });
}
