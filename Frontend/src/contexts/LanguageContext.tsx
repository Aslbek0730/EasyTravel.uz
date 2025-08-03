import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Language, LanguageContextType } from '../types';

const translations = {
  en: {
    // Navigation
    home: 'Home',
    tours: 'Tours',
    about: 'About Us',
    contact: 'Contact',
    
    // Hero Banner
    heroTitle: 'Discover Your Next',
    heroTitleAccent: 'Adventure',
    heroSubtitle: 'Explore breathtaking destinations with expertly crafted tours designed for unforgettable experiences',
    viewDestinations: 'View Destinations',
    planTrip: 'Plan Your Trip',
    rating: 'Rating',
    happyTravelers: 'Happy Travelers',
    yearsExperience: 'Years Experience',
    
    // Features
    whyChoose: 'Why Choose WonderTravel?',
    safeSecure: 'Safe & Secure',
    safeSecureDesc: 'Your safety is our priority with fully insured tours and experienced guides',
    support247: '24/7 Support',
    support247Desc: 'Round-the-clock customer support to assist you before, during, and after your trip',
    happyClients: '5000+ Happy Clients',
    happyClientsDesc: 'Join thousands of satisfied travelers who have experienced our exceptional service',
    
    // Tours
    trendingDestinations: 'Trending Destinations',
    exploreTours: 'Explore Our',
    tourPackages: 'Tour Packages',
    filterTours: 'Filter Tours',
    searchDestinations: 'Search destinations...',
    allPrices: 'All Prices',
    clearAll: 'Clear All',
    showing: 'Showing',
    tours: 'tours',
    tour: 'tour',
    noToursFound: 'No tours found',
    adjustFilters: 'Try adjusting your filters to see more results',
    select: 'Select',
    perPerson: 'per person',
    
    // Tour Details Modal
    tourDetails: 'Tour Details',
    destination: 'Destination',
    duration: 'Duration',
    startDate: 'Start Date',
    category: 'Category',
    included: 'What\'s Included',
    location: 'Location',
    bookNow: 'Book Now',
    close: 'Close',
    
    // Categories
    cultural: 'Cultural',
    adventure: 'Adventure',
    leisure: 'Leisure',
    all: 'All',
    
    // Common
    loading: 'Loading...',
    error: 'Error',
    success: 'Success'
  },
  ru: {
    // Navigation
    home: 'Главная',
    tours: 'Туры',
    about: 'О нас',
    contact: 'Контакты',
    
    // Hero Banner
    heroTitle: 'Откройте для себя',
    heroTitleAccent: 'Приключение',
    heroSubtitle: 'Исследуйте захватывающие дух направления с экспертно разработанными турами для незабываемых впечатлений',
    viewDestinations: 'Посмотреть направления',
    planTrip: 'Планировать поездку',
    rating: 'Рейтинг',
    happyTravelers: 'Довольных путешественников',
    yearsExperience: 'Лет опыта',
    
    // Features
    whyChoose: 'Почему выбирают WonderTravel?',
    safeSecure: 'Безопасно и надежно',
    safeSecureDesc: 'Ваша безопасность - наш приоритет с полностью застрахованными турами и опытными гидами',
    support247: 'Поддержка 24/7',
    support247Desc: 'Круглосуточная поддержка клиентов для помощи до, во время и после вашей поездки',
    happyClients: '5000+ довольных клиентов',
    happyClientsDesc: 'Присоединяйтесь к тысячам довольных путешественников, которые испытали наш исключительный сервис',
    
    // Tours
    trendingDestinations: 'Популярные направления',
    exploreTours: 'Изучите наши',
    tourPackages: 'Туристические пакеты',
    filterTours: 'Фильтр туров',
    searchDestinations: 'Поиск направлений...',
    allPrices: 'Все цены',
    clearAll: 'Очистить все',
    showing: 'Показано',
    tours: 'туров',
    tour: 'тур',
    noToursFound: 'Туры не найдены',
    adjustFilters: 'Попробуйте изменить фильтры для получения большего количества результатов',
    select: 'Выбрать',
    perPerson: 'за человека',
    
    // Tour Details Modal
    tourDetails: 'Детали тура',
    destination: 'Направление',
    duration: 'Продолжительность',
    startDate: 'Дата начала',
    category: 'Категория',
    included: 'Что включено',
    location: 'Местоположение',
    bookNow: 'Забронировать',
    close: 'Закрыть',
    
    // Categories
    cultural: 'Культурный',
    adventure: 'Приключения',
    leisure: 'Отдых',
    all: 'Все',
    
    // Common
    loading: 'Загрузка...',
    error: 'Ошибка',
    success: 'Успех'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};