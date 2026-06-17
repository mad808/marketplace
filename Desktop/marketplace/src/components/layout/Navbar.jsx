import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import CategoryModal from '../marketplace/CategoryModal';

// Local flags
import engFlag from '../../assets/img/flags/eng.png';
import tkmFlag from '../../assets/img/flags/tkm.png';
import rusFlag from '../../assets/img/flags/rus.png';

const FLAG_ASSETS = {
  en: engFlag,
  tk: tkmFlag,
  ru: rusFlag
};

const FLAG_NAMES = {
  en: 'English',
  tk: 'Türkmen',
  ru: 'Русский'
};

function Navbar({
  searchQuery,
  setSearchQuery,
  selectedLocation,
  setSelectedLocation,
  favoritesCount,
  activeFilter,
  setActiveFilter,
  theme,
  toggleTheme
}) {
  const { language, changeLanguage, t } = useLanguage();

  const [user, setUser] = useState({
    first_name: "Yhlas",
    last_name: "Meredow",
    role: "admin"
  });

  const [weatherTemp, setWeatherTemp] = useState('--');
  const [weatherIcon, setWeatherIcon] = useState('bi-cloud-sun');
  const [currentDate, setCurrentDate] = useState('');
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);

  const langRef = useRef(null);
  const userRef = useRef(null);

  // Standardized categories array matching your Blade navbar configuration
  const navItems = [
    { title: 'messages.Products', icon: 'grid', category: 'All' },
    { title: 'messages.Brands', icon: 'patch-check', category: 'Brands' },
    { title: 'messages.Vacancies', icon: 'briefcase', category: 'Vacancies' },
    { title: 'messages.Ads', icon: 'tags', category: 'Products' },
    { title: 'messages.Cars', icon: 'car-front', category: 'Cars' },
    { title: 'messages.CarParts', icon: 'wrench', category: 'Car Parts' }
  ];

  // Dynamic business categories
  const marketCategories = [
    { title: 'messages.Shops', icon: 'shop', category: 'Shops' },
    { title: 'messages.Restaurants', icon: 'egg-fried', category: 'Restaurants', isSpecial: true },
    { title: 'messages.Services', icon: 'tools', category: 'Services', isSpecial: true }
  ];

  const locationCoordinates = {
    Ashgabat: { lat: 37.9601, lon: 58.3261 },
    Mary: { lat: 37.5938, lon: 61.8317 },
    Balkanabat: { lat: 39.5108, lon: 54.3683 },
    Anew: { lat: 37.8974, lon: 58.5284 }
  };

  // Calendar date mapping
  useEffect(() => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const localeMap = { tk: 'tr-TR', ru: 'ru-RU', en: 'en-US' };
    setCurrentDate(new Date().toLocaleDateString(localeMap[language] || 'tr-TR', options));
  }, [language]);

  // Open-Meteo current weather fetching
  useEffect(() => {
    const fetchWeather = async () => {
      const coords = locationCoordinates[selectedLocation] || locationCoordinates['Ashgabat'];
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current_weather=true&temperature_unit=celsius&timezone=auto`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.current_weather) {
          setWeatherTemp(Math.round(data.current_weather.temperature));
          setWeatherIcon(getWeatherIconClass(data.current_weather.weathercode));
        }
      } catch (error) {
        setWeatherTemp('--');
      }
    };
    fetchWeather();
  }, [selectedLocation]);

  const getWeatherIconClass = (code) => {
    const icons = {
      0: 'bi-sun', 1: 'bi-cloud-sun', 2: 'bi-cloud', 3: 'bi-clouds',
      45: 'bi-cloud-fog', 48: 'bi-cloud-fog2', 51: 'bi-cloud-drizzle',
      61: 'bi-cloud-rain', 63: 'bi-cloud-rain-heavy', 71: 'bi-cloud-snow',
      95: 'bi-cloud-lightning'
    };
    return icons[code] || 'bi-cloud-sun';
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (langRef.current && !langRef.current.contains(event.target)) setIsLangOpen(false);
      if (userRef.current && !userRef.current.contains(event.target)) setIsUserOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="navbar-wrapper">
      {/* 1. TOP UTILITY BAR */}
      <div className="top-bar-laravel">
        <div className="top-bar-container">
          <div className="top-bar-left">
            {/* Live Weather dropdown selector */}
            <div className="weather-widget-laravel">
              <i className={`bi ${weatherIcon} text-blue fs-6`}></i>
              <span className="fw-bold">{weatherTemp} °C</span>

              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="weather-city-select-laravel"
              >
                <option value="Ashgabat">Ashgabat</option>
                <option value="Mary">Mary</option>
                <option value="Balkanabat">Balkanabat</option>
                <option value="Anew">Änew</option>
              </select>
              <i className="bi bi-caret-down-fill small opacity-50" style={{ fontSize: '0.6rem' }}></i>
            </div>

            {/* Dynamic system date */}
            <div className="date-widget-laravel d-none d-sm-block">
              <i className="bi bi-calendar-event text-blue pe-1"></i>
              <span>{currentDate}</span>
            </div>
          </div>

          <div className="top-bar-right">
            {/* Theme switcher */}
            <button className="theme-toggle-btn-laravel" onClick={toggleTheme}>
              <i className={`bi ${theme === 'light' ? 'bi-moon-stars-fill' : 'bi-sun-fill'}`}></i>
            </button>

            {/* Language dropdown switcher */}
            <div className="dropdown-laravel" ref={langRef}>
              <button className="dropdown-toggle-laravel" onClick={() => setIsLangOpen(!isLangOpen)}>
                <img
                  src={FLAG_ASSETS[language] || FLAG_ASSETS['tk']}
                  alt={FLAG_NAMES[language]}
                  width="22"
                  height="15"
                  className="rounded shadow-xs object-fit-cover border"
                />
              </button>

              {isLangOpen && (
                <ul className="dropdown-menu-laravel">
                  {Object.entries(FLAG_NAMES).map(([code, name]) => (
                    <li key={code} onClick={() => { changeLanguage(code); setIsLangOpen(false); }}>
                      <img src={FLAG_ASSETS[code]} width="20" height="14" className="border" alt={name} />
                      <span>{name}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <span className="divider">|</span>

            {/* User identification login text */}
            {user ? (
              <span className="text-brand fw-bold">
                {t('hi')}, {user.first_name}
              </span>
            ) : (
              <span className="text-brand fw-bold cursor-pointer" onClick={() => alert('Login redirected')}>
                {t('login_register')}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 2. MAIN NAV BAR */}
      <nav className="main-navbar-laravel">
        <div className="main-navbar-container">

          {/* Mobile Layout Row */}
          <div className="mobile-header-row">
            <a href="/" className="mobile-logo">OM</a>
            <div className="mobile-search">
              <input
                type="text"
                placeholder={t('search_placeholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="mobile-grid-btn" onClick={() => setIsMobileModalOpen(true)}>
              <i className="bi bi-grid-fill"></i>
            </button>
          </div>

          {/* Desktop Layout Row */}
          <div className="desktop-header-row">
            <a href="/" className="desktop-logo">ONLINE MARKET</a>

            <div className="desktop-search-container">
              <input
                type="text"
                placeholder={t('search_placeholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="desktop-search-input"
              />
              <span className="search-addon-icon">🔍</span>
            </div>

            <div className="desktop-actions">
              {/* Notification icon */}
              <i className="bi bi-bell icon-btn"></i>

              {/* User Dropdown */}
              <div className="dropdown-laravel" ref={userRef}>
                <button className="dropdown-toggle-laravel text-dark" onClick={() => setIsUserOpen(!isUserOpen)}>
                  <i className="bi bi-person icon-btn"></i>
                </button>

                {isUserOpen && (
                  <ul className="dropdown-menu-laravel user-menu">
                    {user ? (
                      <>
                        <li className="welcome-li">
                          <small className="text-muted">{t('welcome')},</small>
                          <span className="fw-bold d-block">{user.first_name} {user.last_name}</span>
                        </li>
                        {user.role === 'admin' && (
                          <li className="menu-item" onClick={() => setIsUserOpen(false)}>
                            <i className="bi bi-speedometer2 text-primary"></i> {t('admin_panel')}
                          </li>
                        )}
                        <li className="menu-item" onClick={() => setIsUserOpen(false)}>
                          <i className="bi bi-box-seam"></i> {t('my_orders')}
                        </li>
                        <li className="menu-item" onClick={() => setIsUserOpen(false)}>
                          <i className="bi bi-person-circle"></i> {t('my_profile')}
                        </li>
                        <li className="dropdown-divider-laravel"></li>
                        <li className="menu-item text-danger fw-bold" onClick={() => { setUser(null); setIsUserOpen(false); }}>
                          <i className="bi bi-box-arrow-right"></i> {t('logout')}
                        </li>
                      </>
                    ) : (
                      <>
                        <li className="menu-item fw-bold" onClick={() => { setUser({ first_name: "Demo", last_name: "User", role: "client" }); setIsUserOpen(false); }}>
                          <i className="bi bi-box-arrow-in-right"></i> {t('login')}
                        </li>
                        <li className="menu-item fw-bold" onClick={() => setIsUserOpen(false)}>
                          <i className="bi bi-person-plus"></i> {t('register')}
                        </li>
                      </>
                    )}
                  </ul>
                )}
              </div>

              {/* Shopping Cart Indicator */}
              <div className="cart-indicator">
                <i className="bi bi-bag icon-btn"></i>
              </div>

              {/* Favorites Badge */}
              <div className="favorites-indicator">
                <a href="#favorites" onClick={(e) => { e.preventDefault(); setActiveFilter('All'); }}>
                  <i className="bi bi-heart icon-btn"></i>
                </a>
                <span className="badge">{favoritesCount}</span>
              </div>
            </div>
          </div>

        </div>
      </nav>

      {/* 3. CATEGORIES BOTTOM NAVIGATION SUB-BAR (DESKTOP) */}
      <div className="categories-sub-nav-laravel d-none d-lg-block">
        <div className="categories-sub-nav-container">
          {navItems.map((item) => (
            <button
              key={item.category}
              className={`sub-nav-item-laravel ${activeFilter === item.category ? 'active' : ''}`}
              onClick={() => setActiveFilter(item.category)}
            >
              <i className={`bi bi-${item.icon} me-2`}></i>
              <span>{t(item.title)}</span>
            </button>
          ))}

          {/* {marketCategories.map((mCat) => (
            <button
              key={mCat.category}
              className={`sub-nav-item-laravel ${activeFilter === mCat.category ? 'active' : ''}`}
              onClick={() => setActiveFilter(mCat.category)}
            >
              {mCat.isSpecial ? (
                <div className="special-icon-badge">
                  <i className={`bi bi-${mCat.icon}`}></i>
                </div>
              ) : (
                <i className={`bi bi-${mCat.icon} me-2`}></i>
              )}
              <span>{t(mCat.title)}</span>
            </button>
          ))} */}

          <button className="sub-nav-item-laravel" onClick={() => setActiveFilter('All')}>
            <i className="bi bi-newspaper me-2"></i>
            <span>{t('messages.News')}</span>
          </button>
        </div>
      </div>

      {/* 4. MOBILE BOTTOM STICKY BAR */}
      <div className="mobile-bottom-bar">
        <button className="mobile-bar-item" onClick={() => setActiveFilter('All')}>
          <i className="bi bi-house-door"></i>
          <span>{t('home_page')}</span>
        </button>
        <button className="mobile-bar-item" onClick={() => setIsMobileModalOpen(true)}>
          <i className="bi bi-grid"></i>
          <span>{t('sections')}</span>
        </button>
        <button className="mobile-bar-item">
          <i className="bi bi-bag"></i>
          <span>{t('cart')}</span>
        </button>
        <button className="mobile-bar-item">
          <i className="bi bi-heart"></i>
          <span>{favoritesCount}</span>
        </button>
      </div>

      <CategoryModal
        isOpen={isMobileModalOpen}
        onClose={() => setIsMobileModalOpen(false)}
        navItems={navItems}
        marketCategories={marketCategories}
        onCategorySelect={setActiveFilter}
      />
    </div>
  );
}

export default Navbar;