// Employers Page Functionality

// Form elements
const jobPostForm = document.getElementById('jobPostForm');
const jobDescription = document.getElementById('jobDescription');
const charCount = document.getElementById('charCount');
const previewJobBtn = document.getElementById('previewJob');
const jobPreviewModal = document.getElementById('jobPreviewModal');
const closePreviewBtn = document.getElementById('closePreview');
const modalCloseBtn = document.querySelector('.modal-close');
const confirmPostBtn = document.getElementById('confirmPost');
const previewContent = document.getElementById('previewContent');

// Pricing elements
const featuredJobCheckbox = document.getElementById('featuredJob');
const urgentHiringCheckbox = document.getElementById('urgentHiring');
const costAmount = document.querySelector('.cost-amount');
const durationRadios = document.querySelectorAll('input[name="duration"]');

// Base pricing
const basePrice = 299;
let currentPrice = basePrice;

// Character count for job description
jobDescription.addEventListener('input', function() {
    const count = this.value.length;
    charCount.textContent = count;
    
    // Update character count color based on limit
    if (count > 1900) {
        charCount.style.color = '#ef4444'; // Red
    } else if (count > 1500) {
        charCount.style.color = '#f59e0b'; // Orange
    } else {
        charCount.style.color = '#64748b'; // Gray
    }
});

// Calculate total price
function calculateTotalPrice() {
    let total = basePrice;
    
    // Add featured job cost
    if (featuredJobCheckbox.checked) {
        total += 599;
    }
    
    // Add urgent hiring cost
    if (urgentHiringCheckbox.checked) {
        total += 1149;
    }
    
    // Update duration multiplier
    const duration = document.querySelector('input[name="duration"]:checked').value;
    if (duration === '60') {
        total += 599;
    } else if (duration === '90') {
        total += 799;
    }
    
    currentPrice = total;
    costAmount.textContent = `₹${total}`;
    
    return total;
}

// Update price when options change
featuredJobCheckbox.addEventListener('change', calculateTotalPrice);
urgentHiringCheckbox.addEventListener('change', calculateTotalPrice);
durationRadios.forEach(radio => {
    radio.addEventListener('change', calculateTotalPrice);
});

// Form validation
jobPostForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validate required fields
    const requiredFields = [
        'jobTitle', 'jobType', 'jobLocation', 'jobDescription',
        'experienceLevel', 'companyName'
    ];
    
    let isValid = true;
    let firstInvalidField = null;
    
    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (!field.value.trim()) {
            isValid = false;
            if (!firstInvalidField) firstInvalidField = field;
            
            // Add error styling
            field.style.borderColor = '#ef4444';
            field.addEventListener('input', function() {
                this.style.borderColor = '#e2e8f0';
            });
        }
    });
    
    if (!isValid) {
        alert('Please fill in all required fields (marked with *).');
        if (firstInvalidField) {
            firstInvalidField.focus();
        }
        return;
    }
    
    // Validate job description length
    if (jobDescription.value.length < 50) {
        alert('Job description should be at least 50 characters.');
        jobDescription.focus();
        return;
    }
    
    // Show preview before final submission
    showJobPreview();
});

// Show job preview
previewJobBtn.addEventListener('click', function(e) {
    e.preventDefault();
    showJobPreview();
});

