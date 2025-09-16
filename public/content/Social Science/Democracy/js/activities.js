/**
 * Democracy Learning Lab - Activities Module
 * Handles interactive activities and exercises based on textbook content
 */

// Activities state
const activitiesState = {
    timeline: {
        expanded: []
    },
    countries: {
        expanded: null
    },
    features: {
        expanded: []
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // Initialize activities
    initActivities();
});

// Initialize all activities
function initActivities() {
    // Add event listeners for timeline items
    document.querySelectorAll('.timeline-item').forEach(item => {
        item.addEventListener('click', () => {
            expandTimeline(item);
        });
    });
    
    // Add event listeners for feature cards
    document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('click', () => {
            toggleFeature(card);
        });
    });
    
    // Add event listeners for country cards
    document.querySelectorAll('.country-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            exploreCountry(btn.dataset.country);
        });
    });
    
    // Add event listeners for journey button
    document.getElementById('journeyButton')?.addEventListener('click', startJourney);
}

// Timeline expansion
function expandTimeline(item) {
    const itemId = item.dataset.id;
    
    // Toggle expanded state
    const isExpanded = item.classList.contains('expanded');
    
    if (isExpanded) {
        item.classList.remove('expanded');
        activitiesState.timeline.expanded = activitiesState.timeline.expanded.filter(id => id !== itemId);
    } else {
        item.classList.add('expanded');
        activitiesState.timeline.expanded.push(itemId);
    }
    
    // Get the expanded content
    const expandedContent = item.querySelector('.timeline-expanded');
    if (expandedContent) {
        expandedContent.style.display = isExpanded ? 'none' : 'block';
    }
}

// Feature card toggles
function toggleFeature(card) {
    card.classList.toggle('expanded');
    
    const cardId = card.dataset.id;
    if (cardId) {
        if (card.classList.contains('expanded')) {
            activitiesState.features.expanded.push(cardId);
        } else {
            activitiesState.features.expanded = activitiesState.features.expanded.filter(id => id !== cardId);
        }
    }
}

