import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import StoryModal from './StoryModal';

const MOCK_STORIES = [
    {
        id: 1,
        shopName: "Kamil Motors",
        avatar: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=100",
        slides: [
            "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&q=80&w=600",
            "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=600"
        ]
    },
    {
        id: 2,
        shopName: "Ynamly Ulag",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100",
        slides: [
            "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=600"
        ]
    },
    {
        id: 3,
        shopName: "Sumbar Computer",
        avatar: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=100",
        slides: [
            "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=600",
            "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=600"
        ]
    }
];

function Stories() {
    const { t } = useLanguage();
    const [activeStory, setActiveStory] = useState(null);

    return (
        <div className="stories-section">
            <h3 className="stories-header">{t('stories_title')}</h3>
            <div className="stories-container">
                {MOCK_STORIES.map((story) => (
                    <div
                        key={story.id}
                        className="story-circle-wrapper"
                        onClick={() => setActiveStory(story)}
                    >
                        <div className="story-ring">
                            <img src={story.avatar} alt={story.shopName} className="story-avatar" />
                        </div>
                        <span className="story-shop-name">{story.shopName}</span>
                    </div>
                ))}
            </div>

            {activeStory && (
                <StoryModal
                    story={activeStory}
                    onClose={() => setActiveStory(null)}
                />
            )}
        </div>
    );
}

export default Stories;