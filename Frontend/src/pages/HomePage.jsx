import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import HeroBanner from '../components/HeroBanner';
import FeatureCards from '../components/FeatureCards';
import TourSlider from '../components/TourSlider';
import { toursAPI } from '../services/api';

const HomePage = () => {
  const [featuredTours, setFeaturedTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeaturedTours = async () => {
      try {
        setLoading(true);
        const data = await toursAPI.getFeatured();
        // Ensure data is an array
        const toursArray = Array.isArray(data) ? data : data.results || [];
        setFeaturedTours(toursArray);
        setError(null);
      } catch (err) {
        console.error('Error fetching featured tours:', err);
        setError('Sayohat ma\'lumotlarini yuklashda xatolik yuz berdi');
        setFeaturedTours([]); // Set empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedTours();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Banner */}
      <HeroBanner />

      {/* Feature Cards */}
      <FeatureCards />

      {/* Featured Tours */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Eng yaxshi sayohatlar
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Dunyoning eng chiroyli joylariga sayohat qiling va unutilmas tajribalar yarating
            </p>
          </motion.div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-600 text-lg">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Qayta urinish
              </button>
            </div>
          ) : (
            <TourSlider tours={featuredTours} />
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Sayohatingizni bugun rejalashtiring
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Professional sayohat agentligi bilan xavfsiz va qulay sayohat tajribasi
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors"
              onClick={() => navigate('/tours')}
            >
              Barcha turlarni ko'rish
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 