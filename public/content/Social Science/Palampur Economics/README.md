# Palampur Economics Lab

An interactive web application for learning about economics concepts through the story of Palampur village, based on the NCERT Economics curriculum.

## Features

- **Interactive Learning Modules**: Navigate through different aspects of the village economy
- **Mobile-Optimized Design**: Responsive layout that works on all devices
- **Audio Narration**: British female voiceover narration of content
- **Interactive Simulations**: Experience economics concepts first-hand:
  - Farming simulator with different crops and methods
  - Capital investment simulator
  - Production tables showing economic growth patterns
- **Data Visualizations**: Charts showing agricultural trends and land distribution
- **Self-Assessment Quiz**: Test your understanding with interactive quizzes
- **Enhanced Village Map**: Interactive map showing different locations in Palampur
- **Case Studies & Problem-Solving**: Real-world scenarios from the village economy
- **Comparative Analysis Tools**: Visual comparisons between farming methods and farmer types
- **Achievements System**: Gamification elements to track learning progress
- **Printable Resources**: Downloadable worksheets and reference materials
- **Interactive Tooltips**: In-context explanations of key economic terms
- **Dark/Light Modes**: Customizable interface for different lighting conditions

## File Structure

```
palampur-economics-lab/
├── css/
│   ├── styles.css         # Main stylesheet
│   └── enhancements.css   # Enhanced visual features and animations
├── js/
│   ├── main.js            # Core functionality and navigation
│   ├── quiz.js            # Quiz functionality
│   ├── simulator.js       # Interactive simulations
│   ├── activities.js      # Interactive learning activities
│   └── enhancements.js    # Advanced interactive features
├── images/                # Image assets
├── index.html             # Main HTML file
└── README.md              # This file
```

## Content Structure

The application follows the structure of the NCERT Economics chapter on "The Story of Village Palampur", covering:

1. **Introduction**: Overview of Palampur village
2. **Organization of Production**: Factors of production (land, labor, capital, human capital)
3. **Farming in Palampur**: Multiple cropping, irrigation, modern farming methods
4. **Land & Labor**: Land distribution and farm labor challenges
5. **Capital in Farming**: Capital needs, loans, and financial issues
6. **Non-Farm Activities**: Dairy, small manufacturing, shopkeeping, transport
7. **Quiz**: Test your understanding of economic concepts

## Technical Implementation

- **HTML5** for content structure
- **CSS3** for styling and responsive design
- **JavaScript** for interactive elements and functionality
- **Web Speech API** for narration capabilities
- **Modular architecture** separating content, styling, and behavior

## Running the Application

Simply open the `index.html` file in a modern web browser. No server setup is required for basic functionality, but running through a web server is recommended for the best experience.

To start a simple web server:

```bash
# Python 3
python -m http.server

# Or with Node.js
npx serve
```

Then open your browser and navigate to `http://localhost:8000` (or the port indicated in the terminal).

## Accessibility

The application includes:
- Screen reader support with ARIA attributes
- Keyboard navigation
- Audio narration
- Text alternatives for visual elements
- Semantic HTML structure

## Educational Value

This interactive lab helps students:
- Understand basic economic concepts through a relatable village story
- Visualize abstract concepts like factors of production
- Experience the effects of different farming and investment decisions
- Analyze economic data through interactive charts
- Test and reinforce their knowledge through quizzes

## Credits

Based on the NCERT Economics curriculum chapter "The Story of Village Palampur", designed to make economics concepts more engaging and interactive for students.
