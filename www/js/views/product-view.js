/**
 * Product View
 * Handles the product listing screen UI and interactions
 */

// Initialize App namespace if it doesn't exist
var App = App || {};
App.Views = App.Views || {};

// Product View
App.Views.ProductView = Backbone.View.extend({
  // Element where the view will be rendered
  el: "#app-container",

  // Template for the view
  template: _.template($("#product-list-template").html()),

  /**
   * Initialize the view
   * @param {Object} options - View options
   */
  initialize: function (options) {
    this.options = options || {};
    this.collection = options.collection;
    this.userInfo = options.userInfo;

    // Listen for collection events
    this.listenTo(this.collection, "reset", this.render);

    this.render();
  },

  /**
   * Render the view
   * @returns {Object} this - For chaining
   */
  render: function () {
    // Get username from user info
    var username = this.userInfo
      ? this.userInfo.firstName || this.userInfo.username
      : "";

    // Render template with products
    this.$el.html(
      this.template({
        APP_STRINGS: APP_STRINGS,
        products: this.collection.toJSON(),
        username: username,
      })
    );

    return this;
  },
});
