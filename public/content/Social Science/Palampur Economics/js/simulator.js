/**
 * Palampur Economics Lab - Simulation Module
 * Handles interactive economic simulations like farming and production
 */

// Simulation state
const simState = {
    farming: {
        selectedCrop: null,
        cropYields: { 
            wheat: 0, 
            potato: 0, 
            sugarcane: 0, 
            jowar: 0 
        },
        farmSize: 1, // hectares
        irrigated: true,
        seedType: 'traditional', // traditional or HYV
        hasFertilizer: false,
        hasSimulated: false
    },
    capital: {
        fixedCapital: 5000,
        workingCapital: 3000,
        loan: 0,
        interestRate: 0.24, // 24% per annum
        production: 0
    },
    labour: {
        familyLabour: 2,
        hiredLabour: 0,
        dailyWage: 160
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all simulators
    initSimulators();
    
    // Add event listener for simulation buttons
    document.getElementById('farmSimulateBtn')?.addEventListener('click', runFarmSimulation);
    document.getElementById('resetFarmSimBtn')?.addEventListener('click', resetFarmSimulation);
    
    // Add event listeners for capital simulation
    document.getElementById('capitalSimulateBtn')?.addEventListener('click', runCapitalSimulation);
    document.getElementById('resetCapitalSimBtn')?.addEventListener('click', resetCapitalSimulation);
    
    // Add event listeners for production sliders if they exist
    document.querySelectorAll('.sim-slider').forEach(slider => {
        slider.addEventListener('input', updateSimulationValues);
    });
});

// Initialize all interactive simulators
function initSimulators() {
    // Add event listeners for crop selection
    document.querySelectorAll('.crop-option').forEach(crop => {
        crop.addEventListener('click', () => {
            selectCrop(crop, crop.dataset.crop);
        });
    });
    
    // Set up initial slider values if they exist
    updateSimulationUI();
}

// Crop selection for farming simulator
function selectCrop(element, cropType) {
    // Reset all crops
    document.querySelectorAll('.crop-option').forEach(c => c.classList.remove('selected'));
    
    // Highlight selected crop
    element.classList.add('selected');
    simState.farming.selectedCrop = cropType;
    
    // Update UI based on crop selection
    updateFarmingOptions();
}

// Update farming options based on selected crop
function updateFarmingOptions() {
    // This function would update available options based on the selected crop
    // For example, different crops might have different irrigation requirements,
    // fertilizer needs, etc.
    
    const cropInfoDiv = document.getElementById('cropInfo');
    if (!cropInfoDiv || !simState.farming.selectedCrop) return;
    
    // Show crop specific information
    const cropInfo = getCropInfo(simState.farming.selectedCrop);
    
    cropInfoDiv.innerHTML = `
        <h4><i class="${getIconForCrop(simState.farming.selectedCrop)}"></i> ${cropInfo.name}</h4>
        <div class="crop-details">
            <p><strong>Season:</strong> ${cropInfo.season}</p>
            <p><strong>Water Needs:</strong> ${cropInfo.waterNeeds}</p>
            <p><strong>Growing Period:</strong> ${cropInfo.growingPeriod}</p>
            <p><strong>Uses:</strong> ${cropInfo.uses}</p>
        </div>
    `;
    
    cropInfoDiv.style.display = 'block';
}

// Run the farming simulation
function runFarmSimulation() {
    if (!simState.farming.selectedCrop) {
        alert('Please select a crop first!');
        return;
    }
    
    // Get input values from UI
    const farmSizeInput = document.getElementById('farmSize');
    if (farmSizeInput) {
        simState.farming.farmSize = parseFloat(farmSizeInput.value) || 1;
    }
    
    const irrigatedInput = document.getElementById('irrigated');
    if (irrigatedInput) {
        simState.farming.irrigated = irrigatedInput.checked;
    }
    
    const seedTypeInput = document.getElementById('seedType');
    if (seedTypeInput) {
        simState.farming.seedType = seedTypeInput.value;
    }
    
    const fertilizerInput = document.getElementById('fertilizer');
    if (fertilizerInput) {
        simState.farming.hasFertilizer = fertilizerInput.checked;
    }
    
    // Calculate yields based on inputs
    calculateCropYield();
    
    // Display results
    showFarmResults();
    
    simState.farming.hasSimulated = true;
    
    // Update progress
    window.palampurApp.updateProgress(window.palampurApp.progress + 15);
}

