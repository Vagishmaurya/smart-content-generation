/**
 * Palampur Economics Lab - Enhanced Features
 * Adds advanced interactive elements and visualizations
 */

// Enhanced features state
const enhancedState = {
    darkMode: false,
    achievementBadges: {
        introduction: false,
        production: false,
        farming: false,
        landLabor: false,
        capital: false,
        nonFarm: false,
        quiz: false
    },
    villageMapLocations: {
        fields: {
            description: "The agricultural fields of Palampur where most farming takes place. Multiple cropping is practiced with wheat, potatoes, sugarcane, and jowar/bajra grown in different seasons.",
            details: "The fields cover approximately 200 hectares of land. All land is cultivated, and no land is left idle. With modern farming methods and irrigation, yields have increased substantially since the 1960s."
        },
        residential: {
            description: "The residential area where the 450 families of Palampur live. Houses vary greatly depending on economic status.",
            details: "The 80 upper caste families own larger brick houses with cement plastering. The SC (dalit) families, comprising one-third of the population, live in one corner of the village in smaller houses, some made of mud and straw."
        },
        market: {
            description: "The village marketplace where goods are bought and sold, and traders conduct business.",
            details: "Local shops sell daily necessities, and traders buy agricultural products like wheat and jaggery to sell in nearby towns. Farmers sell their surplus produce here, and it serves as a hub for economic activity."
        },
        school: {
            description: "Educational facilities in Palampur include two primary schools and one high school.",
            details: "Education is an important aspect of building human capital in the village. The schools serve children from all communities, though attendance and continuation rates vary by social and economic status."
        },
        health: {
            description: "Healthcare facilities include a government-run primary health center and one private dispensary.",
            details: "The health center provides basic medical services to villagers. Health infrastructure is an important social overhead that supports the quality of life and productivity in rural areas."
        }
    },
    caseStudies: {
        smallFarmer: {
            title: "Savita's Dilemma",
            description: "Savita needs to decide how to manage her small 1-hectare farm with limited capital.",
            challenge: "Should she take a high-interest loan from Tejpal Singh, try to get a bank loan, or cultivate only part of her land with available resources?",
            options: [
                "Take a loan from Tejpal Singh at 24% interest",
                "Apply for a bank loan (which takes time with no guarantee)",
                "Cultivate only half her land with available resources",
                "Join with other small farmers to share resources"
            ],
            analysis: {
                0: "Taking a high-interest loan puts Savita at risk of debt. She'll need to work as a laborer for Tejpal at below-market wages in addition to her farming work.",
                1: "Bank loans have lower interest rates but are hard for small farmers to get due to lack of collateral and documentation.",
                2: "Cultivating less land means lower production but no debt risk. However, this may not generate enough income for her family.",
                3: "Pooling resources is a cooperative solution that can help small farmers access equipment and share risks."
            }
        },
        laborer: {
            title: "Dala's Employment Challenge",
            description: "Dala, a landless laborer, is struggling to find enough work in agriculture due to mechanization.",
            challenge: "What should Dala do to improve his income situation?",
            options: [
                "Migrate to a nearby town for construction work",
                "Learn new skills for non-farm activities",
                "Join with other laborers to form a cooperative",
                "Take a loan to buy a buffalo for milk production"
            ],
            analysis: {
                0: "Migration can provide more employment opportunities but has social costs of separation from family and adjustment challenges.",
                1: "New skills could open opportunities in growing non-farm sectors, but requires time and some investment in training.",
                2: "A cooperative could increase bargaining power for wages, but requires organization and cooperation among laborers.",
                3: "Like Kishora in the text, investing in a buffalo could provide steady income through milk sales and transport, but requires an initial loan."
            }
        }
    },
    comparisons: {
        farmingMethods: {
            title: "Traditional vs. Modern Farming",
            traditional: {
                yield: "Low (1300 kg/ha for wheat)",
                investment: "Low capital requirement",
                sustainability: "More environmentally sustainable",
                risk: "Lower risk due to lower investment",
                dependency: "Less dependent on external inputs"
            },
            modern: {
                yield: "High (3200 kg/ha for wheat)",
                investment: "High capital requirement",
                sustainability: "Environmental concerns (water table, soil fertility)",
                risk: "Higher risk due to higher investment",
                dependency: "Dependent on fertilizers, pesticides, irrigation"
            }
        },
        farmerTypes: {
            title: "Small Farmers vs. Large Farmers",
            small: {
                landholding: "Less than 2 hectares",
                capital: "Limited, often requires loans",
                labor: "Family labor",
                surplus: "Little or no surplus",
                risk: "High vulnerability to crop failure"
            },
            large: {
                landholding: "More than 2 hectares",
                capital: "Adequate, from own savings",
                labor: "Hired farm laborers",
                surplus: "Substantial surplus for market",
                risk: "More resilient to crop failure"
            }
        }
    },
    printableResources: [
        {
            title: "Palampur Village Profile Worksheet",
            description: "A comprehensive worksheet summarizing key aspects of Palampur's economy",
            icon: "fas fa-file-alt",
            fileName: "palampur_village_profile.pdf"
        },
        {
            title: "Factors of Production Diagram",
            description: "Visual diagram showing how land, labor, capital and human capital interact",
            icon: "fas fa-project-diagram",
            fileName: "factors_of_production.pdf"
        },
        {
            title: "Economic Activities Comparison Chart",
            description: "Compare farm and non-farm activities in terms of requirements and returns",
            icon: "fas fa-chart-bar",
            fileName: "economic_activities_comparison.pdf"
        },
        {
            title: "Production Chain Analysis",
            description: "Track how raw materials become finished products in Palampur's economy",
            icon: "fas fa-link",
            fileName: "production_chain_analysis.pdf"
        }
    ]
};

