/**
 * Palampur Economics Lab - Activities Module
 * Handles interactive economics activities and exercises
 */

// Activities state
const activitiesState = {
    productionTable: {
        currentYear: 1,
        farmers: [
            {
                name: "Farmer 1",
                production: [100, 0, 0], // Production for 3 years
                consumption: 40,
                surplus: [0, 0, 0],
                capital: [0, 0, 0]
            },
            {
                name: "Farmer 2",
                production: [80, 0, 0],
                consumption: 40,
                surplus: [0, 0, 0],
                capital: [0, 0, 0]
            },
            {
                name: "Farmer 3",
                production: [60, 0, 0],
                consumption: 40,
                surplus: [0, 0, 0],
                capital: [0, 0, 0]
            }
        ]
    },
    charts: {
        cultivationArea: {
            years: ["1950-51", "1990-91", "2000-01", "2010-11", "2016-17"],
            values: [132, 186, 186, 198, 200]
        },
        cropProduction: {
            years: ["1965-66", "1980-81", "1990-91", "2000-01", "2010-11", "2020-21"],
            pulses: [10, 11, 14, 11, 18, 26],
            wheat: [10, 36, 55, 70, 87, 110]
        }
    },
    matchingActivity: {
        matches: [],
        correctMatches: [
            {source: "land", target: "natural-resource"},
            {source: "labour", target: "human-effort"},
            {source: "tools", target: "fixed-capital"},
            {source: "seeds", target: "working-capital"}
        ]
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // Initialize activities
    initActivities();
});

// Initialize all activities
function initActivities() {
    // Initialize production tables
    initProductionTables();
    
    // Initialize charts if they exist
    initCharts();
    
    // Initialize drag and drop activities if they exist
    initMatchingActivity();
    
    // Add event listener for production table calculation button
    document.getElementById('calculateNextYear')?.addEventListener('click', calculateNextProductionYear);
}

// Initialize production tables
function initProductionTables() {
    const tableContainer = document.getElementById('productionTableContainer');
    if (!tableContainer) return;
    
    // Calculate initial values for Year 1
    activitiesState.productionTable.farmers.forEach(farmer => {
        farmer.surplus[0] = farmer.production[0] - farmer.consumption;
        farmer.capital[0] = farmer.surplus[0] > 0 ? farmer.surplus[0] : 0;
    });
    
    renderProductionTable();
}

