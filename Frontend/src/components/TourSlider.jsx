import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import TourCard from './TourCard';
import { useLanguage } from '../contexts/LanguageContext';

const TourSlider = ({ tours, title, onTourClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(1);
  const { t } = useLanguage();

  useEffect(() => {
    const updateVisibleCards = () => {
      if (window.innerWidth >= 1024) {
        setVisibleCards(3);
      } else if (window.innerWidth >= 768) {
        setVisibleCards(2);
      } else {
        setVisibleCards(1);
      }
    };

    updateVisibleCards();
    window.addEventListener('resize', updateVisibleCards);
    return () => window.removeEventListener('resize', updateVisibleCards);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => 
      prev + visibleCards >= tours.length ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? Math.max(0, tours.length - visibleCards) : prev - 1
    );
  };

  const visibleTours = tours.slice(currentIndex, currentIndex + visibleCards);

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-gray-800 mb-4"
          >
            {title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            Discover our most popular destinations and create memories that will last a lifetime
          </motion.p>
        </div>

        <div className="relative">
          {/* Navigation Buttons */}
          {tours.length > visibleCards && (
            <>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={prevSlide}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-blue-50 transition-colors"
              >
                <ChevronLeft className="h-6 w-6 text-gray-600" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={nextSlide}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-blue-50 transition-colors"
              >
                <ChevronRight className="h-6 w-6 text-gray-600" />
              </motion.button>
            </>
          )}

          {/* Tour Cards */}
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {visibleTours.map((tour, index) => (
                  <TourCard key={tour.id} tour={tour} index={index} onCardClick={onTourClick} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots Indicator */}
          {tours.length > visibleCards && (
            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: Math.ceil(tours.length / visibleCards) }).map((_, index) => {
                const isActive = Math.floor(currentIndex / visibleCards) === index;
                return (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index * visibleCards)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      isActive ? 'bg-blue-600 w-8' : 'bg-gray-300'
                    }`}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TourSlider; 