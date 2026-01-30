// Salary Guide Page Functionality

// Salary calculation data
const salaryData = {
    "Software Engineer": {
        entry: { min: 75000, max: 95000, avg: 85000 },
        mid: { min: 95000, max: 135000, avg: 115000 },
        senior: { min: 135000, max: 190000, avg: 162500 },
        executive: { min: 180000, max: 300000, avg: 240000 }
    },
    "Product Manager": {
        entry: { min: 80000, max: 100000, avg: 90000 },
        mid: { min: 100000, max: 150000, avg: 125000 },
        senior: { min: 150000, max: 220000, avg: 185000 },
        executive: { min: 200000, max: 350000, avg: 275000 }
    },
    "Data Analyst": {
        entry: { min: 60000, max: 80000, avg: 70000 },
        mid: { min: 80000, max: 110000, avg: 95000 },
        senior: { min: 110000, max: 150000, avg: 130000 },
        executive: { min: 140000, max: 220000, avg: 180000 }
    },
    "UX Designer": {
        entry: { min: 65000, max: 85000, avg: 75000 },
        mid: { min: 85000, max: 120000, avg: 102500 },
        senior: { min: 120000, max: 170000, avg: 145000 },
        executive: { min: 160000, max: 250000, avg: 205000 }
    },
    "Marketing Manager": {
        entry: { min: 55000, max: 75000, avg: 65000 },
        mid: { min: 75000, max: 110000, avg: 92500 },
        senior: { min: 110000, max: 160000, avg: 135000 },
        executive: { min: 150000, max: 230000, avg: 190000 }
    }
};

// Location multipliers
const locationMultipliers = {
    "sf": 1.4,  // San Francisco
    "ny": 1.3,  // New York
    "seattle": 1.2, // Seattle
    "austin": 1.1, // Austin
    "remote": 1.0, // Remote
    "other": 1.0  // Other
};

// Industry multipliers
const industryMultipliers = {
    "tech": 1.3,
    "finance": 1.25,
    "healthcare": 1.15,
    "retail": 1.0,
    "manufacturing": 1.05
};

// DOM Elements
const calculateBtn = document.getElementById('calculateSalary');
const salaryResults = document.getElementById('salaryResults');
const minSalaryEl = document.getElementById('minSalary');
const maxSalaryEl = document.getElementById('maxSalary');
const avgSalaryEl = document.getElementById('avgSalary');
const medianSalaryEl = document.getElementById('medianSalary');
const percentile25El = document.getElementById('percentile25');
const percentile75El = document.getElementById('percentile75');
const top10percentEl = document.getElementById('top10percent');

// Initialize Chart
let salaryChart;

function initSalaryChart() {
    const ctx = document.getElementById('salaryChart').getContext('2d');
    
    salaryChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Technology', 'Finance', 'Healthcare', 'Manufacturing', 'Retail'],
            datasets: [{
                label: 'Average Salary (₹)',
                data: [125000, 112000, 98000, 89000, 78000],
                backgroundColor: [
                    'rgba(249, 115, 22, 0.8)',
                    'rgba(249, 115, 22, 0.7)',
                    'rgba(249, 115, 22, 0.6)',
                    'rgba(249, 115, 22, 0.5)',
                    'rgba(249, 115, 22, 0.4)'
                ],
                borderColor: [
                    'rgba(249, 115, 22, 1)',
                    'rgba(249, 115, 22, 1)',
                    'rgba(249, 115, 22, 1)',
                    'rgba(249, 115, 22, 1)',
                    'rgba(249, 115, 22, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `Average: $₹{context.raw.toLocaleString()}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '₹' + value.toLocaleString();
                        }
                    }
                }
            }
        }
    });
}

// Calculate Salary
calculateBtn.addEventListener('click', () => {
    const jobTitle = document.getElementById('jobTitle').value;
    const experience = document.getElementById('experience').value;
    const location = document.getElementById('location').value;
    const industry = document.getElementById('industry').value;
    
    // Validate inputs
    if (!jobTitle || !experience || !location || !industry) {
        alert('Please fill in all fields to calculate salary.');
        return;
    }
    
    // Get base salary data
    let baseData;
    if (salaryData[jobTitle]) {
        baseData = salaryData[jobTitle][experience];
    } else {
        // Default to Software Engineer if job title not found
        baseData = salaryData["Software Engineer"][experience];
    }
    
    // Apply location multiplier
    const locationMultiplier = locationMultipliers[location] || 1.0;
    
    // Apply industry multiplier
    const industryMultiplier = industryMultipliers[industry] || 1.0;
    
    // Calculate final salaries
    const minSalary = Math.round(baseData.min * locationMultiplier * industryMultiplier);
    const maxSalary = Math.round(baseData.max * locationMultiplier * industryMultiplier);
    const avgSalary = Math.round(baseData.avg * locationMultiplier * industryMultiplier);
    
    // Calculate additional metrics
    const medianSalary = Math.round((minSalary + maxSalary) / 2);
    const percentile25 = Math.round(minSalary * 1.1); // 25th percentile
    const percentile75 = Math.round(maxSalary * 0.9); // 75th percentile
    const top10percent = Math.round(maxSalary * 1.15); // Top 10%
    
    // Update UI with calculated values
    minSalaryEl.textContent = `₹${minSalary.toLocaleString()}`;
    maxSalaryEl.textContent = `₹${maxSalary.toLocaleString()}`;
    avgSalaryEl.textContent = `₹${avgSalary.toLocaleString()}`;
    medianSalaryEl.textContent = `₹${medianSalary.toLocaleString()}`;
    percentile25El.textContent = `₹${percentile25.toLocaleString()}`;
    percentile75El.textContent = `₹${percentile75.toLocaleString()}`;
    top10percentEl.textContent = `₹${top10percent.toLocaleString()}+`;
    
    // Show results
    salaryResults.style.display = 'block';
    salaryResults.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Save calculation to localStorage
    saveCalculationToHistory(jobTitle, experience, location, industry, avgSalary);
});