// Calculate crop yields based on inputs
function calculateCropYield() {
    const crop = simState.farming.selectedCrop;
    const area = simState.farming.farmSize;
    const irrigated = simState.farming.irrigated;
    const seedType = simState.farming.seedType;
    const hasFertilizer = simState.farming.hasFertilizer;
    
    // Base yield in kg per hectare (based on traditional seeds, no irrigation, no fertilizer)
    let baseYield = {
        wheat: 1000,
        potato: 8000,
        sugarcane: 30000,
        jowar: 900
    }[crop] || 1000;
    
    // Apply modifiers
    let yieldMultiplier = 1.0;
    
    // Irrigation effect
    if (irrigated) {
        yieldMultiplier *= 1.5; // 50% increase with irrigation
    }
    
    // Seed type effect
    if (seedType === 'HYV') {
        yieldMultiplier *= 2.5; // 150% additional increase with HYV seeds
    }
    
    // Fertilizer effect
    if (hasFertilizer && seedType === 'HYV') {
        yieldMultiplier *= 1.4; // 40% additional increase with fertilizer for HYV
    } else if (hasFertilizer) {
        yieldMultiplier *= 1.2; // 20% additional increase with fertilizer for traditional
    }
    
    // Calculate final yield and store
    const finalYield = baseYield * yieldMultiplier * area;
    simState.farming.cropYields[crop] = Math.round(finalYield);
}

