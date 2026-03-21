import { useState, useEffect } from 'react';
import { Play, Film, Star, TrendingUp, Clock, Search, User } from 'lucide-react';

// Movie data interface
interface Movie {
  id: number;
  title: string;
  genre: string;
  year: number;
  rating: number;
  image: string;
  description: string;
}

// Hero slide data
interface HeroSlide {
  id: number;
  title: string;
  description: string;
  image: string;
}

// Hero slides data
const heroSlides: HeroSlide[] = [
  {
    id: 1,
    title: "Ironclad Odyssey",
    description: "In a world torn apart by war, one soldier's advanced armor becomes humanity's last hope against an alien invasion that threatens to extinguish all life on Earth.",
    image: "/images/hero1.jpg"
  },
  {
    id: 2,
    title: "The Breach",
    description: "A seasoned detective and a young hacker form an unlikely alliance to uncover a conspiracy that reaches the highest levels of government. Trust no one.",
    image: "/images/hero2.jpg"
  },
  {
    id: 3,
    title: "Ascension",
    description: "An astronaut stranded on a distant planet must find a way to survive against impossible odds while uncovering the secrets of an ancient alien civilization.",
    image: "/images/hero3.jpg"
  }
];

// Movies data
const moviesData: Movie[] = [
  { id: 1, title: "Neo-Shadow", genre: "Sci-Fi", year: 2024, rating: 8.5, image: "/images/movie1.jpg", description: "A cyberpunk thriller set in a dystopian future." },
  { id: 2, title: "The Last Stand", genre: "Action", year: 2024, rating: 7.9, image: "/images/movie2.jpg", description: "One soldier's fight against impossible odds." },
  { id: 3, title: "Starlight Kiss", genre: "Romance", year: 2023, rating: 8.2, image: "/images/movie3.jpg", description: "A timeless love story in the city of lights." },
  { id: 4, title: "The Shadows Within", genre: "Thriller", year: 2024, rating: 8.7, image: "/images/movie4.jpg", description: "A noir mystery that will keep you guessing." },
  { id: 5, title: "Folded Reality", genre: "Sci-Fi", year: 2024, rating: 9.1, image: "/images/movie5.jpg", description: "When dreams and reality collide." },
  { id: 6, title: "Eternal Echoes", genre: "Horror", year: 2023, rating: 7.5, image: "/images/movie6.jpg", description: "Some houses hold dark secrets." },
  { id: 7, title: "Spark & Luna", genre: "Animation", year: 2024, rating: 8.8, image: "/images/movie7.jpg", description: "An adventure beyond the stars." },
  { id: 8, title: "Operation: Crimson Night", genre: "Action", year: 2024, rating: 8.0, image: "/images/movie8.jpg", description: "The mission that changed everything." },
  { id: 9, title: "Iron & Honor", genre: "Action", year: 2023, rating: 8.3, image: "/images/movie9.jpg", description: "A legend rises from the battlefield." },
];

// Genre categories
const genres = ["All", "Action", "Sci-Fi", "Romance", "Thriller", "Horror", "Animation", "Drama", "Comedy"];

