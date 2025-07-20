# 📘 express-route-docs

[![npm version](https://img.shields.io/npm/v/express-route-docs.svg)](https://www.npmjs.com/package/express-route-docs)
[![License](https://img.shields.io/npm/l/express-route-docs.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen)](https://nodejs.org/)
[![Build](https://img.shields.io/github/actions/workflow/status/DeepakSarun/express-route-docs/node.js.yml?branch=main)](https://github.com/DeepakSarun/express-route-docs/actions)

> Instantly document your Express routes with a clean and developer-friendly `/docs` page.

---

## 🚀 Features

- 📄 Auto-generates a visual list of all your registered Express routes
- 🔍 Clean and copyable format for developers
- ⚙️ Works seamlessly in dev or production without hardcoding ports
- 🎨 Easy to customize CSS and layout

---

## 📦 Installation

```bash
npm install express-route-docs
````

---

## 🔧 Usage

1. **Set up your Express server:**

```js
// index.js
const express = require("express");
const { setupRouteTracking, docsHandler } = require("express-route-docs");

const app = express();

// Track all routes dynamically
setupRouteTracking(app);

// Define your API routes
app.get("/", (req, res) => res.send("Welcome"));
app.post("/submit", (req, res) => res.send("Submitted"));
app.delete("/user", (req, res) => res.send("User deleted"));

// Serve docs
app.get("/docs", docsHandler);

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🚀 Docs available at http://localhost:${port}/docs`);
});
```

2. **Optionally include CSS customization**
   You can override the default styles by placing a CSS file in a `public` directory.

---

## 📁 Folder Structure

```
project-root/
├── index.js
├── public/
│   └── style.css (optional)
```

---

## 🧪 Example Output

> Go to `http://localhost:3000/docs`
> You’ll see a clean, centered list of your routes, ideal for internal dev teams.

---

## 🧑‍💻 Author

**Deepak Sarun Yuvachandran**
[GitHub](https://github.com/DeeapakSarun)
[Portfolio](https://jobquestgame.netlify.app/)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

