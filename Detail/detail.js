// Detail Page JavaScript
class MovieDetailPage {
    constructor() {
        this.apiKey = '0d6bdb0fd2d104848743ab1519f84696';
        this.contentId = null;
        this.contentType = null;
        this.contentData = null;
        
        this.init();
    }
    
    init() {
        this.getContentInfo();
        this.setupEventListeners();
        this.loadTheme();
        
        if (this.contentId && this.contentType) {
            this.loadContentDetails();
        } else {
            this.showError('No content selected');
        }
    }
    
    getContentInfo() {
        // Get content info from localStorage or URL parameters
        this.contentId = localStorage.getItem('selectedContentId') || this.getUrlParameter('id');
        this.contentType = localStorage.getItem('selectedContentType') || this.getUrlParameter('type') || 'movie';
        
        console.log('Loading content:', { id: this.contentId, type: this.contentType });
    }
    
    getUrlParameter(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }
    
    setupEventListeners() {
        // Back button
        const backButton = document.getElementById('backButton');
        backButton?.addEventListener('click', () => {
            if (document.referrer && document.referrer.includes(window.location.origin)) {
                window.history.back();
            } else {
                window.location.href = '../index.html';
            }
        });
        
        // Theme toggle
        const themeToggle = document.getElementById('themeToggle');
        themeToggle?.addEventListener('click', () => {
            this.toggleTheme();
        });
        
        // Retry button
        const retryButton = document.getElementById('retryButton');
        retryButton?.addEventListener('click', () => {
            this.loadContentDetails();
        });
        
        // Action buttons
        this.setupActionButtons();
    }
    
    setupActionButtons() {
        // These would connect to actual streaming/playlist functionality
        document.addEventListener('click', (e) => {
            if (e.target.closest('.btn-primary')) {
                this.handleWatchNow();
            } else if (e.target.closest('.btn-secondary')) {
                this.handleAddToList();
            } else if (e.target.closest('.btn-outline')) {
                this.handleShare();
            }
        });
    }
    
    handleWatchNow() {
        // Placeholder for watch functionality
        alert('Watch functionality would be implemented here');
    }
    
    handleAddToList() {
        // Add to localStorage list
        const myList = JSON.parse(localStorage.getItem('myList') || '[]');
        const exists = myList.find(item => item.id === this.contentId);
        
        if (!exists && this.contentData) {
            myList.push({
                id: this.contentData.id,
                title: this.contentData.title || this.contentData.name,
                poster_path: this.contentData.poster_path,
                type: this.contentType
            });
            localStorage.setItem('myList', JSON.stringify(myList));
            
            // Update button text
            const btn = document.querySelector('.btn-secondary');
            if (btn) {
                btn.innerHTML = '<i class="fas fa-check"></i> Added to List';
                btn.style.background = 'var(--accent-secondary)';
            }
        }
    }
    
    handleShare() {
        if (navigator.share && this.contentData) {
            navigator.share({
                title: this.contentData.title || this.contentData.name,
                text: this.contentData.overview,
                url: window.location.href
            });
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(window.location.href).then(() => {
                alert('Link copied to clipboard!');
            });
        }
    }
    
    async loadContentDetails() {
        this.showLoading(true);
        this.hideError();
        
        try {
            // Fetch main content details
            const response = await fetch(
                `https://api.themoviedb.org/3/${this.contentType}/${this.contentId}?api_key=${this.apiKey}&append_to_response=credits,videos`
            );
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            this.contentData = await response.json();
            
            // Update page title
            document.title = `${this.contentData.title || this.contentData.name} - CineHub`;
            
            this.displayContentDetails();
            this.loadCastAndCrew();
            
        } catch (error) {
            console.error('Error loading content details:', error);
            this.showError('Failed to load content details. Please try again.');
        } finally {
            this.showLoading(false);
        }
    }
    
    displayContentDetails() {
        const data = this.contentData;
        
        // Basic info
        const title = data.title || data.name;
        const releaseDate = data.release_date || data.first_air_date;
        const year = releaseDate ? new Date(releaseDate).getFullYear() : 'N/A';
        const rating = data.vote_average ? data.vote_average.toFixed(1) : 'N/A';
        const runtime = data.runtime || (data.episode_run_time && data.episode_run_time[0]) || 'N/A';
        
        // Update DOM elements
        document.getElementById('contentTitle').textContent = title;
        document.getElementById('releaseYear').textContent = year;
        document.getElementById('runtime').textContent = runtime !== 'N/A' ? `${runtime} min` : 'N/A';
        document.getElementById('contentType').textContent = this.contentType.toUpperCase();
        document.getElementById('ratingValue').textContent = rating;
        document.getElementById('overview').textContent = data.overview || 'No description available.';
        
        // Images
        const posterUrl = data.poster_path 
            ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
            : this.getPlaceholderImage(title);
        
        const backdropUrl = data.backdrop_path 
            ? `https://image.tmdb.org/t/p/original${data.backdrop_path}`
            : posterUrl;
        
        document.getElementById('posterImage').src = posterUrl;
        document.getElementById('posterImage').alt = title;
        document.getElementById('backdropImage').src = backdropUrl;
        document.getElementById('backdropImage').alt = `${title} backdrop`;
        
        // Genres
        const genreList = document.getElementById('genreList');
        if (data.genres && data.genres.length > 0) {
            genreList.innerHTML = data.genres
                .map(genre => `<span class="genre-tag">${genre.name}</span>`)
                .join('');
        } else {
            genreList.innerHTML = '<span class="genre-tag">Unknown</span>';
        }
        
        // Additional details
        this.updateAdditionalDetails(data);
        
        // Show content
        document.getElementById('contentDetails').style.display = 'block';
    }
    
