// Modern Movie & TV Show Website JavaScript
class CineHub {
    constructor() {
        this.apiKey = '0d6bdb0fd2d104848743ab1519f84696';
        this.currentContentType = 'movie';
        this.isLoading = false;
        this.searchTimeout = null;
        
        this.movieNames = [
            'Inception', 'Interstellar', 'The Dark Knight', 'Pulp Fiction', 'The Matrix',
            'Forrest Gump', 'The Godfather', 'Schindler\'s List', 'The Shawshank Redemption',
            'Fight Club', 'Goodfellas', 'The Lord of the Rings', 'Star Wars', 'Titanic',
            'Avatar', 'Avengers: Endgame', 'Spider-Man', 'Iron Man', 'The Batman', 'Dune'
        ];
        
        this.tvShowNames = [
            'Breaking Bad', 'Game of Thrones', 'Stranger Things', 'The Crown', 'The Witcher',
            'House of Cards', 'Narcos', 'Black Mirror', 'The Office', 'Friends',
            'Squid Game', 'Money Heist', 'Dark', 'Sherlock', 'The Mandalorian',
            'Westworld', 'True Detective', 'Fargo', 'Better Call Saul', 'The Boys'
        ];
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.loadContent('movie');
        this.loadFeaturedContent('movie');
    }
    
    setupEventListeners() {
        // Navigation toggle
        const navToggle = document.getElementById('navIcon');
        const navOverlay = document.getElementById('navPopup');
        const navClose = document.getElementById('closeNav');
        
        navToggle?.addEventListener('click', () => this.toggleNavigation(true));
        navClose?.addEventListener('click', () => this.toggleNavigation(false));
        navOverlay?.addEventListener('click', (e) => {
            if (e.target === navOverlay) this.toggleNavigation(false);
        });
        
        // Content type switching
        document.getElementById('navMovie')?.addEventListener('click', () => {
            this.switchContentType('movie');
            this.toggleNavigation(false);
        });
        
        document.getElementById('navTvshow')?.addEventListener('click', () => {
            this.switchContentType('tv');
            this.toggleNavigation(false);
        });
        
        // Theme toggle
        document.getElementById('navTheme')?.addEventListener('click', () => {
            this.toggleTheme();
            this.toggleNavigation(false);
        });
        
        // Footer links
        document.getElementById('footerMovies')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.switchContentType('movie');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        
        document.getElementById('footerTvShows')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.switchContentType('tv');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        
        // Search functionality
        this.setupSearch();
        
        // Header scroll effect
        this.setupScrollEffect();
    }
    
    toggleNavigation(show) {
        const navOverlay = document.getElementById('navPopup');
        if (show) {
            navOverlay.style.display = 'block';
            navOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        } else {
            navOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
            setTimeout(() => {
                navOverlay.style.display = 'none';
            }, 300);
        }
    }
    
    switchContentType(type) {
        this.currentContentType = type;
        const pageTitle = document.querySelector('.page-title');
        const sectionTitle = document.querySelector('.section-title');
        
        if (type === 'movie') {
            pageTitle.textContent = 'Movies';
            sectionTitle.textContent = 'Popular Movies';
        } else {
            pageTitle.textContent = 'TV Shows';
            sectionTitle.textContent = 'Popular TV Shows';
        }
        
        this.loadContent(type);
        this.loadFeaturedContent(type);
    }
    
    toggleTheme() {
        const themeButton = document.getElementById('navTheme');
        const body = document.body;
        
        body.classList.add('theme-transition');
        
        if (body.classList.contains('light-theme')) {
            body.classList.remove('light-theme');
            themeButton.textContent = 'Theme (Light)';
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.add('light-theme');
            themeButton.textContent = 'Theme (Dark)';
            localStorage.setItem('theme', 'light');
        }
        
        setTimeout(() => {
            body.classList.remove('theme-transition');
        }, 300);
    }
    
    setupSearch() {
        const searchToggle = document.getElementById('searchIcon');
        const searchContainer = document.getElementById('searchContainer');
        const searchInput = document.getElementById('search-input');
        const searchResults = document.getElementById('search-results');
        
        searchToggle?.addEventListener('click', () => {
            const isVisible = searchContainer.style.display !== 'none';
            
            if (isVisible) {
                searchContainer.style.display = 'none';
                searchResults.style.display = 'none';
                searchInput.value = '';
            } else {
                searchContainer.style.display = 'block';
                if (window.innerWidth <= 768) {
                    searchContainer.classList.add('mobile');
                }
                searchInput.focus();
            }
        });
        
        searchInput?.addEventListener('input', (e) => {
            clearTimeout(this.searchTimeout);
            const query = e.target.value.trim();
            
            if (query.length < 2) {
                searchResults.style.display = 'none';
                return;
            }
            
            this.searchTimeout = setTimeout(() => {
                this.searchContent(query);
            }, 500);
        });
        
        // Close search when clicking outside
        document.addEventListener('click', (e) => {
            if (!searchContainer?.contains(e.target) && !searchToggle?.contains(e.target)) {
                searchContainer.style.display = 'none';
                searchResults.style.display = 'none';
                searchContainer.classList.remove('mobile');
            }
        });
    }
    
