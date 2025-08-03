export interface Tour {
  id: string;
  name: string;
  destination: string;
  duration: string;
  price: number;
  image: string;
  description: string;
  startDate: string;
  endDate: string;
  category: string;
  rating: number;
  included: string[];
}

export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface PaymentForm {
  name: string;
  email: string;
  phone: string;
  paymentMethod: 'payme' | 'click' | 'uzum';
}

export type Language = 'en' | 'ru';

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}