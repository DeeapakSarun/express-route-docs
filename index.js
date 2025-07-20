const express = require("express");
const path = require("path");

const { setupRouteTracking } = require("./routesTracker.js");
const { docsHandler } = require("./routesDocs");

function expressRouteDocs(app, options = {}) {
  // Enable tracking
  setupRouteTracking(app);

  // Serve static assets
  app.use("/docs/static", express.static(path.join(__dirname, "public")));

  // Register the docs route
  app.get("/docs", docsHandler);
}

module.exports = {
  expressRouteDocs,
};
