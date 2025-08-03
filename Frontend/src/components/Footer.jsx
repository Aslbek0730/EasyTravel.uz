import React from 'react';
import { MapPin, Phone, Mail, Facebook, Instagram, Send } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-r from-sky-500 to-blue-600 p-2 rounded-lg"
              >
                <MapPin className="h-6 w-6 text-white" />
              </motion.div>
              <span className="font-bold text-xl">WonderTravel</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Your trusted partner for unforgettable journeys. We create experiences that last a lifetime 
              with our expertly crafted tour packages and exceptional service.
            </p>
            <div className="flex space-x-4">
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="#"
                className="bg-blue-600 p-3 rounded-full hover:bg-blue-700 transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="#"
                className="bg-pink-600 p-3 rounded-full hover:bg-pink-700 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="#"
                className="bg-sky-500 p-3 rounded-full hover:bg-sky-600 transition-colors"
              >
                <Send className="h-5 w-5" />
              </motion.a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-400" />
                <span className="text-gray-400">+998 71 123 45 67</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-400" />
                <span className="text-gray-400">info@wondertravel.uz</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-blue-400 mt-1" />
                <span className="text-gray-400">
                  Amir Temur Street 123<br />
                  Tashkent, Uzbekistan
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <div className="space-y-2">
              <a href="/tours" className="block text-gray-400 hover:text-white transition-colors">
                Tour Packages
              </a>
              <a href="/about" className="block text-gray-400 hover:text-white transition-colors">
                About Us
              </a>
              <a href="/contact" className="block text-gray-400 hover:text-white transition-colors">
                Contact
              </a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">
                Terms & Conditions
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 WonderTravel. All rights reserved. | 5+ years of experience | 5000+ happy travelers
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 