// DOM ready function
document.addEventListener('DOMContentLoaded', () => {
    initEnhancements();
});

// Initialize enhancements
function initEnhancements() {
    addThemeToggle();
    enhanceVillageMap();
    setupCaseStudies();
    createComparisons();
    setupAchievementSystem();
    addPrintableResources();
    setupEnhancedCharts();
    addInteractiveTooltips();
    setupAnimations();
}

// Add theme toggle button
function addThemeToggle() {
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.setAttribute('aria-label', 'Toggle dark mode');
    document.body.appendChild(themeToggle);
    
    themeToggle.addEventListener('click', toggleDarkMode);
}

// Toggle dark mode
function toggleDarkMode() {
    const body = document.body;
    const themeToggle = document.querySelector('.theme-toggle');
    
    enhancedState.darkMode = !enhancedState.darkMode;
    
    if (enhancedState.darkMode) {
        body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('darkMode', 'enabled');
    } else {
        body.classList.remove('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('darkMode', 'disabled');
    }
}

// Check for saved theme preference
function checkSavedTheme() {
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme === 'enabled') {
        toggleDarkMode();
    }
}

// Enhance village map
function enhanceVillageMap() {
    const villageMap = document.querySelector('.village-map');
    if (!villageMap) return;
    
    // Add map overlay
    const overlay = document.createElement('div');
    overlay.className = 'map-overlay';
    villageMap.appendChild(overlay);
    
    // Add tooltip container
    const tooltip = document.createElement('div');
    tooltip.className = 'map-tooltip';
    tooltip.innerHTML = '<h3><i class="fas fa-map-marker-alt"></i> Village Map</h3><p>Click on any location to learn more about it.</p>';
    villageMap.appendChild(tooltip);
    
    // Add connecting paths between locations
    addMapConnections();
    
    // Setup click events for map features
    document.querySelectorAll('.map-feature').forEach(feature => {
        feature.addEventListener('click', (e) => {
            // Get location type from id or data attribute
            const locationType = feature.id || feature.dataset.type || 'default';
            const locationInfo = enhancedState.villageMapLocations[locationType] || {
                description: "A part of Palampur village",
                details: "More information about this location is not available."
            };
            
            // Update tooltip
            tooltip.innerHTML = `
                <h3><i class="${feature.querySelector('i').className}"></i> ${feature.querySelector('span').textContent}</h3>
                <p>${locationInfo.description}</p>
                <p>${locationInfo.details}</p>
            `;
            
            // Show tooltip
            tooltip.style.display = 'block';
            
            // Remove active class from all features
            document.querySelectorAll('.map-feature').forEach(f => f.classList.remove('active'));
            
            // Add active class to clicked feature
            feature.classList.add('active');
            
            e.stopPropagation();
        });
    });
    
    // Hide tooltip when clicking elsewhere on the map
    villageMap.addEventListener('click', (e) => {
        if (e.target === villageMap || e.target === overlay) {
            tooltip.style.display = 'none';
            document.querySelectorAll('.map-feature').forEach(f => f.classList.remove('active'));
        }
    });
}

