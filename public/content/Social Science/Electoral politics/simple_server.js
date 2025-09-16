/**
 * Electoral Politics Interactive Lesson
 * Simple Node.js server for local development
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

// Port configuration
const PORT = 3006;

// MIME types for different file extensions
const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.mp3': 'audio/mpeg',
    '.wav': 'audio/wav',
    '.pdf': 'application/pdf',
    '.ttf': 'font/ttf',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.eot': 'application/vnd.ms-fontobject',
    '.otf': 'font/otf'
};

// Create HTTP server
const server = http.createServer((req, res) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    
    // Handle favicon requests
    if (req.url === '/favicon.ico') {
        res.statusCode = 204; // No content
        res.end();
        return;
    }
    
    // Parse URL to get the file path
    let filePath = '.' + req.url;
    if (filePath === './') {
        filePath = './index.html';
    }
    
    // Get file extension
    const extname = path.extname(filePath);
    
    // Set default content type to text/plain
    let contentType = MIME_TYPES[extname] || 'text/plain';
    
    // Read file
    fs.readFile(filePath, (err, content) => {
        if (err) {
            // If file not found
            if (err.code === 'ENOENT') {
                console.error(`File not found: ${filePath}`);
                fs.readFile('./index.html', (err, content) => {
                    if (err) {
                        // If even index.html is not found
                        res.writeHead(500);
                        res.end('Error: Server cannot find index.html');
                    } else {
                        // Serve index.html instead
                        res.writeHead(200, { 'Content-Type': 'text/html' });
                        res.end(content, 'utf-8');
                    }
                });
            } else {
                // Server error
                console.error(`Server error: ${err.code}`);
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        } else {
            // Success - file found
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

// Start server
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
    console.log(`Press Ctrl+C to stop the server`);
});
