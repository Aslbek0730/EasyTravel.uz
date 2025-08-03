/**
 * @typedef {Object} Tour
 * @property {string} id
 * @property {string} name
 * @property {string} destination
 * @property {string} duration
 * @property {number} price
 * @property {string} image
 * @property {string} description
 * @property {string} startDate
 * @property {string} endDate
 * @property {string} category
 * @property {number} rating
 * @property {string[]} included
 */

/**
 * @typedef {Object} ContactForm
 * @property {string} name
 * @property {string} email
 * @property {string} phone
 * @property {string} message
 */

/**
 * @typedef {Object} PaymentForm
 * @property {string} name
 * @property {string} email
 * @property {string} phone
 * @property {'payme' | 'click' | 'uzum'} paymentMethod
 */

/**
 * @typedef {'en' | 'ru'} Language
 */

/**
 * @typedef {Object} LanguageContextType
 * @property {Language} language
 * @property {function(Language): void} setLanguage
 * @property {function(string): string} t
 */

// Export empty object to maintain module structure
export {}; 