import React, { useState, useEffect } from 'react';
import banner1 from '../../assets/img/sliders/1.jpg';
import banner2 from '../../assets/img/sliders/2.jpg';
import banner3 from '../../assets/img/sliders/3.jpg';
import banner4 from '../../assets/img/sliders/4.jpg';

const BANNERS = [banner1, banner2, banner3, banner4];

function BannerSlider() {
    const [currentIdx, setCurrentIdx] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        if (isPaused) return;

        // Slide auto-rotation interval
        const interval = setInterval(() => {
            setCurrentIdx((prev) => (prev + 1) % BANNERS.length);
        }, 4500); // Transitions slide every 4.5 seconds

        return () => clearInterval(interval);
    }, [isPaused]);

    const handleNext = () => {
        setCurrentIdx((prev) => (prev + 1) % BANNERS.length);
    };

    const handlePrev = () => {
        setCurrentIdx((prev) => (prev - 1 + BANNERS.length) % BANNERS.length);
    };

    return (
        <div
            className="banner-slider-container"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Left Navigation Arrow */}
            <button className="slider-arrow prev" onClick={handlePrev} aria-label="Previous slide">
                <i className="bi bi-chevron-left"></i>
            </button>

            {/* Main viewport slides wrapper */}
            <div className="slider-viewport">
                {BANNERS.map((banner, index) => (
                    <div
                        key={index}
                        className={`slider-slide ${index === currentIdx ? 'active' : ''}`}
                        style={{
                            backgroundImage: `url(${banner})`,
                            transform: `translateX(${(index - currentIdx) * 100}%)`
                        }}
                    />
                ))}
            </div>

            {/* Right Navigation Arrow */}
            <button className="slider-arrow next" onClick={handleNext} aria-label="Next slide">
                <i className="bi bi-chevron-right"></i>
            </button>

            {/* Navigation Dot Indicators */}
            <div className="slider-dots">
                {BANNERS.map((_, index) => (
                    <button
                        key={index}
                        className={`slider-dot ${index === currentIdx ? 'active' : ''}`}
                        onClick={() => setCurrentIdx(index)}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}

export default BannerSlider;