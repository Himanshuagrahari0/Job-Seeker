// Company Review Page Functionality

// Filter functionality
const applyFilterBtn = document.querySelector('.btn-apply-filter');
const filterCheckboxes = document.querySelectorAll('.filter-options input[type="checkbox"]');

applyFilterBtn.addEventListener('click', () => {
    const selectedFilters = {
        industries: [],
        sizes: [],
        ratings: []
    };
    
    // Collect selected filters
    filterCheckboxes.forEach(checkbox => {
        if (checkbox.checked) {
            const label = checkbox.parentElement.textContent.trim();
            
            // Categorize filters (simplified logic)
            if (label.includes('Technology') || label.includes('Finance') || 
                label.includes('Healthcare') || label.includes('Retail') || 
                label.includes('Manufacturing')) {
                selectedFilters.industries.push(label);
            } else if (label.includes('Small') || label.includes('Medium') || label.includes('Large')) {
                selectedFilters.sizes.push(label);
            } else if (label.includes('Star')) {
                selectedFilters.ratings.push(label);
            }
        }
    });
    
    // Show filter results (in a real app, this would filter displayed content)
    alert(`Filters applied:\nIndustries: ${selectedFilters.industries.join(', ') || 'None'}\nSizes: ${selectedFilters.sizes.join(', ') || 'None'}\nRatings: ${selectedFilters.ratings.join(', ') || 'None'}`);
    
    // In a real implementation, this would filter the reviews shown
    console.log('Selected filters:', selectedFilters);
});

// Search functionality
const searchInput = document.querySelector('.search-reviews input');
const searchButton = document.querySelector('.search-reviews button');

searchButton.addEventListener('click', performSearch);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        performSearch();
    }
});

function performSearch() {
    const searchTerm = searchInput.value.trim();
    
    if (searchTerm) {
        alert(`Searching for: "${searchTerm}"\n\nIn a real implementation, this would search through company reviews and display results.`);
        
        // Highlight search term in reviews (simulated)
        highlightSearchTerm(searchTerm);
    } else {
        alert('Please enter a search term');
    }
}

function highlightSearchTerm(term) {
    // In a real implementation, this would highlight search terms in the displayed content
    console.log(`Would highlight: "${term}" in review content`);
}

// Write review button
const writeReviewBtn = document.querySelector('.write-review-cta .btn-primary');

writeReviewBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Check if user is logged in (simulated)
    const isLoggedIn = false; // In a real app, this would check authentication
    
    if (isLoggedIn) {
        alert('Redirecting to write review form...');
        // In a real app, redirect to review form
    } else {
        if (confirm('You need to be logged in to write a review. Would you like to login now?')) {
            window.location.href = '../login.html';
        }
    }
});

// Star rating hover effect
const starRatings = document.querySelectorAll('.review-rating, .company-rating .stars');

starRatings.forEach(rating => {
    const stars = rating.querySelectorAll('i');
    
    stars.forEach(star => {
        star.addEventListener('mouseenter', () => {
            // Add visual feedback on hover
            star.style.transform = 'scale(1.2)';
        });
        
        star.addEventListener('mouseleave', () => {
            // Remove visual feedback
            star.style.transform = 'scale(1)';
        });
    });
});

// Review card click to expand
const reviewCards = document.querySelectorAll('.review-card');

reviewCards.forEach(card => {
    const reviewBody = card.querySelector('.review-body p');
    const originalText = reviewBody.textContent;
    const truncatedText = originalText.length > 200 ? originalText.substring(0, 200) + '...' : originalText;
    
    // Truncate long reviews
    if (originalText.length > 200) {
        reviewBody.textContent = truncatedText;
        
        // Add "Read more" functionality
        const readMoreBtn = document.createElement('button');
        readMoreBtn.textContent = 'Read more';
        readMoreBtn.className = 'read-more-btn';
        readMoreBtn.style.cssText = `
            background: none;
            border: none;
            color: #f97316;
            cursor: pointer;
            font-weight: 600;
            padding: 5px 0;
            font-family: inherit;
        `;
        
        card.querySelector('.review-body').appendChild(readMoreBtn);
        
        readMoreBtn.addEventListener('click', () => {
            if (reviewBody.textContent === truncatedText) {
                reviewBody.textContent = originalText;
                readMoreBtn.textContent = 'Show less';
            } else {
                reviewBody.textContent = truncatedText;
                readMoreBtn.textContent = 'Read more';
            }
        });
    }
});