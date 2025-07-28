// import { createServer } from "http";
// import { readFile, writeFile } from "fs/promises";
// import { existsSync, createReadStream } from "fs";
// import path from "path";
// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Load links
// async function loadLinks() {
//   const dataPath = path.join(__dirname, "data", "links.json");
//   const data = await readFile(dataPath, "utf-8");
//   return JSON.parse(data);
// }

// // Save links
// async function saveLinks(links) {
//   const dataPath = path.join(__dirname, "data", "links.json");
//   await writeFile(dataPath, JSON.stringify(links, null, 2));
// }

// // Create server
// createServer(async (req, res) => {
//   console.log(req.method, req.url);

//   // Serve static files
//   const filePath = path.join(__dirname, "public", req.url === "/" ? "index.html" : req.url);
//   if (existsSync(filePath) && req.method === "GET") {
//     const ext = path.extname(filePath);
//     const contentType = {
//       ".html": "text/html",
//       ".css": "text/css",
//       ".js": "application/javascript"
//     }[ext] || "text/plain";

//     res.writeHead(200, { "Content-Type": contentType });
//     createReadStream(filePath).pipe(res);
//     return;
//   }

//   // Handle POST /shorten
//   if (req.method === "POST" && req.url === "/shorten") {
//     let body = "";
//     req.on("data", chunk => body += chunk);
//     req.on("end", async () => {
//       try {
//         const { url, shortCode } = JSON.parse(body);
//         const links = await loadLinks();

//         if (links[shortCode]) {
//           res.writeHead(400, { "Content-Type": "text/plain" });
//           res.end("Short code already exists");
//           return;
//         }

//         links[shortCode] = url;
//         await saveLinks(links);

//         res.writeHead(200, { "Content-Type": "text/plain" });
//         res.end("Short URL saved");
//       } catch (err) {
//         res.writeHead(500, { "Content-Type": "text/plain" });
//         res.end("Error processing request");
//       }
//     });
//     return;
//   }

//   // Redirect if shortCode exists
//   if (req.method === "GET") {
//     const shortCode = req.url.slice(1); // remove '/'
//     const links = await loadLinks();
//     if (links[shortCode]) {
//       res.writeHead(301, { Location: links[shortCode] });
//       res.end();
//       return;
//     }
//   }

//   // 404 Not Found
//   res.writeHead(404, { "Content-Type": "text/plain" });
//   res.end("404 Not Found");
// }).listen(3006, () => {
//   console.log("Server running at http://localhost:3006");
// });



// import http from "http";
// import fs from "fs";
// import path from "path";
// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const linksPath = path.join(__dirname, "data", "links.json");
// const publicDir = path.join(__dirname, "public");

// function loadLinks() {
//   if (!fs.existsSync(linksPath)) return {};
//   return JSON.parse(fs.readFileSync(linksPath, "utf-8"));
// }

// function saveLinks(links) {
//   fs.writeFileSync(linksPath, JSON.stringify(links, null, 2));
// }

// http.createServer((req, res) => {
//   if (req.method === "GET") {
//     if (req.url === "/") {
//       const html = fs.readFileSync(path.join(publicDir, "index.html"));
//       res.writeHead(200, { "Content-Type": "text/html" });
//       res.end(html);
//     } else if (req.url === "/style.css") {
//       const css = fs.readFileSync(path.join(publicDir, "style.css"));
//       res.writeHead(200, { "Content-Type": "text/css" });
//       res.end(css);
//     } else {
//       const shortCode = req.url.slice(1);
//       const links = loadLinks();
//       if (links[shortCode]) {
//         res.writeHead(301, { Location: links[shortCode] });
//         res.end();
//       } else {
//         res.writeHead(404);
//         res.end("Not Found");
//       }
//     }else if (req.url==="/links"){
//       const links=await loadLinks();
//       res.writeHead(200,{"Content-Type":"application/json"});
//       return res.end(JSON.stringify(links));
//   }
//   }
//   if (req.method === "POST" && req.url === "/shorten") {
//     const links=await loadLinks();
//     let body = "";
//     req.on("data", chunk => body += chunk);
//     req.on("end", () => {
//       const { url, shortCode } = JSON.parse(body);
//       const links = loadLinks();

//       if (links[shortCode]) {
//         res.writeHead(400);
//         res.end("Short code already exists");
//         return;
//       }

//       links[shortCode] = url;
//       saveLinks(links);

