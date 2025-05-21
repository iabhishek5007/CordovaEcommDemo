/**
 * Product Controller
 * Handles product listing logic
 */

// Initialize App namespace if it doesn't exist
var App = App || {};
App.Controllers = App.Controllers || {};

// Product Controller
App.Controllers.ProductController = Backbone.View.extend({
  /**
   * Initialize the controller
   */
  initialize: function () {
    // Create products collection
    this.productsCollection = new App.Collections.Products();
  },

  /**
   * Show the products view
   */
  showProductsView: function () {
    var self = this;

    // Get user info from auth controller
    var userInfo = StorageUtils.getUserInfo();

    // Create products view
    this.productsView = new App.Views.ProductView({
      collection: this.productsCollection,
      userInfo: userInfo,
    });

    // Fetch products from API
    this.fetchProducts();
  },

  /**
   * Fetch products from API
   */
  fetchProducts: function () {
    var self = this;

    // Show loader while fetching
    UIUtils.showLoader();

    // Fetch products
    this.productsCollection.fetchProducts(
      // Success callback
      function (response) {
        UIUtils.hideLoader();

        // If no products found
        if (self.productsCollection.length === 0) {
          UIUtils.showToast(APP_STRINGS.NO_PRODUCTS, "info");
        }
      },
      // Error callback
      function (errorMessage) {
        UIUtils.hideLoader();
        UIUtils.showToast(errorMessage, "error");
      }
    );
  },
});
