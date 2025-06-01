document.addEventListener('DOMContentLoaded', () => {
    // Add scroll behavior for header
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });

    // ... (keep existing navBar Toggle code) ...
        // ------------------- navBar Toggle  starts -------------------
        const navIcon = document.querySelector('#navIcon');
        const navPopup = document.querySelector('#navPopup');
      
        navIcon.addEventListener('click', () => {
          if (navPopup.style.display === 'block') {
            navPopup.style.display = 'none';
          } else {
            navPopup.style.display = 'block';
          }
        });
      
        // ------------------- navBar Toggle  Ends -------------------
  
    // ------------------- TV-Show  Starts -------------------
    const navTvshow = document.querySelector('#navTvshow');
    const navMovie = document.querySelector('#navMovie');
    const navTheme = document.querySelector('#navTheme');
    const headText = document.querySelector('.headMovie');
  
    navMovie.addEventListener('click', () => {
      fetchAndDisplayMovies();
      headText.innerHTML = 'Movies';
      navPopup.style.display = 'none';
      // Clear existing content type attributes
      document.querySelectorAll('.postImg img').forEach(img => {
        img.removeAttribute('data-content-type');
        img.removeAttribute('data-content-id');
      });

      // Update category title
      document.querySelector('.category-title').textContent = 'Popular Movies';

      // Update showcase with a movie
      fetchAndDisplayFeaturedMovie();
    });
  
    
    // ... (keep existing theme toggle code) ...
      
    navTheme.addEventListener('click', () => {
        if (navTheme.innerHTML === 'Theme (Dark)') {
          navTheme.innerHTML = 'Theme (Light)';
          document.body.classList.add('dark-theme');
        } else {
          navTheme.innerHTML = 'Theme (Dark)';
          document.body.classList.remove('dark-theme');
        }
      });
      // ------------------- TV-Show Toggle  Ends -------------------
    
      //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''' FETCHING '''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''//
      // ------------------- Fetching MOVIES start -------------------
    
      const apiKey = '0d6bdb0fd2d104848743ab1519f84696';
      const movieNames = [
        'Inception', 'Interstellar', 'The Huntsman: Winter\'s War', 'Ford v Ferrari', 'Predestination', 'Maze Runner: The Scorch Trials', 'Conjuring',
        'The Batman', 'Zootopia', 'Sing', 'World War Z', 'The Pianist', 'The Revenant', 'Dune', 'Oppenheimer', 'Hacksaw Ridge', 'The Martian', 'Avatar', 'The Guilty',
        'Catch Me If You Can'
      ];
    
  
    function fetchAndDisplayMovies() {
      movieNames.forEach((movieName, index) => {
        const imgElementId = `movie${index + 1}`;
        const titleElementId = `movieTitle${index + 1}`;
        const releaseDateElementId = `movieDate${index + 1}`;
        const genreElementId = `movieGenre${index + 1}`;
        
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(movieName)}`)
          .then(response => response.json())
          .then(data => {
            if (data.results.length > 0) {
              const movieId = data.results[0].id;
  
              fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`)
                .then(response => response.json())
                .then(movieData => {
                  const posterUrl = movieData.poster_path;
                  const releaseDate = movieData.release_date;
                  const genres = movieData.genres.map(genre => genre.name).join(', ');
  
                  const imgElement = document.getElementById(imgElementId);
                  imgElement.src = `https://image.tmdb.org/t/p/w500${posterUrl}`;
                  // Explicitly set movie type and ID
                  imgElement.setAttribute('data-content-type', 'movie');
                  imgElement.setAttribute('data-content-id', movieId);
                  
                  document.getElementById(titleElementId).innerHTML = movieName;
                  document.getElementById(releaseDateElementId).innerHTML = `Released: ${releaseDate}`;
                  document.getElementById(genreElementId).innerHTML = `Genre: ${genres}`;
                })
                .catch(error => console.error('Error fetching movie details:', error));
            }
          })
          .catch(error => console.error('Error searching for movie:', error));
      });
    }
  
    navTvshow.addEventListener('click', () => {
      headText.innerHTML = 'TV-Shows';
      navPopup.style.display = 'none';
      // Clear existing content type attributes
      document.querySelectorAll('.postImg img').forEach(img => {
        img.removeAttribute('data-content-type');
        img.removeAttribute('data-content-id');
      });

      // Update category title
      document.querySelector('.category-title').textContent = 'Popular TV Shows';

      // Fetch and display TV shows
      tvShowNames.forEach((tvShowName, index) => {
        const imgElementId = `movie${index + 1}`;
        const titleElementId = `movieTitle${index + 1}`;
        const seasonsElementId = `movieDate${index + 1}`;
        const episodesElementId = `movieGenre${index + 1}`;
        fetchAndDisplayTvShowDetails(tvShowName, imgElementId, titleElementId, seasonsElementId, episodesElementId);
      });

      // Update showcase with a TV show
      fetchAndDisplayFeaturedTVShow();
    });
    
       // // ------------------- Fetching Movies TMDB ends -------------------
    // // ------------------- Fetching TV-SHOWS TMDB Starts -------------------
   const tvShowNames = [
      'Squid Game', 'The Silent Sea', 'Alice in Borderland', 'The Last of Us', 'I Am Robot', 'The Day of the Jackal', 'The Originals', 'From', 'Loki', 'Avatar: The Last Airbender',
      'Alice in Wonderland', 'All of Us Are Dead', '3%', 'Black Mirror', 'Snowpiercer', 'The Platform', 'The Witcher', 'Stranger Things', 'Hijack', 'Mind your language'
    ];
  
