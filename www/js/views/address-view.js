/**
 * Address View
 * Handles the address and payment selection screen UI and interactions.
 */
var App = App || {};
App.Views = App.Views || {};

App.Views.AddressView = Backbone.View.extend({
  el: "#app-container", // Element where the view will be rendered

  template: _.template($("#address-template").html()), // Template for the address view

  events: {
    "click #submit-order": "submitOrder",
  },

  initialize: function (options) {
    this.options = options || {};
    this.cartModel = App.cart;

    // Redirect to products if cart is empty, as there's nothing to checkout
    if (this.cartModel.getItems().length === 0) {
      App.Utils.UI.showToast(APP_STRINGS.CART_EMPTY_REDIRECT, "info");
      App.router.navigate("products", { trigger: true, replace: true });
      return; // Stop further initialization
    }

    this.render();
  },

  render: function () {
    var user = App.Utils.Storage.getUserInfo() || {}; // Get logged-in user info for pre-filling
    this.$el.html(
      this.template({
        APP_STRINGS: APP_STRINGS,
        user: user,
        cartTotal: this.cartModel.getTotalPrice(),
      })
    );
    return this;
  },

  submitOrder: function (e) {
    e.preventDefault();
    App.Utils.UI.showLoader();

    var addressData = {
      fullName: this.$("#full-name").val().trim(),
      addressLine1: this.$("#address-line1").val().trim(),
      addressLine2: this.$("#address-line2").val().trim(),
      city: this.$("#city").val().trim(),
      state: this.$("#state").val().trim(),
      zipCode: this.$("#zip-code").val().trim(),
      phoneNumber: this.$("#phone-number").val().trim(),
      paymentMethod: this.$('input[name="payment-method"]:checked').val(),
    };

    // Basic Validation
    if (
      !addressData.fullName ||
      !addressData.addressLine1 ||
      !addressData.city ||
      !addressData.state ||
      !addressData.zipCode ||
      !addressData.phoneNumber ||
      !addressData.paymentMethod
    ) {
      App.Utils.UI.hideLoader();
      App.Utils.UI.showError(APP_STRINGS.VALIDATION_FILL_ALL_FIELDS);
      return;
    }

    // Simulate order submission
    console.log("Order Submitted:", {
      address: addressData,
      items: this.cartModel.getItems(),
      total: this.cartModel.getTotalPrice(),
    });

    // Simulate API call
    setTimeout(function () {
      App.Utils.UI.hideLoader();
      App.Utils.UI.showToast(APP_STRINGS.ORDER_SUCCESSFUL, "success");
      App.cart.clearCart(); // Clear the cart after successful order
      App.router.navigate("products", { trigger: true }); // Redirect to products page
    }, 1500);
  },
});
