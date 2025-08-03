import React, { useState } from 'react';
import HeroBanner from '../components/HeroBanner';
import FeatureCards from '../components/FeatureCards';
import TourSlider from '../components/TourSlider';
import TourDetailsModal from '../components/TourDetailsModal';
import { featuredTours } from '../data/tours';
import { Tour } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

const HomePage: React.FC = () => {
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useLanguage();

  const handleTourClick = (tour: Tour) => {
    setSelectedTour(tour);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTour(null);
  };

  return (
    <div className="min-h-screen">
      <HeroBanner />
      <FeatureCards />
      <TourSlider 
        tours={featuredTours} 
        title={t('trendingDestinations')} 
        onTourClick={handleTourClick}
      />
      <TourDetailsModal 
        tour={selectedTour}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default HomePage;