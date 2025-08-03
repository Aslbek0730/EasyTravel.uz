import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Clock, Users, Star, Headphones, CreditCard } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const FeatureCards = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Shield,
      title: t('safeSecure'),
      description: t('safeSecureDesc'),
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      icon: Headphones,
      title: t('support247'),
      description: t('support247Desc'),
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      icon: Users,
      title: t('happyClients'),
      description: t('happyClientsDesc'),
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ];

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">{t('whyChoose')}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We're committed to providing exceptional travel experiences with unmatched service quality
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="text-center p-8 bg-white rounded-2xl shadow-lg border border-gray-100 group"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className={`inline-flex items-center justify-center w-16 h-16 ${feature.bgColor} rounded-full mb-6 group-hover:shadow-lg transition-all duration-300`}
              >
                <feature.icon className={`h-8 w-8 ${feature.color}`} />
              </motion.div>
              <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-blue-600 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureCards; 