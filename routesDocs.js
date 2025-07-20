const path = require("path");
const fs = require("fs");
const { getRoutes } = require("./routesTracker");

const cssFileName = "/styles.css";  // served from /public


function docsHandler(req, res) {
  const routes = getRoutes();

  const methodColors = {
    GET: "#22c55e",
    POST: "#3b82f6",
    PUT: "#f59e0b",
    DELETE: "#ef4444",
    PATCH: "#8b5cf6",
    OPTIONS: "#64748b",
    HEAD: "#64748b",
    ALL: "#64748b"
  };

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Express-Docs</title>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link rel="stylesheet" href="${cssFileName}">
      <link rel="icon" type="image/png" href="/favicon.png" />
    </head>
    <body>
      <div class="container">
        <h1>🚀 Express Routes Docs</h1>
        ${routes.map(route => {
          const borderColor = methodColors[route.method] || '#64748b';
          return `
            <div class="route" style="border-left-color: ${borderColor};">
              <div class="route-header">
                <span class="method" style="background: ${borderColor};">${route.method}</span>
                <span class="route-path">${route.path}</span>
              </div>
              ${['POST', 'PUT', 'PATCH'].includes(route.method) ? `
                <label>Request Body (JSON):</label>
                <textarea rows="4" placeholder='{"key":"value"}'></textarea>
              ` : ''}
              <button>Send Request</button>
              <pre></pre>
            </div>
          `;
        }).join("")}
      </div>
      <script>
        document.querySelectorAll(".route").forEach(routeEl => {
          const btn = routeEl.querySelector("button");
          const pre = routeEl.querySelector("pre");
          const textarea = routeEl.querySelector("textarea");
          const method = routeEl.querySelector(".method").textContent;
          const path = routeEl.querySelector(".route-path").textContent;

          btn.onclick = async () => {
            btn.disabled = true;
            pre.style.display = "block";
            pre.textContent = "⏳ Sending request...";

            let options = {
              method,
              headers: { "Content-Type": "application/json" }
            };

            if (textarea) {
              const raw = textarea.value.trim();
              if (raw) {
                try {
                  options.body = JSON.stringify(JSON.parse(raw));
                } catch (e) {
                  pre.textContent = "❌ Invalid JSON: " + e.message;
                  btn.disabled = false;
                  return;
                }
              } else {
                options.body = "{}";
              }
            }

            try {
              const res = await fetch(path, options);
              const contentType = res.headers.get("content-type") || "";
              let text = \`Status: \${res.status} \${res.statusText}\\n\`;
              text += \`Content-Type: \${contentType}\\n\\n\`;

              if (contentType.includes("application/json")) {
                const json = await res.json();
                text += JSON.stringify(json, null, 2);
              } else {
                text += await res.text();
              }

              pre.textContent = text;
            } catch (err) {
              pre.textContent = "❌ Request failed: " + err.message;
            } finally {
              btn.disabled = false;
            }
          };
        });
      </script>
    </body>
    </html>
  `;

  res.send(html);
}

module.exports = {docsHandler };