//       console.log(`Short URL: http://localhost:3006/${shortCode}`);

//       res.writeHead(200);
//       res.end("Short URL saved");
//     });
//   }
// }).listen(3006, () => {
//   console.log("Server running at http://localhost:3006");
// });


// import http from "http";
// import fs from "fs";
// import path from "path";
// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const linksPath = path.join(__dirname, "data", "links.json");
// const publicDir = path.join(__dirname, "public");

// function loadLinks() {
//   if (!fs.existsSync(linksPath)) return {};
//   return JSON.parse(fs.readFileSync(linksPath, "utf-8"));
// }

// function saveLinks(links) {
//   fs.writeFileSync(linksPath, JSON.stringify(links, null, 2));
// }

// http.createServer((req, res) => {
//   if (req.method === "GET") {
//     if (req.url === "/") {
//       const html = fs.readFileSync(path.join(publicDir, "index.html"));
//       res.writeHead(200, { "Content-Type": "text/html" });
//       res.end(html);
//     } else if (req.url === "/style.css") {
//       const css = fs.readFileSync(path.join(publicDir, "style.css"));
//       res.writeHead(200, { "Content-Type": "text/css" });
//       res.end(css);
//     } else if (req.url === "/links") {
//       const links = loadLinks();
//       res.writeHead(200, { "Content-Type": "application/json" });
//       res.end(JSON.stringify(links));
//     } else {
//       const shortCode = req.url.slice(1);
//       const links = loadLinks();
//       if (links[shortCode]) {
//         res.writeHead(301, { Location: links[shortCode] });
//         res.end();
//       } else {
//         res.writeHead(404);
//         res.end("Not Found");
//       }
//     }
//   }

//   if (req.method === "POST" && req.url === "/shorten") {
//     let body = "";
//     req.on("data", chunk => body += chunk);
//     req.on("end", () => {
//       const { url, shortCode } = JSON.parse(body);
//       const links = loadLinks();

//       if (links[shortCode]) {
//         res.writeHead(400);
//         res.end("Short code already exists");
//         return;
//       }

//       links[shortCode] = url;
//       saveLinks(links);

//       console.log(`Short URL: http://localhost:3006/${shortCode}`);
//       res.writeHead(200);
//       res.end("Short URL saved");
//     });
//   }
// }).listen(3006, () => {
//   console.log("Server running at http://localhost:3006");
// });
// import http from "http";
// import fs from "fs";
// import path from "path";
// import { fileURLToPath } from "url";

// // Get current file & directory
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Paths
// const linksPath = path.join(__dirname, "data", "links.json");
// const publicDir = path.join(__dirname, "public");

// // Helper functions
// function loadLinks() {
//   if (!fs.existsSync(linksPath)) return {};
//   return JSON.parse(fs.readFileSync(linksPath, "utf-8"));
// }

// function saveLinks(links) {
//   fs.writeFileSync(linksPath, JSON.stringify(links, null, 2));
// }

// // Create server
// http.createServer((req, res) => {
//   const method = req.method;
//   const url = req.url;

//   if (method === "GET") {
//     if (url === "/") {
//       const html = fs.readFileSync(path.join(publicDir, "index.html"));
//       res.writeHead(200, { "Content-Type": "text/html" });
//       res.end(html);
//     } else if (url === "/style.css") {
//       const css = fs.readFileSync(path.join(publicDir, "style.css"));
//       res.writeHead(200, { "Content-Type": "text/css" });
//       res.end(css);
//     } else if (url === "/links") {
//       const links = loadLinks();
//       res.writeHead(200, { "Content-Type": "application/json" });
//       res.end(JSON.stringify(links));
//     } else {
//       // Redirection logic
//       const shortCode = url.slice(1);
//       const links = loadLinks();
//       if (links[shortCode]) {
//         res.writeHead(301, { Location: links[shortCode] });
//         res.end();
//       } else {
//         res.writeHead(404, { "Content-Type": "text/plain" });
//         res.end("Short URL not found");
//       }
//     }
//   }

//   // POST request to shorten a URL
//   if (method === "POST" && url === "/shorten") {
//     let body = "";
//     req.on("data", chunk => body += chunk);
//     req.on("end", () => {
//       const { url, shortCode } = JSON.parse(body);
//       const links = loadLinks();

//       if (links[shortCode]) {
//         res.writeHead(400, { "Content-Type": "text/plain" });
//         res.end("Short code already exists");
//         return;
//       }

