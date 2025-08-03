import React from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Calendar, MapPin, DollarSign } from 'lucide-react';

const FilterPanel = ({ filters, onFilterChange, onSearch }) => {
  const handleInputChange = (field, value) => {
    onFilterChange({ [field]: value });
  };

  const handleSearch = () => {
    const searchParams = {};
    if (filters.search) searchParams.q = filters.search;
    if (filters.minPrice) searchParams.min_price = filters.minPrice;
    if (filters.maxPrice) searchParams.max_price = filters.maxPrice;
    if (filters.location) searchParams.location = filters.location;
    if (filters.duration) searchParams.duration = filters.duration;
    
    onSearch(searchParams);
  };

  const clearFilters = () => {
    onFilterChange({
      search: '',
      minPrice: '',
      maxPrice: '',
      location: '',
      duration: ''
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 rounded-2xl shadow-lg mb-8"
    >
      <div className="flex items-center mb-6">
        <Filter className="h-5 w-5 text-blue-600 mr-2" />
        <h3 className="text-lg font-semibold text-gray-800">Sayohatlarni filtrlash</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Qidirish..."
            value={filters.search}
            onChange={(e) => handleInputChange('search', e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
        </div>

        {/* Location */}
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Manzil..."
            value={filters.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
        </div>

        {/* Min Price */}
        <div className="relative">
          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="number"
            placeholder="Min narx..."
            value={filters.minPrice}
            onChange={(e) => handleInputChange('minPrice', e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
        </div>

        {/* Max Price */}
        <div className="relative">
          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="number"
            placeholder="Max narx..."
            value={filters.maxPrice}
            onChange={(e) => handleInputChange('maxPrice', e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
        </div>

        {/* Duration */}
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <select
            value={filters.duration}
            onChange={(e) => handleInputChange('duration', e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white transition-all duration-200"
          >
            <option value="">Davomiyligi</option>
            <option value="1">1 kun</option>
            <option value="3">3 kun</option>
            <option value="5">5 kun</option>
            <option value="7">7 kun</option>
            <option value="10">10 kun</option>
            <option value="14">14 kun</option>
          </select>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center mt-6">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSearch}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200"
        >
          Qidirish
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={clearFilters}
          className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium transition-all duration-200"
        >
          Filtrlarni tozalash
        </motion.button>
      </div>
    </motion.div>
  );
};

export default FilterPanel; 