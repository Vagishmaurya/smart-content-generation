/**
 * Electoral Politics - Interactive Lesson
 * charts.js - Visualizations for electoral data
 */

// Placeholder for chart functionality
document.addEventListener('DOMContentLoaded', function() {
    // This file is a placeholder for chart functionality
    // In a full implementation, this would contain code to render
    // interactive charts using a library like Chart.js or D3.js
    
    // For now, we'll use simple placeholder implementations
    addBasicChartStyles();
});

// Add basic styling to chart placeholders
function addBasicChartStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .placeholder-image {
            background: linear-gradient(135deg, #e0e0e0, #f5f5f5);
            border: 1px dashed #999;
            border-radius: 10px;
            padding: 30px;
            text-align: center;
            min-height: 200px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
        
        .placeholder-text {
            font-size: 1.2rem;
            color: #666;
            margin-bottom: 10px;
        }
        
        .placeholder-subtext {
            font-size: 0.9rem;
            color: #999;
        }
    `;
    document.head.appendChild(style);
}

// Create a placeholder for the simple bar chart
function createSimpleBarChart(containerId, data) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // Clear any existing content
    container.innerHTML = '';
    
    // Create chart container
    const chartDiv = document.createElement('div');
    chartDiv.className = 'simple-bar-chart';
    
    // Create bars for each data point
    data.forEach(item => {
        const barContainer = document.createElement('div');
        barContainer.className = 'bar-container';
        
        const label = document.createElement('div');
        label.className = 'bar-label';
        label.textContent = item.label;
        
        const barWrapper = document.createElement('div');
        barWrapper.className = 'bar-wrapper';
        
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.width = `${item.value}%`;
        bar.style.backgroundColor = item.color || '#3f51b5';
        
        const value = document.createElement('div');
        value.className = 'bar-value';
        value.textContent = `${item.value}%`;
        
        barWrapper.appendChild(bar);
        barContainer.appendChild(label);
        barContainer.appendChild(barWrapper);
        barContainer.appendChild(value);
        
        chartDiv.appendChild(barContainer);
    });
    
    // Add the chart to the container
    container.appendChild(chartDiv);
    
    // Add CSS for the chart
    const style = document.createElement('style');
    style.textContent = `
        .simple-bar-chart {
            width: 100%;
            padding: 20px 0;
        }
        
        .bar-container {
            display: flex;
            align-items: center;
            margin-bottom: 15px;
        }
        
        .bar-label {
            width: 100px;
            text-align: right;
            padding-right: 15px;
            font-size: 0.9rem;
            color: #666;
        }
        
        .bar-wrapper {
            flex-grow: 1;
            background-color: #f0f0f0;
            border-radius: 5px;
            overflow: hidden;
            height: 25px;
        }
        
        .bar {
            height: 100%;
            transition: width 1s ease;
        }
        
        .bar-value {
            width: 50px;
            text-align: left;
            padding-left: 15px;
            font-size: 0.9rem;
            color: #666;
            font-weight: bold;
        }
    `;
    document.head.appendChild(style);
}

// Function to demonstrate how charts would be implemented
function demonstrateCharts() {
    // Example voter turnout data (for demonstration only)
    const turnoutData = [
        { label: 'India 2019', value: 67, color: '#4caf50' },
        { label: 'India 2014', value: 66, color: '#4caf50' },
        { label: 'UK 2019', value: 67, color: '#3f51b5' },
        { label: 'UK 2017', value: 69, color: '#3f51b5' }
    ];
    
    // Example social groups data (for demonstration only)
    const socialGroupsData = [
        { label: 'Upper Caste', value: 63, color: '#9c27b0' },
        { label: 'OBC', value: 60, color: '#9c27b0' },
        { label: 'SC', value: 58, color: '#9c27b0' },
        { label: 'ST', value: 55, color: '#9c27b0' },
        { label: 'Women', value: 56, color: '#e91e63' },
        { label: 'Men', value: 62, color: '#e91e63' }
    ];
    
    // Create charts
    createSimpleBarChart('turnout-chart', turnoutData);
    createSimpleBarChart('social-groups-chart', socialGroupsData);
}
