/**
 * Electoral Politics - Interactive Lesson
 * content.js - Content data for the lesson
 */

// Wait for DOM to be loaded
document.addEventListener('DOMContentLoaded', function() {
    // Load content for various sections
    loadCaseStudy();
    loadNeedForElections();
    loadPoliticalCompetition();
    loadElectionSystemIntro();
    loadConstituenciesContent();
    loadReservedConstituencies();
    loadVotersList();
    loadNominationContent();
    loadCampaignContent();
    loadPollingContent();
    loadDemocraticElectionsIntro();
    loadChallengesContent();
    loadECIntro();
    loadECPowers();
    loadNVDPledge();
    loadParticipationIntro();
    loadOutcomeContent();
    
    // Load interactive elements
    loadCampaignSlogans();
    loadElectionResults();
    loadMatchingActivity();
    loadQuizQuestions();
    loadFairUnfairActivity();
    loadTimelineActivity();
    
    // Generate placeholders for images
    generateMapPlaceholder();
    generateVoterIDPlaceholder();
    generateEVMPlaceholder();
    generateChartPlaceholders();
});

// Case Study Content
function loadCaseStudy() {
    const container = document.getElementById('haryana-case-study');
    if (!container) return;
    
    container.innerHTML = `
        <p>In December 2004, an election was held for the Legislative Assembly of Haryana. The total population of Haryana is about 2.41 crore, out of which about 1.5 crore people were eligible to be voters.</p>
        <p>People who are 18 years or more of age and who are citizens of India have the right to vote in an Indian election. Some people such as the mentally unstable or those convicted of certain criminal activities are denied the right to vote.</p>
        <p>Of these eligible voters 1.3 crore people actually voted in that election. The election was held in all the 90 Assembly Constituencies of Haryana. In each constituency, the candidate who secured the highest number of votes was declared elected.</p>
        <p>Before the election, there was a Congress government in the state. Several political parties contested the election. The main competition was between Congress, Bharatiya Janata Party (BJP) and Om Prakash Chautala's Indian National Lok Dal (INLD). When the results were declared, INLD won 31 seats, Congress got 22 and BJP got 9, while the rest went to smaller parties or independent candidates.</p>
    `;
    
    // Add case study questions
    const questionsContainer = document.getElementById('case-study-questions');
    if (!questionsContainer) return;
    
    const questions = [
        {
            question: "Elections are held regularly in India because citizens have a right to choose their representatives.",
            answer: "correct"
        },
        {
            question: "The current ruling party will always win an election.",
            answer: "incorrect"
        },
        {
            question: "The Constitution gives every citizen a right to vote in the elections.",
            answer: "incorrect"
        },
        {
            question: "Elections in India are limited to one party.",
            answer: "incorrect"
        }
    ];
    
    let questionsHTML = '';
    questions.forEach((q, index) => {
        questionsHTML += `
            <div class="comprehension-question" data-answer="${q.answer}">
                <p>${index + 1}. ${q.question}</p>
                <div class="btn-group">
                    <button class="interactive-btn" onclick="checkAnswer(this, 'correct')">Correct</button>
                    <button class="interactive-btn" onclick="checkAnswer(this, 'incorrect')">Incorrect</button>
                </div>
                <div class="answer-feedback"></div>
            </div>
        `;
    });
    
    questionsContainer.innerHTML = questionsHTML;
}

// Need for Elections Content
function loadNeedForElections() {
    const container = document.getElementById('need-for-elections');
    if (!container) return;
    
    container.innerHTML = `
        <p>Elections allow people to choose representatives who will run the government, make laws and take major decisions. The basic idea is that the representatives should reflect the wishes of the people.</p>
        <p>Elections give citizens a way to exercise control over their government. Elections also make it possible for the government to base its policies on the preferences of the people.</p>
        <p>If the elected leaders fail to deliver what citizens want, the people can elect different leaders in the next election. This creates accountability in the democratic system.</p>
        <p>Regular elections ensure that representatives remain responsive to the needs and demands of the people they represent.</p>
    `;
}

