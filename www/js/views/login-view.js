/**
 * Login View
 * Handles the login screen UI and user interactions
 */

// Initialize App namespace if it doesn't exist
var App = App || {};
App.Views = App.Views || {};

// Login View
App.Views.LoginView = Backbone.View.extend({
  // Element where the view will be rendered
  el: "#app-container",

  // Template for the view
  template: _.template($("#login-template").html()),

  // Events
  events: {
    "click #login-btn": "onLoginClick",
    "keypress #password": "onPasswordKeypress",
  },

  /**
   * Initialize the view
   * @param {Object} options - View options
   */
  initialize: function (options) {
    this.options = options || {};
    this.render();
  },

  /**
   * Render the view
   * @returns {Object} this - For chaining
   */
  render: function () {
    // Render template
    this.$el.html(
      this.template({
        APP_STRINGS: APP_STRINGS,
      })
    );

    return this;
  },

  /**
   * Handle login button click
   * @param {Event} e - Click event
   */
  onLoginClick: function (e) {
    e.preventDefault();
    this.performLogin();
  },

  /**
   * Handle enter key press in password field
   * @param {Event} e - Keypress event
   */
  onPasswordKeypress: function (e) {
    // If Enter key is pressed
    if (e.which === 13) {
      e.preventDefault();
      this.performLogin();
    }
  },

  /**
   * Perform login with form data
   */
  performLogin: function () {
    var self = this;

    // Get form values
    var username = this.$("#username").val().trim();
    var password = this.$("#password").val();

    // Validate input
    if (!username || !password) {
      UIUtils.showError(APP_STRINGS.LOGIN_ERROR);
      return;
    }

    // Hide any previous errors
    UIUtils.hideError();

    // Call login method on user model
    if (this.options.onLogin) {
      this.options.onLogin(
        username,
        password,
        // Success callback
        function (response) {
          // Show success message
          UIUtils.showToast(APP_STRINGS.LOGIN_SUCCESS, "success");

          // Navigate to products page
          Backbone.history.navigate("products", { trigger: true });
        },
        // Error callback
        function (errorMessage) {
          UIUtils.showError(errorMessage);
        }
      );
    }
  },
});
