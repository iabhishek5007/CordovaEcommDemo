/**
 * Cart Model
 * Manages shopping cart items and interacts with local storage.
 */
var App = App || {};
App.Models = App.Models || {};

App.Models.Cart = Backbone.Model.extend({
  defaults: {
    items: [], // Array of product objects { id, name, price, quantity, image }
  },

  initialize: function () {
    this.loadCart();
    // Listen to changes in items and save automatically
    this.on("change:items", this.saveCart, this);
  },

  /**
   * Loads cart items from local storage.
   */
  loadCart: function () {
    console.log("Loading cart data from storage");
    var cartData = App.Utils.Storage.getCartData();
    console.log("Retrieved cart data:", cartData);

    if (cartData && cartData.items) {
      console.log("Setting items from storage:", cartData.items);
      this.set("items", cartData.items, { silent: true }); // silent to avoid immediate save
    } else {
      console.log("No items found in storage, initializing empty cart");
      this.set("items", [], { silent: true });
    }

    // Trigger a custom event to notify views that cart is loaded/updated
    this.trigger("cart:loaded");
  },

  /**
   * Saves the current cart items to local storage.
   */
  saveCart: function () {
    var items = this.get("items");
    console.log("Saving cart items to storage:", items);

    // Ensure items is an array before saving
    if (!Array.isArray(items)) {
      console.error("Cart items is not an array, resetting to empty array");
      items = [];
      this.set("items", items, { silent: true });
    }

    App.Utils.Storage.saveCartData({ items: items });
    console.log("Cart saved to storage");

    this.trigger("cart:updated"); // Notify that cart has been updated
  },

  /**
   * Adds an item to the cart or updates its quantity if it already exists.
   * @param {Object} product - The product to add (should have id, name, price, image).
   */
  addItem: function (product) {
    console.log("Adding item to cart:", product);

    // Ensure items is an array
    var items = _.clone(this.get("items")) || [];
    if (!Array.isArray(items)) {
      console.error("Cart items is not an array, resetting to empty array");
      items = [];
    }

    var existingItem = _.find(items, function (item) {
      return item.id === product.id;
    });

    if (existingItem) {
      console.log("Item already exists in cart, increasing quantity");
      existingItem.quantity += 1;
    } else {
      console.log("Adding new item to cart");
      items.push(_.extend({}, product, { quantity: 1 }));
    }

    console.log("Updated cart items:", items);
    this.set("items", items);
  },

  /**
   * Removes an item from the cart.
   * @param {string} productId - The ID of the product to remove.
   */
  removeItem: function (productId) {
    var items = _.clone(this.get("items"));
    items = _.reject(items, function (item) {
      return item.id === productId;
    });
    this.set("items", items);
  },

  /**
   * Updates the quantity of a specific item in the cart.
   * @param {string} productId - The ID of the product to update.
   * @param {number} quantity - The new quantity.
   */
  updateItemQuantity: function (productId, quantity) {
    console.log("Updating quantity for product ID:", productId, "to", quantity);

    // Ensure items is an array
    var items = _.clone(this.get("items")) || [];
    if (!Array.isArray(items)) {
      console.error("Cart items is not an array, resetting to empty array");
      items = [];
      this.set("items", items);
      return;
    }

    var itemToUpdate = _.find(items, function (item) {
      return item.id === productId;
    });

    if (itemToUpdate) {
      if (quantity > 0) {
        console.log("Setting new quantity:", quantity);
        itemToUpdate.quantity = quantity;
      } else {
        console.log("Removing item from cart (quantity <= 0)");
        // If quantity is 0 or less, remove the item
        items = _.reject(items, function (item) {
          return item.id === productId;
        });
      }

      console.log("Updated cart items:", items);
      this.set("items", items);
    } else {
      console.error("Item not found in cart for ID:", productId);
    }
  },

  /**
   * Gets all items currently in the cart.
   * @returns {Array} - Array of cart items.
   */
  getItems: function () {
    return this.get("items");
  },

  /**
   * Calculates the total number of items in the cart.
   * @returns {number} - Total number of items.
   */
  getTotalItemCount: function () {
    return _.reduce(
      this.get("items"),
      function (sum, item) {
        return sum + item.quantity;
      },
      0
    );
  },

  /**
   * Calculates the total price of all items in the cart.
   * @returns {number} - Total price.
   */
  getTotalPrice: function () {
    return _.reduce(
      this.get("items"),
      function (sum, item) {
        return sum + item.price * item.quantity;
      },
      0
    );
  },

  /**
   * Clears all items from the cart.
   */
  clearCart: function () {
    this.set("items", []);
    // saveCart will be called automatically due to 'change:items' event
  },
});

// Initialize a single instance of the Cart model for the application
App.cart = new App.Models.Cart();