function showJobPreview() {
    // Gather form data
    const formData = {
        jobTitle: document.getElementById('jobTitle').value,
        jobType: document.getElementById('jobType').value,
        jobLocation: document.getElementById('jobLocation').value,
        jobSalary: document.getElementById('jobSalary').value,
        jobDescription: document.getElementById('jobDescription').value,
        experienceLevel: document.getElementById('experienceLevel').value,
        education: document.getElementById('education').value,
        skills: document.getElementById('skills').value,
        companyName: document.getElementById('companyName').value,
        companyWebsite: document.getElementById('companyWebsite').value,
        companyDescription: document.getElementById('companyDescription').value,
        duration: document.querySelector('input[name="duration"]:checked').value,
        featuredJob: featuredJobCheckbox.checked,
        urgentHiring: urgentHiringCheckbox.checked
    };
    
    // Format job type for display
    const jobTypeLabels = {
        'fulltime': 'Full-time',
        'parttime': 'Part-time',
        'contract': 'Contract',
        'internship': 'Internship',
        'remote': 'Remote'
    };
    
    // Format experience level for display
    const experienceLabels = {
        'entry': 'Entry Level (0-2 years)',
        'mid': 'Mid Level (3-5 years)',
        'senior': 'Senior (6-10 years)',
        'executive': 'Executive (10+ years)'
    };
    
    // Format education for display
    const educationLabels = {
        'highschool': 'High School',
        'associate': 'Associate Degree',
        'bachelor': 'Bachelor\'s Degree',
        'master': 'Master\'s Degree',
        'phd': 'PhD'
    };
    
    // Format duration for display
    const durationLabels = {
        '30': '30 Days',
        '60': '60 Days',
        '90': '90 Days'
    };
    
    // Generate preview HTML
    const previewHTML = `
        <div class="job-preview">
            <div class="preview-header">
                <h2>${formData.jobTitle}</h2>
                <div class="preview-company">
                    <strong>${formData.companyName}</strong>
                    ${formData.companyWebsite ? `<br><a href="${formData.companyWebsite}" target="_blank">${formData.companyWebsite}</a>` : ''}
                </div>
            </div>
            
            <div class="preview-details">
                <div class="detail-row">
                    <div class="detail-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${formData.jobLocation}</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-clock"></i>
                        <span>${jobTypeLabels[formData.jobType] || formData.jobType}</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-rupee-sign"></i>
                        <span>${formData.jobSalary || 'Not specified'}</span>
                    </div>
                </div>
                
                <div class="detail-row">
                    <div class="detail-item">
                        <i class="fas fa-chart-line"></i>
                        <span>${experienceLabels[formData.experienceLevel] || formData.experienceLevel}</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-university"></i>
                        <span>${educationLabels[formData.education] || 'Not specified'}</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-calendar"></i>
                        <span>${durationLabels[formData.duration]} posting</span>
                    </div>
                </div>
            </div>
            
            <div class="preview-section">
                <h3><i class="fas fa-file-alt"></i> Job Description</h3>
                <div class="preview-content">${formData.jobDescription.replace(/\n/g, '<br>')}</div>
            </div>
            
            ${formData.skills ? `
            <div class="preview-section">
                <h3><i class="fas fa-tools"></i> Required Skills</h3>
                <div class="skills-preview">
                    ${formData.skills.split(',').map(skill => `<span class="skill-tag">${skill.trim()}</span>`).join('')}
                </div>
            </div>
            ` : ''}
            
            ${formData.companyDescription ? `
            <div class="preview-section">
                <h3><i class="fas fa-building"></i> About ${formData.companyName}</h3>
                <div class="preview-content">${formData.companyDescription.replace(/\n/g, '<br>')}</div>
            </div>
            ` : ''}
            
            <div class="preview-section">
                <h3><i class="fas fa-crown"></i> Posting Options</h3>
                <ul>
                    <li><strong>Posting Duration:</strong> ${durationLabels[formData.duration]}</li>
                    <li><strong>Featured Job:</strong> ${formData.featuredJob ? 'Yes (+₹898)' : 'No'}</li>
                    <li><strong>Urgent Hiring Badge:</strong> ${formData.urgentHiring ? 'Yes (+₹1448)' : 'No'}</li>
                    <li><strong>Total Cost:</strong> ₹${currentPrice}</li>
                </ul>
            </div>
        </div>
    `;
    
    // Insert preview content
    previewContent.innerHTML = previewHTML;
    
    // Show modal
    jobPreviewModal.style.display = 'flex';
}

// Close modal functions
closePreviewBtn.addEventListener('click', () => {
    jobPreviewModal.style.display = 'none';
});