    setupScrollEffect() {
        const header = document.querySelector('.header');
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
    
    async loadContent(type, retryCount = 0) {
        if (this.isLoading) return;
        
        this.isLoading = true;
        this.showLoading(true);
        
        try {
            const contentNames = type === 'movie' ? this.movieNames : this.tvShowNames;
            const contentGrid = document.getElementById('content-grid');
            contentGrid.innerHTML = '';
            
            const promises = contentNames.slice(0, 20).map(name => 
                this.fetchContentDetails(name, type)
            );
            
            const results = await Promise.allSettled(promises);
            const validContent = results
                .filter(result => result.status === 'fulfilled' && result.value)
                .map(result => result.value);
            
            if (validContent.length === 0 && retryCount < 2) {
                // Retry with different content if no results
                setTimeout(() => this.loadContent(type, retryCount + 1), 1000);
                return;
            }
            
            this.renderContent(validContent);
            
        } catch (error) {
            console.error('Error loading content:', error);
            if (retryCount < 2) {
                setTimeout(() => this.loadContent(type, retryCount + 1), 2000);
            } else {
                this.showError('Failed to load content. <button onclick="location.reload()" style="background: var(--accent-primary); color: white; border: none; padding: 0.5rem 1rem; border-radius: 4px; margin-left: 1rem; cursor: pointer;">Retry</button>');
            }
        } finally {
            this.isLoading = false;
            this.showLoading(false);
        }
    }
    
    async fetchContentDetails(name, type) {
        try {
            const searchResponse = await fetch(
                `https://api.themoviedb.org/3/search/${type}?api_key=${this.apiKey}&query=${encodeURIComponent(name)}`
            );
            const searchData = await searchResponse.json();
            
            if (searchData.results && searchData.results.length > 0) {
                const content = searchData.results[0];
                const detailResponse = await fetch(
                    `https://api.themoviedb.org/3/${type}/${content.id}?api_key=${this.apiKey}`
                );
                const detailData = await detailResponse.json();
                
                return {
                    ...detailData,
                    content_type: type,
                    title: type === 'movie' ? detailData.title : detailData.name,
                    release_date: type === 'movie' ? detailData.release_date : detailData.first_air_date
                };
            }
            return null;
        } catch (error) {
            console.error(`Error fetching ${name}:`, error);
            return null;
        }
    }
    
    renderContent(contentList) {
        const contentGrid = document.getElementById('content-grid');
        
        if (!contentList || contentList.length === 0) {
            contentGrid.innerHTML = '<div class="error-message">No content available</div>';
            return;
        }
        
        contentGrid.innerHTML = contentList.map(content => this.createContentCard(content)).join('');
        
        // Add click listeners to cards
        contentGrid.querySelectorAll('.content-card').forEach(card => {
            card.addEventListener('click', () => {
                const contentId = card.dataset.id;
                const contentType = card.dataset.type;
                this.openContentDetail(contentId, contentType);
            });
        });
    }
    
    createContentCard(content) {
        const posterUrl = content.poster_path 
            ? `https://image.tmdb.org/t/p/w500${content.poster_path}`
            : `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='450' viewBox='0 0 300 450'%3E%3Crect width='300' height='450' fill='%23${this.getRandomColor()}'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='white' font-size='16' font-family='Arial'%3E${encodeURIComponent(content.title)}%3C/text%3E%3C/svg%3E`;
        
        const year = content.release_date ? new Date(content.release_date).getFullYear() : 'N/A';
        const rating = content.vote_average ? content.vote_average.toFixed(1) : 'N/A';
        
        return `
            <div class="content-card" data-id="${content.id}" data-type="${content.content_type}">
                <div class="card-image-container">
                    <img src="${posterUrl}" alt="${content.title}" class="card-image" loading="lazy">
                    <div class="card-overlay">
                        <button class="card-play-button">
                            <i class="fas fa-play"></i>
                        </button>
                    </div>
                </div>
                <div class="card-info">
                    <h3 class="card-title">${content.title}</h3>
                    <div class="card-meta">
                        <span class="card-year">${year}</span>
                        <span class="card-rating">${rating}</span>
                    </div>
                </div>
            </div>
        `;
    }
    
    async loadFeaturedContent(type) {
        try {
            const contentNames = type === 'movie' ? this.movieNames : this.tvShowNames;
            const randomName = contentNames[Math.floor(Math.random() * contentNames.length)];
            
            const content = await this.fetchContentDetails(randomName, type);
            if (content) {
                this.updateShowcase(content);
            }
        } catch (error) {
            console.error('Error loading featured content:', error);
        }
    }
    
    updateShowcase(content) {
        const showcase = document.querySelector('.showcase');
        const title = document.querySelector('.showcase-title');
        const description = document.querySelector('.showcase-description');
        
        if (content.backdrop_path) {
            const backdropUrl = `https://image.tmdb.org/t/p/original${content.backdrop_path}`;
            showcase.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${backdropUrl})`;
        }
        
        title.textContent = content.title;
        description.textContent = content.overview || 'No description available.';
        
        // Update buttons with content info
        const buttons = document.querySelectorAll('.showcase-buttons .btn');
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                this.openContentDetail(content.id, content.content_type);
            });
        });
    }
    
    async searchContent(query) {
        try {
            const response = await fetch(
                `https://api.themoviedb.org/3/search/multi?api_key=${this.apiKey}&query=${encodeURIComponent(query)}`
            );
            const data = await response.json();
            
            if (data.results && data.results.length > 0) {
                this.displaySearchResults(data.results.slice(0, 8));
            } else {
                this.displaySearchResults([]);
            }
        } catch (error) {
            console.error('Search error:', error);
            document.getElementById('search-results').innerHTML = 
                '<div class="error-message">Search failed. Please try again.</div>';
        }
    }
    
    displaySearchResults(results) {
        const searchResults = document.getElementById('search-results');
        
        if (results.length === 0) {
            searchResults.innerHTML = '<div class="no-results">No results found</div>';
            searchResults.style.display = 'block';
            return;
        }
        
        searchResults.innerHTML = results.map(result => {
            const title = result.title || result.name;
            const year = result.release_date || result.first_air_date;
            const yearDisplay = year ? new Date(year).getFullYear() : 'N/A';
            const posterUrl = result.poster_path 
                ? `https://image.tmdb.org/t/p/w92${result.poster_path}`
                : 'https://via.placeholder.com/92x138/1a1a2e/ffffff?text=No+Image';
            
            return `
                <div class="search-result-item" data-id="${result.id}" data-type="${result.media_type}">
                    <img src="${posterUrl}" alt="${title}" class="result-poster">
                    <div class="result-info">
                        <div class="result-title">${title}</div>
                        <div class="result-year">${yearDisplay} • ${result.media_type?.toUpperCase()}</div>
                    </div>
                </div>
            `;
        }).join('');
        
        searchResults.style.display = 'block';
        
        // Add click listeners
        searchResults.querySelectorAll('.search-result-item').forEach(item => {
            item.addEventListener('click', () => {
                const contentId = item.dataset.id;
                const contentType = item.dataset.type;
                this.openContentDetail(contentId, contentType);
            });
        });
    }
    
    openContentDetail(contentId, contentType) {
        // Store content info for detail page
        localStorage.setItem('selectedContentId', contentId);
        localStorage.setItem('selectedContentType', contentType);
        
        // Navigate directly to detail page
        window.location.href = `Detail/detail.html?id=${contentId}&type=${contentType}`;
    }
    
    showLoading(show) {
        const loading = document.getElementById('loading');
        const contentGrid = document.getElementById('content-grid');
        
        if (show) {
            loading.style.display = 'flex';
            contentGrid.style.opacity = '0.5';
        } else {
            loading.style.display = 'none';
            contentGrid.style.opacity = '1';
        }
    }
    
    showError(message) {
        const contentGrid = document.getElementById('content-grid');
        contentGrid.innerHTML = `<div class="error-message">${message}</div>`;
    }
    
    getRandomColor() {
        const colors = ['1a1a2e', '16213e', '0f3460', '533483', '7209b7'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    // Performance optimization: Lazy loading images
    setupLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        observer.unobserve(img);
                    }
                });
            });
            
            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        const themeButton = document.getElementById('navTheme');
        if (themeButton) themeButton.textContent = 'Theme (Dark)';
    }
    
    // Initialize the app
    new CineHub();
});

// Handle window resize for responsive search
window.addEventListener('resize', () => {
    const searchContainer = document.getElementById('searchContainer');
    if (window.innerWidth > 768) {
        searchContainer?.classList.remove('mobile');
    }
});