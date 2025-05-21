/**
 * AJAX Utilities
 * Centralized handling of API requests with loader functionality
 */

var AjaxUtils = {
  /**
   * Make an AJAX request with standardized error handling and loading indicator
   * @param {Object} options - Configuration options for the request
   * @param {string} options.url - The URL to make the request to
   * @param {string} options.method - HTTP method (GET, POST, etc.)
   * @param {Object} options.data - Data to send with the request
   * @param {Function} options.success - Success callback function
   * @param {Function} options.error - Error callback function
   * @param {boolean} options.showLoader - Whether to show the loader (default: true)
   * @param {number} options.timeout - Request timeout in milliseconds
   */
  request: function (options) {
    var self = this;
    var showLoader = options.showLoader !== false;
    var timeout = options.timeout || APP_CONFIG.TIMEOUTS.DEFAULT;

    // Show loader if required
    if (showLoader) {
      UIUtils.showLoader();
    }

    // Prepare the request URL
    var url = options.url;
    if (!url.startsWith("http")) {
      url = APP_CONFIG.API.BASE_URL + url;
    }

    // Make the AJAX request
    $.ajax({
      url: url,
      type: options.method || "GET",
      data:
        options.method === "GET" ? options.data : JSON.stringify(options.data),
      contentType: "application/json",
      timeout: timeout,
      headers: self.getHeaders(),
      success: function (response) {
        if (showLoader) {
          UIUtils.hideLoader();
        }

        if (options.success) {
          options.success(response);
        }
      },
      error: function (xhr, status, error) {
        if (showLoader) {
          UIUtils.hideLoader();
        }

        // Handle different error scenarios
        var errorMessage = APP_STRINGS.ERROR_GENERIC;

        if (status === "timeout") {
          errorMessage = APP_STRINGS.NETWORK_ERROR;
        } else if (xhr.responseJSON && xhr.responseJSON.message) {
          errorMessage = xhr.responseJSON.message;
        }

        console.error("API Error:", status, error, xhr.responseText);

        if (options.error) {
          options.error(errorMessage, xhr);
        }
      },
    });
  },

  /**
   * Get request headers including authentication if available
   * @returns {Object} Headers object
   */
  getHeaders: function () {
    var headers = {
      "Content-Type": "application/json",
    };

    // Add authentication token if available
    var authToken = StorageUtils.get(APP_CONFIG.STORAGE.AUTH_TOKEN);
    if (authToken) {
      headers["Authorization"] = "Bearer " + authToken;
    }

    return headers;
  },

  /**
   * Convenience method for GET requests
   * @param {string} url - API endpoint
   * @param {Object} data - Query parameters
   * @param {Function} successCallback - Success callback
   * @param {Function} errorCallback - Error callback
   * @param {boolean} showLoader - Whether to show loader
   */
  get: function (url, data, successCallback, errorCallback, showLoader) {
    this.request({
      url: url,
      method: "GET",
      data: data,
      success: successCallback,
      error: errorCallback,
      showLoader: showLoader,
    });
  },

  /**
   * Convenience method for POST requests
   * @param {string} url - API endpoint
   * @param {Object} data - Request body
   * @param {Function} successCallback - Success callback
   * @param {Function} errorCallback - Error callback
   * @param {boolean} showLoader - Whether to show loader
   */
  post: function (url, data, successCallback, errorCallback, showLoader) {
    this.request({
      url: url,
      method: "POST",
      data: data,
      success: successCallback,
      error: errorCallback,
      showLoader: showLoader,
    });
  },
};