// Add connecting paths between map locations
function addMapConnections() {
    const villageMap = document.querySelector('.village-map');
    if (!villageMap) return;
    
    const features = document.querySelectorAll('.map-feature');
    
    // Create path markers
    for (let i = 0; i < 20; i++) {
        const marker = document.createElement('div');
        marker.className = 'path-marker';
        
        // Random position along paths
        const randomX = 20 + Math.random() * 60; // % of map width
        const randomY = 20 + Math.random() * 60; // % of map height
        
        marker.style.left = `${randomX}%`;
        marker.style.top = `${randomY}%`;
        
        villageMap.appendChild(marker);
    }
    
    // Create path lines between features
    for (let i = 0; i < features.length - 1; i++) {
        const feature1 = features[i];
        const feature2 = features[i + 1];
        
        const rect1 = feature1.getBoundingClientRect();
        const rect2 = feature2.getBoundingClientRect();
        
        const mapRect = villageMap.getBoundingClientRect();
        
        const x1 = (rect1.left + rect1.width/2) - mapRect.left;
        const y1 = (rect1.top + rect1.height/2) - mapRect.top;
        const x2 = (rect2.left + rect2.width/2) - mapRect.left;
        const y2 = (rect2.top + rect2.height/2) - mapRect.top;
        
        const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
        
        const line = document.createElement('div');
        line.className = 'path-line';
        line.style.width = `${distance}px`;
        line.style.transform = `translate(${x1}px, ${y1}px) rotate(${angle}deg)`;
        
        villageMap.appendChild(line);
    }
}

// Setup case studies
function setupCaseStudies() {
    // Find containers to add case studies to
    const landLaborModule = document.getElementById('land-labor');
    const capitalModule = document.getElementById('capital');
    
    if (landLaborModule) {
        addCaseStudy(landLaborModule, enhancedState.caseStudies.laborer);
    }
    
    if (capitalModule) {
        addCaseStudy(capitalModule, enhancedState.caseStudies.smallFarmer);
    }
}

// Add a case study to a container
function addCaseStudy(container, caseStudy) {
    const caseStudyElement = document.createElement('div');
    caseStudyElement.className = 'case-study-card animate-growIn';
    
    let optionsHTML = '';
    caseStudy.options.forEach((option, index) => {
        optionsHTML += `
            <div class="challenge-option" data-index="${index}">
                ${option}
            </div>
        `;
    });
    
    caseStudyElement.innerHTML = `
        <div class="case-study-title">
            <i class="fas fa-user-circle"></i> ${caseStudy.title}
        </div>
        <p>${caseStudy.description}</p>
        
        <div class="challenge-box">
            <div class="challenge-title">
                <i class="fas fa-question-circle"></i> ${caseStudy.challenge}
            </div>
            <div class="challenge-options">
                ${optionsHTML}
            </div>
        </div>
        
        <div class="case-study-analysis" style="display: none;"></div>
    `;
    
    // Add after the first card
    const firstCard = container.querySelector('.card');
    if (firstCard) {
        firstCard.parentNode.insertBefore(caseStudyElement, firstCard.nextSibling);
    } else {
        const contentText = container.querySelector('.content-text');
        if (contentText) {
            contentText.parentNode.insertBefore(caseStudyElement, contentText.nextSibling);
        }
    }
    
    // Add click event to options
    caseStudyElement.querySelectorAll('.challenge-option').forEach(option => {
        option.addEventListener('click', () => {
            // Remove selected class from all options
            caseStudyElement.querySelectorAll('.challenge-option').forEach(opt => {
                opt.classList.remove('selected');
            });
            
            // Add selected class to clicked option
            option.classList.add('selected');
            
            // Show analysis
            const analysisDiv = caseStudyElement.querySelector('.case-study-analysis');
            const optionIndex = option.dataset.index;
            
            analysisDiv.innerHTML = `
                <h4><i class="fas fa-lightbulb"></i> Analysis:</h4>
                <p>${caseStudy.analysis[optionIndex]}</p>
            `;
            
            // Animate analysis appearance
            analysisDiv.style.display = 'block';
            analysisDiv.classList.add('animate-growIn');
            
            // Earn achievement if both case studies are completed
            const allCaseStudies = document.querySelectorAll('.case-study-card');
            const completedCaseStudies = document.querySelectorAll('.case-study-card .challenge-option.selected');
            
            if (allCaseStudies.length === completedCaseStudies.length) {
                unlockAchievement('case-study');
            }
        });
    });
}