//       links[shortCode] = url;
//       saveLinks(links);

//       // ✅ Console output like Thapa
//       console.log(`🔗 Shortened: http://localhost:3006/${shortCode}`);

//       res.writeHead(200, { "Content-Type": "text/plain" });
//       res.end("Short URL saved");
//     });
//   }

// }).listen(3006, () => {
//   console.log("🚀 Server running at http://localhost:3006");
// });



// import http from "http";
// import fs from "fs";
// import path from "path";
// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const linksPath = path.join(__dirname, "data", "links.json");
// const publicDir = path.join(__dirname, "public");

// function loadLinks() {
//   if (!fs.existsSync(linksPath)) return {};
//   return JSON.parse(fs.readFileSync(linksPath, "utf-8"));
// }

// function saveLinks(links) {
//   fs.writeFileSync(linksPath, JSON.stringify(links, null, 2));
// }

// http.createServer((req, res) => {
//   if (req.method === "GET") {
//     if (req.url === "/") {
//       const html = fs.readFileSync(path.join(publicDir, "index.html"));
//       res.writeHead(200, { "Content-Type": "text/html" });
//       res.end(html);
//     } else if (req.url === "/style.css") {
//       const css = fs.readFileSync(path.join(publicDir, "style.css"));
//       res.writeHead(200, { "Content-Type": "text/css" });
//       res.end(css);
//     } else {
//       const shortCode = req.url.slice(1);
//       const links = loadLinks();
//       if (links[shortCode]) {
//         res.writeHead(301, { Location: links[shortCode] });
//         res.end();
//       } else {
//         res.writeHead(404);
//         res.end("Not Found");
//       }
//     }else if (req.url==="/links"){
//       const links=await loadLinks();
//       res.writeHead(200,{"Content-Type":"application/json"});
//       return res.end(JSON.stringify(links));
//   }
//   }
//   if (req.method === "POST" && req.url === "/shorten") {
//     const links=await loadLinks();
//     let body = "";
//     req.on("data", chunk => body += chunk);
//     req.on("end", () => {
//       const { url, shortCode } = JSON.parse(body);
//       const links = loadLinks();

//       if (links[shortCode]) {
//         res.writeHead(400);
//         res.end("Short code already exists");
//         return;
//       }

//       links[shortCode] = url;
//       saveLinks(links);

//       console.log(`Short URL: http://localhost:3006/${shortCode}`);

//       res.writeHead(200);
//       res.end("Short URL saved");
//     });
//   }
// }).listen(3006, () => {
//   console.log("Server running at http://localhost:3006");
// });


import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const linksPath = path.join(__dirname, "data", "links.json");
const publicDir = path.join(__dirname, "public");

function loadLinks() {
  if (!fs.existsSync(linksPath)) return {};
  return JSON.parse(fs.readFileSync(linksPath, "utf-8"));
}

function saveLinks(links) {
  fs.writeFileSync(linksPath, JSON.stringify(links, null, 2));
}

http.createServer((req, res) => {
  if (req.method === "GET") {
    if (req.url === "/") {
      const html = fs.readFileSync(path.join(publicDir, "index.html"));
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(html);
    } else if (req.url === "/style.css") {
      const css = fs.readFileSync(path.join(publicDir, "style.css"));
      res.writeHead(200, { "Content-Type": "text/css" });
      res.end(css);
    } else if (req.url === "/links") {
      const links = loadLinks(); // ✅ await hata diya
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(links));
    } else {
      const shortCode = req.url.slice(1);
      const links = loadLinks();
      console.log("links red.",req.url);
      
      if (links[shortCode]) {
        res.writeHead(301, { Location: links[shortCode] });
        res.end();
      } else {
        res.writeHead(404);
        res.end("Not Found");
      }
    }
  }

  else if (req.method === "POST" && req.url === "/shorten") {
    let body = "";
    req.on("data", chunk => body += chunk);
    req.on("end", () => {
      const { url, shortCode } = JSON.parse(body);
      const links = loadLinks(); // ✅ yeh line already hai, dobara likhne ki zarurat nahi thi

      if (links[shortCode]) {
        res.writeHead(400);
        res.end("Short code already exists");
        return;
      }

      links[shortCode] = url;
      saveLinks(links);

      console.log(`Short URL: http://localhost:3006/${shortCode}`);

      res.writeHead(200);
      res.end("Short URL saved");
    });
  }

}).listen(3006, () => {
  console.log("Server running at http://localhost:3006");
});