// Save calculation
document.getElementById('saveCalculation').addEventListener('click', () => {
    const jobTitle = document.getElementById('jobTitle').value;
    const avgSalary = avgSalaryEl.textContent;
    
    alert(`Saved calculation for ${jobTitle} (${avgSalary} average)\n\nYou can view your saved calculations in your account.`);
    
    // In a real app, this would save to backend/database
    console.log('Calculation saved:', { jobTitle, avgSalary });
});

// Compare salaries
document.getElementById('compareSalaries').addEventListener('click', () => {
    const jobTitle = document.getElementById('jobTitle').value;
    
    if (!jobTitle) {
        alert('Please calculate a salary first to compare.');
        return;
    }
    
    // Show comparison modal or redirect
    alert(`Opening salary comparison for ${jobTitle}...\n\nIn a real implementation, this would show a comparison with similar roles.`);
    
    // In a real app, this would show a comparison chart
    showComparisonChart(jobTitle);
});

function saveCalculationToHistory(jobTitle, experience, location, industry, avgSalary) {
    const history = JSON.parse(localStorage.getItem('salaryCalculations') || '[]');
    
    const calculation = {
        id: Date.now(),
        jobTitle,
        experience,
        location,
        industry,
        avgSalary,
        timestamp: new Date().toISOString()
    };
    
    history.unshift(calculation); // Add to beginning
    if (history.length > 10) history.pop(); // Keep only last 10
    
    localStorage.setItem('salaryCalculations', JSON.stringify(history));
}

function showComparisonChart(jobTitle) {
    // This would create a comparison chart with similar roles
    console.log('Showing comparison chart for:', jobTitle);
    
    // For demo purposes, update the existing chart
    if (salaryChart) {
        // Update chart data based on job title
        const comparisonData = getComparisonData(jobTitle);
        salaryChart.data.datasets[0].data = comparisonData.salaries;
        salaryChart.data.labels = comparisonData.labels;
        salaryChart.update();
        
        // Scroll to chart
        document.querySelector('.trends-chart').scrollIntoView({ behavior: 'smooth' });
    }
}

function getComparisonData(jobTitle) {
    // Mock comparison data
    const comparisons = {
        "Software Engineer": {
            labels: ["Frontend Dev", "Backend Dev", "Full Stack", "DevOps", "Mobile Dev"],
            salaries: [115000, 120000, 125000, 130000, 110000]
        },
        "Product Manager": {
            labels: ["Project Manager", "Product Owner", "Program Manager", "Scrum Master", "Business Analyst"],
            salaries: [125000, 115000, 135000, 105000, 95000]
        },
        "Data Analyst": {
            labels: ["Data Scientist", "Business Analyst", "Data Engineer", "BI Analyst", "ML Engineer"],
            salaries: [130000, 95000, 125000, 90000, 140000]
        }
    };
    
    return comparisons[jobTitle] || {
        labels: ["Similar Role 1", "Similar Role 2", "Similar Role 3"],
        salaries: [100000, 110000, 120000]
    };
}

// Auto-suggest job titles
const jobTitleInput = document.getElementById('jobTitle');
jobTitleInput.addEventListener('input', function() {
    const value = this.value.toLowerCase();
    const datalist = document.getElementById('jobTitles');
    
    // In a real app, this would filter suggestions from a larger dataset
    console.log('Searching for job titles containing:', value);
});

// Initialize chart when page loads
document.addEventListener('DOMContentLoaded', () => {
    initSalaryChart();
    
    // Load previous calculation if exists
    const previousCalc = JSON.parse(localStorage.getItem('lastCalculation'));
    if (previousCalc) {
        document.getElementById('jobTitle').value = previousCalc.jobTitle || '';
        document.getElementById('experience').value = previousCalc.experience || '';
        document.getElementById('location').value = previousCalc.location || '';
        document.getElementById('industry').value = previousCalc.industry || '';
    }
});