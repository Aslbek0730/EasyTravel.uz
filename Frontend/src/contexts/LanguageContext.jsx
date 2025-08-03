import React, { createContext, useContext, useState } from 'react';

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
    whyChoose: 'Why Choose TourismTravel?',
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
    whyChoose: 'Почему выбирают TourismTravel?',
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
  },
  uz: {
    // Navigation
    home: 'Bosh sahifa',
    tours: 'Turlar',
    about: 'Biz haqida',
    contact: 'Aloqa',
    
    // Hero Banner
    heroTitle: 'Keyingi',
    heroTitleAccent: 'Sarguzashtingizni',
    heroSubtitle: 'Kashf eting - unutilmas xotiralar uchun mo\'ljallangan professional sayohatlar bilan ajoyib manzillarni kashf eting',
    viewDestinations: 'Manzillarni ko\'rish',
    planTrip: 'Sayohatingizni rejalashtiring',
    rating: 'Reyting',
    happyTravelers: 'Baxtli sayohatchilar',
    yearsExperience: 'Yillik tajriba',
    
    // Features
    whyChoose: 'Nima uchun TourismTravel?',
    safeSecure: 'Xavfsiz va ishonchli',
    safeSecureDesc: 'Sizning xavfsizligingiz bizning ustuvorligimiz - to\'liq sug\'urtalangan turlar va tajribali yo\'riqchilar',
    support247: '24/7 qo\'llab-quvvatlash',
    support247Desc: 'Sayohatingizdan oldin, davomida va keyin yordam berish uchun kun bo\'yi mijozlarga xizmat',
    happyClients: '5000+ baxtli mijozlar',
    happyClientsDesc: 'Bizning ajoyib xizmatimizni boshidan kechirgan minglab mamnun sayohatchilar qatoriga qo\'shiling',
    
    // Tours
    trendingDestinations: 'Trend manzillar',
    exploreTours: 'Bizning',
    tourPackages: 'Tur paketlarimizni',
    filterTours: 'Turlarni filtrlash',
    searchDestinations: 'Manzillarni qidirish...',
    allPrices: 'Barcha narxlar',
    clearAll: 'Hammasini tozalash',
    showing: 'Ko\'rsatilmoqda',
    tour: 'tur',
    noToursFound: 'Turlar topilmadi',
    adjustFilters: 'Ko\'proq natijalarni ko\'rish uchun filtrlaringizni sozlashga harakat qiling',
    select: 'Tanlash',
    perPerson: 'kishiga',
    
    // Tour Details Modal
    tourDetails: 'Tur tafsilotlari',
    destination: 'Manzil',
    duration: 'Davomiyligi',
    startDate: 'Boshlanish sanasi',
    category: 'Kategoriya',
    included: 'Nima kiritilgan',
    location: 'Joylashuv',
    bookNow: 'Hozir bron qiling',
    close: 'Yopish',
    
    // Categories
    cultural: 'Madaniy',
    adventure: 'Sarguzasht',
    leisure: 'Dam olish',
    all: 'Hammasi',
    
    // Common
    loading: 'Yuklanmoqda...',
    error: 'Xato',
    success: 'Muvaffaqiyatli'
  }
};

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('uz');

  const t = (key) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}; 