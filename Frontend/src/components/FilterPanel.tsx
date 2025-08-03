import React from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Calendar, MapPin, DollarSign } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface FilterPanelProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange
}) => {
  const { t } = useLanguage();
  
  const categories = [
    { value: 'All', label: t('all') },
    { value: 'Cultural', label: t('cultural') },
    { value: 'Adventure', label: t('adventure') },
    { value: 'Leisure', label: t('leisure') }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 rounded-2xl shadow-lg mb-8"
    >
      <div className="flex items-center mb-6">
        <Filter className="h-5 w-5 text-blue-600 mr-2" />
        <h3 className="text-lg font-semibold text-gray-800">{t('filterTours')}</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder={t('searchDestinations')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
        </div>

        {/* Category */}
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white transition-all duration-200"
          >
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range */}
        <div className="relative">
          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <select
            value={`${priceRange[0]}-${priceRange[1]}`}
            onChange={(e) => {
              const [min, max] = e.target.value.split('-').map(Number);
              setPriceRange([min, max]);
            }}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white transition-all duration-200"
          >
            <option value="0-5000000">{t('allPrices')}</option>
            <option value="0-1500000">Under 1,500,000 UZS</option>
            <option value="1500000-2500000">1,500,000 - 2,500,000 UZS</option>
            <option value="2500000-5000000">Above 2,500,000 UZS</option>
          </select>
        </div>

        {/* Clear Filters */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            setSearchTerm('');
            setSelectedCategory('All');
            setPriceRange([0, 5000000]);
          }}
          className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium transition-all duration-200"
        >
          {t('clearAll')}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default FilterPanel;