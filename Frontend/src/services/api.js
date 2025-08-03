// API service for backend integration
const API_BASE_URL = 'http://localhost:8000/api';

// Helper function for API calls
const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const config = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Tours API
export const toursAPI = {
  // Get all tours
  getAll: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiCall(`/tours/${queryString ? `?${queryString}` : ''}`);
  },

  // Get featured tours (for homepage)
  getFeatured: () => apiCall('/tours/featured/'),

  // Get single tour by ID
  getById: (id) => apiCall(`/tours/${id}/`),

  // Search tours
  search: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiCall(`/tours/search/${queryString ? `?${queryString}` : ''}`);
  },
};

// Bookings API
export const bookingsAPI = {
  // Create new booking
  create: (bookingData) => apiCall('/bookings/', {
    method: 'POST',
    body: JSON.stringify(bookingData),
  }),

  // Get all bookings
  getAll: () => apiCall('/bookings/'),

  // Verify payment
  verifyPayment: (bookingId, paymentData) => apiCall(`/bookings/${bookingId}/verify-payment/`, {
    method: 'POST',
    body: JSON.stringify(paymentData),
  }),
};

// Contact API
export const contactAPI = {
  // Send contact message
  sendMessage: (messageData) => apiCall('/contact/', {
    method: 'POST',
    body: JSON.stringify(messageData),
  }),

  // Get all messages
  getAll: () => apiCall('/contact/'),

  // Mark message as read
  markAsRead: (messageId) => apiCall(`/contact/${messageId}/mark-read/`, {
    method: 'POST',
  }),
};

// Export default API object
export default {
  tours: toursAPI,
  bookings: bookingsAPI,
  contact: contactAPI,
}; 