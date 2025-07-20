const httpMethods = ['get', 'post', 'put', 'delete', 'patch', 'head', 'options', 'all'];

let registeredRoutes = [];

function setupRouteTracking(app) {
  httpMethods.forEach(method => {
    const originalMethod = app[method];
    app[method] = function(path, ...handlers) {
      if (typeof path === 'string') {
        registeredRoutes.push({
          method: method.toUpperCase(),
          path
        });
      }
      return originalMethod.call(this, path, ...handlers);
    };
  });
}

function getRoutes() {
  const hiddenRoutes = ['/docs', 'env', 'etag fn'];
  const unique = new Map();
  for (const route of registeredRoutes) {
    const key = `${route.method} ${route.path}`;
    if (!unique.has(key) && !hiddenRoutes.includes(route.path)) {
      unique.set(key, route);
    }
  }
  return Array.from(unique.values());
}

module.exports = { setupRouteTracking, getRoutes };
