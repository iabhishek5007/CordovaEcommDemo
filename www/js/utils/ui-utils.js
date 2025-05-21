/**
 * UI Utilities
 * Handles common UI operations like showing/hiding loader
 */

var UIUtils = {
  /**
   * Show the loading indicator
   */
  showLoader: function () {
    $("#loader").removeClass("hidden");
  },

  /**
   * Hide the loading indicator
   */
  hideLoader: function () {
    $("#loader").addClass("hidden");
  },

  /**
   * Show an error message
   * @param {string} message - Error message to display
   * @param {string} selector - jQuery selector for error container (default: '.error-message')
   */
  showError: function (message, selector) {
    var errorContainer = selector ? $(selector) : $(".error-message");
    errorContainer.text(message).removeClass("hidden");

    // Auto-hide after 5 seconds
    setTimeout(function () {
      errorContainer.addClass("hidden");
    }, 5000);
  },

  /**
   * Hide error message
   * @param {string} selector - jQuery selector for error container (default: '.error-message')
   */
  hideError: function (selector) {
    var errorContainer = selector ? $(selector) : $(".error-message");
    errorContainer.addClass("hidden");
  },

  /**
   * Create and show a toast notification
   * @param {string} message - Message to display
   * @param {string} type - Notification type (success, error, info)
   * @param {number} duration - Duration in milliseconds
   */
  showToast: function (message, type, duration) {
    // Remove any existing toasts
    $(".toast").remove();

    // Set defaults
    type = type || "info";
    duration = duration || 3000;

    // Create toast element
    var toast = $(
      '<div class="toast toast-' + type + '">' + message + "</div>"
    );
    $("body").append(toast);

    // Show the toast
    setTimeout(function () {
      toast.addClass("show");
    }, 10);

    // Hide and remove after duration
    setTimeout(function () {
      toast.removeClass("show");
      setTimeout(function () {
        toast.remove();
      }, 300);
    }, duration);
  },
};