// Create comparisons
function createComparisons() {
    // Find containers to add comparisons to
    const farmingModule = document.getElementById('farming');
    const landLaborModule = document.getElementById('land-labor');
    
    if (farmingModule) {
        addComparison(farmingModule, enhancedState.comparisons.farmingMethods);
    }
    
    if (landLaborModule) {
        addComparison(landLaborModule, enhancedState.comparisons.farmerTypes);
    }
}

// Add a comparison section
function addComparison(container, comparison) {
    const comparisonElement = document.createElement('div');
    comparisonElement.className = 'comparison-container animate-slideIn';
    
    // Create HTML for first item
    let firstItemHTML = `
        <div class="comparison-header">${Object.keys(comparison)[1].charAt(0).toUpperCase() + Object.keys(comparison)[1].slice(1)}</div>
    `;
    
    // Create HTML for second item
    let secondItemHTML = `
        <div class="comparison-header">${Object.keys(comparison)[2].charAt(0).toUpperCase() + Object.keys(comparison)[2].slice(1)}</div>
    `;
    
    // Add rows for each property
    const firstType = Object.keys(comparison)[1];
    const secondType = Object.keys(comparison)[2];
    
    // Get property keys (excluding title)
    const propertyKeys = Object.keys(comparison[firstType]);
    
    propertyKeys.forEach(key => {
        const firstValue = comparison[firstType][key];
        const secondValue = comparison[secondType][key];
        
        // Add to first item
        firstItemHTML += `
            <div class="comparison-row">
                <span class="comparison-label">${key.charAt(0).toUpperCase() + key.slice(1)}:</span>
                <span class="comparison-value">${firstValue}</span>
            </div>
        `;
        
        // Add to second item
        secondItemHTML += `
            <div class="comparison-row">
                <span class="comparison-label">${key.charAt(0).toUpperCase() + key.slice(1)}:</span>
                <span class="comparison-value">${secondValue}</span>
            </div>
        `;
    });
    
    comparisonElement.innerHTML = `
        <div class="comparison-title">${comparison.title}</div>
        <div class="comparison-item">
            ${firstItemHTML}
        </div>
        <div class="comparison-vs">VS</div>
        <div class="comparison-item">
            ${secondItemHTML}
        </div>
    `;
    
    // Add to container
    const targetElement = container.querySelector('.farm-sim, .chart-container');
    if (targetElement) {
        targetElement.parentNode.insertBefore(comparisonElement, targetElement);
    } else {
        const contentText = container.querySelector('.content-text');
        if (contentText) {
            contentText.parentNode.insertBefore(comparisonElement, contentText.nextSibling);
        }
    }
}

