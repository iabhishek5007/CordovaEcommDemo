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

  events: {
    "click .btn-add-to-cart": "addToCartClicked",
  },

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
    this.cartModel = App.cart; // Get a reference to the global cart model
    this.listenTo(this.cartModel, "cart:updated", this.updateHeaderCartIcon);
    this.listenTo(this.cartModel, "cart:loaded", this.updateHeaderCartIcon);

    // this.render(); // Controller will call render after fetching products
    this.updateHeaderCartIcon(); // Initial update for cart icon is still fine
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

  addToCartClicked: function (e) {
    e.preventDefault(); // Prevent default button behavior

    var productId = $(e.currentTarget).data("product-id");
    console.log("Add to cart clicked for product ID:", productId);

    var product = this.collection.get(productId);
    console.log("Product found:", product ? "yes" : "no");

    if (product) {
      // We need to pass a plain object to the cart model, not the Backbone model instance directly
      // Ensure all necessary product details are included for the cart item
      var productData = {
        id: product.get("id"),
        title: product.get("title"), // Or 'name' if your product model uses that
        price: product.get("price"),
        thumbnail: product.get("thumbnail"), // Or 'image'
        // Add any other relevant product details like 'image' if different from thumbnail
      };

      console.log("Adding product to cart:", productData);

      // Check if App.cart exists
      if (!App.cart) {
        console.error("App.cart is undefined!");
        App.Utils.UI.showToast(
          "Error adding to cart: Cart not initialized",
          "error"
        );
        return;
      }

      App.cart.addItem(productData);

      // Verify item was added
      var cartItems = App.cart.getItems();
      console.log("Cart items after add:", cartItems);

      App.Utils.UI.showToast(
        product.get("title") + " " + APP_STRINGS.ADDED_TO_CART,
        "success"
      );
    } else {
      console.error("Product not found for ID:", productId);
      App.Utils.UI.showToast(APP_STRINGS.PRODUCT_NOT_FOUND, "error");
    }
  },

  updateHeaderCartIcon: function () {
    var totalItemCount = this.cartModel.getTotalItemCount();
    var $cartIcon = this.$("#header-cart-icon"); // Search within the view's element
    if ($cartIcon.length === 0) {
      // Fallback to global search if not found in view (e.g. if header is outside #app-container)
      $cartIcon = $("#header-cart-icon");
    }
    var $cartCount = $cartIcon.find(".cart-count");

    if (totalItemCount > 0) {
      $cartCount.text(totalItemCount).show();
    } else {
      $cartCount.hide();
    }
  },
});
