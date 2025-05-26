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
   * Remove all data from local storage
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

  // --- User Specific Storage --- //

  /**
   * Save user information (e.g., after login)
   * @param {Object} userInfo - User object to store
   */
  saveUserInfo: function (userInfo) {
    return this.save(App.Config.STORAGE_KEYS.USER_INFO, userInfo);
  },

  /**
   * Get user information
   * @returns {Object|null} User object or null if not found
   */
  getUserInfo: function () {
    return this.get(App.Config.STORAGE_KEYS.USER_INFO, null);
  },

  /**
   * Remove user information (e.g., after logout)
   */
  removeUserInfo: function () {
    return this.remove(App.Config.STORAGE_KEYS.USER_INFO);
  },

  /**
   * Save authentication token
   * @param {string} token - Authentication token
   */
  saveAuthToken: function (token) {
    return this.save(App.Config.STORAGE_KEYS.AUTH_TOKEN, token);
  },

  /**
   * Get authentication token
   * @returns {string|null} Authentication token or null if not found
   */
  getAuthToken: function () {
    return this.get(App.Config.STORAGE_KEYS.AUTH_TOKEN, null);
  },

  /**
   * Remove authentication token
   */
  removeAuthToken: function () {
    return this.remove(App.Config.STORAGE_KEYS.AUTH_TOKEN);
  },

  // --- Cart Specific Storage --- //

  /**
   * Save cart data
   * @param {Object} cartData - Cart object to store (e.g., { items: [...] })
   */
  saveCartData: function (cartData) {
    console.log("StorageUtils: Saving cart data:", cartData);
    if (!cartData || !cartData.items || !Array.isArray(cartData.items)) {
      console.error(
        "StorageUtils: Invalid cart data format, fixing before save"
      );
      cartData = { items: [] };
    }
    return this.save(App.Config.STORAGE_KEYS.CART_DATA, cartData);
  },

  /**
   * Get cart data
   * @returns {Object|null} Cart object or null if not found
   */
  getCartData: function () {
    console.log("StorageUtils: Getting cart data");
    var cartData = this.get(App.Config.STORAGE_KEYS.CART_DATA, { items: [] });

    // Validate cart data structure
    if (!cartData || !cartData.items || !Array.isArray(cartData.items)) {
      console.error(
        "StorageUtils: Invalid cart data retrieved, returning empty cart"
      );
      return { items: [] };
    }

    console.log("StorageUtils: Retrieved cart data:", cartData);
    return cartData;
  },

  /**
   * Remove cart data
   */
  removeCartData: function () {
    return this.remove(App.Config.STORAGE_KEYS.CART_DATA);
  },
};