// Setup achievement system
function setupAchievementSystem() {
    // Create achievements container
    const achievementsContainer = document.createElement('div');
    achievementsContainer.className = 'achievements-container';
    achievementsContainer.innerHTML = `
        <h3 style="width: 100%; text-align: center; margin-bottom: 1rem;">Your Achievements</h3>
        
        <div class="badge locked" data-badge="introduction">
            <div class="badge-icon"><i class="fas fa-home"></i></div>
            <div class="badge-text">Village Explorer</div>
        </div>
        
        <div class="badge locked" data-badge="production">
            <div class="badge-icon"><i class="fas fa-sitemap"></i></div>
            <div class="badge-text">Production Pro</div>
        </div>
        
        <div class="badge locked" data-badge="farming">
            <div class="badge-icon"><i class="fas fa-seedling"></i></div>
            <div class="badge-text">Master Farmer</div>
        </div>
        
        <div class="badge locked" data-badge="land-labor">
            <div class="badge-icon"><i class="fas fa-users"></i></div>
            <div class="badge-text">Resource Manager</div>
        </div>
        
        <div class="badge locked" data-badge="capital">
            <div class="badge-icon"><i class="fas fa-tractor"></i></div>
            <div class="badge-text">Capital Investor</div>
        </div>
        
        <div class="badge locked" data-badge="non-farm">
            <div class="badge-icon"><i class="fas fa-store"></i></div>
            <div class="badge-text">Business Guru</div>
        </div>
        
        <div class="badge locked" data-badge="quiz">
            <div class="badge-icon"><i class="fas fa-tasks"></i></div>
            <div class="badge-text">Economics Expert</div>
        </div>
        
        <div class="badge locked" data-badge="case-study">
            <div class="badge-icon"><i class="fas fa-user-circle"></i></div>
            <div class="badge-text">Case Solver</div>
        </div>
    `;
    
    // Add to quiz module
    const quizModule = document.getElementById('quiz');
    if (quizModule) {
        const quizContainer = quizModule.querySelector('.quiz-container');
        if (quizContainer) {
            quizContainer.appendChild(achievementsContainer);
        }
    }
    
    // Check for module completion to award badges
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const moduleId = tab.dataset.module;
            if (moduleId && enhancedState.achievementBadges[moduleId] === false) {
                // Mark this module as visited
                enhancedState.achievementBadges[moduleId] = true;
                
                // Unlock badge after a short delay (to simulate completing the module)
                setTimeout(() => {
                    unlockAchievement(moduleId);
                }, 10000);
            }
        });
    });
}