// Political Competition Content
function loadPoliticalCompetition() {
    const container = document.getElementById('political-competition');
    if (!container) return;
    
    container.innerHTML = `
        <p>Elections also create political competition. If there was only one party, people would have no choice. That's why we need at least two parties competing in elections.</p>
        <p>This competition ensures that power does not remain in one hand. In an election, the political parties compete to convince people that their policies are better than others.</p>
        <p>Political parties have to be responsive to people's needs and demands. This competition also ensures that power is shared among different political parties, which is good for democracy.</p>
    `;
}

// Election System Introduction
function loadElectionSystemIntro() {
    const container = document.getElementById('election-system-intro');
    if (!container) return;
    
    container.innerHTML = `
        <p>India has a representative democracy. This means that people do not participate directly in making laws and running the government. They do it through their elected representatives. This election system is also known as the "First Past the Post" system.</p>
        <p>The entire country is divided into electoral constituencies. Representatives are elected from each constituency through voting. The system follows the principle of "universal adult franchise," which means all adult citizens have the right to vote regardless of their social or economic backgrounds.</p>
    `;
}

// Constituencies Content
function loadConstituenciesContent() {
    const container = document.getElementById('constituencies-content');
    if (!container) return;
    
    container.innerHTML = `
        <p>Electoral constituencies are the geographical areas from which representatives are elected. For Lok Sabha elections, the entire country is divided into 543 constituencies. The boundaries of these constituencies are determined in a way that ensures, as far as possible, that each constituency has roughly the same population.</p>
        <p>Each constituency elects one representative. The process of drawing the boundaries of constituencies is called "delimitation." It is done by an independent Delimitation Commission to ensure fairness.</p>
    `;
    
    // Generate map placeholder
    generateMapPlaceholder();
}

// Reserved Constituencies Content
function loadReservedConstituencies() {
    const container = document.getElementById('reserved-constituencies');
    if (!container) return;
    
    container.innerHTML = `
        <p>To ensure representation of disadvantaged communities, some constituencies are "reserved." This means only candidates from certain communities can contest elections from these constituencies.</p>
        <p>Currently, 84 seats in the Lok Sabha are reserved for candidates belonging to Scheduled Castes (SC) and 47 seats for Scheduled Tribes (ST). This reservation system ensures that the Parliament has adequate representation from these communities.</p>
    `;
}

// Voters' List Content
function loadVotersList() {
    const container = document.getElementById('voters-list');
    if (!container) return;
    
    container.innerHTML = `
        <p>For an election to be fair, it's important that the list of voters is prepared properly. This list is also called the 'Electoral Roll' or 'Voters' List.' It contains the name of every eligible voter in a constituency.</p>
        <p>The voters' list is prepared by officials of the Election Commission. It is updated before every election to include those who have turned 18, to remove names of those who have died, and to change the address of those who have moved.</p>
        <p>A voter whose name appears on the electoral roll is issued an Electoral Photo Identity Card (EPIC). This identity card is used to verify the identity of the voter at the polling booth during elections.</p>
    `;
    
    // Generate voter ID placeholder
    generateVoterIDPlaceholder();
}

// Nomination Content
function loadNominationContent() {
    const container = document.getElementById('nomination-content');
    if (!container) return;
    
    container.innerHTML = `
        <p>Anyone who wants to contest an election has to file a 'nomination paper' with the Returning Officer in that constituency. The candidate has to meet certain eligibility requirements:</p>
        <ul>
            <li>The minimum age is 25 years for Lok Sabha or Assembly elections</li>
            <li>The candidate must be a citizen of India</li>
            <li>The candidate must not hold any office of profit under the government</li>
        </ul>
        <p>The candidate also has to make a security deposit. This deposit is returned if the candidate gets a minimum percentage of votes. This system helps reduce the number of non-serious candidates.</p>
        <p>Every candidate also has to submit an affidavit with details of their property, education, and criminal cases pending against them, if any.</p>
    `;
}

