const path = require("path");
const fs = require("fs");
const { getRoutes } = require("./routesTracker.js");

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
    <style> 
    /* public/styles.css */

body {
  font-family: 'Segoe UI', Roboto, sans-serif;
  max-width: 900px;
  margin: 2rem auto;
  padding: 1.5rem 1rem;
  background: #121212; /* Greyish black */
  color: #e0e0e0;
  line-height: 1.6;
}

h1 {
  text-align: center;
  font-size: 2.25rem;
  font-weight: 600;
  margin-bottom: 3rem;
  color: #d1d5db;
  text-shadow: 0 0 4px #7f7f7f;
}

/* ====================
   Method Labels
   ==================== */
.method {
  font-weight: 700;
  color: #121212;
  padding: 0.4rem 1rem;
  border-radius: 20px;
  display: inline-block;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  box-shadow: 0 0 6px rgba(255, 255, 255, 0.15);
  transition: transform 0.2s ease, box-shadow 0.3s ease;
}

.method:hover {
  transform: scale(1.05);
  box-shadow: 0 0 12px rgba(255, 255, 255, 0.25);
}

.GET {
  background-color: #16a34a;
  box-shadow: 0 0 8px #16a34aaa;
}

.POST {
  background-color: #2563eb;
  box-shadow: 0 0 8px #2563ebaa;
}

.PUT {
  background-color: #d97706;
  box-shadow: 0 0 8px #d97706aa;
}

.DELETE {
  background-color: #dc2626;
  box-shadow: 0 0 8px #dc2626aa;
}

.PATCH {
  background-color: #7c3aed;
  box-shadow: 0 0 8px #7c3aedaa;
}

.OPTIONS,
.HEAD,
.ALL {
  background-color: #4b5563;
  box-shadow: 0 0 6px #4b5563aa;
}

/* ====================
   Route Blocks
   ==================== */
.route {
  background: #1e1e1e;
  border-left: 4px solid #2563eb;
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 1.75rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  transition: box-shadow 0.3s ease, border-color 0.3s ease;
}

.route:hover {
  border-color: #3b82f6;
  box-shadow: 0 0 20px rgba(59, 130, 246, 0.35);
}

.route-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}

.route-path {
  font-family: 'SFMono-Regular', Consolas, monospace;
  font-size: 1rem;
  color: #f1f5f9;
  margin-left: 0.75rem;
  flex-grow: 1;
  word-break: break-word;
  user-select: text;
}

/* ====================
   Form Elements
   ==================== */
label {
  font-weight: 600;
  font-size: 0.85rem;
  margin-top: 1.25rem;
  display: block;
  color: #a1a1aa;
}

textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  font-family: 'SFMono-Regular', Consolas, monospace;
  font-size: 0.9rem;
  border: 1px solid #3b82f666;
  border-radius: 6px;
  resize: vertical;
  margin-top: 0.5rem;
  color: #f3f4f6;
  background: #2a2a2a;
  box-sizing: border-box; /* ✅ Fix overflow */
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

textarea:focus {
  outline: none;
  border-color: #60a5fa;
  box-shadow: 0 0 8px #60a5faaa;
}

/* ====================
   Button
   ==================== */
button {
  background: #2563eb;
  color: white;
  padding: 0.6rem 1.4rem;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 1.25rem;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  user-select: none;
  box-shadow: 0 0 10px #2563eb88;
}

button:hover:not(:disabled) {
  background-color: #3b82f6;
  box-shadow: 0 0 16px #3b82f6cc;
}

button:disabled {
  background-color: #4b5563;
  cursor: not-allowed;
  box-shadow: none;
}

/* ====================
   Code Block
   ==================== */
pre {
  background: #2a2a2a;
  border-radius: 6px;
  padding: 1rem 1.25rem;
  font-size: 0.85rem;
  margin-top: 1.25rem;
  white-space: pre-wrap;
  word-break: break-word;
  overflow-x: auto;
  border-left: 4px solid #2563eb;
  color: #e5e7eb;
  font-family: 'SFMono-Regular', Consolas, monospace;
  display: none;
}

    </style>
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