//     navTvshow.addEventListener('click', () => {
    //    headText.innerHTML = 'TV-Shows';
//       navPopup.style.display = 'none';
  

    function fetchAndDisplayTvShowDetails(tvShowName, imgElementId, titleElementId, seasonsElementId, episodesElementId) {
      fetch(`https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${encodeURIComponent(tvShowName)}`)
        .then(response => response.json())
        .then(data => {
          if (data.results.length > 0) {
            const tvShowId = data.results[0].id;
  
            fetch(`https://api.themoviedb.org/3/tv/${tvShowId}?api_key=${apiKey}`)
              .then(response => response.json())
              .then(tvShowData => {
                const posterUrl = tvShowData.poster_path;
                const seasons = tvShowData.number_of_seasons;
                const episodes = tvShowData.number_of_episodes;
  
                const imgElement = document.getElementById(imgElementId);
                imgElement.src = `https://image.tmdb.org/t/p/w500${posterUrl}`;
                // Explicitly set TV show type and ID
                imgElement.setAttribute('data-content-type', 'tv');
                imgElement.setAttribute('data-content-id', tvShowId);
  
                document.getElementById(titleElementId).innerHTML = tvShowName;
                document.getElementById(seasonsElementId).innerHTML = `Seasons: ${seasons}`;
                document.getElementById(episodesElementId).innerHTML = `Episodes in First Season: ${episodes}`;
              })
              .catch(error => console.error('Error fetching TV show details:', error));
          }
        })
        .catch(error => console.error('Error searching for TV show:', error));
    }
  
    // Function to fetch and display featured movie in showcase
    function fetchAndDisplayFeaturedMovie() {
        // Get a random movie from the list for showcase
        const randomMovie = movieNames[Math.floor(Math.random() * movieNames.length)];
        
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(randomMovie)}`)
            .then(response => response.json())
            .then(data => {
                if (data.results.length > 0) {
                    const movieId = data.results[0].id;
                    
                    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`)
                        .then(response => response.json())
                        .then(movieData => {
                            // Update showcase content
                            const showcase = document.querySelector('.showcase');
                            const backdropPath = movieData.backdrop_path;
                            showcase.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${backdropPath})`;
                            
                            document.querySelector('.showcase-title').textContent = movieData.title;
                            document.querySelector('.showcase-description').textContent = movieData.overview;
                            
                            // Add movie ID to the buttons for detail page navigation
                            const buttons = document.querySelectorAll('.showcase-buttons .btn');
                            buttons.forEach(button => {
                                button.addEventListener('click', () => {
                                    localStorage.setItem('selectedContentId', movieId);
                                    localStorage.setItem('selectedContentType', 'movie');
                                    window.location.href = 'Detail/detail.html';
                                });
                            });
                        })
                        .catch(error => console.error('Error fetching movie details:', error));
                }
            })
            .catch(error => console.error('Error searching for movie:', error));
    }

    // Function to fetch and display featured TV show in showcase
    function fetchAndDisplayFeaturedTVShow() {
        // Get a random TV show from the list for showcase
        const randomTVShow = tvShowNames[Math.floor(Math.random() * tvShowNames.length)];
        
        fetch(`https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${encodeURIComponent(randomTVShow)}`)
            .then(response => response.json())
            .then(data => {
                if (data.results.length > 0) {
                    const tvShowId = data.results[0].id;
                    
                    fetch(`https://api.themoviedb.org/3/tv/${tvShowId}?api_key=${apiKey}`)
                        .then(response => response.json())
                        .then(tvShowData => {
                            // Update showcase content
                            const showcase = document.querySelector('.showcase');
                            const backdropPath = tvShowData.backdrop_path;
                            showcase.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${backdropPath})`;
                            
                            document.querySelector('.showcase-title').textContent = tvShowData.name;
                            document.querySelector('.showcase-description').textContent = tvShowData.overview;
                            
                            // Add TV show ID to the buttons for detail page navigation
                            const buttons = document.querySelectorAll('.showcase-buttons .btn');
                            buttons.forEach(button => {
                                button.addEventListener('click', () => {
                                    localStorage.setItem('selectedContentId', tvShowId);
                                    localStorage.setItem('selectedContentType', 'tv');
                                    window.location.href = 'Detail/detail.html';
                                });
                            });
                        })
                        .catch(error => console.error('Error fetching TV show details:', error));
                }
            })
            .catch(error => console.error('Error searching for TV show:', error));
    }

    // Initialize with movies on page load
    window.onload = () => {
      fetchAndDisplayMovies();
      fetchAndDisplayFeaturedMovie();
      // Ensure all images start with movie content type
      document.querySelectorAll('.postImg img').forEach(img => {
        img.setAttribute('data-content-type', 'movie');
      });
    };
  
    // Update click handler to use current attributes
    document.querySelectorAll('.postImg').forEach(poster => {
      poster.addEventListener('click', function() {
        const imgElement = this.querySelector('img');
        const contentId = imgElement.getAttribute('data-content-id');
        const contentType = imgElement.getAttribute('data-content-type');
  
        if (contentId && contentType) {
          localStorage.setItem('selectedContentId', contentId);
          localStorage.setItem('selectedContentType', contentType);
          window.location.href = 'Detail/detail.html';
        }
      });
    });
   //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''' FETCHING '''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''//
  
    // ------------------- Search Button Toggle  starts -------------------
  
    const allowedMovies = [
      'Inception', 'Interstellar', 'The Huntsman: Winter\'s War', 'The Guilty', 'Maze Runner', 'Maze Runner: The Scorch Trials', 'Maze Runner: The Death Cure',
      'The Batman', 'Zootopia', 'Moana', 'World War Z', 'The Pianist', 'The Revenant', 'Dune', 'Dune: Part Two', 'Hacksaw Ridge', 'The Martian', 'Avatar', 'Ford v Ferrari'
    ];
  
    const allowedTvShows = [
      'Squid Game', 'The Silent Sea', 'Alice in Borderland', 'The Last of Us', 'I Am Robot', 'The Day of the Jackal', 'The Originals', 'From', 'Loki', 'Avatar',
      'Alice in Wonderland', 'All of Us Are Dead', '3%', 'Black Mirror', 'Snowpiercer', 'The Platform', 'The Witcher', 'Stranger Things'
    ];
  
      
        // ------------------- Search Functionality Start -------------------
        const searchIcon = document.querySelector('#searchIcon');
        const searchContainer = document.querySelector('#searchContainer');
        const searchInput = document.querySelector('#search-input');
        
        // Create search results container if it doesn't exist
        let searchResults = document.querySelector('#search-results');
        if (!searchResults) {
          searchResults = document.createElement('div');
          searchResults.id = 'search-results';
          searchResults.className = 'search-results';
          searchContainer.appendChild(searchResults);
        }
      
        // Track current content type
        let currentContentType = 'movie';
      
        // Update content type when switching between movies and TV shows
        navMovie.addEventListener('click', () => {
          currentContentType = 'movie';
        });
      
        navTvshow.addEventListener('click', () => {
          currentContentType = 'tv';
        });
      
        // Toggle search bar visibility
        searchIcon.addEventListener('click', () => {
          const isMobile = window.innerWidth <= 767;
      
          if (searchContainer.style.display === "none") {
            searchContainer.style.display = "block";
            if (isMobile) {
                searchContainer.classList.add('active');
                searchIcon.style.display = 'none';
            }
            searchInput.focus();
          } else {
            searchContainer.style.display = "none";
            searchResults.style.display = "none";
            if (isMobile) {
                searchContainer.classList.remove('active');
                searchIcon.style.display = 'block';
            }
            searchInput.value = ''; // Clear search input when closing
          }
        });
      
        // Close search when clicking outside
        document.addEventListener('click', (e) => {
          const isMobile = window.innerWidth <= 767;
          
          if (!searchContainer.contains(e.target) && !searchIcon.contains(e.target)) {
            searchContainer.style.display = "none";
            searchResults.style.display = "none";
            if (isMobile) {
                searchContainer.classList.remove('active');
                searchIcon.style.display = 'block';
            }
          }
        });
      
        // Handle window resize
        window.addEventListener('resize', () => {
          const isMobile = window.innerWidth <= 767;
          
          if (!isMobile) {
            searchContainer.classList.remove('active');
            searchIcon.style.display = 'block';
          }
        });
      
        // Handle search input
        let searchTimeout;
        searchInput.addEventListener('input', (e) => {
          clearTimeout(searchTimeout);
          const searchTerm = e.target.value.trim();
      
          if (searchTerm.length < 2) {
            searchResults.style.display = "none";
            return;
          }
      
          searchTimeout = setTimeout(() => {
            searchContent(searchTerm, currentContentType);
          }, 500);
        });
      
        // Search content function
        async function searchContent(query, type) {
          const apiKey = '0d6bdb0fd2d104848743ab1519f84696';
          try {
            const response = await fetch(
              `https://api.themoviedb.org/3/search/${type}?api_key=${apiKey}&query=${encodeURIComponent(query)}`
            );
            const data = await response.json();
      
            if (data.results && data.results.length > 0) {
              displaySearchResults(data.results.slice(0, 5), type);
            } else {
              searchResults.innerHTML = '<div class="no-results">No results found</div>';
              searchResults.style.display = "block";
            }
          } catch (error) {
            console.error('Search error:', error);
            searchResults.innerHTML = '<div class="error-message">Error searching content</div>';
            searchResults.style.display = "block";
          }
        }
      
        // Display search results
        function displaySearchResults(results, type) {
          searchResults.innerHTML = results.map(result => {
            const title = type === 'movie' ? result.title : result.name;
            const releaseDate = type === 'movie' ? result.release_date : result.first_air_date;
            const year = releaseDate ? new Date(releaseDate).getFullYear() : 'N/A';
            const posterPath = result.poster_path
              ? `https://image.tmdb.org/t/p/w92${result.poster_path}`
              : '/api/placeholder/92/138';
      
            return `
              <div class="search-result-item" data-id="${result.id}" data-type="${type}">
                <img src="${posterPath}" alt="${title}" class="result-poster">
                <div class="result-info">
                  <div class="result-title">${title}</div>
                  <div class="result-year">${year}</div>
                </div>
              </div>
            `;
          }).join('');
      
          searchResults.style.display = "block";
      
          // Add click handlers to search results
          document.querySelectorAll('.search-result-item').forEach(item => {
            item.addEventListener('click', () => {
              const contentId = item.dataset.id;
              const contentType = item.dataset.type;
      
              if (contentId && contentType) {
                localStorage.setItem('selectedContentId', contentId);
                localStorage.setItem('selectedContentType', contentType);
                window.location.href = 'Detail/detail.html';
              }
            });
          });
        }
        // ------------------- Search Functionality End -------------------
  
    // ------------------- Search Button Toggle  Ends -------------------
  


  });