// Campaign Content
function loadCampaignContent() {
    const container = document.getElementById('campaign-content');
    if (!container) return;
    
    container.innerHTML = `
        <p>The election campaign is the period when political parties and candidates present their plans and policies to voters. They use various methods to reach out to voters:</p>
        <ul>
            <li>Public meetings and rallies</li>
            <li>Door-to-door campaigns</li>
            <li>Distribution of pamphlets and posters</li>
            <li>Advertisements in newspapers, TV, and on social media</li>
            <li>Use of election symbols and slogans</li>
        </ul>
        <p>The Election Commission has a Model Code of Conduct that all parties and candidates must follow during elections. This code ensures that the campaign is conducted fairly and no party gets an undue advantage.</p>
        <p>The campaign ends 48 hours before the polling begins. This "silence period" gives voters time to reflect on their choices before voting.</p>
    `;
}

// Polling Content
function loadPollingContent() {
    const container = document.getElementById('polling-content');
    if (!container) return;
    
    container.innerHTML = `
        <p>Polling is the actual process of voting, where citizens go to polling booths to cast their votes. The Election Commission sets up polling booths across the constituency to ensure that no voter has to travel too far to vote.</p>
        <p>India now uses Electronic Voting Machines (EVMs) for voting. When a voter goes to a polling booth, their name is checked in the voters' list, their finger is marked with indelible ink, and then they cast their vote on the EVM.</p>
        <p>After polling is complete, all EVMs are sealed and transported to a central counting center. On the day of counting, votes from all EVMs are counted under the supervision of the Returning Officer, in the presence of candidates or their representatives.</p>
        <p>The candidate who gets the highest number of votes is declared elected, even if they do not secure a majority of votes. This system is known as the "First Past the Post" system.</p>
    `;
    
    // Generate EVM placeholder
    generateEVMPlaceholder();
}

// Democratic Elections Introduction
function loadDemocraticElectionsIntro() {
    const container = document.getElementById('democratic-elections-intro');
    if (!container) return;
    
    container.innerHTML = `
        <p>Elections can be held in many ways. But not all elections are democratic. A democratic election requires more than just the formal holding of elections.</p>
        <p>Democratic elections must offer a real choice between alternatives. The choice should not be nominal or symbolic. This requires a multi-party system where more than one party can seriously contest elections.</p>
        <p>Democratic elections must be held at regular intervals. The gap between two elections should not be too long. In India, general elections are held every five years.</p>
        <p>Most importantly, democratic elections must be conducted in a free and fair manner. People should be free to choose without fear or intimidation, and the election should not favor any one candidate or party.</p>
    `;
}

// Challenges Content
function loadChallengesContent() {
    const container = document.getElementById('challenges-content');
    if (!container) return;
    
    container.innerHTML = `
        <p>Despite having a robust electoral system, there are several challenges to conducting free and fair elections:</p>
        <ul>
            <li><strong>Influence of Money:</strong> Candidates and parties with more money often have an advantage. They can spend more on campaigns and sometimes even try to buy votes.</li>
            <li><strong>Criminal Elements:</strong> Sometimes, people with criminal backgrounds contest elections and use their muscle power to intimidate voters.</li>
            <li><strong>Misuse of Government Machinery:</strong> Ruling parties sometimes misuse government resources and officials for their electoral advantage.</li>
            <li><strong>Casteism and Communalism:</strong> Some candidates appeal to voters based on caste or religious identities, which can divide society.</li>
        </ul>
        <p>The Election Commission works hard to address these challenges. It has powers to take action against violations and to ensure that elections are conducted fairly.</p>
    `;
}