    updateAdditionalDetails(data) {
        // Director
        const director = data.credits?.crew?.find(person => person.job === 'Director');
        document.getElementById('director').textContent = director ? director.name : 'N/A';
        
        // Language
        const language = data.original_language ? data.original_language.toUpperCase() : 'N/A';
        document.getElementById('language').textContent = language;
        
        // Budget and Revenue (for movies)
        if (this.contentType === 'movie') {
            const budget = data.budget ? this.formatCurrency(data.budget) : 'N/A';
            const revenue = data.revenue ? this.formatCurrency(data.revenue) : 'N/A';
            document.getElementById('budget').textContent = budget;
            document.getElementById('revenue').textContent = revenue;
        } else {
            // For TV shows, show different info
            document.querySelector('.detail-item:nth-child(3) .detail-label').textContent = 'Seasons:';
            document.getElementById('budget').textContent = data.number_of_seasons || 'N/A';
            document.querySelector('.detail-item:nth-child(4) .detail-label').textContent = 'Episodes:';
            document.getElementById('revenue').textContent = data.number_of_episodes || 'N/A';
        }
    }
    
    loadCastAndCrew() {
        const castList = document.getElementById('castList');
        
        if (this.contentData.credits && this.contentData.credits.cast) {
            const cast = this.contentData.credits.cast.slice(0, 8); // Show first 8 cast members
            
            castList.innerHTML = cast.map(person => {
                const photoUrl = person.profile_path 
                    ? `https://image.tmdb.org/t/p/w185${person.profile_path}`
                    : this.getPlaceholderAvatar(person.name);
                
                return `
                    <div class="cast-member">
                        <img src="${photoUrl}" alt="${person.name}" class="cast-photo" loading="lazy">
                        <div class="cast-name">${person.name}</div>
                        <div class="cast-character">${person.character || 'Unknown Role'}</div>
                    </div>
                `;
            }).join('');
        } else {
            castList.innerHTML = '<p class="text-muted">Cast information not available.</p>';
        }
    }
    
    getPlaceholderImage(title) {
        const colors = ['1a1a2e', '16213e', '0f3460', '533483', '7209b7'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='750' viewBox='0 0 500 750'%3E%3Crect width='500' height='750' fill='%23${color}'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='white' font-size='24' font-family='Arial'%3E${encodeURIComponent(title)}%3C/text%3E%3C/svg%3E`;
    }
    
    getPlaceholderAvatar(name) {
        const initials = name.split(' ').map(n => n[0]).join('').substring(0, 2);
        return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%23667eea'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='white' font-size='32' font-family='Arial'%3E${initials}%3C/text%3E%3C/svg%3E`;
    }
    
    formatCurrency(amount) {
        if (amount === 0) return 'N/A';
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    }
    
    showLoading(show) {
        const loading = document.getElementById('loading');
        const content = document.getElementById('contentDetails');
        
        if (show) {
            loading.style.display = 'flex';
            content.style.display = 'none';
        } else {
            loading.style.display = 'none';
        }
    }
    
    showError(message) {
        const error = document.getElementById('error');
        const content = document.getElementById('contentDetails');
        const loading = document.getElementById('loading');
        
        error.querySelector('p').textContent = message;
        error.style.display = 'flex';
        content.style.display = 'none';
        loading.style.display = 'none';
    }
    
    hideError() {
        document.getElementById('error').style.display = 'none';
    }
    
    toggleTheme() {
        const body = document.body;
        const themeIcon = document.querySelector('.theme-toggle i');
        
        body.classList.add('theme-transition');
        
        if (body.classList.contains('light-theme')) {
            body.classList.remove('light-theme');
            themeIcon.className = 'fas fa-moon';
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.add('light-theme');
            themeIcon.className = 'fas fa-sun';
            localStorage.setItem('theme', 'light');
        }
        
        setTimeout(() => {
            body.classList.remove('theme-transition');
        }, 300);
    }
    
    loadTheme() {
        const savedTheme = localStorage.getItem('theme');
        const themeIcon = document.querySelector('.theme-toggle i');
        
        if (savedTheme === 'light') {
            document.body.classList.add('light-theme');
            themeIcon.className = 'fas fa-sun';
        } else {
            themeIcon.className = 'fas fa-moon';
        }
    }
}

// Initialize the detail page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MovieDetailPage();
});

// Handle browser back/forward buttons
window.addEventListener('popstate', () => {
    // Optionally reload content if URL parameters change
    const urlId = new URLSearchParams(window.location.search).get('id');
    const currentId = localStorage.getItem('selectedContentId');
    
    if (urlId && urlId !== currentId) {
        localStorage.setItem('selectedContentId', urlId);
        location.reload();
    }
});