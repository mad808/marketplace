import React, { useState, useEffect } from 'react';
import { useLanguage } from './context/LanguageContext';
import Navbar from './components/layout/Navbar';
import BannerSlider from './components/marketplace/BannerSlider';
import Stories from './components/marketplace/Stories';
import YoutubeStyleCard from './components/marketplace/YoutubeStyleCard';
import PromoBanner from './components/common/PromoBanner';
import Footer from './components/layout/Footer';
import './App.css';

// Mock items array
const MOCK_ITEMS = [
  {
    id: 1,
    title: "Lexus ES350 White Edition",
    category: "Cars",
    categoryKey: "filter_cars",
    year: "2025",
    price: 385000,
    location: "Ashgabat",
    views: 4520,
    isVip: true,
    shopName: "Kamil Motors",
    shopLogo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=100",
    image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&q=80&w=400",
    video: "https://assets.mixkit.co/videos/preview/mixkit-fast-car-under-bridge-40509-large.mp4"
  },
  {
    id: 2,
    title: "Toyota Land Cruiser Prado",
    category: "Cars",
    categoryKey: "filter_cars",
    year: "2014",
    price: 396500,
    location: "Anew",
    views: 1269,
    isVip: false,
    shopName: "Ynamly Ulag",
    shopLogo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=400",
    video: "https://assets.mixkit.co/videos/preview/mixkit-car-driving-on-a-curved-road-41618-large.mp4"
  },
  {
    id: 3,
    title: "Sit molestias suscipit - Brake Disk",
    category: "Car Parts",
    categoryKey: "filter_parts",
    price: 1033,
    location: "Mary",
    views: 252,
    isVip: true,
    shopName: "Sumbar Computer",
    shopLogo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=100",
    image: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 4,
    title: "iPhone 15 Pro Max 256GB",
    category: "Products",
    categoryKey: "filter_products",
    price: 14500,
    location: "Balkanabat",
    views: 3345,
    isVip: false,
    shopName: "Kamil Market",
    shopLogo: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&q=80&w=100",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=400"
  }
];

function App() {
  const { t } = useLanguage();
  const [favorites, setFavorites] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All');

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('appTheme') || 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('appTheme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const handleToggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const filteredItems = MOCK_ITEMS.filter(item => {
    const matchesCategory = activeFilter === 'All' || item.category === activeFilter;
    const matchesLocation = selectedLocation === 'All' || item.location === selectedLocation;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.shopName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesLocation && matchesSearch;
  });

  return (
    <div className="app-container">
      <PromoBanner />

      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        favoritesCount={favorites.length}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      <BannerSlider />

      <Stories />

      <main className="yt-grid">
        {filteredItems.map(item => (
          <YoutubeStyleCard
            key={item.id}
            item={item}
            isFavorite={favorites.includes(item.id)}
            onToggleFavorite={handleToggleFavorite}
          />
        ))}
      </main>

      <Footer />
    </div>
  );
}

export default App;