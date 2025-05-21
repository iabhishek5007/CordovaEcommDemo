/**
 * User Model
 * Handles user authentication and user data
 */

// Initialize App namespace if it doesn't exist
var App = App || {};
App.Models = App.Models || {};

// User Model
App.Models.User = Backbone.Model.extend({
  defaults: {
    id: null,
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    accessToken: null,
    refreshToken: null,
  },

  /**
   * Authenticate user with username and password
   * @param {string} username - User's username
   * @param {string} password - User's password
   * @param {Function} successCallback - Success callback
   * @param {Function} errorCallback - Error callback
   */
  login: function (username, password, successCallback, errorCallback) {
    var self = this;

    // Prepare login data
    var loginData = {
      username: username,
      password: password,
      expiresInMins: APP_CONFIG.DEFAULTS.EXPIRES_IN_MINS,
    };

    // Make login request
    AjaxUtils.post(
      APP_CONFIG.API.LOGIN,
      loginData,
      function (response) {
        // Set user model attributes from response
        self.set(response);

        // Save user info to local storage
        StorageUtils.saveUserInfo(response);

        // Call success callback
        if (successCallback) {
          successCallback(response);
        }
      },
      function (errorMessage, xhr) {
        // Call error callback
        if (errorCallback) {
          errorCallback(errorMessage, xhr);
        }
      }
    );
  },

  /**
   * Log out the current user
   */
  logout: function () {
    // Clear user data
    this.clear().set(this.defaults);

    // Clear stored user session
    StorageUtils.clearUserSession();
  },

  /**
   * Check if user is authenticated
   * @returns {boolean} True if user is authenticated
   */
  isAuthenticated: function () {
    return !!this.get("accessToken");
  },
});