// Election Commission Introduction
function loadECIntro() {
    const container = document.getElementById('ec-intro');
    if (!container) return;
    
    container.innerHTML = `
        <p>The Election Commission of India (ECI) is an independent constitutional body responsible for conducting elections to the Parliament, State Legislatures, and the offices of the President and Vice-President.</p>
        <p>The Election Commission consists of a Chief Election Commissioner and two Election Commissioners. They are appointed by the President of India. Once appointed, they cannot be removed easily, which ensures their independence.</p>
        <p>The independence of the Election Commission is essential for free and fair elections. The Commission has wide-ranging powers to supervise and control the entire election process.</p>
    `;
}

// Election Commission Powers
function loadECPowers() {
    const container = document.getElementById('ec-powers-container');
    if (!container) return;
    
    const powers = [
        {
            title: "Control Over Civil Servants",
            description: "During elections, the EC has complete control over the government officials involved in conducting elections."
        },
        {
            title: "Election Schedule",
            description: "The EC decides the election schedule, including the dates of polling and counting."
        },
        {
            title: "Code of Conduct",
            description: "The EC enforces the Model Code of Conduct that all parties and candidates must follow during elections."
        },
        {
            title: "Candidate Recognition",
            description: "The EC decides which parties and candidates should be recognized as national or state parties."
        },
        {
            title: "Election Symbols",
            description: "The EC assigns election symbols to political parties and candidates."
        },
        {
            title: "Dispute Resolution",
            description: "The EC resolves disputes related to recognition of parties and allotment of symbols."
        }
    ];
    
    let powersHTML = '<div class="ec-powers-grid">';
    
    powers.forEach(power => {
        powersHTML += `
            <div class="ec-power-card">
                <h4>${power.title}</h4>
                <p>${power.description}</p>
            </div>
        `;
    });
    
    powersHTML += '</div>';
    container.innerHTML = powersHTML;
}

// NVD Pledge Content
function loadNVDPledge() {
    const container = document.getElementById('nvd-pledge');
    if (!container) return;
    
    container.innerHTML = `
        <p>"We, the citizens of India, having abiding faith in democracy, hereby pledge to uphold the democratic traditions of our country and the dignity of free, fair and peaceful elections, and to vote in every election fearlessly and without being influenced by considerations of religion, race, caste, community, language or any inducement."</p>
    `;
}

// Participation Introduction
function loadParticipationIntro() {
    const container = document.getElementById('participation-intro');
    if (!container) return;
    
    container.innerHTML = `
        <p>Democratic elections require the active participation of citizens. Participation can take various forms: voting, campaigning, funding candidates, contesting as a candidate, debating, and so on.</p>
        <p>In India, the level of popular participation in elections is quite high compared to many established democracies. The turnout in Indian elections has usually been around 60% or more.</p>
        <p>While this is impressive, it's worth noting that the participation is not uniform across all sections of society. Some groups, like the poor and marginalized, sometimes face barriers to full participation.</p>
        <p>There's also a higher participation in Lok Sabha elections compared to local elections, which is opposite to what we see in many Western democracies.</p>
    `;
    
    // Generate chart placeholders
    generateChartPlaceholders();
}

// Outcome Content
function loadOutcomeContent() {
    const container = document.getElementById('outcome-content');
    if (!container) return;
    
    container.innerHTML = `
        <p>The outcome of elections reflects the popular choice. It is crucial for a democracy that all participants accept the outcome of a fair election process, even if they lose.</p>
        <p>In India, there is a high degree of acceptance of election outcomes. The peaceful transfer of power from one party to another after elections is a testament to the strength of Indian democracy.</p>
        <p>It's worth noting that in every election, about half of the sitting MLAs or MPs lose elections. Even powerful ministers and chief ministers often lose elections, showing that voters exercise their power effectively.</p>
    `;
}

