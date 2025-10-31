# 🎬 CineHub - Modern Movie & TV Show Platform

<div align="center">
  <img src="https://via.placeholder.com/800x400/0f0f23/ffffff?text=CineHub+Movie+Platform" alt="CineHub Banner" width="100%">
  
  <p align="center">
    <strong>A modern, responsive movie and TV show discovery platform built with vanilla JavaScript</strong>
  </p>
  
  <p align="center">
    <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5">
    <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3">
    <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
    <img src="https://img.shields.io/badge/TMDB-01B4E4?style=for-the-badge&logo=themoviedatabase&logoColor=white" alt="TMDB">
  </p>
  
  <p align="center">
    <a href="#demo">View Demo</a> •
    <a href="#features">Features</a> •
    <a href="#installation">Installation</a> •
    <a href="#usage">Usage</a> •
    <a href="#contributing">Contributing</a>
  </p>
</div>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Screenshots](#screenshots)
- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
- [API Configuration](#api-configuration)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Browser Support](#browser-support)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## 🌟 Overview

CineHub is a modern, Netflix-inspired movie and TV show discovery platform that provides users with an immersive browsing experience. Built with vanilla JavaScript, HTML5, and CSS3, it offers a responsive design that works seamlessly across all devices.

### ✨ Key Highlights

- **🎨 Modern Design**: Netflix-style interface with dark/light theme support
- **📱 Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- **🚀 Fast Performance**: Vanilla JavaScript with optimized loading and caching
- **🔍 Smart Search**: Real-time search with autocomplete suggestions
- **🎬 Rich Content**: Detailed movie/TV show pages with cast, crew, and metadata
- **♿ Accessible**: WCAG compliant with proper ARIA labels and keyboard navigation

## 🚀 Features

### 🎭 Content Discovery
- **Popular Movies & TV Shows**: Curated lists of trending content
- **Advanced Search**: Real-time search with intelligent suggestions
- **Genre Filtering**: Browse content by categories
- **Content Switching**: Seamless toggle between movies and TV shows

### 🎨 User Interface
- **Dark/Light Theme**: Toggle between modern dark and light themes
- **Responsive Design**: Optimized layouts for all screen sizes
- **Smooth Animations**: Fluid transitions and hover effects
- **Professional Typography**: Inter and Poppins font families

### 📄 Detailed Content Pages
- **Hero Sections**: Cinematic backdrop images with overlay content
- **Comprehensive Info**: Ratings, runtime, genres, release dates
- **Cast & Crew**: Actor photos, names, and character information
- **Additional Details**: Director, language, budget, revenue
- **Action Buttons**: Watch Now, Add to List, Share functionality

### 🔧 Technical Features
- **API Integration**: Real-time data from The Movie Database (TMDB)
- **Error Handling**: Graceful fallbacks and retry mechanisms
- **Performance Optimization**: Lazy loading, image optimization
- **Local Storage**: User preferences and "My List" functionality
- **SEO Optimized**: Proper meta tags and semantic HTML

## 📸 Screenshots

### 🏠 Homepage - Dark Theme
<img src="https://via.placeholder.com/800x500/0f0f23/ffffff?text=Homepage+Dark+Theme" alt="Homepage Dark Theme" width="100%">

### 🌞 Homepage - Light Theme
<img src="https://via.placeholder.com/800x500/fafbfc/1a1a1a?text=Homepage+Light+Theme" alt="Homepage Light Theme" width="100%">

### 🎬 Movie Detail Page
<img src="https://via.placeholder.com/800x600/0f0f23/ffffff?text=Movie+Detail+Page" alt="Movie Detail Page" width="100%">

### 📱 Mobile Responsive Design
<div align="center">
  <img src="https://via.placeholder.com/300x600/0f0f23/ffffff?text=Mobile+View" alt="Mobile View" width="300">
</div>

### 🔍 Search Functionality
<img src="https://via.placeholder.com/800x400/0f0f23/ffffff?text=Search+Results" alt="Search Results" width="100%">

## 🎯 Demo

### Live Demo
[🔗 View Live Demo](https://your-demo-link.com) *(Replace with actual demo link)*

### Quick Start
```bash
# Clone the repository
git clone https://github.com/yourusername/cinehub-movie-platform.git

# Navigate to project directory
cd cinehub-movie-platform

# Open in browser
open index.html
```

## 🛠️ Installation

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- TMDB API key (free registration required)
- Local web server (optional, for development)

### Step-by-Step Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/cinehub-movie-platform.git
   cd cinehub-movie-platform
   ```

2. **Get TMDB API Key**
   - Visit [The Movie Database](https://www.themoviedb.org/)
   - Create a free account
   - Go to Settings → API
   - Copy your API key

3. **Configure API Key**
   ```javascript
   // In index.js and Detail/detail.js, replace:
   this.apiKey = 'your-tmdb-api-key-here';
   ```

4. **Launch the Application**
   ```bash
   # Option 1: Open directly in browser
   open index.html
   
   # Option 2: Use a local server (recommended)
   python -m http.server 8000
   # or
   npx serve .
   ```

## 🔧 API Configuration

### TMDB API Setup

The application uses The Movie Database (TMDB) API for fetching movie and TV show data.

```javascript
// Configuration in index.js and Detail/detail.js
const API_CONFIG = {
    apiKey: 'your-api-key-here',
    baseURL: 'https://api.themoviedb.org/3',
    imageBaseURL: 'https://image.tmdb.org/t/p'
};
```

### API Endpoints Used
- `/movie/popular` - Popular movies
- `/tv/popular` - Popular TV shows
- `/search/multi` - Search movies and TV shows
- `/movie/{id}` - Movie details
- `/tv/{id}` - TV show details

## 📁 Project Structure

```
cinehub-movie-platform/
├── 📄 index.html              # Main homepage
├── 🎨 index.css               # Main stylesheet
├── ⚡ index.js                # Main JavaScript logic
├── 📁 Detail/                 # Detail page directory
│   ├── 📄 detail.html         # Movie/TV detail page
│   ├── 🎨 detail.css          # Detail page styles
│   └── ⚡ detail.js           # Detail page logic
├── 📁 assets/                 # Static assets (if any)
├── 📄 README.md               # Project documentation
└── 📄 .gitignore              # Git ignore rules
```

## 💻 Technologies Used

### Frontend
- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Modern styling with CSS Grid, Flexbox, and custom properties
- **Vanilla JavaScript**: ES6+ features, async/await, modules

### APIs & Services
- **TMDB API**: Movie and TV show data
- **Font Awesome**: Icon library
- **Google Fonts**: Inter and Poppins typography

### Development Tools
- **Git**: Version control
- **ESLint**: Code linting (optional)
- **Prettier**: Code formatting (optional)

## 🌐 Browser Support

| Browser | Version |
|---------|---------|
| Chrome  | 60+     |
| Firefox | 55+     |
| Safari  | 12+     |
| Edge    | 79+     |

### Features Used
- CSS Grid & Flexbox
- CSS Custom Properties (Variables)
- Fetch API
- Local Storage
- Intersection Observer (for lazy loading)

## 🎮 Usage

### Basic Navigation
1. **Homepage**: Browse popular movies and TV shows
2. **Search**: Use the search bar to find specific content
3. **Content Toggle**: Switch between movies and TV shows
4. **Theme Toggle**: Switch between dark and light themes

### Detailed Views
1. **Click any movie/TV show** to view detailed information
2. **View cast and crew** information
3. **Add to your list** for later viewing
4. **Share content** with others

### Keyboard Navigation
- `Tab`: Navigate through interactive elements
- `Enter/Space`: Activate buttons and links
- `Escape`: Close modals and overlays

## 🔄 Development Workflow

### Git Commit History
Our development process included 6 major improvements:

1. **Refactor HTML structure**: Improved semantics and accessibility
2. **Complete redesign**: Modern dark theme and responsive layout
3. **Light theme support**: Added theme toggle and enhanced animations
4. **Performance optimizations**: Added lazy loading and error handling
5. **UI improvements**: Fixed light theme and centered navbar layout
6. **Detail page creation**: Professional movie detail pages with navigation

### Code Quality
- **Semantic HTML**: Proper use of HTML5 elements
- **Modular CSS**: Organized with CSS custom properties
- **Clean JavaScript**: ES6+ features with proper error handling
- **Responsive Design**: Mobile-first approach

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Contribution Guidelines
- Follow existing code style and conventions
- Add comments for complex logic
- Test on multiple browsers and devices
- Update documentation as needed

## 🐛 Known Issues & Roadmap

### Current Limitations
- Requires internet connection for API data
- No user authentication system
- Limited to TMDB content only

### Future Enhancements
- [ ] User authentication and profiles
- [ ] Watchlist synchronization
- [ ] Video trailer integration
- [ ] Advanced filtering options
- [ ] Recommendation engine
- [ ] Offline mode support

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **The Movie Database (TMDB)** for providing the comprehensive movie and TV show API
- **Font Awesome** for the beautiful icon library
- **Google Fonts** for the Inter and Poppins font families
- **Netflix** for design inspiration
- **Open Source Community** for tools and resources

---

<div align="center">
  <p>Made with ❤️ by <a href="https://github.com/yourusername">Your Name</a></p>
  <p>⭐ Star this repository if you found it helpful!</p>
</div>