import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

function CategoryModal({ isOpen, onClose, navItems, marketCategories, onCategorySelect }) {
    const { t } = useLanguage();

    if (!isOpen) return null;

    const getIconForCategory = (slug) => {
        if (slug.includes('restoran') || slug.includes('restaurant')) return 'egg-fried';
        if (slug.includes('hyzmat') || slug.includes('service')) return 'tools';
        return 'shop';
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="mobile-modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="mobile-modal-header">
                    <h5>{t('stories_title')} / {t('filter_all')}</h5>
                    <button className="btn-close" onClick={onClose}>✕</button>
                </div>

                <div className="mobile-modal-body">
                    <div className="modal-grid">
                        {/* Standard Nav Items */}
                        {navItems.map((item) => (
                            <div key={item.title} className="modal-grid-item" onClick={() => { onCategorySelect(item.category); onClose(); }}>
                                <i className={`bi bi-${item.icon} fs-large`}></i>
                                <span>{t(item.title)}</span>
                            </div>
                        ))}

                        {/* Dynamic Market Categories */}
                        {marketCategories.map((mCat) => (
                            <div key={mCat.slug} className="modal-grid-item" onClick={() => { onCategorySelect(mCat.category); onClose(); }}>
                                <i className={`bi bi-${getIconForCategory(mCat.slug)} fs-large`}></i>
                                <span>{mCat.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CategoryModal;