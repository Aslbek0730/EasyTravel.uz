import { Tour } from '../types';

export const tours: Tour[] = [
  {
    id: '1',
    name: 'Silk Road Adventure',
    destination: 'Tashkent - Bukhara - Khiva',
    duration: '5 days / 4 nights',
    price: 2500000,
    image: 'https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Explore the ancient cities of Uzbekistan along the historic Silk Road',
    startDate: '2025-03-15',
    endDate: '2025-03-19',
    category: 'Cultural',
    rating: 4.8,
    included: ['Transportation', 'Accommodation', 'Meals', 'Guide']
  },
  {
    id: '2',
    name: 'Mountain Retreat',
    destination: 'Chimgan Mountains',
    duration: '3 days / 2 nights',
    price: 1800000,
    image: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Relax and rejuvenate in the beautiful Chimgan Mountains',
    startDate: '2025-03-20',
    endDate: '2025-03-22',
    category: 'Adventure',
    rating: 4.6,
    included: ['Transportation', 'Accommodation', 'Meals']
  },
  {
    id: '3',
    name: 'Desert Safari',
    destination: 'Kyzylkum Desert',
    duration: '4 days / 3 nights',
    price: 2200000,
    image: 'https://images.pexels.com/photos/3889691/pexels-photo-3889691.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Experience the magic of the desert with camel rides and stargazing',
    startDate: '2025-04-01',
    endDate: '2025-04-04',
    category: 'Adventure',
    rating: 4.7,
    included: ['Transportation', 'Accommodation', 'Meals', 'Activities']
  },
  {
    id: '4',
    name: 'Cultural Heritage Tour',
    destination: 'Samarkand - Shakhrisabz',
    duration: '6 days / 5 nights',
    price: 3200000,
    image: 'https://images.pexels.com/photos/7129720/pexels-photo-7129720.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Discover the magnificent architecture and rich history of Samarkand',
    startDate: '2025-04-10',
    endDate: '2025-04-15',
    category: 'Cultural',
    rating: 4.9,
    included: ['Transportation', 'Accommodation', 'Meals', 'Guide', 'Museum tickets']
  },
  {
    id: '5',
    name: 'Lake Adventure',
    destination: 'Aydarkul Lake',
    duration: '2 days / 1 night',
    price: 1200000,
    image: 'https://images.pexels.com/photos/1834279/pexels-photo-1834279.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Enjoy water sports and relaxation at the beautiful Aydarkul Lake',
    startDate: '2025-04-20',
    endDate: '2025-04-21',
    category: 'Leisure',
    rating: 4.5,
    included: ['Transportation', 'Accommodation', 'Activities']
  },
  {
    id: '6',
    name: 'City Explorer',
    destination: 'Tashkent City Tour',
    duration: '1 day',
    price: 800000,
    image: 'https://images.pexels.com/photos/2570063/pexels-photo-2570063.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Comprehensive city tour covering all major attractions in Tashkent',
    startDate: '2025-03-25',
    endDate: '2025-03-25',
    category: 'Cultural',
    rating: 4.4,
    included: ['Transportation', 'Guide', 'Lunch']
  }
];

export const featuredTours = tours.slice(0, 3);