import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import TourCard from './TourCard';

const TourSlider = ({ tours = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  // Ensure tours is an array
  const safeTours = Array.isArray(tours) ? tours : [];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === safeTours.length - 3 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? safeTours.length - 3 : prevIndex - 1
    );
  };

  const handleTourClick = (tour) => {
    // Navigate to tour details or payment page using React Router
    navigate(`/payment/${tour.id}`);
  };

  if (safeTours.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg">Hozircha sayohatlar mavjud emas</p>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Navigation Buttons */}
      {safeTours.length > 3 && (
        <>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-all duration-200"
          >
            <ChevronLeft className="h-6 w-6 text-gray-700" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-all duration-200"
          >
            <ChevronRight className="h-6 w-6 text-gray-700" />
          </motion.button>
        </>
      )}

      {/* Tours Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {safeTours.slice(currentIndex, currentIndex + 3).map((tour, index) => (
          <motion.div
            key={tour.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <TourCard 
              tour={tour} 
              onClick={handleTourClick}
            />
          </motion.div>
        ))}
      </div>

      {/* Dots Indicator */}
      {safeTours.length > 3 && (
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: Math.ceil(safeTours.length / 3) }, (_, i) => (
            <motion.button
              key={i}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              onClick={() => setCurrentIndex(i * 3)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                i === Math.floor(currentIndex / 3)
                  ? 'bg-blue-600'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TourSlider; 