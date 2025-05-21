/**
 * Authentication Controller
 * Handles user authentication logic
 */

// Initialize App namespace if it doesn't exist
var App = App || {};
App.Controllers = App.Controllers || {};

// Authentication Controller
App.Controllers.AuthController = Backbone.View.extend({
  /**
   * Initialize the controller
   */
  initialize: function () {
    // Create user model
    this.userModel = new App.Models.User();

    // Load user data from storage if available
    var storedUser = StorageUtils.getUserInfo();
    if (storedUser) {
      this.userModel.set(storedUser);
    }
  },

  /**
   * Show the login view
   */
  showLoginView: function () {
    // Create login view
    this.loginView = new App.Views.LoginView({
      onLogin: this.handleLogin.bind(this),
    });
  },

  /**
   * Handle login attempt
   * @param {string} username - Username
   * @param {string} password - Password
   * @param {Function} successCallback - Success callback
   * @param {Function} errorCallback - Error callback
   */
  handleLogin: function (username, password, successCallback, errorCallback) {
    // Call login method on user model
    this.userModel.login(username, password, successCallback, errorCallback);
  },

  /**
   * Log out the current user
   */
  logout: function () {
    // Call logout on user model
    this.userModel.logout();

    // Navigate to login page
    Backbone.history.navigate("login", { trigger: true });
  },

  /**
   * Get current user information
   * @returns {Object} User information
   */
  getCurrentUser: function () {
    return this.userModel.toJSON();
  },
});
