$(document).ready(function() {
    // Theme handling
    const themeSwitch = $('#checkbox');
    const body = $('body');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.addClass('light-theme');
        themeSwitch.prop('checked', true);
    }

    // Theme switch handler
    themeSwitch.change(function() {
        if ($(this).is(':checked')) {
            body.addClass('light-theme');
            localStorage.setItem('theme', 'light');
        } else {
            body.removeClass('light-theme');
            localStorage.setItem('theme', 'dark');
        }
    });

    // Star rating functionality
    const $starIcon = $('#star');
    $starIcon.click(function() {
        $(this).toggleClass('active-color default-color');
        // Add your rating logic here
    });

    // Watchlist functionality
    const $watchListBtn = $('.btn-watchlist');
    $watchListBtn.click(function() {
        const $button = $(this);
        const $text = $button.find('.watchlist-text');
        
        if ($button.hasClass('watchlist-active')) {
            $button.removeClass('watchlist-active');
            $text.text('Add to Watchlist');
            $button.css('background-color', 'var(--accent-color)');
        } else {
            $button.addClass('watchlist-active');
            $text.text('Added to Watchlist');
            $button.css('background-color', '#f44336');
        }
    });

    // Review submission
    const $reviewForm = $('.review-form');
    const $rating = $('#review-title');
    const $reviewContent = $('#review');
    const $reviewList = $('.reviews-list');

    $reviewForm.submit(function(event) {
        event.preventDefault();

        const rating = $rating.val();
        const content = $reviewContent.val();

        if (rating && content) {
            const newReview = createReviewElement(rating, content);
            $reviewList.prepend(newReview);
            
            // Clear form
            $rating.val('');
            $reviewContent.val('');
            
            // Update average rating
            updateAverageRating();
        }
    });

    // Helpful and Report buttons
    const $helpfulBtn = $('#btn-helpful');
    const $reportBtn = $('#btn-report');

    $helpfulBtn.click(function() {
        $(this).toggleClass('active');
        $(this).css({
            'background-color': $(this).hasClass('active') ? '#6aa758' : 'var(--card-bg)',
            'color': $(this).hasClass('active') ? 'white' : 'var(--text-primary)'
        });
    });

    $reportBtn.click(function() {
        $(this).toggleClass('active');
        $(this).css({
            'background-color': $(this).hasClass('active') ? '#6aa758' : 'var(--card-bg)',
            'color': $(this).hasClass('active') ? 'white' : 'var(--text-primary)'
        });
    });

    // Fetch and display content details
    const contentId = localStorage.getItem('selectedContentId');
    const contentType = localStorage.getItem('selectedContentType');
    const apiKey = '0d6bdb0fd2d104848743ab1519f84696';

    if (contentId && contentType) {
        fetchContentDetails(contentId, contentType, apiKey);
    } else {
        window.location.href = '../index.html';
    }
});

// Helper Functions
function createReviewElement(rating, content) {
    const date = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return `
        <article class="review-card">
            <header class="review-author">
                <div class="author-info">
                    <h3 class="author-name">You</h3>
                    <time class="review-date">${date}</time>
                </div>
                <div class="review-rating">
                    <i class="fas fa-star"></i>
                    <span>${rating}</span>
                </div>
            </header>
            <p class="review-content">${content}</p>
            <div class="review-actions">
                <button class="btn-helpful" aria-label="Mark as helpful">
                    <i class="fas fa-thumbs-up"></i>
                    Helpful
                </button>
                <button class="btn-report" aria-label="Report review">
                    <i class="fas fa-flag"></i>
                </button>
            </div>
        </article>
    `;
}

function updateAverageRating() {
    const ratings = $('.review-rating span').map(function() {
        return parseFloat($(this).text());
    }).get();

    if (ratings.length > 0) {
        const average = ratings.reduce((a, b) => a + b) / ratings.length;
        $('.rating-number').text(average.toFixed(1));
    }
}

function fetchContentDetails(contentId, contentType, apiKey) {
    // Fetch main content details
    fetch(`https://api.themoviedb.org/3/${contentType}/${contentId}?api_key=${apiKey}`)
        .then(response => response.json())
        .then(contentData => {
            updateContentDetails(contentData, contentType);
            return fetch(`https://api.themoviedb.org/3/${contentType}/${contentId}/credits?api_key=${apiKey}`);
        })
        .then(response => response.json())
        .then(creditsData => {
            updateCredits(creditsData);
            return fetch(`https://api.themoviedb.org/3/${contentType}/${contentId}/images?api_key=${apiKey}`);
        })
        .then(response => response.json())
        .then(imageData => {
            updateGallery(imageData);
            return fetch(`https://api.themoviedb.org/3/${contentType}/${contentId}/videos?api_key=${apiKey}`);
        })
        .then(response => response.json())
        .then(videoData => {
            setupTrailerButton(videoData);
        })
        .catch(error => {
            console.error('Error fetching content details:', error);
            alert('Unable to load content details. Please try again later.');
        });
}

function updateContentDetails(contentData, contentType) {
    // Update poster
    $('.poster-image').attr('src', `https://image.tmdb.org/t/p/w500${contentData.poster_path}`);
    
    // Update title and year
    const title = contentData.title || contentData.name;
    const year = new Date(contentData.release_date || contentData.first_air_date).getFullYear();
    $('.title-text').text(title);
    $('.release-year').text(`(${year})`);
    
    // Update rating
    $('.rating-value').text(contentData.vote_average.toFixed(1));
    
    // Update meta information
    const runtime = contentType === 'movie' ? 
        `${contentData.runtime} min` : 
        `${contentData.number_of_seasons} Season${contentData.number_of_seasons > 1 ? 's' : ''}`;
    $('.duration').text(runtime);
    $('.genre').text(contentData.genres.map(g => g.name).join(', '));
    $('.rating').text(`TMDb ${contentData.vote_average.toFixed(1)}`);
    
    // Update synopsis
    $('.synopsis-text').text(contentData.overview);
}

function updateCredits(creditsData) {
    const castHTML = creditsData.cast.slice(0, 6).map(actor => `
        <div class="cast-member">
            <img src="${actor.profile_path ? 
                `https://image.tmdb.org/t/p/w185${actor.profile_path}` : 
                '/api/placeholder/185/278'}" 
                alt="${actor.name}" 
                class="cast-photo">
            <div class="cast-info">
                <div class="cast-name">${actor.name}</div>
                <div class="cast-character">${actor.character}</div>
            </div>
        </div>
    `).join('');
    
    $('.cast-scroll').html(castHTML);
}

function updateGallery(imageData) {
    const screenshots = imageData.backdrops.slice(0, 4);
    screenshots.forEach((screenshot, index) => {
        $(`.gallery-item:eq(${index}) img`).attr('src', 
            `https://image.tmdb.org/t/p/w500${screenshot.file_path}`);
    });
}

function setupTrailerButton(videoData) {
    const trailer = videoData.results.find(video => 
        video.type === 'Trailer' && video.site === 'YouTube');
    
    if (trailer) {
        $('.btn-trailer').click(() => {
            window.open(`https://www.youtube.com/watch?v=${trailer.key}`, '_blank');
        });
    } else {
        $('.btn-trailer').prop('disabled', true);
    }
}