modalCloseBtn.addEventListener('click', () => {
    jobPreviewModal.style.display = 'none';
});

// Close modal when clicking outside
jobPreviewModal.addEventListener('click', (e) => {
    if (e.target === jobPreviewModal) {
        jobPreviewModal.style.display = 'none';
    }
});

// Confirm and post job
confirmPostBtn.addEventListener('click', () => {
    // Gather final form data
    const formData = new FormData(jobPostForm);
    const jobData = Object.fromEntries(formData.entries());
    
    // Add calculated fields
    jobData.totalCost = currentPrice;
    jobData.postedDate = new Date().toISOString();
    jobData.jobId = 'JOB-' + Date.now();
    
    // In a real app, this would send data to backend
    console.log('Job posting data:', jobData);
    
    // Show success message
    alert(`Job posted successfully!\n\nJob ID: ${jobData.jobId}\nTotal Cost: ₹${jobData.totalCost}\n\nYour job will be live within 15 minutes.`);
    
    // Close modal
    jobPreviewModal.style.display = 'none';
    
    // Reset form (optional)
    // jobPostForm.reset();
    // calculateTotalPrice(); // Reset price
    
    // Redirect to success page or dashboard in real app
    // window.location.href = 'employer-dashboard.html';
});

// Add CSS for preview
const previewStyles = `
    .job-preview {
        font-family: 'Poppins', sans-serif;
    }
    
    .preview-header {
        margin-bottom: 30px;
        padding-bottom: 20px;
        border-bottom: 2px solid #f1f5f9;
    }
    
    .preview-header h2 {
        color: #1e293b;
        font-size: 2rem;
        margin-bottom: 10px;
    }
    
    .preview-company {
        color: #475569;
        font-size: 1.1rem;
    }
    
    .preview-company a {
        color: #f97316;
        text-decoration: none;
    }
    
    .preview-company a:hover {
        text-decoration: underline;
    }
    
    .preview-details {
        background-color: #f8fafc;
        border-radius: 10px;
        padding: 20px;
        margin-bottom: 30px;
    }
    
    .detail-row {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
        margin-bottom: 15px;
    }
    
    .detail-row:last-child {
        margin-bottom: 0;
    }
    
    .detail-item {
        display: flex;
        align-items: center;
        gap: 10px;
        flex: 1;
        min-width: 200px;
    }
    
    .detail-item i {
        color: #f97316;
        width: 20px;
    }
    
    .preview-section {
        margin-bottom: 30px;
        padding-bottom: 20px;
        border-bottom: 1px solid #e2e8f0;
    }
    
    .preview-section:last-child {
        border-bottom: none;
        margin-bottom: 0;
        padding-bottom: 0;
    }
    
    .preview-section h3 {
        display: flex;
        align-items: center;
        gap: 10px;
        color: #1e293b;
        font-size: 1.3rem;
        margin-bottom: 15px;
    }
    
    .preview-section h3 i {
        color: #f97316;
    }
    
    .preview-content {
        color: #475569;
        line-height: 1.7;
    }
    
    .skills-preview {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
    }
    
    .skill-tag {
        background-color: #ffedd5;
        color: #ea580c;
        padding: 8px 15px;
        border-radius: 20px;
        font-size: 0.9rem;
        font-weight: 500;
    }
    
    .preview-section ul {
        list-style: none;
        padding-left: 0;
    }
    
    .preview-section li {
        padding: 8px 0;
        border-bottom: 1px solid #f1f5f9;
        color: #475569;
    }
    
    .preview-section li:last-child {
        border-bottom: none;
    }
    
    .preview-section li strong {
        color: #1e293b;
        display: inline-block;
        width: 150px;
    }
`;

// Add preview styles to document
const styleSheet = document.createElement('style');
styleSheet.textContent = previewStyles;
document.head.appendChild(styleSheet);

// Initialize price calculation on page load
document.addEventListener('DOMContentLoaded', () => {
    calculateTotalPrice();
});