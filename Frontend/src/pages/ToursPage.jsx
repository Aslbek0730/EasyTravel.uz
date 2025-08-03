import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import TourCard from '../components/TourCard';
import FilterPanel from '../components/FilterPanel';
import TourDetailsModal from '../components/TourDetailsModal';
import { toursAPI } from '../services/api';

const ToursPage = () => {
  const [tours, setTours] = useState([]);
  const [filteredTours, setFilteredTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTour, setSelectedTour] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    minPrice: '',
    maxPrice: '',
    location: '',
    duration: ''
  });

  useEffect(() => {
    fetchTours();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [tours, filters]);

  const fetchTours = async () => {
    try {
      setLoading(true);
      const data = await toursAPI.getAll();
      // Ensure data is an array
      const toursArray = Array.isArray(data) ? data : data.results || [];
      setTours(toursArray);
      setError(null);
    } catch (err) {
      console.error('Error fetching tours:', err);
      setError('Sayohat ma\'lumotlarini yuklashda xatolik yuz berdi');
      setTours([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    // Ensure tours is an array
    if (!Array.isArray(tours)) {
      setFilteredTours([]);
      return;
    }

    let filtered = [...tours];

    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(tour => 
        tour.title?.toLowerCase().includes(searchTerm) ||
        tour.description?.toLowerCase().includes(searchTerm) ||
        tour.location?.toLowerCase().includes(searchTerm)
      );
    }

    // Price filters
    if (filters.minPrice) {
      filtered = filtered.filter(tour => tour.price >= parseFloat(filters.minPrice));
    }
    if (filters.maxPrice) {
      filtered = filtered.filter(tour => tour.price <= parseFloat(filters.maxPrice));
    }

    // Location filter
    if (filters.location) {
      filtered = filtered.filter(tour => 
        tour.location?.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Duration filter
    if (filters.duration) {
      filtered = filtered.filter(tour => tour.duration === parseInt(filters.duration));
    }

    setFilteredTours(filtered);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handleTourClick = (tour) => {
    setSelectedTour(tour);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTour(null);
  };

  const handleSearch = async (searchParams) => {
    try {
      setLoading(true);
      const data = await toursAPI.search(searchParams);
      // Ensure data is an array
      const toursArray = Array.isArray(data) ? data : data.results || [];
      setTours(toursArray);
      setError(null);
    } catch (err) {
      console.error('Error searching tours:', err);
      setError('Qidiruvda xatolik yuz berdi');
      setTours([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Barcha sayohatlar
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Dunyoning eng chiroyli joylariga sayohat qiling va unutilmas tajribalar yarating
          </p>
        </motion.div>

        {/* Filter Panel */}
        <FilterPanel 
          filters={filters}
          onFilterChange={handleFilterChange}
          onSearch={handleSearch}
        />

        {/* Tours Grid */}
        <div className="mt-8">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-600 text-lg">{error}</p>
              <button 
                onClick={fetchTours} 
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Qayta urinish
              </button>
            </div>
          ) : filteredTours.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">Hech qanday sayohat topilmadi</p>
              <button 
                onClick={() => setFilters({})} 
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Filtrlarni tozalash
              </button>
            </div>
          ) : (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              {filteredTours.map((tour, index) => (
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
            </motion.div>
          )}
        </div>

        {/* Results Count */}
        {!loading && !error && filteredTours.length > 0 && (
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              {filteredTours.length} ta sayohat topildi
            </p>
          </div>
        )}
      </div>

      {/* Tour Details Modal */}
      <TourDetailsModal 
        tour={selectedTour}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default ToursPage; 