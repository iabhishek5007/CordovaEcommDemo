/**
 * Storage Utilities
 * Handles local storage operations for the application
 */

var StorageUtils = {
  /**
   * Save data to local storage
   * @param {string} key - Storage key
   * @param {*} value - Value to store (will be JSON stringified)
   */
  save: function (key, value) {
    try {
      var stringValue = JSON.stringify(value);
      localStorage.setItem(key, stringValue);
      return true;
    } catch (e) {
      console.error("Error saving to storage:", e);
      return false;
    }
  },

  /**
   * Retrieve data from local storage
   * @param {string} key - Storage key
   * @param {*} defaultValue - Default value if key doesn't exist
   * @returns {*} Retrieved value or defaultValue
   */
  get: function (key, defaultValue) {
    try {
      var value = localStorage.getItem(key);
      if (value === null) {
        return defaultValue;
      }
      return JSON.parse(value);
    } catch (e) {
      console.error("Error retrieving from storage:", e);
      return defaultValue;
    }
  },

  /**
   * Remove data from local storage
   * @param {string} key - Storage key to remove
   */
  remove: function (key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (e) {
      console.error("Error removing from storage:", e);
      return false;
    }
  },

  /**
   * Clear all application data from local storage
   */
  clearAll: function () {
    try {
      localStorage.clear();
      return true;
    } catch (e) {
      console.error("Error clearing storage:", e);
      return false;
    }
  },

  /**
   * Save user information to local storage
   * @param {Object} userInfo - User information object
   */
  saveUserInfo: function (userInfo) {
    this.save(APP_CONFIG.STORAGE.USER_INFO, userInfo);

    // Save auth token separately for easier access
    if (userInfo && userInfo.accessToken) {
      this.save(APP_CONFIG.STORAGE.AUTH_TOKEN, userInfo.accessToken);
    }
  },

  /**
   * Get user information from local storage
   * @returns {Object|null} User information or null if not found
   */
  getUserInfo: function () {
    return this.get(APP_CONFIG.STORAGE.USER_INFO, null);
  },

  /**
   * Clear user session data (logout)
   */
  clearUserSession: function () {
    this.remove(APP_CONFIG.STORAGE.USER_INFO);
    this.remove(APP_CONFIG.STORAGE.AUTH_TOKEN);
  },
};