function App() {
  // State for menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // State for hero slider
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // State for genre filter
  const [selectedGenre, setSelectedGenre] = useState("All");
  
  // State for header background
  const [isScrolled, setIsScrolled] = useState(false);

  // Toggle menu
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Close menu
  const closeMenu = () => setIsMenuOpen(false);

  // Auto-slide hero carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Handle scroll for header background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter movies by genre
  const filteredMovies = selectedGenre === "All" 
    ? moviesData 
    : moviesData.filter(movie => movie.genre === selectedGenre);

  // Navigation links
  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Movies", href: "#movies" },
    { name: "TV Shows", href: "#tvshows" },
    { name: "Year", href: "#year" },
    { name: "Genre", href: "#genre" },
    { name: "Admin Panel", href: "#admin" },
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Header */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'bg-black/95 backdrop-blur-md shadow-lg' : 'bg-gradient-to-b from-black/80 to-transparent'
        }`}
      >
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <a href="#home" className="flex items-center gap-2 group">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-600 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform">
                <Film className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <span className="text-xl sm:text-2xl font-bold tracking-wider text-white" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                StreamFlix
              </span>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.slice(0, 5).map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-gray-300 hover:text-white transition-colors relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </nav>

            {/* Right side icons */}
            <div className="flex items-center gap-4">
              <button className="hidden sm:flex p-2 text-gray-300 hover:text-white transition-colors">
                <Search className="w-5 h-5" />
              </button>
              <button className="hidden sm:flex p-2 text-gray-300 hover:text-white transition-colors">
                <User className="w-5 h-5" />
              </button>
              
              {/* Hamburger Menu Button */}
              <button
                onClick={toggleMenu}
                className={`lg:hidden p-2 z-50 relative ${isMenuOpen ? 'hamburger-active' : ''}`}
                aria-label="Toggle menu"
              >
                <div className="w-6 h-5 flex flex-col justify-between">
                  <span className="hamburger-line w-full h-0.5 bg-white origin-left" />
                  <span className="hamburger-line w-full h-0.5 bg-white" />
                  <span className="hamburger-line w-full h-0.5 bg-white origin-left" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/95 backdrop-blur-lg menu-overlay ${
          isMenuOpen ? 'active' : 'inactive'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link, index) => (
            <a
              key={link.name}
              href={link.href}
              onClick={closeMenu}
              className="text-3xl sm:text-4xl font-bold text-white hover:text-red-600 transition-colors"
              style={{ 
                fontFamily: 'Bebas Neue, sans-serif',
                animationDelay: `${index * 0.1}s`
              }}
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>

      {/* Hero Section */}
      <section id="home" className="relative h-screen w-full overflow-hidden">
        {/* Background Slides */}
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div 
              className="absolute inset-0 bg-cover bg-center transform scale-105"
              style={{ 
                backgroundImage: `url(${slide.image})`,
                animation: index === currentSlide ? 'slowZoom 20s linear infinite' : 'none'
              }}
            />
            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-transparent" />
          </div>
        ))}

        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-end pb-20 sm:pb-32">
          <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
            <div className="max-w-3xl">
              {/* Slide Indicator */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-red-600 font-bold text-lg">
                  0{currentSlide + 1}
                </span>
                <span className="text-gray-500">/</span>
                <span className="text-gray-500 text-lg">
                  0{heroSlides.length}
                </span>
              </div>

              {/* Title */}
              <h1 
                className="hero-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 text-shadow"
                style={{ fontFamily: 'Bebas Neue, sans-serif' }}
              >
                {heroSlides[currentSlide].title}
              </h1>

              {/* Description */}
              <p className="hero-subtitle text-base sm:text-lg md:text-xl text-gray-300 mb-8 max-w-2xl line-clamp-3">
                {heroSlides[currentSlide].description}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <button className="btn-glow flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors">
                  <Play className="w-5 h-5 fill-current" />
                  Watch Now
                </button>
                <button className="flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg hover:bg-white/20 transition-colors border border-white/20">
                  <Star className="w-5 h-5" />
                  Add to List
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Slide Navigation Dots */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'w-8 bg-red-600' 
                  : 'bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <style>{`
          @keyframes slowZoom {
            0% { transform: scale(1.05); }
            50% { transform: scale(1.15); }
            100% { transform: scale(1.05); }
          }
        `}</style>
      </section>

      {/* Genre Navigation */}
      <section id="genre" className="sticky top-16 sm:top-20 z-30 bg-black/95 backdrop-blur-md border-b border-gray-800 py-4">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-custom pb-2">
            <TrendingUp className="w-5 h-5 text-red-600 flex-shrink-0" />
            {genres.map((genre) => (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`flex-shrink-0 px-4 sm:px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedGenre === genre
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Movies Grid Section */}
      <section id="movies" className="py-12 sm:py-16 bg-black">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 
                className="text-3xl sm:text-4xl font-bold text-white mb-2"
                style={{ fontFamily: 'Bebas Neue, sans-serif' }}
              >
                {selectedGenre === "All" ? "Latest Movies" : `${selectedGenre} Movies`}
              </h2>
              <p className="text-gray-400 text-sm sm:text-base">
                {filteredMovies.length} titles available
              </p>
            </div>
            <a 
              href="#all" 
              className="hidden sm:flex items-center gap-2 text-red-600 hover:text-red-500 transition-colors font-medium"
            >
              View All
              <span className="text-lg">→</span>
            </a>
          </div>

          {/* Movies Grid - Exactly 3 per row on desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredMovies.map((movie, index) => (
              <div
                key={movie.id}
                className="group relative rounded-xl overflow-hidden bg-gray-900 card-hover cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Movie Poster */}
                <div className="aspect-[2/3] overflow-hidden">
                  <img
                    src={movie.image}
                    alt={movie.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>

                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 sm:p-6">
                  <h3 
                    className="text-xl sm:text-2xl font-bold text-white mb-2"
                    style={{ fontFamily: 'Bebas Neue, sans-serif' }}
                  >
                    {movie.title}
                  </h3>
                  <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                    {movie.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-white font-semibold">{movie.rating}</span>
                    </div>
                    <span className="text-gray-400 text-sm">{movie.year}</span>
                  </div>
                  <button className="mt-4 w-full py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2">
                    <Play className="w-4 h-4 fill-current" />
                    Watch Now
                  </button>
                </div>

                {/* Rating Badge */}
                <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-lg">
                  <Star className="w-3 h-3 text-yellow-500 fill-current" />
                  <span className="text-white text-xs font-semibold">{movie.rating}</span>
                </div>

                {/* Genre Badge */}
                <div className="absolute top-3 left-3 bg-red-600 px-2 py-1 rounded-lg">
                  <span className="text-white text-xs font-medium">{movie.genre}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredMovies.length === 0 && (
            <div className="text-center py-16">
              <Film className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl text-white font-semibold mb-2">No movies found</h3>
              <p className="text-gray-400">Try selecting a different genre</p>
            </div>
          )}
        </div>
      </section>

      {/* Top Rated Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-b from-black to-gray-900">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex items-center gap-3 mb-8">
            <Star className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-500" />
            <h2 
              className="text-3xl sm:text-4xl font-bold text-white"
              style={{ fontFamily: 'Bebas Neue, sans-serif' }}
            >
              Top Rated
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {moviesData
              .sort((a, b) => b.rating - a.rating)
              .slice(0, 6)
              .map((movie, index) => (
              <div
                key={`top-${movie.id}`}
                className="group relative rounded-xl overflow-hidden bg-gray-900 card-hover cursor-pointer"
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  transform: index % 3 === 1 ? 'translateY(-20px)' : index % 3 === 2 ? 'translateY(-40px)' : 'none'
                }}
              >
                <div className="aspect-[2/3] overflow-hidden">
                  <img
                    src={movie.image}
                    alt={movie.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 sm:p-6">
                  <h3 
                    className="text-xl sm:text-2xl font-bold text-white mb-2"
                    style={{ fontFamily: 'Bebas Neue, sans-serif' }}
                  >
                    {movie.title}
                  </h3>
                  <div className="flex items-center gap-2 mb-3">
                    <Star className="w-5 h-5 text-yellow-500 fill-current" />
                    <span className="text-white font-bold text-lg">{movie.rating}</span>
                    <span className="text-gray-400">/10</span>
                  </div>
                  <button className="w-full py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2">
                    <Play className="w-4 h-4 fill-current" />
                    Watch Now
                  </button>
                </div>

                <div className="absolute top-3 right-3 w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                  <span className="text-black font-bold text-sm">{movie.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Must Watch Section */}
      <section className="py-12 sm:py-16 bg-gray-900">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex items-center gap-3 mb-8">
            <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-red-600" />
            <h2 
              className="text-3xl sm:text-4xl font-bold text-white"
              style={{ fontFamily: 'Bebas Neue, sans-serif' }}
            >
              Must Watch
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {moviesData.slice(0, 6).map((movie, index) => (
              <div
                key={`must-${movie.id}`}
                className="group relative rounded-xl overflow-hidden bg-gray-900 card-hover cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="aspect-[2/3] overflow-hidden">
                  <img
                    src={movie.image}
                    alt={movie.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 sm:p-6">
                  <h3 
                    className="text-xl sm:text-2xl font-bold text-white mb-2"
                    style={{ fontFamily: 'Bebas Neue, sans-serif' }}
                  >
                    {movie.title}
                  </h3>
                  <p className="text-gray-300 text-sm mb-3">{movie.genre} • {movie.year}</p>
                  <button className="w-full py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2">
                    <Play className="w-4 h-4 fill-current" />
                    Watch Now
                  </button>
                </div>

                <div className="absolute top-3 left-3 bg-red-600 px-3 py-1 rounded-lg">
                  <span className="text-white text-xs font-bold">MUST WATCH</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 py-12 sm:py-16">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand */}
            <div>
              <a href="#home" className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                  <Film className="w-6 h-6 text-white" />
                </div>
                <span 
                  className="text-2xl font-bold text-white"
                  style={{ fontFamily: 'Bebas Neue, sans-serif' }}
                >
                  StreamFlix
                </span>
              </a>
              <p className="text-gray-400 text-sm leading-relaxed">
                Your ultimate destination for unlimited movies, TV shows, and entertainment. Stream anytime, anywhere.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {navLinks.slice(0, 5).map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href}
                      className="text-gray-400 hover:text-red-600 transition-colors text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h4 className="text-white font-semibold mb-4">Categories</h4>
              <ul className="space-y-2">
                {genres.slice(1, 6).map((genre) => (
                  <li key={genre}>
                    <button
                      onClick={() => setSelectedGenre(genre)}
                      className="text-gray-400 hover:text-red-600 transition-colors text-sm"
                    >
                      {genre}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white font-semibold mb-4">Connect</h4>
              <div className="flex gap-4">
                <a 
                  href="#facebook" 
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:bg-red-600 hover:text-white transition-all"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a 
                  href="#twitter" 
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:bg-red-600 hover:text-white transition-all"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a 
                  href="#instagram" 
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:bg-red-600 hover:text-white transition-all"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm text-center sm:text-left">
              © 2024 StreamFlix. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#privacy" className="text-gray-500 hover:text-white text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#terms" className="text-gray-500 hover:text-white text-sm transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;