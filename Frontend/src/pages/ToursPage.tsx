import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import TourCard from '../components/TourCard';
import FilterPanel from '../components/FilterPanel';
import TourDetailsModal from '../components/TourDetailsModal';
import { tours } from '../data/tours';
import { Tour } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

const ToursPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000000]);
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useLanguage();

  const filteredTours = useMemo(() => {
    return tours.filter(tour => {
      const matchesSearch = tour.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          tour.destination.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || tour.category === selectedCategory;
      const matchesPrice = tour.price >= priceRange[0] && tour.price <= priceRange[1];
      
      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [searchTerm, selectedCategory, priceRange]);

  const handleTourClick = (tour: Tour) => {
    setSelectedTour(tour);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTour(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            {t('exploreTours')} <span className="text-blue-600">{t('tourPackages')}</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from our carefully curated selection of tours designed to create unforgettable experiences
          </p>
        </motion.div>

        {/* Filter Panel */}
        <FilterPanel
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
        />

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-6"
        >
          <p className="text-gray-600">
            {t('showing')} <span className="font-semibold">{filteredTours.length}</span> {filteredTours.length !== 1 ? t('tours') : t('tour')}
          </p>
        </motion.div>

        {/* Tour Grid */}
        {filteredTours.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-16">
            {filteredTours.map((tour, index) => (
              <TourCard key={tour.id} tour={tour} index={index} onCardClick={handleTourClick} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">🏝️</div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">{t('noToursFound')}</h3>
            <p className="text-gray-600">{t('adjustFilters')}</p>
          </motion.div>
        )}
        
        <TourDetailsModal 
          tour={selectedTour}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </div>
    </div>
  );
};

export default ToursPage;