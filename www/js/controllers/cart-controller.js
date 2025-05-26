/**
 * Cart Controller
 * Handles logic related to the shopping cart view and interactions.
 */
var App = App || {};
App.Controllers = App.Controllers || {};

App.Controllers.CartController = Backbone.View.extend({
  initialize: function () {
    // The cart model (App.cart) is already initialized globally in cart-model.js
    // No specific initialization needed here unless we add more complex logic later.
  },

  /**
   * Shows the cart view.
   */
  showCartView: function () {
    // Ensure the global cart model is loaded before showing the view
    if (!App.cart.get("items")) {
      App.cart.loadCart(); // Ensure cart is loaded if not already
    }

    if (this.cartView) {
      this.cartView.remove(); // Remove previous view instance if exists
    }
    this.cartView = new App.Views.CartView();
    // The view itself will render based on App.cart model changes.
  },

  /**
   * Shows the address and payment view.
   */
  showAddressView: function () {
    if (this.addressView) {
      this.addressView.remove();
    }
    this.addressView = new App.Views.AddressView();
  },
});
