import React, { useState, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';

function YoutubeStyleCard({ item, onToggleFavorite, isFavorite }) {
    const { t } = useLanguage(); // <-- Consume context
    const [isHovered, setIsHovered] = useState(false);
    const videoRef = useRef(null);

    const handleMouseEnter = () => {
        setIsHovered(true);
        if (videoRef.current) {
            videoRef.current.play().catch(() => { });
        }
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
    };

    return (
        <div
            className="yt-card"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="yt-media-container">
                <img
                    src={item.image}
                    alt={item.title}
                    className="yt-thumbnail"
                    style={{ opacity: isHovered && item.video ? 0 : 1 }}
                />

                {item.video && (
                    <video
                        ref={videoRef}
                        src={item.video}
                        className="yt-video-preview"
                        muted
                        loop
                        playsInline
                        style={{ opacity: isHovered ? 1 : 0 }}
                    />
                )}

                {item.isVip && <span className="vip-badge">{t('vip')}</span>}
                <span className="duration-badge">{item.year ? item.year : t(item.categoryKey)}</span>
            </div>

            <div className="yt-card-body">
                <div className="yt-shop-avatar-container">
                    <img src={item.shopLogo} alt={item.shopName} className="yt-shop-avatar" />
                </div>

                <div className="yt-info">
                    <h4 className="yt-title">{item.title}</h4>

                    <div className="yt-metadata">
                        <span className="yt-shop-name">{item.shopName}</span>
                        <span className="bullet">•</span>
                        <span className="yt-views">{item.views.toLocaleString()} {t('views')}</span>
                    </div>

                    <div className="yt-location-price">
                        <span className="yt-price">{item.price.toLocaleString()} {t('currency')}</span>
                        <span className="yt-location">📍 {t(`location_${item.location.toLowerCase()}`)}</span>
                    </div>

                    <button
                        className={`yt-fav-btn ${isFavorite ? 'liked' : ''}`}
                        onClick={(e) => {
                            e.stopPropagation();
                            onToggleFavorite(item.id);
                        }}
                    >
                        {isFavorite ? '❤️' : '🤍'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default YoutubeStyleCard;