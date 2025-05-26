/**
 * Main Application File
 * Initializes the Backbone application and sets up routing
 */

// App Router (Clean + Fallback + Cordova ready)
App.Routers.MainRouter = Backbone.Router.extend({
  routes: {
    "": "defaultRoute", // Default route
    login: "showLogin",
    products: "showProducts",
    cart: "showCart", // Route for the shopping cart
    address: "showAddress", // Route for address and payment
    "*actions": "defaultRoute", // Catch-all fallback
  },

  initialize: function () {
    this.authController = new App.Controllers.AuthController();
    this.productController = new App.Controllers.ProductController();
    this.cartController = new App.Controllers.CartController(); // Initialize CartController
    console.log("Router initialized.");
  },

  showLogin: function () {
    $("#app-container").empty();
    this.authController.showLoginView();
  },

  showProducts: function () {
    var userInfo = App.Utils.Storage.getUserInfo(); // Use App.Utils.Storage
    if (!userInfo || !userInfo.accessToken) {
      console.log("Not logged in, redirecting to login.");
      this.navigate("login", { trigger: true });
      return;
    }

    $("#app-container").empty();
    this.productController.showProductsView();
  },

  showCart: function () {
    var userInfo = App.Utils.Storage.getUserInfo(); // Use App.Utils.Storage
    if (!userInfo || !userInfo.accessToken) {
      console.log("Not logged in, redirecting to login.");
      this.navigate("login", { trigger: true });
      return;
    }
    $("#app-container").empty();
    this.cartController.showCartView();
  },

  showAddress: function () {
    var userInfo = App.Utils.Storage.getUserInfo(); // Use App.Utils.Storage
    if (!userInfo || !userInfo.accessToken) {
      console.log("Not logged in, redirecting to login.");
      this.navigate("login", { trigger: true });
      return;
    }
    // Additional check: if cart is empty, redirect to products or cart page
    if (App.cart.getItems().length === 0) {
      console.log("Cart is empty, redirecting to products page.");
      App.Utils.UI.showToast(APP_STRINGS.CART_EMPTY_REDIRECT, "info");
      this.navigate("products", { trigger: true, replace: true });
      return;
    }
    $("#app-container").empty();
    this.cartController.showAddressView();
  },

  defaultRoute: function () {
    console.log("Default route hit.");
    var userInfo = App.Utils.Storage.getUserInfo(); // Use App.Utils.Storage
    if (userInfo && userInfo.accessToken) {
      this.navigate("products", { trigger: true });
    } else {
      this.navigate("login", { trigger: true });
    }
  },
});

// Wait for Cordova to be ready before starting app
document.addEventListener("deviceready", function () {
  // Ensure App.cart is initialized before router, as router might need it.
  // App.cart is now initialized within cart-model.js itself upon its definition.
  // So, we just need to ensure cart-model.js is loaded before app.js or router initialization.

  App.mainRouter = new App.Routers.MainRouter();
  App.router = App.mainRouter; // Make router globally accessible for navigation
  Backbone.history.start();
  console.log("Backbone history started. App is ready.");
});
