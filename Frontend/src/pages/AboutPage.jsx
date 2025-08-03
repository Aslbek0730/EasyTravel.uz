import React from 'react';
import { motion } from 'framer-motion';
import { Users, Award, Shield, Heart, Globe, Zap } from 'lucide-react';

const AboutPage = () => {
  const stats = [
    { number: '5+', label: 'Years Experience', icon: Award },
    { number: '5000+', label: 'Happy Travelers', icon: Users },
    { number: '200+', label: 'Successful Tours', icon: Globe },
    { number: '4.9', label: 'Average Rating', icon: Heart }
  ];

  const values = [
    {
      icon: Shield,
      title: 'Safety First',
      description: 'We prioritize your safety with comprehensive insurance and experienced guides'
    },
    {
      icon: Heart,
      title: 'Passion for Travel',
      description: 'Our team shares a genuine love for exploration and creating memorable experiences'
    },
    {
      icon: Zap,
      title: 'Excellence',
      description: 'We strive for excellence in every aspect of our service delivery'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-r from-blue-600 to-sky-600 flex items-center justify-center">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center text-white max-w-4xl mx-auto px-4"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">About WonderTravel</h1>
          <p className="text-xl md:text-2xl text-blue-100">
            Creating extraordinary travel experiences since 2020
          </p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 -mt-16 relative z-10 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="bg-white rounded-2xl shadow-xl p-6 text-center"
            >
              <div className="flex justify-center mb-4">
                <div className="bg-gradient-to-r from-blue-500 to-sky-500 p-3 rounded-full">
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-2">{stat.number}</div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Founded in 2020, WonderTravel emerged from a simple belief: that travel should be transformative, 
                accessible, and unforgettable. What started as a small team of passionate travelers has grown into 
                one of Uzbekistan's most trusted travel companies.
              </p>
              <p>
                Our mission is to showcase the incredible beauty and rich cultural heritage of Central Asia while 
                providing world-class service that exceeds expectations. Every tour we craft is designed with 
                attention to detail and genuine care for our travelers' experiences.
              </p>
              <p>
                Today, we're proud to have helped over 5,000 travelers discover the magic of Uzbekistan and 
                beyond, building lasting relationships and creating memories that span a lifetime.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <img
              src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Our team"
              className="w-full h-96 object-cover rounded-2xl shadow-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl"></div>
            <div className="absolute bottom-6 left-6 text-white">
              <h3 className="text-xl font-bold mb-2">Our Dedicated Team</h3>
              <p className="text-blue-200">Passionate professionals committed to your journey</p>
            </div>
          </motion.div>
        </div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-800 text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="text-center p-8 bg-gray-50 rounded-2xl group"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-sky-500 rounded-full mb-6 group-hover:shadow-lg transition-all duration-300"
                >
                  <value.icon className="h-8 w-8 text-white" />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Partners Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center pb-16"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-8">Trusted Partners</h2>
          <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
            We work with the best airlines, hotels, and local service providers to ensure your comfort and satisfaction
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
            {/* Partner logos would go here - using placeholder text for demo */}
            <div className="bg-gray-100 h-16 rounded-lg flex items-center justify-center">
              <span className="font-bold text-gray-500">UZBEKISTAN AIRWAYS</span>
            </div>
            <div className="bg-gray-100 h-16 rounded-lg flex items-center justify-center">
              <span className="font-bold text-gray-500">HYATT HOTELS</span>
            </div>
            <div className="bg-gray-100 h-16 rounded-lg flex items-center justify-center">
              <span className="font-bold text-gray-500">HILTON</span>
            </div>
            <div className="bg-gray-100 h-16 rounded-lg flex items-center justify-center">
              <span className="font-bold text-gray-500">ORIENT EXPRESS</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage; 