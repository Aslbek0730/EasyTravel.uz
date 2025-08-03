import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Calendar, Clock, Star, ChevronLeft, ChevronRight, Users } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Link } from 'react-router-dom';

const TourDetailsModal = ({ tour, isOpen, onClose }) => {
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

  const getLocationInfo = (location) => {
    const locationMap = {
      'Parij, Fransiya': {
        country: 'Fransiya',
        region: 'Ile-de-France',
        coordinates: '48.8566° N, 2.3522° E'
      },
      'Tokio, Yaponiya': {
        country: 'Yaponiya',
        region: 'Kanto',
        coordinates: '35.6762° N, 139.6503° E'
      },
      'Dubai, Birlashgan Arab Amirliklari': {
        country: 'Birlashgan Arab Amirliklari',
        region: 'Dubai',
        coordinates: '25.2048° N, 55.2708° E'
      },
      'Istanbul, Turkiya': {
        country: 'Turkiya',
        region: 'Marmara',
        coordinates: '41.0082° N, 28.9784° E'
      },
      'Bali, Indoneziya': {
        country: 'Indoneziya',
        region: 'Bali',
        coordinates: '8.3405° S, 115.0920° E'
      }
    };

    return locationMap[location] || {
      country: 'O\'zbekiston',
      region: 'Markaziy Osiyo',
      coordinates: '41.2995° N, 69.2401° E'
    };
  };

  const locationInfo = getLocationInfo(tour.location);

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
                  alt={tour.title}
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

                {/* Duration Badge */}
                <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {tour.duration} kun
                </div>

                {/* Rating Badge */}
                <div className="absolute top-4 left-20 bg-white bg-opacity-90 px-3 py-1 rounded-full">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-semibold">4.8</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Info */}
                <div className="lg:col-span-2">
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">{tour.title}</h2>
                  <p className="text-gray-600 mb-6 leading-relaxed">{tour.description}</p>

                  {/* Tour Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-5 w-5 text-blue-500" />
                      <div>
                        <span className="text-sm text-gray-500">Manzil</span>
                        <p className="font-medium">{tour.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="h-5 w-5 text-blue-500" />
                      <div>
                        <span className="text-sm text-gray-500">Davomiyligi</span>
                        <p className="font-medium">{tour.duration} kun</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-blue-500" />
                      <div>
                        <span className="text-sm text-gray-500">Boshlanish sanasi</span>
                        <p className="font-medium">{formatDate(tour.start_date)}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Users className="h-5 w-5 text-blue-500" />
                      <div>
                        <span className="text-sm text-gray-500">Tugash sanasi</span>
                        <p className="font-medium">{formatDate(tour.end_date)}</p>
                      </div>
                    </div>
                  </div>

                  {/* What's Included */}
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Dasturga kiritilgan</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-gray-600">Uchish va tushish</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-gray-600">Mehmonxona</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-gray-600">Transport xizmati</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-gray-600">Professional yo'riqchi</span>
                      </div>
                    </div>
                  </div>

                  {/* Location Information */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Manzil ma'lumotlari</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Mamlakat:</span>
                        <span className="font-medium">{locationInfo.country}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Hudud:</span>
                        <span className="font-medium">{locationInfo.region}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Koordinatalar:</span>
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
                      <div className="text-gray-600">kishi boshiga</div>
                    </div>

                    <Link to={`/payment/${tour.id}`}>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg"
                      >
                        Hozir bron qilish
                      </motion.button>
                    </Link>

                    <div className="mt-6 space-y-3 text-sm text-gray-600">
                      <div className="flex items-center justify-between">
                        <span>Boshlanish sanasi:</span>
                        <span>{formatDate(tour.start_date)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Tugash sanasi:</span>
                        <span>{formatDate(tour.end_date)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Davomiyligi:</span>
                        <span>{tour.duration} kun</span>
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