// Unlock an achievement badge
function unlockAchievement(badgeId) {
    const badge = document.querySelector(`.badge[data-badge="${badgeId}"]`);
    if (badge && badge.classList.contains('locked')) {
        badge.classList.remove('locked');
        badge.classList.add('animate-pulse');
        
        // Show notification
        showNotification(`Achievement Unlocked: ${badge.querySelector('.badge-text').textContent}`);
        
        // Remove pulse animation after 3 seconds
        setTimeout(() => {
            badge.classList.remove('animate-pulse');
        }, 3000);
    }
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <div class="notification-icon"><i class="fas fa-trophy"></i></div>
        <div class="notification-message">${message}</div>
    `;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        bottom: '20px',
        left: '20px',
        background: 'rgba(46, 125, 50, 0.9)',
        color: 'white',
        padding: '15px 20px',
        borderRadius: '5px',
        boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
        zIndex: '1000',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        transform: 'translateY(100px)',
        transition: 'transform 0.3s ease',
        opacity: '0'
    });
    
    document.body.appendChild(notification);
    
    // Animate notification
    setTimeout(() => {
        notification.style.transform = 'translateY(0)';
        notification.style.opacity = '1';
    }, 100);
    
    // Remove notification after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateY(100px)';
        notification.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Add printable resources
function addPrintableResources() {
    // Create resources container
    const resourcesContainer = document.createElement('div');
    resourcesContainer.className = 'resources-container';
    
    // Add title
    const title = document.createElement('h3');
    title.textContent = 'Printable Resources';
    title.style.textAlign = 'center';
    title.style.margin = '2rem 0 1rem 0';
    
    resourcesContainer.appendChild(title);
    
    // Add resources
    enhancedState.printableResources.forEach(resource => {
        const resourceCard = document.createElement('div');
        resourceCard.className = 'resource-card';
        resourceCard.innerHTML = `
            <div class="resource-icon">
                <i class="${resource.icon}"></i>
            </div>
            <div class="resource-content">
                <div class="resource-title">${resource.title}</div>
                <div class="resource-desc">${resource.description}</div>
                <button class="resource-btn" data-file="${resource.fileName}">
                    <i class="fas fa-download"></i> Download PDF
                </button>
            </div>
        `;
        
        resourcesContainer.appendChild(resourceCard);
    });
    
    // Add to non-farm module
    const nonFarmModule = document.getElementById('non-farm');
    if (nonFarmModule) {
        nonFarmModule.appendChild(resourcesContainer);
    }
    
    // Add click event to download buttons
    document.querySelectorAll('.resource-btn').forEach(button => {
        button.addEventListener('click', () => {
            const fileName = button.dataset.file;
            
            // In a real implementation, this would download the file
            // For now, we'll just show a notification
            alert(`In a complete implementation, this would download ${fileName}. This feature demonstrates how printable resources can complement the interactive learning experience.`);
        });
    });
}

// Setup enhanced charts
function setupEnhancedCharts() {
    // Find chart containers
    const charts = document.querySelectorAll('.chart-container');
    
    charts.forEach(chart => {
        // Add view options
        const viewOptions = document.createElement('div');
        viewOptions.className = 'chart-view-options';
        viewOptions.innerHTML = `
            <button class="chart-view-btn active" data-view="bar" aria-label="Bar chart view">
                <i class="fas fa-chart-bar"></i>
            </button>
            <button class="chart-view-btn" data-view="line" aria-label="Line chart view">
                <i class="fas fa-chart-line"></i>
            </button>
            <button class="chart-view-btn" data-view="pie" aria-label="Pie chart view">
                <i class="fas fa-chart-pie"></i>
            </button>
        `;
        
        chart.appendChild(viewOptions);
        
        // Add click events for view buttons
        viewOptions.querySelectorAll('.chart-view-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                viewOptions.querySelectorAll('.chart-view-btn').forEach(b => {
                    b.classList.remove('active');
                });
                
                // Add active class to clicked button
                btn.classList.add('active');
                
                // In a real implementation, this would change the chart type
                // For now, we'll just add a class to the chart container
                chart.dataset.view = btn.dataset.view;
            });
        });
    });
}

// Add interactive tooltips
function addInteractiveTooltips() {
    // Find terms to add tooltips to
    const terms = [
        { term: 'multiple cropping', tooltip: 'Growing more than one crop on a piece of land during the year' },
        { term: 'fixed capital', tooltip: 'Tools, machines, and buildings used in production over many years' },
        { term: 'working capital', tooltip: 'Raw materials and money in hand that are used up in production' },
        { term: 'human capital', tooltip: 'Knowledge and enterprise needed to organize production effectively' },
        { term: 'HYV seeds', tooltip: 'High Yielding Variety seeds introduced during the Green Revolution' },
        { term: 'factors of production', tooltip: 'Land, labor, capital and human capital required for production' }
    ];
    
    // Find all text content
    const textElements = document.querySelectorAll('p, li, td');
    
    textElements.forEach(element => {
        terms.forEach(term => {
            // Check if text contains the term
            if (element.textContent.includes(term.term)) {
                // Replace the term with a tooltip
                element.innerHTML = element.innerHTML.replace(
                    new RegExp(term.term, 'gi'),
                    `<span class="has-tooltip">${term.term}<span class="tooltip">${term.tooltip}</span></span>`
                );
            }
        });
    });
}

// Setup animations
function setupAnimations() {
    // Add animation classes to elements as they come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-growIn');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    // Elements to animate
    const elements = document.querySelectorAll('.card, .feature-card, .factor-card, .farm-sim, .timeline-item');
    
    elements.forEach(element => {
        observer.observe(element);
    });
}


