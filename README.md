# Educational Content Explorer

A modern, interactive frontend application for exploring educational content in Biology, English, and Physics.

## Features

- **Interactive UI**: Beautiful animations and transitions using Framer Motion
- **3D Background**: Dynamic Three.js background that changes based on subject
- **Responsive Design**: Works on all device sizes from mobile to desktop
- **Content Navigation**: Easy navigation between subjects, chapters, and content files
- **Embedded Content Viewer**: View HTML content directly within the application

## Tech Stack

- **Next.js 14**: Modern React framework with App Router
- **React**: UI component library
- **Framer Motion**: Animation library
- **Three.js** (with React Three Fiber): 3D graphics
- **Tailwind CSS**: Utility-first CSS framework

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:3000`

## Building for Production

To create a static build:

```bash
npm run build
```

This will generate a static site in the `out` directory that you can serve with any static file server.

## Project Structure

- `app/`: Next.js app router components and pages
- `components/`: Reusable UI components
- `public/`: Static files
- `app/data/`: Data models and content structure

## Content Structure

The application reads from three main subject folders inside the `content` directory:

1. `content/Biology/`: Contains biology chapters and HTML files
2. `content/English/`: Contains English literature chapters and HTML files
3. `content/Physics/`: Contains physics chapters and HTML files (currently empty)

Each subject folder contains chapter subfolders, which contain HTML content files.
