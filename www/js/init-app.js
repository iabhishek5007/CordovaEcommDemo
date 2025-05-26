// Initialize App Global Namespace and its properties
// This ensures that App and its sub-namespaces are objects before other scripts try to add to them.

var App = App || {}; // Ensure App itself is an object

App.Models = App.Models || {};
App.Collections = App.Collections || {};
App.Views = App.Views || {};
App.Routers = App.Routers || {}; // Ensures App.Routers is an object
App.Controllers = App.Controllers || {};
App.Utils = App.Utils || {};
App.Utils.Storage = StorageUtils; // Make StorageUtils available under App.Utils.Storage
App.Utils.UI = UIUtils; // Make UIUtils available under App.Utils.UI
App.Config = App.Config || {};
App.Config.STORAGE_KEYS = APP_CONFIG.STORAGE; // Make storage keys available
App.Templates = App.Templates || {};

// Initialize a single instance of the Cart model for the application
// This needs to be done after App.Utils.Storage and App.Config.STORAGE_KEYS are set
// App.cart = new App.Models.Cart(); // This will be initialized in cart-model.js itself to ensure correct loading order

//Above is to create a single global namespace (App) and
// organize your application's components into logical sub-namespaces (like Models, Views, Routers, etc.).

/*
 Why it's used
1. Avoids polluting the global namespace
Instead of creating a lot of global variables (which can cause conflicts), everything is stored under one global object: App.

2. Organized project structure
It keeps code modular and easier to maintain by grouping logic:

App.Models → for Backbone models (e.g., UserModel)

App.Views → for Backbone views (e.g., LoginView)

App.Routers → for routing logic (e.g., LoginRouter)

App.Controllers → for controller logic if following MVC strictly

App.Config → for constants, URLs, settings

App.Utils → for utility/helper functions

App.Templates → for compiled HTML templates (like Underscore or Handlebars)



3. Prevents overwriting existing namespaces
Each line like App.Models = App.Models || {}; means:

If App.Models already exists, use it.

Otherwise, create a new empty object.
*/
