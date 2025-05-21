/**
 * Product Model and Collection
 * Handles product data and operations
 */

// Initialize App namespace if it doesn't exist
var App = App || {};
App.Models = App.Models || {};
App.Collections = App.Collections || {};

// Product Model
App.Models.Product = Backbone.Model.extend({
  defaults: {
    id: null,
    title: "",
    description: "",
    price: 0,
    discountPercentage: 0,
    rating: 0,
    stock: 0,
    brand: "",
    category: "",
    thumbnail: "",
    images: [],
  },
});

// Products Collection
App.Collections.Products = Backbone.Collection.extend({
  model: App.Models.Product,

  /**
   * Fetch products from the API
   * @param {Function} successCallback - Success callback
   * @param {Function} errorCallback - Error callback
   */
  fetchProducts: function (successCallback, errorCallback) {
    var self = this;

    // Make API request to get products
    AjaxUtils.get(
      APP_CONFIG.API.PRODUCTS,
      null,
      function (response) {
        // Reset collection with new products
        self.reset(response.products);

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
});
