import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';

function StoryModal({ story, onClose }) {
    const { t } = useLanguage();
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const [progress, setProgress] = useState(0);

    const duration = 5000; // 5 seconds per story slide
    const intervalStep = 50;

    useEffect(() => {
        setProgress(0);
    }, [currentSlideIndex]);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    if (currentSlideIndex < story.slides.length - 1) {
                        setCurrentSlideIndex((prevIndex) => prevIndex + 1);
                    } else {
                        onClose();
                    }
                    return 0;
                }
                return prev + (intervalStep / duration) * 100;
            });
        }, intervalStep);

        return () => clearInterval(timer);
    }, [currentSlideIndex, story.slides.length, onClose]);

    const handleNext = () => {
        if (currentSlideIndex < story.slides.length - 1) {
            setCurrentSlideIndex(currentSlideIndex + 1);
        } else {
            onClose();
        }
    };

    const handlePrev = () => {
        if (currentSlideIndex > 0) {
            setCurrentSlideIndex(currentSlideIndex - 1);
        }
    };

    return (
        <div className="story-modal-overlay" onClick={onClose}>
            <div className="story-modal-content" onClick={(e) => e.stopPropagation()}>

                {/* Dynamic Progress Bars */}
                <div className="story-progress-container">
                    {story.slides.map((_, index) => (
                        <div key={index} className="story-progress-bar-bg">
                            <div
                                className="story-progress-bar-fill"
                                style={{
                                    width: index < currentSlideIndex
                                        ? '100%'
                                        : index === currentSlideIndex
                                            ? `${progress}%`
                                            : '0%'
                                }}
                            />
                        </div>
                    ))}
                </div>

                {/* Modal Header */}
                <div className="story-modal-header">
                    <div className="story-modal-shop-info">
                        <img src={story.avatar} alt={story.shopName} className="story-modal-avatar" />
                        <span className="story-modal-shop-name">{story.shopName}</span>
                    </div>
                    <button className="story-modal-close" onClick={onClose}>✕</button>
                </div>

                {/* Image Content container */}
                <div className="story-modal-body">
                    <button
                        className="story-nav-btn prev"
                        onClick={handlePrev}
                        disabled={currentSlideIndex === 0}
                    >
                        ◀
                    </button>

                    <img
                        src={story.slides[currentSlideIndex]}
                        alt={`Slide ${currentSlideIndex + 1}`}
                        className="story-modal-image"
                    />

                    <button className="story-nav-btn next" onClick={handleNext}>
                        ▶
                    </button>
                </div>

            </div>
        </div>
    );
}

export default StoryModal;