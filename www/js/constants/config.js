/**
 * Application Configuration
 * Contains API endpoints, timeouts, and other configuration settings
 */

var APP_CONFIG = {
  // API Endpoints
  API: {
    BASE_URL: "https://dummyjson.com",
    LOGIN: "/auth/login",
    PRODUCTS: "/products",
  },

  // Local Storage Keys
  STORAGE: {
    USER_INFO: "user_info",
    AUTH_TOKEN: "auth_token",
  },

  // Request Timeouts (in milliseconds)
  TIMEOUTS: {
    DEFAULT: 30000, // 30 seconds
    LOGIN: 10000, // 10 seconds
  },

  // Default values
  DEFAULTS: {
    EXPIRES_IN_MINS: 30,
  },
};
