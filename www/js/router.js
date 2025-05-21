/**
 * Application Router
 * Handles navigation between different views
 */

// Define the application router
App.Router = Backbone.Router.extend({
  // Define routes
  routes: {
    "": "login", // Default route
    login: "login", // Login screen
    products: "products", // Products screen
  },

  /**
   * Initialize the router
   */
  initialize: function () {
    // Create controllers
    this.authController = new App.Controllers.AuthController();
    this.productController = new App.Controllers.ProductController();

    // Check if user is already logged in
    var userInfo = StorageUtils.getUserInfo();
    if (userInfo && userInfo.accessToken) {
      // User is logged in, navigate to products
      this.navigate("products", { trigger: true });
    }
  },

  /**
   * Route to login screen
   */
  login: function () {
    // Clear any existing views
    $("#app-container").empty();

    // Initialize login view
    this.authController.showLoginView();
  },

  /**
   * Route to products screen
   */
  products: function () {
    // Check if user is logged in
    var userInfo = StorageUtils.getUserInfo();
    if (!userInfo || !userInfo.accessToken) {
      // User is not logged in, redirect to login
      this.navigate("login", { trigger: true });
      return;
    }

    // Clear any existing views
    $("#app-container").empty();

    // Initialize products view
    this.productController.showProductsView();
  },
});
