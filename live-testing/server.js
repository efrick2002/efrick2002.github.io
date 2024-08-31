const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  // Resolve the file path relative to the root directory
  let filePath = path.join(__dirname, '..', req.url === '/' ? 'index.html' : req.url);

  // Get the file extension
  const extname = path.extname(filePath);

  // Set the default content type
  let contentType = 'text/html';

  // Set the content type based on the file extension
  switch (extname) {
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.css':
      contentType = 'text/css';
      break;
    case '.json':
      contentType = 'application/json';
      break;
    case '.png':
      contentType = 'image/png';
      break;
    case '.jpg':
      contentType = 'image/jpg';
      break;
    case '.gif':
      contentType = 'image/gif';
      break;
    case '.wav':
      contentType = 'audio/wav';
      break;
    case '.mp4':
      contentType = 'video/mp4';
      break;
    case '.woff':
      contentType = 'application/font-woff';
      break;
    case '.ttf':
      contentType = 'application/font-ttf';
      break;
    case '.eot':
      contentType = 'application/vnd.ms-fontobject';
      break;
    case '.otf':
      contentType = 'application/font-otf';
      break;
    case '.svg':
      contentType = 'application/image/svg+xml';
      break;
  }

  // Read the file from the file system
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code == 'ENOENT') {
        // File not found
        fs.readFile(path.join(__dirname, '..', '404.html'), (err, content) => {
          if (err) {
            res.writeHead(500);
            res.end('Error loading 404.html');
          } else {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end(content, 'utf-8');
          }
        });
      } else {
        // Some server error
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      // Success
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

// Start the server
const PORT = 8080;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
