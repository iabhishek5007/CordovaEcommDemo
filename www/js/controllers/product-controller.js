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
    var userInfo = App.Utils.Storage.getUserInfo(); // Corrected to use App.Utils.Storage

    // Remove previous view instance if exists
    if (this.productsView) {
      this.productsView.remove();
    }

    // Create products view but defer rendering until products are fetched
    this.productsView = new App.Views.ProductView({
      collection: this.productsCollection,
      userInfo: userInfo,
      // Pass a flag or change initialization to prevent immediate render
    });

    // Fetch products from API and then render the view
    this.fetchProductsAndRenderView();
  },

  /**
   * Fetch products from API
   */
  fetchProductsAndRenderView: function () { // Renamed and modified
    var self = this;

    // Show loader while fetching
    App.Utils.UI.showLoader(); // Assuming UIUtils is App.Utils.UI

    // Fetch products
    this.productsCollection.fetchProducts(
      // Success callback
      function (response) {
        App.Utils.UI.hideLoader();

        // Now that products are fetched (or attempted), render the view
        if (self.productsView) {
            console.log("Products fetched, rendering ProductView.");
            self.productsView.render(); // Explicitly call render
        }

        // If no products found
        if (self.productsCollection.length === 0) {
          App.Utils.UI.showToast(APP_STRINGS.NO_PRODUCTS, "info");
        }
      },
      // Error callback
      function (errorMessage) {
        App.Utils.UI.hideLoader();
        App.Utils.UI.showToast(errorMessage, "error");
        // Optionally render the view even on error to show an empty state or error message within the view
        if (self.productsView) {
            console.log("Error fetching products, rendering ProductView with potentially empty collection.");
            self.productsView.render(); 
        }
      }
    );
  },
});
