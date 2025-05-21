/**
 * Main Application File
 * Initializes the Backbone application and sets up routing
 */

// App namespace is initialized by init-app.js
// var App = App || {
//   Models: {},
//   Collections: {},
//   Views: {},
//   Routers: {},
//   Controllers: {},
//   Utils: {},
//   Config: {},
//   Templates: {},
// };

// Main Application Router
App.Routers.MainRouter = Backbone.Router.extend({
  routes: {
    login: "showLogin",
    products: "showProducts",
    // Default route
    "*actions": "defaultRoute",
  },

  initialize: function () {
    // Initialize controllers
    // Ensure App.Controllers.AuthController and App.Controllers.ProductController are defined before this router is instantiated.
    this.authController = new App.Controllers.AuthController();
    this.productController = new App.Controllers.ProductController();
    console.log(
      "MainRouter initialized. AuthController and ProductController should be available."
    );
  },

  showLogin: function () {
    console.log("Routing to login page.");
    this.authController.showLoginView();
  },

  showProducts: function () {
    console.log("Routing to products page.");
    // Check if user is logged in. StorageUtils needs to be available.
    if (!StorageUtils.getUserInfo()) {
      console.log("User not logged in, redirecting to login.");
      Backbone.history.navigate("login", { trigger: true });
      return;
    }
    this.productController.showProductsView();
  },

  defaultRoute: function (actions) {
    console.log("Default route triggered. Actions: " + actions);
    // Redirect to login or products based on auth status. StorageUtils needs to be available.
    if (StorageUtils.getUserInfo()) {
      console.log("User is logged in. Navigating to products.");
      Backbone.history.navigate("products", { trigger: true });
    } else {
      console.log("User is not logged in. Navigating to login.");
      Backbone.history.navigate("login", { trigger: true });
    }
  },
});

// Wait for the deviceready event before using any of Cordova's device APIs
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
  console.log("Device is ready. Initializing Backbone application...");

  // Initialize main router
  App.mainRouter = new App.Routers.MainRouter();
  console.log("MainRouter instance created.");

  // Start Backbone history
  Backbone.history.start();
  console.log("Backbone history started.");

  // The defaultRoute will be triggered by Backbone.history.start() if the current URL fragment matches a route,
  // or if no fragment is present and a '*actions' route exists.
  // For example, if the app starts at index.html (no hash), the '*actions' route will match.

  console.log(
    "App initialized - Running cordova-" +
      cordova.platformId +
      "@" +
      cordova.version
  );
}