// Country explorer
function exploreCountry(country) {
    activitiesState.countries.expanded = country;
    
    // Define country data
    const countryData = {
        india: {
            name: 'India',
            flag: '🇮🇳',
            status: 'Democratic',
            details: `
                <p>India gained independence in 1947 and established itself as a democratic republic with its constitution in 1950.</p>
                
                <h4>Democratic Features:</h4>
                <ul>
                    <li>World's largest democracy with over 900 million voters</li>
                    <li>Regular elections held at federal, state, and local levels</li>
                    <li>Multi-party system with dozens of political parties</li>
                    <li>Independent judiciary and constitutional rights</li>
                    <li>Free press with thousands of newspapers and media outlets</li>
                </ul>
                
                <h4>Challenges:</h4>
                <ul>
                    <li>Issues with corruption in politics</li>
                    <li>Economic inequality</li>
                    <li>Representation challenges for marginalized groups</li>
                </ul>
                
                <p>Despite challenges, India has maintained a democratic system since independence, with peaceful transfers of power through elections.</p>
            `
        },
        china: {
            name: 'China',
            flag: '🇨🇳',
            status: 'Non-Democratic',
            details: `
                <p>The People's Republic of China is governed as a one-party socialist republic by the Chinese Communist Party (CCP).</p>
                
                <h4>Non-Democratic Features:</h4>
                <ul>
                    <li>Single-party rule with no legal opposition parties</li>
                    <li>Elections exist but candidates must be approved by the CCP</li>
                    <li>Limited freedom of expression and press censorship</li>
                    <li>Restrictions on internet access and social media</li>
                    <li>No independent judiciary to check government power</li>
                </ul>
                
                <h4>Context:</h4>
                <ul>
                    <li>Emphasizes economic development and social stability</li>
                    <li>Has lifted hundreds of millions out of poverty</li>
                    <li>Promotes "socialist democracy with Chinese characteristics"</li>
                </ul>
                
                <p>China represents an alternative model of governance that prioritizes centralized planning and social harmony over political pluralism.</p>
            `
        },
        usa: {
            name: 'United States',
            flag: '🇺🇸',
            status: 'Democratic',
            details: `
                <p>The United States is a constitutional federal republic with a strong democratic tradition dating back to 1776.</p>
                
                <h4>Democratic Features:</h4>
                <ul>
                    <li>Regular elections at federal, state, and local levels</li>
                    <li>Constitutional separation of powers (executive, legislative, judicial)</li>
                    <li>Federalism allowing state and local autonomy</li>
                    <li>Strong protection of civil liberties through Bill of Rights</li>
                    <li>Free press and freedom of expression</li>
                </ul>
                
                <h4>Challenges:</h4>
                <ul>
                    <li>Two-party dominance limiting political diversity</li>
                    <li>Campaign finance issues and money in politics</li>
                    <li>Voter participation rates lower than many democracies</li>
                    <li>Historical issues with voting rights and equality</li>
                </ul>
                
                <p>The U.S. is often referred to as the world's oldest continuous democracy, though it has faced ongoing challenges in living up to its democratic ideals.</p>
            `
        },
        saudi: {
            name: 'Saudi Arabia',
            flag: '🇸🇦',
            status: 'Non-Democratic',
            details: `
                <p>Saudi Arabia is an absolute monarchy ruled by the Al Saud royal family.</p>
                
                <h4>Non-Democratic Features:</h4>
                <ul>
                    <li>Power concentrated in the royal family</li>
                    <li>No elections for national leadership</li>
                    <li>No constitution; governance based on Islamic Sharia law</li>
                    <li>Limited civil liberties and political rights</li>
                    <li>Restrictions on freedom of expression and assembly</li>
                </ul>
                
                <h4>Recent Developments:</h4>
                <ul>
                    <li>First municipal elections held in 2005</li>
                    <li>Women allowed to vote and run for office since 2015</li>
                    <li>Some social reforms under Vision 2030 program</li>
                </ul>
                
                <p>Saudi Arabia represents a traditional monarchy where leadership is hereditary and power is concentrated in the royal family.</p>
            `
        },
        southafrica: {
            name: 'South Africa',
            flag: '🇿🇦',
            status: 'Democratic',
            details: `
                <p>South Africa transitioned to democracy in 1994 after decades of apartheid rule.</p>
                
                <h4>Democratic Features:</h4>
                <ul>
                    <li>Regular free elections with universal adult suffrage</li>
                    <li>Multi-party system with numerous political parties</li>
                    <li>Progressive constitution with strong bill of rights</li>
                    <li>Independent judiciary</li>
                    <li>Free press and civil society</li>
                </ul>
                
                <h4>Challenges:</h4>
                <ul>
                    <li>Economic inequality remaining from apartheid era</li>
                    <li>Corruption concerns</li>
                    <li>One-party dominance (ANC has won all elections since 1994)</li>
                </ul>
                
                <p>South Africa represents a successful transition from authoritarian rule to democracy, though it continues to address the legacies of its apartheid past.</p>
            `
        },
        northkorea: {
            name: 'North Korea',
            flag: '🇰🇵',
            status: 'Non-Democratic',
            details: `
                <p>North Korea (DPRK) is governed as a totalitarian one-party state under the Workers' Party of Korea.</p>
                
                <h4>Non-Democratic Features:</h4>
                <ul>
                    <li>Hereditary leadership succession (Kim family)</li>
                    <li>No free elections or political opposition</li>
                    <li>Severe restrictions on all civil liberties</li>
                    <li>State control of all media and information</li>
                    <li>No independent civil society organizations</li>
                </ul>
                
                <h4>Context:</h4>
                <ul>
                    <li>Official ideology of Juche (self-reliance)</li>
                    <li>Elections exist but only with pre-approved candidates</li>
                    <li>Isolated from much of international community</li>
                </ul>
                
                <p>North Korea represents one of the most closed and authoritarian political systems in the world today.</p>
            `
        }
    };
    
    // Create country info modal
    const country_data = countryData[country];
    if (!country_data) return;
    
    const countryModal = document.createElement('div');
    countryModal.className = 'country-modal';
    countryModal.innerHTML = `
        <div class="country-modal-content">
            <div class="country-header">
                <span class="country-flag-large">${country_data.flag}</span>
                <h3>${country_data.name}</h3>
                <div class="country-status ${country_data.status.toLowerCase().replace(/-/g, '')}">${country_data.status}</div>
            </div>
            
            <div class="country-details">
                ${country_data.details}
            </div>
            
            <div class="btn-container">
                <button class="btn close-modal">Close</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(countryModal);
    
    // Add close functionality
    countryModal.querySelector('.close-modal').addEventListener('click', () => {
        countryModal.remove();
    });
}

// Start journey button
function startJourney() {
    window.democracyApp.loadModule('definition');
}

// Exercise handler - Matching democracy features
function checkFeatureMatch(draggedElement, targetElement) {
    const featureId = draggedElement.dataset.feature;
    const targetId = targetElement.dataset.matchTarget;
    
    if (featureId === targetId) {
        // Correct match
        draggedElement.classList.add('matched');
        targetElement.classList.add('matched');
        targetElement.appendChild(draggedElement.cloneNode(true));
        draggedElement.style.visibility = 'hidden';
        
        return true;
    }
    
    // Incorrect match
    draggedElement.classList.add('wrong-match');
    setTimeout(() => {
        draggedElement.classList.remove('wrong-match');
    }, 1000);
    
    return false;
}

// Exercise handler - Democracy evaluation
function evaluateDemocracy(country) {
    const answers = document.querySelectorAll(`input[name="${country}-rating"]:checked`);
    if (answers.length === 0) {
        alert('Please select your evaluation first.');
        return;
    }
    
    const selectedValue = answers[0].value;
    const feedbackDiv = document.getElementById(`${country}-feedback`);
    if (!feedbackDiv) return;
    
    let feedback = '';
    
    // Different feedback based on country and selection
    switch (country) {
        case 'country-a':
            if (selectedValue === 'non-democratic') {
                feedback = '<span class="correct">✓ Correct!</span> A country that denies voting rights based on religion is not democratic as it violates the principle of equal political participation.';
            } else {
                feedback = '<span class="incorrect">✗ Incorrect.</span> A country that denies voting rights based on religion is not democratic as it violates the principle of equal political participation.';
            }
            break;
            
        case 'country-b':
            if (selectedValue === 'not-sure') {
                feedback = '<span class="correct">✓ Good thinking!</span> The same party winning for 20 years could indicate problems, but if elections are free and fair, this alone doesn\'t make it undemocratic.';
            } else if (selectedValue === 'democratic') {
                feedback = '<span class="partially-correct">◐ Partially correct.</span> If elections are free and fair, a country can still be democratic even with the same party winning, but it raises questions.';
            } else {
                feedback = '<span class="incorrect">✗ Incorrect.</span> Just because the same party wins doesn\'t automatically make a country undemocratic if the elections are free and fair.';
            }
            break;
            
        // Additional cases can be added for other example countries
    }
    
    feedbackDiv.innerHTML = feedback;
    feedbackDiv.style.display = 'block';
}