// Campaign Slogans
function loadCampaignSlogans() {
    const container = document.getElementById('slogan-container');
    if (!container) return;
    
    const slogans = [
        {
            party: "Congress Party",
            slogan: "Garibi Hatao (Remove Poverty)",
            year: "1971"
        },
        {
            party: "Janata Party",
            slogan: "Indira Hatao, Desh Bachao (Remove Indira, Save the Country)",
            year: "1977"
        },
        {
            party: "BJP",
            slogan: "Ab ki baar, Modi Sarkar (This time, Modi Government)",
            year: "2014"
        },
        {
            party: "Congress Party",
            slogan: "Chowkidar Chor Hai (The watchman is a thief)",
            year: "2019"
        }
    ];
    
    let slogansHTML = '';
    
    slogans.forEach(slogan => {
        slogansHTML += `
            <div class="slogan-card">
                <div class="slogan-party">${slogan.party}</div>
                <div class="slogan-text">"${slogan.slogan}"</div>
                <div class="slogan-year">${slogan.year}</div>
            </div>
        `;
    });
    
    container.innerHTML = slogansHTML;
}

// Election Results
function loadElectionResults() {
    const container = document.getElementById('election-result');
    if (!container) return;
    
    container.innerHTML = `
        <table>
            <thead>
                <tr>
                    <th>Candidate</th>
                    <th>Party</th>
                    <th>Votes</th>
                    <th>% of Votes</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Mallikarjun Kharge</td>
                    <td>INC</td>
                    <td>473,865</td>
                    <td>51.7%</td>
                </tr>
                <tr>
                    <td>Revunaik Belamagi</td>
                    <td>BJP</td>
                    <td>366,392</td>
                    <td>40.0%</td>
                </tr>
                <tr>
                    <td>B. T. Lalitha Naik</td>
                    <td>JD(S)</td>
                    <td>42,635</td>
                    <td>4.7%</td>
                </tr>
                <tr>
                    <td>Others</td>
                    <td></td>
                    <td>33,208</td>
                    <td>3.6%</td>
                </tr>
            </tbody>
        </table>
    `;
}

// Matching Activity
function loadMatchingActivity() {
    const principlesContainer = document.getElementById('match-principles');
    const featuresContainer = document.getElementById('match-features');
    
    if (!principlesContainer || !featuresContainer) return;
    
    const principles = [
        {
            id: "p1",
            text: "Universal Adult Franchise"
        },
        {
            id: "p2",
            text: "Election of Representatives"
        },
        {
            id: "p3",
            text: "Regular Elections"
        },
        {
            id: "p4",
            text: "Representation of Marginalized Groups"
        }
    ];
    
    const features = [
        {
            id: "f1",
            text: "All adult citizens have the right to vote",
            matchesTo: "p1"
        },
        {
            id: "f2",
            text: "Country is divided into constituencies",
            matchesTo: "p2"
        },
        {
            id: "f3",
            text: "Elections are held every five years",
            matchesTo: "p3"
        },
        {
            id: "f4",
            text: "Reserved constituencies for SC/ST communities",
            matchesTo: "p4"
        }
    ];
    
    let principlesHTML = '';
    principles.forEach(principle => {
        principlesHTML += `
            <div class="match-item" data-id="${principle.id}">${principle.text}</div>
        `;
    });
    
    let featuresHTML = '';
    features.forEach(feature => {
        featuresHTML += `
            <div class="match-item" data-id="${feature.id}" data-matches="${feature.matchesTo}">${feature.text}</div>
        `;
    });
    
    principlesContainer.innerHTML = principlesHTML;
    featuresContainer.innerHTML = featuresHTML;
    
    // Add event listeners for matching game
    document.querySelectorAll('.match-item').forEach(item => {
        item.addEventListener('click', handleMatchItemClick);
    });
}

