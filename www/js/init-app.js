// Initialize App Global Namespace and its properties
// This ensures that App and its sub-namespaces are objects before other scripts try to add to them.

var App = App || {}; // Ensure App itself is an object

App.Models = App.Models || {};
App.Collections = App.Collections || {};
App.Views = App.Views || {};
App.Routers = App.Routers || {}; // Ensures App.Routers is an object
App.Controllers = App.Controllers || {};
App.Utils = App.Utils || {};
App.Config = App.Config || {};
App.Templates = App.Templates || {};
