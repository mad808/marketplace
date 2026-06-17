import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import googlePlay from '../../assets/img/icons/googleplay.png';
import appStore from '../../assets/img/icons/appstore.png';

function Footer() {
    const { t } = useLanguage();

    // Navigation link arrays corresponding to your Blade data
    const quickLinks = [
        { label: 'messages.Products', category: 'All' },
        { label: 'messages.Cars', category: 'Cars' },
        { label: 'messages.CarParts', category: 'Car Parts' },
        { label: 'messages.Ads', category: 'Products' },
        { label: 'messages.Vacancies', category: 'Vacancies' }
    ];

    const marketCategories = [
        { name: 'Dükanlar', category: 'Shops' },
        { name: 'Restoranlar', category: 'Restaurants' },
        { name: 'Hyzmatlar', category: 'Services' }
    ];

    return (
        <footer className="footer-laravel">
            <div className="footer-container">
                <div className="footer-grid">

                    {/* 1. Branding logo, Descriptions & Download badges */}
                    <div className="footer-column col-large">
                        <h5 className="footer-brand-logo">ONLINE MARKET</h5>
                        <p className="footer-description-text">
                            {t('messages.DefaultFooterText')}
                        </p>

                        {/* Social media connections */}
                        <div className="footer-social-wrapper">
                            <a href="https://instagram.com" className="social-link-item" target="_blank" rel="noopener noreferrer">
                                <i className="bi bi-instagram"></i>
                            </a>
                            <a href="https://facebook.com" className="social-link-item" target="_blank" rel="noopener noreferrer">
                                <i className="bi bi-facebook"></i>
                            </a>
                            <a href="https://telegram.me" className="social-link-item" target="_blank" rel="noopener noreferrer">
                                <i className="bi bi-telegram"></i>
                            </a>
                            <a href="https://tiktok.com" className="social-link-item" target="_blank" rel="noopener noreferrer">
                                <i className="bi bi-tiktok"></i>
                            </a>
                        </div>

                        {/* Platform download badges */}
                        <div className="footer-badges-wrapper">
                            <a href="#download" target="_blank" rel="noreferrer">
                                <img src={googlePlay} alt="Google Play Store" className="app-badge-image" />
                            </a>
                            <a href="#download" target="_blank" rel="noreferrer">
                                <img src={appStore} alt="Apple App Store" className="app-badge-image" />
                            </a>
                        </div>
                    </div>

                    {/* 2. Quick Links Section */}
                    <div className="footer-column">
                        <h6 className="footer-header-text">{t('messages.QuickLinks')}</h6>
                        <ul className="footer-link-list">
                            {quickLinks.map((link) => (
                                <li key={link.label}>
                                    <a href={`#${link.category}`} className="footer-link-anchor">
                                        {t(link.label)}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* 3. Shop Dynamic Categories */}
                    <div className="footer-column">
                        <h6 className="footer-header-text">{t('messages.Market categories')}</h6>
                        <ul className="footer-link-list">
                            {marketCategories.map((mCat) => (
                                <li key={mCat.category}>
                                    <a href={`#${mCat.category}`} className="footer-link-anchor">
                                        {mCat.name}
                                    </a>
                                </li>
                            ))}
                            <li className="mt-brand-link">
                                <a href="#Brands" className="footer-link-anchor">
                                    {t('messages.Brands')}
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* 4. Support Contact Coordinates */}
                    <div className="footer-column">
                        <h6 className="footer-header-text">{t('messages.ContactInfo')}</h6>
                        <ul className="footer-contact-list">
                            <li className="contact-list-item">
                                <i className="bi bi-telephone-fill text-blue contact-icon"></i>
                                <div>
                                    <small className="contact-label-text">{t('messages.Phone')}</small>
                                    <a href="tel:+99362240774" className="contact-value-anchor">
                                        +993 62 240774
                                    </a>
                                </div>
                            </li>

                            <li className="contact-list-item">
                                <i className="bi bi-envelope-fill text-blue contact-icon"></i>
                                <div>
                                    <small className="contact-label-text">{t('messages.Email')}</small>
                                    <a href="mailto:info@market.com" className="contact-value-anchor">
                                        info@market.com
                                    </a>
                                </div>
                            </li>

                            <li className="contact-list-item">
                                <i className="bi bi-geo-alt-fill text-blue contact-icon"></i>
                                <div>
                                    <small className="contact-label-text">{t('messages.Address')}</small>
                                    <span className="contact-value-span">
                                        Ashgabat, Turkmenistan
                                    </span>
                                </div>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>

            {/* Footer Bottom copyright area */}
            <div className="footer-bottom-bar">
                <div className="footer-bottom-container">
                    <span className="footer-copyright-text">
                        Copyright © 2026 Online Market | Powered by Sopyyev Abdyleziz
                    </span>
                </div>
            </div>
        </footer>
    );
}

export default Footer;