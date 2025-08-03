import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Calendar, Clock, Star, ChevronLeft, ChevronRight, Users } from 'lucide-react';
import { Tour } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { Link } from 'react-router-dom';

interface TourDetailsModalProps {
  tour: Tour | null;
  isOpen: boolean;
  onClose: () => void;
}

const TourDetailsModal: React.FC<TourDetailsModalProps> = ({ tour, isOpen, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { t } = useLanguage();

  if (!tour) return null;

  // Create multiple images for the slider (in a real app, these would come from the tour data)
  const images = [
    tour.image,
    'https://images.pexels.com/photos/2832039/pexels-photo-2832039.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=800'
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('uz-UZ').format(price) + ' UZS';
  };

  const getLocationInfo = (destination: string) => {
    const locationMap: { [key: string]: { country: string; region: string; coordinates: string } } = {
      'Tashkent - Bukhara - Khiva': {
        country: 'Uzbekistan',
        region: 'Central Asia',
        coordinates: '41.2995° N, 69.2401° E'
      },
      'Chimgan Mountains': {
        country: 'Uzbekistan',
        region: 'Tashkent Region',
        coordinates: '41.5833° N, 70.0167° E'
      },
      'Kyzylkum Desert': {
        country: 'Uzbekistan',
        region: 'Central Uzbekistan',
        coordinates: '42.0000° N, 63.0000° E'
      },
      'Samarkand - Shakhrisabz': {
        country: 'Uzbekistan',
        region: 'Samarkand Region',
        coordinates: '39.6270° N, 66.9750° E'
      },
      'Aydarkul Lake': {
        country: 'Uzbekistan',
        region: 'Navoi Region',
        coordinates: '40.5000° N, 65.5000° E'
      },
      'Tashkent City Tour': {
        country: 'Uzbekistan',
        region: 'Tashkent Region',
        coordinates: '41.2995° N, 69.2401° E'
      }
    };

    return locationMap[destination] || {
      country: 'Uzbekistan',
      region: 'Central Asia',
      coordinates: '41.2995° N, 69.2401° E'
    };
  };

  const locationInfo = getLocationInfo(tour.destination);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 bg-white bg-opacity-90 hover:bg-opacity-100 p-2 rounded-full transition-all duration-200"
              >
                <X className="h-5 w-5 text-gray-600" />
              </button>

              {/* Image Slider */}
              <div className="relative h-80 overflow-hidden rounded-t-2xl">
                <motion.img
                  key={currentImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  src={images[currentImageIndex]}
                  alt={tour.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Navigation Buttons */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full transition-all duration-200"
                >
                  <ChevronLeft className="h-5 w-5 text-gray-600" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full transition-all duration-200"
                >
                  <ChevronRight className="h-5 w-5 text-gray-600" />
                </button>

                {/* Image Indicators */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-200 ${
                        index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                      }`}
                    />
                  ))}
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {t(tour.category.toLowerCase())}
                </div>

                {/* Rating Badge */}
                <div className="absolute top-4 left-20 bg-white bg-opacity-90 px-3 py-1 rounded-full">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-semibold">{tour.rating}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Info */}
                <div className="lg:col-span-2">
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">{tour.name}</h2>
                  <p className="text-gray-600 mb-6 leading-relaxed">{tour.description}</p>

                  {/* Tour Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-5 w-5 text-blue-500" />
                      <div>
                        <span className="text-sm text-gray-500">{t('destination')}</span>
                        <p className="font-medium">{tour.destination}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="h-5 w-5 text-blue-500" />
                      <div>
                        <span className="text-sm text-gray-500">{t('duration')}</span>
                        <p className="font-medium">{tour.duration}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-blue-500" />
                      <div>
                        <span className="text-sm text-gray-500">{t('startDate')}</span>
                        <p className="font-medium">{new Date(tour.startDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Users className="h-5 w-5 text-blue-500" />
                      <div>
                        <span className="text-sm text-gray-500">{t('category')}</span>
                        <p className="font-medium">{t(tour.category.toLowerCase())}</p>
                      </div>
                    </div>
                  </div>

                  {/* What's Included */}
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">{t('included')}</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {tour.included.map((item, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-gray-600">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Location Information */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">{t('location')}</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Country:</span>
                        <span className="font-medium">{locationInfo.country}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Region:</span>
                        <span className="font-medium">{locationInfo.region}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Coordinates:</span>
                        <span className="font-medium font-mono text-sm">{locationInfo.coordinates}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Booking Card */}
                <div className="lg:col-span-1">
                  <div className="bg-gradient-to-br from-blue-50 to-sky-50 rounded-2xl p-6 sticky top-4">
                    <div className="text-center mb-6">
                      <div className="text-3xl font-bold text-blue-600 mb-2">
                        {formatPrice(tour.price)}
                      </div>
                      <div className="text-gray-600">{t('perPerson')}</div>
                    </div>

                    <Link to={`/tours/${tour.id}`}>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg"
                      >
                        {t('bookNow')}
                      </motion.button>
                    </Link>

                    <div className="mt-6 space-y-3 text-sm text-gray-600">
                      <div className="flex items-center justify-between">
                        <span>Start Date:</span>
                        <span>{new Date(tour.startDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>End Date:</span>
                        <span>{new Date(tour.endDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Duration:</span>
                        <span>{tour.duration}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TourDetailsModal;