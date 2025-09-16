# Democracy Learning Lab

An interactive web application for learning about democracy and democratic principles based on the "What is Democracy? Why Democracy?" political science curriculum.

## Features

- **Interactive Learning Modules**: Navigate through different aspects of democracy
- **Mobile-Optimized Design**: Responsive layout that works on all devices
- **Audio Narration**: British female voiceover narration of content
- **Interactive Simulations**: Experience democratic processes first-hand
  - Voting simulator
  - Democracy vs. non-democracy comparison
  - Debate arena
- **Real-World Examples**: Country case studies demonstrating democratic and non-democratic systems
- **Progress Tracking**: Monitor your progress through the learning modules
- **Self-Assessment Quiz**: Test your understanding with interactive quizzes

## File Structure

```
democracy-learning-lab/
├── css/
│   └── styles.css         # Main stylesheet
├── js/
│   ├── main.js            # Core functionality and navigation
│   ├── quiz.js            # Quiz functionality
│   ├── simulator.js       # Interactive simulations
│   └── activities.js      # Interactive learning activities
├── images/                # Image assets
├── index.html             # Main HTML file
└── README.md              # This file
```

## Content Structure

The application follows the structure of the democracy textbook, covering:

1. **Introduction**: Overview of what will be learned
2. **What is Democracy?**: Basic definitions and concepts
3. **Features of Democracy**: Key characteristics that define democratic systems
4. **Voting Simulator**: Interactive demonstration of democratic decision-making
5. **Debate Arena**: Arguments for and against democracy
6. **World Examples**: Real-world democratic and non-democratic countries
7. **Why Democracy?**: The case for democratic governance
8. **Quiz**: Test your understanding of democratic principles

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

## Credits

Based on the political science curriculum "What is Democracy? Why Democracy?" from the textbook "Democratic Politics".