// Render the production table with current values
function renderProductionTable() {
    const tableContainer = document.getElementById('productionTableContainer');
    if (!tableContainer) return;
    
    const { farmers, currentYear } = activitiesState.productionTable;
    
    // Create table HTML
    let tableHTML = `
        <h3>Production Table: Year ${currentYear}</h3>
        <table class="data-table">
            <thead>
                <tr>
                    <th>Farmer</th>
                    <th>Production</th>
                    <th>Consumption</th>
                    <th>Surplus</th>
                    <th>Capital for Next Year</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    // Add rows for each farmer
    farmers.forEach((farmer, index) => {
        const yearIndex = currentYear - 1; // 0-based index
        tableHTML += `
            <tr>
                <td>${farmer.name}</td>
                <td>${farmer.production[yearIndex]}</td>
                <td>${farmer.consumption}</td>
                <td>${farmer.surplus[yearIndex]}</td>
                <td>${farmer.capital[yearIndex]}</td>
            </tr>
        `;
    });
    
    tableHTML += `
            </tbody>
        </table>
    `;
    
    // Add analysis if past year 1
    if (currentYear > 1) {
        tableHTML += `
            <div class="table-analysis">
                <h4>Analysis:</h4>
                <ul>
                    ${getProductionAnalysis()}
                </ul>
            </div>
        `;
    }
    
    // Add button for next year calculation
    if (currentYear < 3) {
        tableHTML += `
            <div class="btn-container">
                <button id="calculateNextYear" class="btn">Calculate Year ${currentYear + 1}</button>
            </div>
        `;
    } else {
        tableHTML += `
            <div class="table-conclusion">
                <h4>Conclusion:</h4>
                <p>This simulation demonstrates how initial capital and surplus affect future production. Farmers with larger surpluses can reinvest more capital, leading to higher production in subsequent years. Farmers who cannot generate sufficient surplus may face difficulties continuing production.</p>
            </div>
        `;
    }
    
    tableContainer.innerHTML = tableHTML;
    
    // Re-add event listener since we replaced the button
    document.getElementById('calculateNextYear')?.addEventListener('click', calculateNextProductionYear);
}

// Calculate production for next year
function calculateNextProductionYear() {
    const { farmers, currentYear } = activitiesState.productionTable;
    
    if (currentYear >= 3) return; // Max 3 years
    
    // Calculate production for next year based on capital
    farmers.forEach(farmer => {
        const nextYearIndex = currentYear; // 0-based index
        
        // Production is twice the capital invested
        farmer.production[nextYearIndex] = farmer.capital[currentYear - 1] * 2;
        
        // Calculate surplus and capital for next year
        farmer.surplus[nextYearIndex] = farmer.production[nextYearIndex] - farmer.consumption;
        farmer.capital[nextYearIndex] = farmer.surplus[nextYearIndex] > 0 ? farmer.surplus[nextYearIndex] : 0;
    });
    
    // Increment year
    activitiesState.productionTable.currentYear++;
    
    // Update UI
    renderProductionTable();
    
    // Update progress
    window.palampurApp.updateProgress(window.palampurApp.progress + 10);
}

// Get analysis for production table
function getProductionAnalysis() {
    const { farmers, currentYear } = activitiesState.productionTable;
    
    let analysisHTML = '';
    
    // Compare production between years
    farmers.forEach(farmer => {
        const prevYearIndex = currentYear - 2;
        const currentYearIndex = currentYear - 1;
        
        const productionChange = farmer.production[currentYearIndex] - farmer.production[prevYearIndex];
        const productionChangePercent = Math.round((productionChange / farmer.production[prevYearIndex]) * 100);
        
        let analysis = '';
        if (farmer.production[currentYearIndex] === 0) {
            analysis = `${farmer.name} couldn't continue production due to lack of capital.`;
        } else if (productionChange > 0) {
            analysis = `${farmer.name}'s production increased by ${productionChangePercent}% from the previous year.`;
        } else if (productionChange < 0) {
            analysis = `${farmer.name}'s production decreased by ${Math.abs(productionChangePercent)}% from the previous year.`;
        } else {
            analysis = `${farmer.name}'s production remained unchanged from the previous year.`;
        }
        
        analysisHTML += `<li>${analysis}</li>`;
    });
    
    return analysisHTML;
}

// Initialize charts
function initCharts() {
    // Create cultivation area chart if container exists
    const cultivationChartContainer = document.getElementById('cultivationAreaChart');
    if (cultivationChartContainer) {
        renderBarChart(
            cultivationChartContainer, 
            activitiesState.charts.cultivationArea.years,
            activitiesState.charts.cultivationArea.values,
            'Cultivated Area in Million Hectares',
            'year',
            'area'
        );
    }
    
    // Create crop production chart if container exists
    const cropChartContainer = document.getElementById('cropProductionChart');
    if (cropChartContainer) {
        renderLineChart(
            cropChartContainer,
            activitiesState.charts.cropProduction.years,
            {
                'Pulses': activitiesState.charts.cropProduction.pulses,
                'Wheat': activitiesState.charts.cropProduction.wheat
            },
            'Crop Production in Million Tonnes'
        );
    }
}

