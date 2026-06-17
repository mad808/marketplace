import React, { createContext, useState, useContext } from 'react';
import { en } from '../locales/en';
import { ru } from '../locales/ru';
import { tk } from '../locales/tk';

const translations = { en, ru, tk };

const fallbackTranslations = {
    tk: {
        stories_title: "Aktiw dükanlar",
        currency: "TMT",
        location_ashgabat: "Aşgabat",
        location_mary: "Mary",
        location_balkanabat: "Balkanabat",
        location_anew: "Änew",
        vip: "VIP",
        views: "görüş",
        close: "Ýap",
        filter_all: "Ählisi",
        filter_cars: "Ulaglar",
        filter_parts: "Ulag şaýlary",
        filter_products: "Harytlar",
    },
    ru: {
        stories_title: "Активные магазины",
        currency: "TMT",
        location_ashgabat: "Ашхабад",
        location_mary: "Мары",
        location_balkanabat: "Балканабат",
        location_anew: "Анев",
        vip: "VIP",
        views: "просмотров",
        close: "Закрыть",
        filter_all: "Все",
        filter_cars: "Машины",
        filter_parts: "Автозапчасти",
        filter_products: "Товары",
    },
    en: {
        stories_title: "Active Shops",
        currency: "TMT",
        location_ashgabat: "Ashgabat",
        location_mary: "Mary",
        location_balkanabat: "Balkanabat",
        location_anew: "Anew",
        vip: "VIP",
        views: "views",
        close: "Close",
        filter_all: "All",
        filter_cars: "Cars",
        filter_parts: "Car Parts",
        filter_products: "Products",
    }
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
    const getInitialLanguage = () => {
        const saved = localStorage.getItem('appLanguage');
        if (saved && ['en', 'ru', 'tk'].includes(saved)) return saved;
        return 'tk';
    };

    const [language, setLanguage] = useState(getInitialLanguage);

    const changeLanguage = (lang) => {
        setLanguage(lang);
        localStorage.setItem('appLanguage', lang);
    };

    const t = (key) => {
        // 1. Try importing from external js file
        const dictionary = translations[language] || translations['tk'] || {};
        if (dictionary[key]) return dictionary[key];

        // 2. Try falling back to local embed list
        const fallbackDict = fallbackTranslations[language] || fallbackTranslations['tk'] || {};
        return fallbackDict[key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, changeLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    return useContext(LanguageContext);
}