import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Calendar, DollarSign, Star } from 'lucide-react';

const TourCard = ({ tour, onClick }) => {
  const navigate = useNavigate();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('uz-UZ', {
      style: 'currency',
      currency: 'UZS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('uz-UZ', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleCardClick = () => {
    if (onClick) {
      onClick(tour);
    } else {
      // Navigate to payment page using React Router
      navigate(`/payment/${tour.id}`);
    }
  };

  const handleButtonClick = (e) => {
    e.stopPropagation(); // Prevent card click event
    handleCardClick();
  };

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleCardClick}
      className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl"
    >
      {/* Image */}
      <div className="relative h-48 bg-gradient-to-br from-blue-400 to-purple-500">
        {tour.image ? (
          <img
            src={tour.image}
            alt={tour.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white text-2xl font-bold">
            {tour.title.charAt(0)}
          </div>
        )}
        
        {/* Price Badge */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
          <span className="text-blue-600 font-bold text-sm">
            {formatPrice(tour.price)}
          </span>
        </div>

        {/* Duration Badge */}
        <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full">
          <span className="text-sm font-semibold">
            {tour.duration} kun
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
          {tour.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {tour.description}
        </p>

        {/* Location */}
        <div className="flex items-center mb-3">
          <MapPin className="h-4 w-4 text-gray-400 mr-2" />
          <span className="text-gray-700 text-sm">{tour.location}</span>
        </div>

        {/* Dates */}
        <div className="flex items-center mb-4">
          <Calendar className="h-4 w-4 text-gray-400 mr-2" />
          <span className="text-gray-700 text-sm">
            {formatDate(tour.start_date)} - {formatDate(tour.end_date)}
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <DollarSign className="h-4 w-4 text-green-600 mr-1" />
            <span className="text-green-600 font-bold text-lg">
              {formatPrice(tour.price)}
            </span>
          </div>

          {/* Rating */}
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-gray-600 text-sm ml-1">4.8</span>
          </div>
        </div>

        {/* Book Now Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleButtonClick}
          className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
        >
          Hozir bron qilish
        </motion.button>
      </div>
    </motion.div>
  );
};

export default TourCard; 