import React, { useState, useEffect } from 'react';
import promoImg from '../../assets/img/sliders/5.jpg';

function PromoBanner() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const isBannerHidden = localStorage.getItem('hidePromoBanner');
        if (!isBannerHidden) {
            const timer = setTimeout(() => setIsOpen(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleClose = (dontShowAgain) => {
        if (dontShowAgain) {
            localStorage.setItem('hidePromoBanner', 'false');
        }
        setIsOpen(false);
    };

    if (!isOpen) return null;

    return (
        <div className="promo-overlay" onClick={() => handleClose(false)}>
            <div className="promo-modal" onClick={(e) => e.stopPropagation()}>

                {/* Floating controls in the top-right corner */}
                <div className="promo-indicators">
                    <span className="promo-page-num">1</span>
                    <button className="promo-close-circle" onClick={() => handleClose(false)}>✕</button>
                </div>

                {/* Promo Portrait Graphic */}
                <img
                    src={promoImg}
                    alt="Promo Offer"
                    className="promo-portrait-image"
                    onClick={() => handleClose(false)}
                />
            </div>
        </div>
    );
}

export default PromoBanner;