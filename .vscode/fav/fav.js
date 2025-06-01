document.addEventListener('DOMContentLoaded', () => {



// ------------------- navBar Toggle  starts -------------------
const navIcon = document.querySelector('#navIcon');
const navPopup = document.querySelector('#navPopup');

navIcon.addEventListener('click', () => 
  {
      if(navPopup.style.display === 'block')
          {
              navPopup.style.display = 'none';
          }else
          {
              navPopup.style.display = 'block';
          }
  })


// ------------------- navBar Toggle  Ends -------------------
// ------------------- TV-Show  Starts -------------------
const navTvshow = document.querySelector('#navTvshow');
const navMovie = document.querySelector('#navMovie');
const navFav = document.querySelector('#navFav');
const navTheme = document.querySelector('#navTheme');
const headText = document.querySelector('.headMovie');



navMovie.addEventListener('click',()=>
  {
      fetchAndDisplayMovies();
      headText.innerHTML='Movies';
      navPopup.style.display = 'none';
  })

navFav.addEventListener('click',()=>
  {
      headText.innerHTML='Favourites';
      navPopup.style.display = 'none';
  })

  navTheme.addEventListener('click', () => {
      if (navTheme.innerHTML === 'Theme (Dark)') {
          navTheme.innerHTML = 'Theme (Light)';
          document.body.classList.add('dark-theme')
          // localStorage.setItem('theme', 'dark');
      } else {
          navTheme.innerHTML = 'Theme (Dark)';
          document.body.classList.remove('dark-theme')
          // localStorage.setItem('theme', 'light');

      }
  });
// ------------------- TV-Show Toggle  Ends -------------------


    
    // Your existing movie and TV show arrays
    const movieNames = [  
      
    ];
  
    // Function to generate movie sections
    function generateMovieSections(container) {
      const main = container.querySelector('main');
      main.innerHTML = ''; // Clear existing sections
      
      movieNames.forEach((_, index) => {
        const section = document.createElement('section');
        section.className = `poster ${index % 3 === 2 ? 'post2' : 'post1'}`;
        
        section.innerHTML = `
          <div class="postImg">
            <div class="postImg-inner">
              <div class="postImg-front">
                <img id="movie${index + 1}" src="./img/1.jpg" alt="movie poster">
              </div>
              <div class="postImg-back">
                <p id="movieDate${index + 1}">Released:</p>
                <p id="movieGenre${index + 1}">Genre:</p>
              </div>
            </div>
          </div>
          <h3 id="movieTitle${index + 1}" class="movieTitle">MOVIE TITLE</h3>
        `;
        
        main.appendChild(section);
      });
    }
  
    // Function to generate TV show sections
    function generateTVShowSections(container) {
      const main = container.querySelector('main');
      main.innerHTML = ''; // Clear existing sections
      
      tvShowNames.forEach((_, index) => {
        const section = document.createElement('section');
        section.className = `poster ${index % 3 === 2 ? 'post2' : 'post1'}`;
        
        section.innerHTML = `
          <div class="postImg">
            <div class="postImg-inner">
              <div class="postImg-front">
                <img id="movie${index + 1}" src="./img/1.jpg" alt="tv show poster">
              </div>
              <div class="postImg-back">
                <p id="movieDate${index + 1}">Seasons:</p>
                <p id="movieGenre${index + 1}">Episodes:</p>
              </div>
            </div>
          </div>
          <h3 id="movieTitle${index + 1}" class="movieTitle">TV SHOW TITLE</h3>
        `;
        
        main.appendChild(section);
      });
    }
  

  });