const express = require("express");
const path = require("path");

const { setupRouteTracking } = require("./routesTracker.js");
const { docsHandler } = require("./routesDocs");


module.exports = {
  setupRouteTracking,
  docsHandler
};