// Display farming simulation results
function showFarmResults() {
    const resultsDiv = document.getElementById('farmResults');
    if (!resultsDiv) return;
    
    const crop = simState.farming.selectedCrop;
    const yield = simState.farming.cropYields[crop];
    const cropInfo = getCropInfo(crop);
    
    // Calculate economics
    const productionCost = calculateProductionCost();
    const marketPrice = cropInfo.marketPrice; // Rs per kg
    const revenue = yield * marketPrice;
    const profit = revenue - productionCost;
    
    resultsDiv.innerHTML = `
        <h3><i class="fas fa-chart-line"></i> Simulation Results</h3>
        <div class="result-item">
            <span class="result-label">Total Yield:</span>
            <span class="result-value">${yield} kg of ${cropInfo.name}</span>
        </div>
        <div class="result-item">
            <span class="result-label">Production Cost:</span>
            <span class="result-value">₹${productionCost}</span>
        </div>
        <div class="result-item">
            <span class="result-label">Market Price:</span>
            <span class="result-value">₹${marketPrice} per kg</span>
        </div>
        <div class="result-item">
            <span class="result-label">Revenue:</span>
            <span class="result-value">₹${revenue}</span>
        </div>
        <div class="result-item profit">
            <span class="result-label">Profit:</span>
            <span class="result-value" style="color: ${profit >= 0 ? 'green' : 'red'}">₹${profit}</span>
        </div>
        
        <div class="farming-analysis">
            <h4>Analysis:</h4>
            <p>${getFarmingAnalysis(crop, yield, profit)}</p>
        </div>
    `;
    
    resultsDiv.style.display = 'block';
    
    // Add CSS for the results if not already added
    if (!document.getElementById('farm-results-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'farm-results-styles';
        styleSheet.innerHTML = `
            .result-item {
                display: flex;
                justify-content: space-between;
                padding: 0.8rem 0;
                border-bottom: 1px solid #eee;
            }
            .result-label {
                font-weight: 600;
                color: var(--text-dark);
            }
            .result-value {
                font-weight: 700;
                color: var(--primary-color);
            }
            .profit {
                margin-top: 1rem;
                font-size: 1.2rem;
                border-bottom: none;
            }
            .farming-analysis {
                margin-top: 1.5rem;
                background: rgba(46, 125, 50, 0.05);
                padding: 1rem;
                border-radius: 0.5rem;
            }
        `;
        document.head.appendChild(styleSheet);
    }
}

// Calculate production cost for farming
function calculateProductionCost() {
    const crop = simState.farming.selectedCrop;
    const area = simState.farming.farmSize;
    const seedType = simState.farming.seedType;
    const hasFertilizer = simState.farming.hasFertilizer;
    
    // Base costs per hectare
    let seedCost = seedType === 'HYV' ? 2000 : 500;
    let fertilizerCost = hasFertilizer ? 1500 : 0;
    let laborCost = 2000; // labor cost per hectare
    let irrigationCost = simState.farming.irrigated ? 1200 : 0;
    
    // Additional costs specific to crops
    let cropSpecificCost = {
        wheat: 500,
        potato: 1200,
        sugarcane: 3000,
        jowar: 300
    }[crop] || 500;
    
    // Total production cost
    return (seedCost + fertilizerCost + laborCost + irrigationCost + cropSpecificCost) * area;
}

// Get analysis of farming results
function getFarmingAnalysis(crop, yield, profit) {
    if (profit > 5000) {
        return `Your ${crop} farm is highly profitable! With the current yield of ${yield} kg, you're making a substantial profit. This could be reinvested in more land or better equipment.`;
    } else if (profit > 0) {
        return `Your ${crop} farm is profitable, but there's room for improvement. Consider exploring better farming techniques or scaling up production to increase your profits.`;
    } else {
        return `Your ${crop} farm is currently operating at a loss. Consider changing crops, improving your farming methods, or reducing costs to make your farm economically viable.`;
    }
}

// Reset the farming simulation
function resetFarmSimulation() {
    // Reset simulation state
    simState.farming = {
        selectedCrop: null,
        cropYields: { wheat: 0, potato: 0, sugarcane: 0, jowar: 0 },
        farmSize: 1,
        irrigated: true,
        seedType: 'traditional',
        hasFertilizer: false,
        hasSimulated: false
    };
    
    // Reset UI
    document.querySelectorAll('.crop-option').forEach(c => c.classList.remove('selected'));
    
    const cropInfoDiv = document.getElementById('cropInfo');
    if (cropInfoDiv) {
        cropInfoDiv.style.display = 'none';
    }
    
    const resultsDiv = document.getElementById('farmResults');
    if (resultsDiv) {
        resultsDiv.style.display = 'none';
    }
    
    // Reset form inputs
    const farmSizeInput = document.getElementById('farmSize');
    if (farmSizeInput) {
        farmSizeInput.value = 1;
    }
    
    const irrigatedInput = document.getElementById('irrigated');
    if (irrigatedInput) {
        irrigatedInput.checked = true;
    }
    
    const seedTypeInput = document.getElementById('seedType');
    if (seedTypeInput) {
        seedTypeInput.value = 'traditional';
    }
    
    const fertilizerInput = document.getElementById('fertilizer');
    if (fertilizerInput) {
        fertilizerInput.checked = false;
    }
}

// Get information about crops
function getCropInfo(cropType) {
    const cropInfo = {
        wheat: {
            name: 'Wheat',
            season: 'Rabi (Winter)',
            waterNeeds: 'Medium',
            growingPeriod: '4-5 months',
            uses: 'Flour, bread, feed',
            marketPrice: 20 // Rs per kg
        },
        potato: {
            name: 'Potato',
            season: 'Winter',
            waterNeeds: 'Medium to High',
            growingPeriod: '3-4 months',
            uses: 'Vegetable, processed foods',
            marketPrice: 15 // Rs per kg
        },
        sugarcane: {
            name: 'Sugarcane',
            season: 'Year-round (harvested annually)',
            waterNeeds: 'High',
            growingPeriod: '12-18 months',
            uses: 'Sugar, jaggery, ethanol',
            marketPrice: 3 // Rs per kg
        },
        jowar: {
            name: 'Jowar (Sorghum)',
            season: 'Kharif (Rainy)',
            waterNeeds: 'Low to Medium',
            growingPeriod: '3-4 months',
            uses: 'Flour, animal feed',
            marketPrice: 18 // Rs per kg
        }
    };
    
    return cropInfo[cropType] || {};
}

// Get icon for a crop
function getIconForCrop(cropType) {
    const icons = {
        wheat: 'fas fa-seedling',
        potato: 'fas fa-apple-alt', // Using apple icon for potato
        sugarcane: 'fas fa-candy-cane', // Using candy cane for sugarcane
        jowar: 'fas fa-leaf'
    };
    
    return icons[cropType] || 'fas fa-seedling';
}

// Run capital simulation
function runCapitalSimulation() {
    // Get input values
    const fixedCapitalInput = document.getElementById('fixedCapital');
    const workingCapitalInput = document.getElementById('workingCapital');
    const loanInput = document.getElementById('loanAmount');
    const interestRateInput = document.getElementById('interestRate');
    
    if (fixedCapitalInput) simState.capital.fixedCapital = parseFloat(fixedCapitalInput.value) || 5000;
    if (workingCapitalInput) simState.capital.workingCapital = parseFloat(workingCapitalInput.value) || 3000;
    if (loanInput) simState.capital.loan = parseFloat(loanInput.value) || 0;
    if (interestRateInput) simState.capital.interestRate = parseFloat(interestRateInput.value) / 100 || 0.24;
    
    // Calculate production based on capital inputs
    calculateProduction();
    
    // Show results
    showCapitalResults();
    
    // Update progress
    window.palampurApp.updateProgress(window.palampurApp.progress + 10);
}

// Calculate production based on capital inputs
function calculateProduction() {
    // Simple production function: Output = f(fixed capital, working capital)
    // We'll use a Cobb-Douglas style production function for simplicity
    const fixedCapital = simState.capital.fixedCapital;
    const workingCapital = simState.capital.workingCapital;
    
    // Production function with diminishing returns
    simState.capital.production = Math.round(2 * Math.pow(fixedCapital, 0.4) * Math.pow(workingCapital, 0.6));
    
    // Calculate loan costs
    const loanAmount = simState.capital.loan;
    const interestRate = simState.capital.interestRate;
    simState.capital.interestCost = Math.round(loanAmount * interestRate);
    
    // Calculate net output after loan repayment
    simState.capital.netProduction = simState.capital.production - simState.capital.interestCost;
}

// Display capital simulation results
function showCapitalResults() {
    const resultsDiv = document.getElementById('capitalResults');
    if (!resultsDiv) return;
    
    const { fixedCapital, workingCapital, loan, interestRate, production, interestCost, netProduction } = simState.capital;
    
    resultsDiv.innerHTML = `
        <h3><i class="fas fa-chart-line"></i> Capital Investment Results</h3>
        <div class="result-item">
            <span class="result-label">Total Capital Investment:</span>
            <span class="result-value">₹${fixedCapital + workingCapital}</span>
        </div>
        <div class="result-item">
            <span class="result-label">Loan Amount:</span>
            <span class="result-value">₹${loan}</span>
        </div>
        <div class="result-item">
            <span class="result-label">Interest Payment:</span>
            <span class="result-value">₹${interestCost} (${Math.round(interestRate * 100)}% of loan)</span>
        </div>
        <div class="result-item">
            <span class="result-label">Gross Production:</span>
            <span class="result-value">₹${production}</span>
        </div>
        <div class="result-item profit">
            <span class="result-label">Net Production (after interest):</span>
            <span class="result-value" style="color: ${netProduction >= 0 ? 'green' : 'red'}">₹${netProduction}</span>
        </div>
        
        <div class="capital-analysis">
            <h4>Analysis:</h4>
            <p>${getCapitalAnalysis()}</p>
        </div>
    `;
    
    resultsDiv.style.display = 'block';
    
    // Add CSS for capital results if not already added
    if (!document.getElementById('capital-results-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'capital-results-styles';
        styleSheet.innerHTML = `
            .capital-analysis {
                margin-top: 1.5rem;
                background: rgba(46, 125, 50, 0.05);
                padding: 1rem;
                border-radius: 0.5rem;
            }
        `;
        document.head.appendChild(styleSheet);
    }
}

// Get analysis of capital simulation
function getCapitalAnalysis() {
    const { loan, production, interestCost, netProduction } = simState.capital;
    
    if (loan === 0) {
        return `You're operating without any loans, which means all your production value is yours to keep. This is similar to medium and large farmers in Palampur who can arrange capital from their own savings.`;
    } else if (interestCost < production * 0.2) { // Interest is less than 20% of production
        return `You have a manageable loan with reasonable interest payments. You're still making a good profit after paying the interest, which can be reinvested in your business.`;
    } else if (netProduction > 0) {
        return `Your interest payments are quite high relative to your production. While you're still profitable, a large portion of your earnings goes toward interest payments. Consider reducing your loan or finding lower interest rates.`;
    } else {
        return `Your interest payments exceed your production value. This is unsustainable and similar to the debt trap that many small farmers in Palampur face. You need to either increase production, reduce the loan amount, or find a lower interest rate.`;
    }
}

// Reset capital simulation
function resetCapitalSimulation() {
    // Reset state
    simState.capital = {
        fixedCapital: 5000,
        workingCapital: 3000,
        loan: 0,
        interestRate: 0.24,
        production: 0
    };
    
    // Reset UI inputs
    const fixedCapitalInput = document.getElementById('fixedCapital');
    const workingCapitalInput = document.getElementById('workingCapital');
    const loanInput = document.getElementById('loanAmount');
    const interestRateInput = document.getElementById('interestRate');
    
    if (fixedCapitalInput) fixedCapitalInput.value = 5000;
    if (workingCapitalInput) workingCapitalInput.value = 3000;
    if (loanInput) loanInput.value = 0;
    if (interestRateInput) interestRateInput.value = 24;
    
    // Hide results
    const resultsDiv = document.getElementById('capitalResults');
    if (resultsDiv) {
        resultsDiv.style.display = 'none';
    }
}

// Update simulation UI based on slider inputs
function updateSimulationValues() {
    // Update labels with current values
    document.querySelectorAll('.sim-slider').forEach(slider => {
        const valueDisplay = document.getElementById(`${slider.id}Value`);
        if (valueDisplay) {
            valueDisplay.textContent = slider.value + (slider.dataset.unit || '');
        }
    });
}

// Update all simulation UI elements
function updateSimulationUI() {
    // Update all sliders
    updateSimulationValues();
}


