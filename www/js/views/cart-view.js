/**
 * Cart View
 * Handles the shopping cart screen UI and interactions.
 */
var App = App || {};
App.Views = App.Views || {};

App.Views.CartView = Backbone.View.extend({
  el: "#app-container", // Element where the view will be rendered

  template: _.template($("#cart-template").html()), // Template for the cart view

  events: {
    "click .increase-quantity": "increaseQuantity",
    "click .decrease-quantity": "decreaseQuantity",
    "click .remove-item": "removeItem",
    "click #proceed-to-checkout": "proceedToCheckout",
    "change .item-quantity-input": "updateQuantityFromInput",
  },

  initialize: function (options) {
    this.options = options || {};
    this.cartModel = App.cart; // Use the global cart instance
    
    console.log("CartView initialized, cart model:", this.cartModel);
    console.log("Cart items:", this.cartModel.getItems());

    // Listen for changes in the cart model
    this.listenTo(this.cartModel, "cart:updated", this.render);
    this.listenTo(this.cartModel, "cart:loaded", this.render);

    // Force load cart data from storage
    this.cartModel.loadCart();
    
    this.render();
  },

  render: function () {
    var cartItems = this.cartModel.getItems();
    var totalPrice = this.cartModel.getTotalPrice();
    var totalItemCount = this.cartModel.getTotalItemCount();

    console.log("Rendering cart view with items:", cartItems);
    console.log("Total price:", totalPrice);
    console.log("Total item count:", totalItemCount);

    this.$el.html(
      this.template({
        APP_STRINGS: APP_STRINGS,
        items: cartItems,
        totalPrice: totalPrice,
        totalItemCount: totalItemCount,
      })
    );
    
    // Update cart icon in header
    this.updateHeaderCartIcon(totalItemCount);
    
    // Re-attach event handlers after rendering
    this.delegateEvents();
    
    return this;
  },

  increaseQuantity: function (e) {
    e.preventDefault(); // Prevent default button behavior
    var productId = $(e.currentTarget).data("id");
    console.log("Increase quantity for product ID:", productId);
    var item = _.find(this.cartModel.getItems(), function (i) {
      return i.id === productId;
    });
    if (item) {
      console.log("Found item, current quantity:", item.quantity);
      this.cartModel.updateItemQuantity(productId, item.quantity + 1);
    } else {
      console.error("Item not found in cart for ID:", productId);
    }
  },

  decreaseQuantity: function (e) {
    e.preventDefault(); // Prevent default button behavior
    var productId = $(e.currentTarget).data("id");
    console.log("Decrease quantity for product ID:", productId);
    var item = _.find(this.cartModel.getItems(), function (i) {
      return i.id === productId;
    });
    if (item) {
      console.log("Found item, current quantity:", item.quantity);
      this.cartModel.updateItemQuantity(productId, item.quantity - 1); // Model handles removal if quantity <= 0
    } else {
      console.error("Item not found in cart for ID:", productId);
    }
  },

  updateQuantityFromInput: function (e) {
    var productId = $(e.currentTarget).data("id");
    var newQuantity = parseInt($(e.currentTarget).val(), 10);
    if (!isNaN(newQuantity)) {
      this.cartModel.updateItemQuantity(productId, newQuantity);
    }
  },

  removeItem: function (e) {
    var productId = $(e.currentTarget).data("id");
    if (confirm(APP_STRINGS.CONFIRM_REMOVE_ITEM)) {
      this.cartModel.removeItem(productId);
    }
  },

  proceedToCheckout: function () {
    if (this.cartModel.getItems().length === 0) {
      App.Utils.UI.showToast(APP_STRINGS.CART_EMPTY_CHECKOUT, "warning");
      return;
    }
    // Navigate to address/checkout screen
    App.router.navigate("address", { trigger: true });
  },

  updateHeaderCartIcon: function (count) {
    var $cartIcon = $("#header-cart-icon");
    var $cartCount = $cartIcon.find(".cart-count");
    if (count > 0) {
      $cartCount.text(count).show();
    } else {
      $cartCount.hide();
    }
  },
});
