import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Star, ArrowRight, MapPin } from 'lucide-react';
import { Tour } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface TourCardProps {
  tour: Tour;
  index?: number;
  onCardClick?: (tour: Tour) => void;
}

const TourCard: React.FC<TourCardProps> = ({ tour, index = 0, onCardClick }) => {
  const { t } = useLanguage();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('uz-UZ').format(price) + ' UZS';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden group"
    >
      <div 
        className="relative h-48 overflow-hidden cursor-pointer"
        onClick={() => onCardClick?.(tour)}
      >
        <img
          src={tour.image}
          alt={tour.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-white bg-opacity-90 px-3 py-1 rounded-full">
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-500 fill-current" />
            <span className="text-sm font-semibold">{tour.rating}</span>
          </div>
        </div>
        <div className="absolute bottom-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
          {t(tour.category.toLowerCase())}
        </div>
      </div>

      <div 
        className="p-6 cursor-pointer"
        onClick={() => onCardClick?.(tour)}
      >
        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
          {tour.name}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{tour.description}</p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-500 text-sm">
            <MapPin className="h-4 w-4 mr-2 text-blue-500" />
            {tour.destination}
          </div>
          <div className="flex items-center text-gray-500 text-sm">
            <Clock className="h-4 w-4 mr-2 text-blue-500" />
            {tour.duration}
          </div>
          <div className="flex items-center text-gray-500 text-sm">
            <Calendar className="h-4 w-4 mr-2 text-blue-500" />
            {new Date(tour.startDate).toLocaleDateString()}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-blue-600">{formatPrice(tour.price)}</span>
            <span className="text-gray-500 text-sm ml-1">{t('perPerson')}</span>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              onCardClick?.(tour);
            }}
            className="bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white px-6 py-2 rounded-full font-medium flex items-center gap-2 transition-all duration-300 shadow-lg"
          >
            {t('select')}
            <ArrowRight className="h-4 w-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default TourCard;