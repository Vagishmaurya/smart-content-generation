/**
 * Electoral Politics - Interactive Lesson
 * placeholder.js - Handles missing images with SVG placeholders
 */

document.addEventListener('DOMContentLoaded', function() {
    // Replace broken images with SVG placeholders
    replaceBrokenImages();

    // Monitor for dynamically added images
    observeDOMChanges();
});

// Replace broken images with SVG placeholders
function replaceBrokenImages() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        // For existing images
        if (img.complete) {
            if (!img.naturalWidth) {
                replaceWithPlaceholder(img);
            }
        } else {
            // For images still loading
            img.addEventListener('error', function() {
                replaceWithPlaceholder(img);
            });
        }
    });
}

// Create a MutationObserver to watch for new images being added
function observeDOMChanges() {
    // Options for the observer (watch for child additions/removals)
    const config = { childList: true, subtree: true };
    
    // Create an observer instance
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            // Check if any new nodes were added
            if (mutation.addedNodes.length) {
                mutation.addedNodes.forEach(function(node) {
                    // If the added node is an element node
                    if (node.nodeType === 1) {
                        // Check if it's an image
                        if (node.tagName === 'IMG') {
                            if (node.complete) {
                                if (!node.naturalWidth) {
                                    replaceWithPlaceholder(node);
                                }
                            } else {
                                node.addEventListener('error', function() {
                                    replaceWithPlaceholder(node);
                                });
                            }
                        }
                        // Check child images if it's a container
                        const childImages = node.querySelectorAll('img');
                        if (childImages.length) {
                            childImages.forEach(img => {
                                if (img.complete) {
                                    if (!img.naturalWidth) {
                                        replaceWithPlaceholder(img);
                                    }
                                } else {
                                    img.addEventListener('error', function() {
                                        replaceWithPlaceholder(img);
                                    });
                                }
                            });
                        }
                    }
                });
            }
        });
    });
    
    // Start observing the document
    observer.observe(document.body, config);
}

// Replace an image with an SVG placeholder
function replaceWithPlaceholder(img) {
    // Get original dimensions if available
    const width = img.getAttribute('width') || img.clientWidth || 200;
    const height = img.getAttribute('height') || img.clientHeight || 150;
    
    // Get alt text for the placeholder
    const altText = img.alt || 'Image placeholder';
    
    // Create a placeholder SVG as a data URL
    const placeholderSvg = createPlaceholderSVG(width, height, altText);
    
    // Update the image source to the placeholder
    img.src = placeholderSvg;
    
    // Add a specific class for styling
    img.classList.add('placeholder-img');
    
    // Preserve dimensions
    img.width = width;
    img.height = height;
    
    // Add a title attribute for accessibility
    img.title = 'Placeholder: ' + altText;
}

// Create an SVG placeholder as a data URL
function createPlaceholderSVG(width, height, text) {
    // Colors
    const bgColor = '#e3f2fd';
    const strokeColor = '#2196f3';
    const textColor = '#1976d2';
    
    // Calculate text positioning and size
    const fontSize = Math.max(14, Math.min(24, width / 10));
    
    // Create the SVG markup
    const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
        <!-- Background rectangle -->
        <rect width="100%" height="100%" fill="${bgColor}" stroke="${strokeColor}" stroke-width="2" />
        
        <!-- Image icon -->
        <path d="M${width/2-30} ${height/2-20} h60 v40 h-60 v-40 M${width/2-20} ${height/2-10} a10 10 0 1 1 0.001 0" 
              stroke="${strokeColor}" fill="none" stroke-width="2" />
        
        <!-- Text -->
        <text x="50%" y="75%" font-family="Arial, sans-serif" font-size="${fontSize}" 
              text-anchor="middle" fill="${textColor}">${text}</text>
    </svg>
    `;
    
    // Convert SVG to a data URL
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}

// Add styles for placeholder images
function addPlaceholderStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .placeholder-img {
            border: 1px dashed #2196f3;
            border-radius: 4px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
    `;
    document.head.appendChild(style);
}

// Initialize placeholder styles
addPlaceholderStyles();