// Quiz Questions
function loadQuizQuestions() {
    const container = document.getElementById('quiz-container');
    if (!container) return;
    
    const questions = [
        {
            question: "Which system of election does India follow?",
            options: [
                "Proportional Representation",
                "First Past the Post",
                "Mixed Member System",
                "List System"
            ],
            correct: 1
        },
        {
            question: "How many seats are reserved for Scheduled Castes in the Lok Sabha?",
            options: [
                "47",
                "84",
                "120",
                "78"
            ],
            correct: 1
        },
        {
            question: "Which body is responsible for conducting elections in India?",
            options: [
                "Election Commission of India",
                "Ministry of Home Affairs",
                "Prime Minister's Office",
                "Parliament"
            ],
            correct: 0
        },
        {
            question: "What is the minimum age required to contest in Lok Sabha elections?",
            options: [
                "18 years",
                "21 years",
                "25 years",
                "30 years"
            ],
            correct: 2
        },
        {
            question: "How often are general elections normally held in India?",
            options: [
                "Every 3 years",
                "Every 4 years",
                "Every 5 years",
                "Every 6 years"
            ],
            correct: 2
        }
    ];
    
    let quizHTML = '';
    questions.forEach((q, index) => {
        let optionsHTML = '';
        q.options.forEach((option, optIndex) => {
            optionsHTML += `
                <div class="quiz-option">
                    <input type="radio" name="q${index}" id="q${index}o${optIndex}" value="${optIndex}">
                    <label for="q${index}o${optIndex}">${option}</label>
                </div>
            `;
        });
        
        quizHTML += `
            <div class="quiz-question" data-correct="${q.correct}">
                <p><strong>Question ${index + 1}:</strong> ${q.question}</p>
                <div class="quiz-options">
                    ${optionsHTML}
                </div>
                <div class="quiz-feedback"></div>
            </div>
        `;
    });
    
    quizHTML += `
        <button class="interactive-btn" onclick="submitQuiz()">Submit Quiz</button>
    `;
    
    container.innerHTML = quizHTML;
}

// Fair/Unfair Activity
function loadFairUnfairActivity() {
    const container = document.getElementById('fair-unfair-container');
    if (!container) return;
    
    const practices = [
        {
            practice: "Government officials campaigning for the ruling party",
            answer: "unfair"
        },
        {
            practice: "Parties distributing their election manifestos",
            answer: "fair"
        },
        {
            practice: "Preventing some voters from voting through intimidation",
            answer: "unfair"
        },
        {
            practice: "Spending large amounts of money on election campaign",
            answer: "unfair"
        },
        {
            practice: "Using caste and religion to seek votes",
            answer: "unfair"
        },
        {
            practice: "Holding rallies and public meetings to seek votes",
            answer: "fair"
        }
    ];
    
    let practicesHTML = '';
    practices.forEach((p, index) => {
        practicesHTML += `
            <div class="fair-unfair-item" data-answer="${p.answer}">
                <p>${index + 1}. ${p.practice}</p>
                <div class="btn-group">
                    <button class="interactive-btn" onclick="checkFairUnfair(this, 'fair')">Fair</button>
                    <button class="interactive-btn" onclick="checkFairUnfair(this, 'unfair')">Unfair</button>
                </div>
                <div class="answer-feedback"></div>
            </div>
        `;
    });
    
    container.innerHTML = practicesHTML;
}

// Timeline Activity
function loadTimelineActivity() {
    const container = document.getElementById('timeline-activity');
    if (!container) return;
    
    const steps = [
        "Election Commission announces election dates",
        "Political parties select candidates",
        "Candidates file nomination papers",
        "Scrutiny of nomination papers",
        "Withdrawal of nominations",
        "Election campaign",
        "Silence period (48 hours before polling)",
        "Polling day",
        "Counting of votes",
        "Declaration of results"
    ];
    
    // Shuffle the steps for the activity
    const shuffledSteps = [...steps].sort(() => Math.random() - 0.5);
    
    let timelineHTML = `
        <div class="timeline-instructions">
            <p>Drag and drop the steps below to arrange them in the correct chronological order:</p>
        </div>
        <div class="timeline-container" id="timeline-container">
    `;
    
    shuffledSteps.forEach((step, index) => {
        timelineHTML += `
            <div class="timeline-step" draggable="true" data-original-index="${steps.indexOf(step)}">
                <div class="step-number">${index + 1}</div>
                <div class="step-text">${step}</div>
            </div>
        `;
    });
    
    timelineHTML += `
        </div>
    `;
    
    container.innerHTML = timelineHTML;
    
    // Add drag and drop functionality
    initializeTimelineDragDrop();
}

