import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ArrowLeft, QrCode, CheckCircle } from 'lucide-react';
import { tours } from '../data/tours';

// Import SVG icons
import ClickIcon from '../images/click.svg';
import PaymeIcon from '../images/payme-red-logo-27778.svg';
import UzumIcon from '../images/uzum-bank-seeklogo-4.svg';

const schema = yup.object({
  name: yup.string().required('Name is required').min(2, 'Name must be at least 2 characters'),
  email: yup.string().required('Email is required').email('Invalid email format'),
  phone: yup.string().required('Phone number is required').matches(/^\+?[0-9]{9,15}$/, 'Invalid phone number'),
  paymentMethod: yup.string().required('Please select a payment method')
});

const PaymentPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showQR, setShowQR] = useState(false);

  const tour = tours.find(t => t.id === id);

  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const paymentMethod = watch('paymentMethod');

  if (!tour) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Tour not found</h2>
          <button
            onClick={() => navigate('/tours')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Tours
          </button>
        </div>
      </div>
    );
  }

  const paymentMethods = [
    { 
      id: 'payme', 
      name: 'Payme', 
      icon: PaymeIcon, 
      color: 'bg-blue-600',
      bgColor: 'bg-blue-50'
    },
    { 
      id: 'click', 
      name: 'Click', 
      icon: ClickIcon, 
      color: 'bg-green-600',
      bgColor: 'bg-green-50'
    },
    { 
      id: 'uzum', 
      name: 'Uzum Bank', 
      icon: UzumIcon, 
      color: 'bg-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  const onSubmit = (data) => {
    console.log('Payment data:', { ...data, tourId: tour.id, amount: tour.price });
    setShowQR(true);
    // Here you would normally send data to backend and redirect to payment gateway
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('uz-UZ').format(price) + ' UZS';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/tours')}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-8 group"
        >
          <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Tours
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Tour Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            <img
              src={tour.image}
              alt={tour.name}
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{tour.name}</h2>
              <p className="text-gray-600 mb-4">{tour.description}</p>
              
              <div className="space-y-2 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Destination:</span>
                  <span className="font-medium">{tour.destination}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium">{tour.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Start Date:</span>
                  <span className="font-medium">{new Date(tour.startDate).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold">Total Amount:</span>
                  <span className="text-2xl font-bold text-blue-600">{formatPrice(tour.price)}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Payment Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Payment Details</h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Personal Information */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  {...register('name')}
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your full name"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  {...register('email')}
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your email"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  {...register('phone')}
                  type="tel"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="+998 90 123 45 67"
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
              </div>

              {/* Payment Methods */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">Payment Method</label>
                <div className="grid grid-cols-1 gap-3">
                  {paymentMethods.map((method) => (
                    <motion.label
                      key={method.id}
                      whileHover={{ scale: 1.02 }}
                      className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                        paymentMethod === method.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        {...register('paymentMethod')}
                        type="radio"
                        value={method.id}
                        className="sr-only"
                      />
                      <div className="w-12 h-12 rounded-lg flex items-center justify-center mr-4 bg-white p-2">
                        <img 
                          src={method.icon} 
                          alt={method.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <span className="font-medium text-gray-800">{method.name}</span>
                      {paymentMethod === method.id && (
                        <CheckCircle className="h-5 w-5 text-blue-500 ml-auto" />
                      )}
                    </motion.label>
                  ))}
                </div>
                {errors.paymentMethod && <p className="text-red-500 text-sm mt-1">{errors.paymentMethod.message}</p>}
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg"
              >
                Proceed to Payment
              </motion.button>
            </form>

            {/* QR Code Section */}
            {showQR && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-6 bg-gray-50 rounded-lg text-center"
              >
                <QrCode className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h4 className="font-semibold text-gray-800 mb-2">Scan QR Code to Pay</h4>
                <p className="text-gray-600 text-sm">
                  Use your {paymentMethod} app to scan and complete the payment
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage; 