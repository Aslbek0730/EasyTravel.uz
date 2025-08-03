import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ArrowLeft, QrCode, CheckCircle } from 'lucide-react';
import { toursAPI, bookingsAPI } from '../services/api';

// Import SVG icons
import ClickIcon from '../images/click.svg';
import PaymeIcon from '../images/payme-red-logo-27778.svg';
import UzumIcon from '../images/uzum-bank-seeklogo-4.svg';

const schema = yup.object({
  name: yup.string().required('Name is required').min(2, 'Name must be at least 2 characters'),
  email: yup.string().required('Email is required').email('Invalid email format'),
  phone: yup.string().required('Phone is required').matches(/^\+998\d{9}$/, 'Phone must be in format +998XXXXXXXXX'),
  payment_method: yup.string().required('Payment method is required'),
});

const PaymentPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    fetchTourDetails();
  }, [id]);

  const fetchTourDetails = async () => {
    try {
      setLoading(true);
      const data = await toursAPI.getById(id);
      setTour(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching tour details:', err);
      setError('Sayohat ma\'lumotlarini yuklashda xatolik yuz berdi');
    } finally {
      setLoading(false);
    }
  };

  const paymentMethods = [
    {
      id: 'click',
      name: 'Click',
      icon: ClickIcon,
      color: 'bg-green-500',
      description: 'Click to\'lov tizimi orqali'
    },
    {
      id: 'payme',
      name: 'Payme',
      icon: PaymeIcon,
      color: 'bg-blue-500',
      description: 'Payme to\'lov tizimi orqali'
    },
    {
      id: 'uzum',
      name: 'Uzum Bank',
      icon: UzumIcon,
      color: 'bg-purple-500',
      description: 'Uzum Bank orqali'
    }
  ];

  const onSubmit = async (data) => {
    try {
      const bookingData = {
        tour: parseInt(id),
        name: data.name,
        email: data.email,
        phone: data.phone,
        payment_method: selectedPaymentMethod,
      };

      const response = await bookingsAPI.create(bookingData);
      
      setBookingSuccess(true);
      
      // Redirect to success page or show success message
      setTimeout(() => {
        navigate('/tours');
      }, 3000);
      
    } catch (err) {
      console.error('Error creating booking:', err);
      setError('Buyurtma yaratishda xatolik yuz berdi');
    }
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Qayta urinish
          </button>
        </div>
      </div>
    );
  }

  if (!tour) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">Sayohat topilmadi</p>
      </div>
    );
  }

  if (bookingSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Buyurtma muvaffaqiyatli!</h2>
          <p className="text-gray-600 mb-4">Sizning buyurtmangiz qabul qilindi</p>
          <p className="text-sm text-gray-500">Sahifa avtomatik ravishda qayta yo'naltiriladi...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Orqaga
          </motion.button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Tour Details */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <h1 className="text-2xl font-bold text-gray-900 mb-4">{tour.title}</h1>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center text-gray-600">
                <span className="font-semibold mr-2">Manzil:</span>
                {tour.location}
              </div>
              <div className="flex items-center text-gray-600">
                <span className="font-semibold mr-2">Davomiyligi:</span>
                {tour.duration} kun
              </div>
              <div className="flex items-center text-gray-600">
                <span className="font-semibold mr-2">Sana:</span>
                {formatDate(tour.start_date)} - {formatDate(tour.end_date)}
              </div>
              <div className="flex items-center text-gray-600">
                <span className="font-semibold mr-2">Narxi:</span>
                <span className="text-2xl font-bold text-green-600">{formatPrice(tour.price)}</span>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Tavsif</h3>
              <p className="text-gray-600 text-sm">{tour.description}</p>
            </div>
          </motion.div>

          {/* Payment Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-6">To'lov ma'lumotlari</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    To'liq ism
                  </label>
                  <input
                    type="text"
                    {...register('name')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ismingizni kiriting"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    {...register('email')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Email manzilingizni kiriting"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telefon raqam
                  </label>
                  <input
                    type="tel"
                    {...register('phone')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+998XXXXXXXXX"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                  )}
                </div>
              </div>

              {/* Payment Methods */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  To'lov usulini tanlang
                </label>
                <div className="space-y-3">
                  {paymentMethods.map((method) => (
                    <motion.div
                      key={method.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setSelectedPaymentMethod(method.id);
                        setValue('payment_method', method.id);
                      }}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                        selectedPaymentMethod === method.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center">
                        <img
                          src={method.icon}
                          alt={method.name}
                          className="w-8 h-8 mr-3"
                        />
                        <div>
                          <h3 className="font-semibold text-gray-900">{method.name}</h3>
                          <p className="text-sm text-gray-600">{method.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                {errors.payment_method && (
                  <p className="text-red-500 text-sm mt-1">{errors.payment_method.message}</p>
                )}
              </div>

              {/* Total */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Jami to'lov:</span>
                  <span className="text-2xl font-bold text-green-600">
                    {formatPrice(tour.price)}
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Jarayonda...' : 'To\'lovni amalga oshirish'}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage; 