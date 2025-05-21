# Cordova E-Commerce App

A cross-platform e-commerce mobile application built with Apache Cordova, Backbone.js, and jQuery. This project demonstrates a modular architecture for authentication, product browsing, and user management, suitable for beginners and developers looking to extend or customize a Cordova-based app.

## Features
- User authentication (login/logout)
- Persistent user sessions using local storage
- Modular MVC structure with Backbone.js
- Responsive UI (mobile-first)
- Easily extensible for new features (products, cart, etc.)

## Technology Stack
- [Apache Cordova](https://cordova.apache.org/): Cross-platform mobile development
- [Backbone.js](https://backbonejs.org/): MVC structure for JavaScript apps
- [jQuery](https://jquery.com/): DOM manipulation and AJAX
- HTML5, CSS3 (responsive design)

## Folder Structure
```
cordovaEcomm/
├── www/
│   ├── css/           # Stylesheets
│   ├── img/           # Images
│   ├── index.html     # App entry point
│   └── js/
│       ├── app.js
│       ├── constants/
│       ├── controllers/
│       │   └── auth-controller.js
│       ├── models/
│       │   └── user-model.js
│       ├── router.js
│       ├── utils/
│       └── views/
├── config.xml         # Cordova config
├── package.json       # Project metadata
└── ...
```

## Quick Start
1. **Install dependencies:**
   ```
   npm install
   ```
2. **Add Cordova platforms:**
   ```
   cordova platform add browser
   cordova platform add android
   ```
3. **Run in browser:**
   ```
   cordova run browser
   ```
4. **Build for Android:**
   ```
   cordova build android
   ```

## Authentication Flow
- **Login:**
  - The login view is shown via `AuthController.showLoginView()` (<mcfile name="auth-controller.js" path="www/js/controllers/auth-controller.js"></mcfile>).
  - User submits credentials; `handleLogin` calls `UserModel.login()` (<mcfile name="user-model.js" path="www/js/models/user-model.js"></mcfile>).
  - On success, user info is stored and session persists.
- **Logout:**
  - `AuthController.logout()` clears user data and navigates to login.

## Key Files
- **Controllers:**
  - `www/js/controllers/auth-controller.js` – Handles authentication logic
- **Models:**
  - `www/js/models/user-model.js` – User data and authentication methods
- **Router:**
  - `www/js/router.js` – Navigates between views (login, main, etc.)
- **Views:**
  - `www/js/views/` – UI components (login, dashboard, etc.)
- **Utils:**
  - `www/js/utils/` – Utility functions (AJAX, storage)

## Customization Tips
- Add new models/views in their respective folders for new features (e.g., products, cart).
- Update `router.js` to add new routes and navigation logic.
- Use `StorageUtils` for persistent data.

## Learn More
- [Cordova Documentation](https://cordova.apache.org/docs/en/latest/)
- [Backbone.js Guide](https://backbonejs.org/#Getting-started)
- [jQuery API](https://api.jquery.com/)

---

## ✨ Builder

Built and maintained with passion for modular, scalable, and beginner-friendly mobile commerce solutions. 💻📚

---

# Step-by-Step Flow to Understand This Project

## 1. index.html
- The entry point of the app. It loads all CSS and JS files and contains the main container (`#app-container`) where views are rendered.

## 2. js/init-app.js
- Initializes the global App namespace and its sub-namespaces (Models, Views, Controllers, etc.) to avoid undefined errors.

## 3. js/app.js
- Sets up the main router and starts the Backbone history. It decides which controller/view to show based on the URL (login or products).

## 4. js/router.js
- Defines routes like `login` and `products`. When a route is triggered, it calls the relevant controller method (e.g., `authController.showLoginView()` for login).

## 5. js/controllers/auth-controller.js
- Handles authentication logic. When `showLoginView` is called, it creates a `LoginView` and passes a callback for login handling.

## 6. js/views/login-view.js
- Renders the login form. When the user submits, it calls the `onLogin` callback with the entered username and password.

## 7. js/models/user-model.js
- Contains the User model. The `login` method sends an AJAX request to the API. On success, it saves user info and calls the success callback.

## 8. js/utils/ajax-utils.js
- Centralizes AJAX requests and handles showing/hiding the loader and error messages.

## 9. js/controllers/product-controller.js
- After login, this controller is used to fetch and display products. It creates a `ProductView` and fetches product data from the API.

## 10. js/views/product-view.js
- Renders the product list and shows a welcome message using the stored username.

## 11. js/models/product-model.js
- Manages product data and fetching logic.

## 12. js/constants/strings.js & config.js
- Store all UI strings and API endpoints/configuration.

### Example: Login Flow
1. User opens app (`index.html`), router checks URL.
2. Router triggers `authController.showLoginView()` (from `router.js`).
3. `auth-controller.js` creates `LoginView`.
4. User submits login form (`login-view.js`), which calls `userModel.login()` (`user-model.js`).
5. `user-model.js` sends AJAX request (`ajax-utils.js`).
6. On success, user info is saved and router navigates to products.

### Example: Product Flow
1. Router triggers `productController.showProductsView()`.
2. `product-controller.js` creates `ProductView` and fetches products.
3. Products are fetched via AJAX and rendered in `product-view.js`.
4. Welcome message uses username from stored user info.

This sequence helps you trace the flow from user action to code execution, making it easier to understand and debug the project.

**Happy coding!**