// Initialize drag and drop for timeline activity
function initializeTimelineDragDrop() {
    const timelineContainer = document.getElementById('timeline-container');
    if (!timelineContainer) return;
    
    let draggedItem = null;
    
    // Add event listeners to timeline steps
    document.querySelectorAll('.timeline-step').forEach(step => {
        step.addEventListener('dragstart', function() {
            draggedItem = this;
            setTimeout(() => this.style.opacity = '0.5', 0);
        });
        
        step.addEventListener('dragend', function() {
            this.style.opacity = '1';
            draggedItem = null;
        });
        
        step.addEventListener('dragover', function(e) {
            e.preventDefault();
        });
        
        step.addEventListener('dragenter', function(e) {
            e.preventDefault();
            this.style.background = 'rgba(0, 0, 0, 0.1)';
        });
        
        step.addEventListener('dragleave', function() {
            this.style.background = '';
        });
        
        step.addEventListener('drop', function(e) {
            e.preventDefault();
            this.style.background = '';
            
            if (draggedItem !== this) {
                // Get the positions
                const allItems = [...document.querySelectorAll('.timeline-step')];
                const draggedIndex = allItems.indexOf(draggedItem);
                const targetIndex = allItems.indexOf(this);
                
                // Insert the dragged item before or after the target
                if (draggedIndex < targetIndex) {
                    this.parentNode.insertBefore(draggedItem, this.nextSibling);
                } else {
                    this.parentNode.insertBefore(draggedItem, this);
                }
                
                // Renumber the steps
                allItems.forEach((item, i) => {
                    item.querySelector('.step-number').textContent = i + 1;
                });
            }
        });
    });
}

// Generate placeholder for map
function generateMapPlaceholder() {
    const container = document.getElementById('map-container');
    if (!container) return;
    
    container.innerHTML = `
        <div class="placeholder-image">
            <div class="placeholder-text">Constituencies Map</div>
            <div class="placeholder-subtext">Image will be loaded during class</div>
        </div>
    `;
}

// Generate placeholder for voter ID
function generateVoterIDPlaceholder() {
    const container = document.getElementById('voter-id-container');
    if (!container) return;
    
    container.innerHTML = `
        <div class="placeholder-image">
            <div class="placeholder-text">Voter ID Card</div>
            <div class="placeholder-subtext">Sample EPIC will be shown during class</div>
        </div>
    `;
}

// Generate placeholder for EVM
function generateEVMPlaceholder() {
    const container = document.getElementById('evm-container');
    if (!container) return;
    
    container.innerHTML = `
        <div class="placeholder-image">
            <div class="placeholder-text">Electronic Voting Machine</div>
            <div class="placeholder-subtext">Interactive demo will be available during class</div>
        </div>
    `;
}

// Generate placeholder for charts
function generateChartPlaceholders() {
    const turnoutChart = document.getElementById('turnout-chart');
    const socialGroupsChart = document.getElementById('social-groups-chart');
    
    if (turnoutChart) {
        turnoutChart.innerHTML = `
            <div class="placeholder-image">
                <div class="placeholder-text">Voter Turnout Chart</div>
                <div class="placeholder-subtext">Comparison of voter turnout in India and UK</div>
            </div>
        `;
    }
    
    if (socialGroupsChart) {
        socialGroupsChart.innerHTML = `
            <div class="placeholder-image">
                <div class="placeholder-text">Social Groups Chart</div>
                <div class="placeholder-subtext">Voter turnout by different social groups</div>
            </div>
        `;
    }
}