// Render a bar chart
function renderBarChart(container, labels, values, title, xAxisLabel, valueLabel) {
    // Calculate max value for scaling
    const maxValue = Math.max(...values) * 1.2;
    
    // Create HTML for chart
    let chartHTML = `
        <h3>${title}</h3>
        <div class="bar-chart">
    `;
    
    // Add bars
    labels.forEach((label, index) => {
        const heightPercent = (values[index] / maxValue) * 100;
        chartHTML += `
            <div class="chart-bar" 
                 style="height: ${heightPercent}%;" 
                 data-value="${values[index]}" 
                 data-label="${label}">
            </div>
        `;
    });
    
    chartHTML += `
        </div>
        <div class="chart-labels">
            <span class="x-axis-label">${xAxisLabel || 'Year'}</span>
            <span class="y-axis-label">${valueLabel || 'Value'}</span>
        </div>
    `;
    
    // Add CSS if not already added
    if (!document.getElementById('chart-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'chart-styles';
        styleSheet.innerHTML = `
            .chart-labels {
                display: flex;
                justify-content: space-between;
                margin-top: 40px;
                color: var(--text-medium);
                font-weight: 600;
            }
            .x-axis-label, .y-axis-label {
                text-transform: capitalize;
            }
        `;
        document.head.appendChild(styleSheet);
    }
    
    container.innerHTML = chartHTML;
}

// Render a line chart
function renderLineChart(container, xLabels, datasets, title) {
    // Create canvas element for chart
    container.innerHTML = `
        <h3>${title}</h3>
        <div class="line-chart-container">
            <canvas id="lineChart"></canvas>
        </div>
    `;
    
    // Simple visualization using divs (as a fallback if Chart.js is not available)
    const lineChartContainer = document.createElement('div');
    lineChartContainer.className = 'line-chart-fallback';
    
    // Find max value for scaling
    let maxValue = 0;
    Object.values(datasets).forEach(data => {
        maxValue = Math.max(maxValue, ...data);
    });
    maxValue *= 1.2; // Add 20% space at top
    
    // Create legend
    const legend = document.createElement('div');
    legend.className = 'chart-legend';
    
    Object.keys(datasets).forEach((key, index) => {
        const color = index === 0 ? '#4caf50' : '#2196f3';
        
        const legendItem = document.createElement('div');
        legendItem.className = 'legend-item';
        legendItem.innerHTML = `
            <span class="legend-color" style="background-color: ${color};"></span>
            <span class="legend-label">${key}</span>
        `;
        
        legend.appendChild(legendItem);
    });
    
    lineChartContainer.appendChild(legend);
    
    // Create chart area
    const chartArea = document.createElement('div');
    chartArea.className = 'chart-area';
    chartArea.style.position = 'relative';
    chartArea.style.height = '300px';
    chartArea.style.marginTop = '20px';
    chartArea.style.border = '1px solid #eee';
    
    // Add line for each dataset
    Object.entries(datasets).forEach(([key, data], index) => {
        const color = index === 0 ? '#4caf50' : '#2196f3';
        
        // Create line SVG
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', '100%');
        svg.setAttribute('height', '100%');
        svg.style.position = 'absolute';
        
        const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
        polyline.setAttribute('fill', 'none');
        polyline.setAttribute('stroke', color);
        polyline.setAttribute('stroke-width', '2');
        
        // Calculate points
        let points = '';
        const width = 100; // Use percentage for responsiveness
        const segmentWidth = width / (data.length - 1);
        
        data.forEach((value, i) => {
            const x = i * segmentWidth;
            const y = 100 - ((value / maxValue) * 100); // Invert Y axis
            points += `${x},${y} `;
        });
        
        polyline.setAttribute('points', points);
        svg.appendChild(polyline);
        
        // Add data points
        data.forEach((value, i) => {
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            const x = i * segmentWidth;
            const y = 100 - ((value / maxValue) * 100);
            
            circle.setAttribute('cx', x);
            circle.setAttribute('cy', y);
            circle.setAttribute('r', '3');
            circle.setAttribute('fill', color);
            
            svg.appendChild(circle);
        });
        
        chartArea.appendChild(svg);
    });
    
    // Add x-axis labels
    const xAxis = document.createElement('div');
    xAxis.className = 'x-axis';
    xAxis.style.display = 'flex';
    xAxis.style.justifyContent = 'space-between';
    xAxis.style.marginTop = '10px';
    
    xLabels.forEach(label => {
        const xLabel = document.createElement('div');
        xLabel.className = 'x-label';
        xLabel.textContent = label;
        xLabel.style.fontSize = '0.8rem';
        xAxis.appendChild(xLabel);
    });
    
    lineChartContainer.appendChild(chartArea);
    lineChartContainer.appendChild(xAxis);
    
    // Add CSS for chart
    if (!document.getElementById('line-chart-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'line-chart-styles';
        styleSheet.innerHTML = `
            .line-chart-fallback {
                margin-top: 20px;
            }
            .chart-legend {
                display: flex;
                justify-content: center;
                gap: 20px;
                margin-bottom: 20px;
            }
            .legend-item {
                display: flex;
                align-items: center;
                gap: 5px;
            }
            .legend-color {
                display: inline-block;
                width: 12px;
                height: 12px;
                border-radius: 50%;
            }
            .x-axis {
                padding: 0 10px;
            }
        `;
        document.head.appendChild(styleSheet);
    }
    
    container.appendChild(lineChartContainer);
}

// Initialize matching activity
function initMatchingActivity() {
    const matchingContainer = document.getElementById('matchingActivity');
    if (!matchingContainer) return;
    
    // Create matching activity HTML
    let matchingHTML = `
        <h3>Match Factors of Production</h3>
        <p>Drag each factor of production to its correct category.</p>
        
        <div class="matching-container">
            <div class="sources-container">
                <div class="matching-item source" draggable="true" data-id="land">Land</div>
                <div class="matching-item source" draggable="true" data-id="labour">Labour</div>
                <div class="matching-item source" draggable="true" data-id="tools">Tools & Machines</div>
                <div class="matching-item source" draggable="true" data-id="seeds">Seeds & Raw Materials</div>
            </div>
            
            <div class="targets-container">
                <div class="matching-target" data-id="natural-resource">Natural Resource</div>
                <div class="matching-target" data-id="human-effort">Human Effort</div>
                <div class="matching-target" data-id="fixed-capital">Fixed Capital</div>
                <div class="matching-target" data-id="working-capital">Working Capital</div>
            </div>
        </div>
        
        <div id="matchingResult" class="matching-result" style="display: none;"></div>
        
        <div class="btn-container">
            <button id="checkMatching" class="btn">Check Answers</button>
            <button id="resetMatching" class="btn secondary">Reset</button>
        </div>
    `;
    
    matchingContainer.innerHTML = matchingHTML;
    
    // Add CSS for matching activity
    if (!document.getElementById('matching-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'matching-styles';
        styleSheet.innerHTML = `
            .matching-container {
                display: flex;
                gap: 40px;
                margin: 30px 0;
            }
            
            .sources-container, .targets-container {
                flex: 1;
                display: flex;
                flex-direction: column;
                gap: 15px;
            }
            
            .matching-item {
                background-color: var(--primary-light);
                color: white;
                padding: 10px 15px;
                border-radius: 5px;
                cursor: grab;
                text-align: center;
            }
            
            .matching-item.dragging {
                opacity: 0.5;
            }
            
            .matching-target {
                background-color: #f5f5f5;
                border: 2px dashed #ccc;
                padding: 10px 15px;
                border-radius: 5px;
                min-height: 45px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .matching-target.highlight {
                border-color: var(--primary-color);
                background-color: rgba(46, 125, 50, 0.05);
            }
            
            .matching-target.matched {
                border-style: solid;
                border-color: var(--success-color);
            }
            
            .matching-target.incorrect {
                border-style: solid;
                border-color: var(--error-color);
            }
            
            .matching-result {
                margin: 20px 0;
                padding: 15px;
                border-radius: 5px;
                text-align: center;
            }
            
            .matching-result.success {
                background-color: rgba(76, 175, 80, 0.1);
                border: 1px solid var(--success-color);
                color: #2e7d32;
            }
            
            .matching-result.error {
                background-color: rgba(244, 67, 54, 0.1);
                border: 1px solid var(--error-color);
                color: #c62828;
            }
        `;
        document.head.appendChild(styleSheet);
    }
    
    // Setup drag and drop functionality
    setupDragAndDrop();
    
    // Add event listeners for buttons
    document.getElementById('checkMatching')?.addEventListener('click', checkMatchingAnswers);
    document.getElementById('resetMatching')?.addEventListener('click', resetMatchingActivity);
}

// Setup drag and drop functionality
function setupDragAndDrop() {
    const dragItems = document.querySelectorAll('.matching-item');
    const dropTargets = document.querySelectorAll('.matching-target');
    
    dragItems.forEach(item => {
        item.addEventListener('dragstart', function(e) {
            this.classList.add('dragging');
            e.dataTransfer.setData('text/plain', this.dataset.id);
        });
        
        item.addEventListener('dragend', function() {
            this.classList.remove('dragging');
        });
    });
    
    dropTargets.forEach(target => {
        target.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.classList.add('highlight');
        });
        
        target.addEventListener('dragleave', function() {
            this.classList.remove('highlight');
        });
        
        target.addEventListener('drop', function(e) {
            e.preventDefault();
            this.classList.remove('highlight');
            
            const sourceId = e.dataTransfer.getData('text/plain');
            const targetId = this.dataset.id;
            
            // Record the match
            activitiesState.matchingActivity.matches.push({
                source: sourceId,
                target: targetId
            });
            
            // Update UI
            const sourceElement = document.querySelector(`.matching-item[data-id="${sourceId}"]`);
            if (sourceElement) {
                sourceElement.style.display = 'none';
                
                // Clone the source element into the target
                const clone = sourceElement.cloneNode(true);
                clone.style.display = 'block';
                clone.style.backgroundColor = 'var(--primary-color)';
                clone.style.cursor = 'default';
                clone.removeAttribute('draggable');
                
                this.innerHTML = '';
                this.appendChild(clone);
                this.classList.add('matched');
            }
        });
    });
}

// Check matching activity answers
function checkMatchingAnswers() {
    const { matches, correctMatches } = activitiesState.matchingActivity;
    const resultElement = document.getElementById('matchingResult');
    
    if (!resultElement) return;
    
    // Check if all items have been matched
    if (matches.length < correctMatches.length) {
        resultElement.className = 'matching-result error';
        resultElement.textContent = 'Please match all items before checking answers.';
        resultElement.style.display = 'block';
        return;
    }
    
    // Check if all matches are correct
    let allCorrect = true;
    let correctCount = 0;
    
    matches.forEach(match => {
        const isCorrect = correctMatches.some(correctMatch => 
            correctMatch.source === match.source && correctMatch.target === match.target
        );
        
        if (isCorrect) {
            correctCount++;
        } else {
            allCorrect = false;
            // Highlight incorrect match
            const targetElement = document.querySelector(`.matching-target[data-id="${match.target}"]`);
            if (targetElement) {
                targetElement.classList.remove('matched');
                targetElement.classList.add('incorrect');
            }
        }
    });
    
    // Show result
    if (allCorrect) {
        resultElement.className = 'matching-result success';
        resultElement.textContent = 'Excellent! All matches are correct.';
        
        // Update progress
        window.palampurApp.updateProgress(window.palampurApp.progress + 15);
    } else {
        resultElement.className = 'matching-result error';
        resultElement.textContent = `You got ${correctCount} out of ${correctMatches.length} correct. Please try again.`;
    }
    
    resultElement.style.display = 'block';
}

// Reset matching activity
function resetMatchingActivity() {
    // Clear matches
    activitiesState.matchingActivity.matches = [];
    
    // Reset UI
    const sourceElements = document.querySelectorAll('.matching-item');
    sourceElements.forEach(element => {
        element.style.display = 'block';
    });
    
    const targetElements = document.querySelectorAll('.matching-target');
    targetElements.forEach(element => {
        element.innerHTML = element.dataset.id.split('-').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
        element.classList.remove('matched', 'incorrect');
    });
    
    // Hide result
    const resultElement = document.getElementById('matchingResult');
    if (resultElement) {
        resultElement.style.display = 'none';
    }
}


