# Chronodendra (Tree Rings) 🌲🔥

![Banner](./assets/banner.png)

[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![p5.js](https://img.shields.io/badge/p5.js-ED225D?style=for-the-badge&logo=p5.js&logoColor=white)](https://p5js.org/)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)](https://netlify.com)

### 🔴 [Ver Proyecto en Vivo (Live Demo)](https://jolly-granita-2d7d80.netlify.app)

## 📋 Tabla de Contenidos

- [Overview](#overview)
- [Concept](#concept)
- [Objectives](#objectives)
- [Features](#features)
- [Data Sources](#data-sources)
- [Technical Stack](#technical-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)

## 🌟 Overview

Chronodendra is a digital art and data visualization project that uses dendrochronology to build an interactive timeline of forest fires in Galicia (Spain). Each tree ring represents a year between 2007–2025 and is connected to verified wildfire records. The project combines biological principles, environmental data, and interactive design to create a rigorous and accessible digital archive.

This innovative approach transforms natural ecological data into an engaging digital experience, allowing users to explore the history of wildfires through the metaphor of tree growth rings. By visualizing environmental impact in this unique way, Chronodendra raises awareness about climate change, deforestation, and the importance of forest conservation.

## 🌳 Concept

Trees store environmental information within their annual growth rings. Chronodendra translates this natural data structure into a digital model where:

- Each ring corresponds to a specific year 📅
- Each year links to a documented wildfire event 🔥
- The tree trunk functions as a circular chronological archive 🌀

This cross-disciplinary approach bridges biology, data visualization, and technology to highlight how ecological memory can be modeled digitally. The project draws inspiration from dendrochronology, the scientific method of dating tree rings to analyze environmental conditions.

### How It Works

1. **Data Collection**: Gather verified wildfire records from reliable sources
2. **Ring Generation**: Create visual rings representing each year
3. **Interactive Mapping**: Link each ring to corresponding fire data
4. **User Exploration**: Allow users to click on rings to reveal fire details

## 🎯 Objectives

- Represent ecological memory through a biologically inspired data structure 🌿
- Visualize environmental and anthropogenic impact using real wildfire datasets 📊
- Reframe trees as natural information systems capable of narrating environmental history 📖
- Provide a clear, data-driven tool for environmental awareness and research 🔬
- Foster public understanding of climate change through interactive digital art 🎨
- Demonstrate the intersection of art, science, and technology in addressing environmental challenges 🌍

## ✨ Features

### Core Functionality

- **Interactive Tree Visualization**: Click on any ring to explore wildfire data for that year
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices 📱💻
- **Smooth Animations**: Fluid transitions between different views and data displays
- **Accessibility Features**: Screen reader support and keyboard navigation ♿

### Data Visualization

- **Radial Timeline**: Circular representation of chronological data
- **Color-Coded Severity**: Visual indicators for fire intensity levels
- **Detailed Information Panels**: Comprehensive wildfire statistics and descriptions
- **Multi-language Support**: Available in Spanish and English 🌐

### User Experience

- **Intuitive Navigation**: Easy-to-use interface with clear visual cues
- **Search Functionality**: Find specific years or fire events quickly 🔍
- **Bookmarking**: Save interesting years for later reference
- **Shareable Links**: Generate URLs for specific rings or data views

### Technical Features

- **Real-time Data Loading**: Efficient loading of large datasets
- **Offline Capability**: Basic functionality works without internet connection
- **Performance Optimized**: Fast rendering even with complex visualizations
- **Modular Architecture**: Easily extensible for additional data types

## 📊 Data Sources

Chronodendra relies on meticulously curated and verified data sources to ensure accuracy and reliability. Our data model covers the years 2007–2025, focusing on Galicia, Spain.

### Primary Data Sources

- **Official Government Reports**: Ministerio de Agricultura, Pesca y Alimentación (MAPA) wildfire databases
- **Regional Environmental Agencies**: Xunta de Galicia environmental monitoring data
- **News Archives**: Verified journalistic reports from major Spanish media outlets
- **Scientific Publications**: Peer-reviewed studies on Iberian wildfires

### Data Format

The project uses structured JSON mapping with the following format:

```json
{
  "year": 2020,
  "fires": [
    {
      "id": "GAL-2020-001",
      "location": "Pontevedra",
      "date": "2020-08-15",
      "severity": "high",
      "area_burned": 1250,
      "description": "Major wildfire affecting urban-rural interface",
      "source": "Xunta de Galicia"
    }
  ]
}
```

### Severity Levels and Color Coding

| Severity Level | Color     | Description               | Area Burned (hectares) |
| -------------- | --------- | ------------------------- | ---------------------- |
| Low            | 🟢 Green  | Small, contained fires    | < 100                  |
| Medium         | 🟡 Yellow | Moderate impact fires     | 100 - 500              |
| High           | 🟠 Orange | Significant wildfires     | 500 - 2000             |
| Extreme        | 🔴 Red    | Major catastrophic events | > 2000                 |

This color scheme helps users quickly identify the scale and impact of each wildfire event.

### Data Validation Process

1. **Source Verification**: Cross-reference multiple official sources
2. **Geospatial Accuracy**: Validate location data using GIS coordinates
3. **Temporal Consistency**: Ensure chronological accuracy of events
4. **Peer Review**: Internal validation by environmental experts

## 🛠️ Technical Stack

### Frontend

- **HTML5**: Semantic markup for accessibility and SEO
- **CSS3**: Modern styling with CSS Grid and Flexbox for responsive layouts
- **JavaScript (ES6+)**: Core programming language for interactivity
- **p5.js**: Creative coding library for generative art and visualizations

### Data Management

- **JSON**: Lightweight data format for wildfire records
- **Local Storage**: Client-side caching for improved performance

### Development Tools

- **Vite**: Fast build tool and development server ⚡
- **ESLint**: Code linting for consistent JavaScript standards
- **Prettier**: Automatic code formatting
- **Git**: Version control with GitHub for collaboration

### Deployment

- **Netlify**: Continuous deployment and hosting platform
- **GitHub Pages**: Backup deployment option

## 🚀 Installation

Follow these steps to set up Chronodendra on your local machine for development or testing.

### Prerequisites

- Node.js (version 16 or higher) 📦
- npm (comes with Node.js) or yarn
- Git for cloning the repository

### Step-by-Step Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/Raquel-bena/Chronodendra.git
   cd chronodendra
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Start Development Server**

   ```bash
   npm run dev
   ```

4. **Open in Browser**
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

### Alternative Installation Methods

#### Using Yarn

```bash
yarn install
yarn dev
```

#### Using pnpm

```bash
pnpm install
pnpm dev
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Troubleshooting Installation

- **Port Already in Use**: Change the port with `npm run dev -- --port 3000`
- **Node Version Issues**: Use nvm to manage Node.js versions
- **Permission Errors**: Try running with `sudo` (not recommended) or fix npm permissions

## 📖 Usage

Chronodendra offers an intuitive interface for exploring wildfire data through an interactive tree visualization.

### Basic Navigation

1. **Load the Application**: Open the live demo or run locally
2. **Explore the Tree**: The central visualization shows tree rings for each year
3. **Select a Ring**: Click on any ring to view wildfire data for that year
4. **View Details**: A panel appears with comprehensive fire information

### Keyboard Shortcuts

| Shortcut     | Action           | Description                   |
| ------------ | ---------------- | ----------------------------- |
| `Space`      | Toggle Animation | Pause/resume ring animations  |
| `Arrow Keys` | Navigate Rings   | Move between adjacent years   |
| `Enter`      | Select Ring      | Open details for current ring |
| `Escape`     | Close Panel      | Hide the information panel    |
| `F`          | Fullscreen       | Toggle fullscreen mode        |
| `R`          | Reset View       | Return to initial tree view   |
| `S`          | Search           | Open search interface         |
| `?`          | Help             | Show keyboard shortcuts       |

### Advanced Features

#### Search Functionality

- Press `S` or click the search icon 🔍
- Search by year, location, or severity level
- Results highlight matching rings on the tree

#### Data Filtering

- Filter by severity level using the color legend
- Toggle visibility of different fire categories
- Focus on specific regions within Galicia

#### Sharing and Exporting

- Generate shareable links for specific years
- Export data as CSV or JSON
- Screenshot functionality for social media sharing

### Code Examples

#### Basic p5.js Ring Drawing

```javascript
function drawRing(year, radius, thickness) {
  stroke(255);
  strokeWeight(thickness);
  noFill();
  circle(width / 2, height / 2, radius * 2);

  // Add year label
  textAlign(CENTER, CENTER);
  text(year, width / 2, height / 2 - radius);
}
```

#### Loading Fire Data

```javascript
async function loadFireData() {
  try {
    const response = await fetch('./data/fires.json');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error loading fire data:', error);
  }
}
```

#### Interactive Ring Selection

```javascript
function mousePressed() {
  const distance = dist(mouseX, mouseY, width / 2, height / 2);
  const ringIndex = floor(distance / RING_THICKNESS);

  if (ringIndex >= 0 && ringIndex < years.length) {
    showFireDetails(years[ringIndex]);
  }
}
```

### Mobile Usage

- Touch and drag to rotate the tree view
- Pinch to zoom in/out
- Tap rings to select them
- Swipe to navigate between years

### Accessibility Features

- Full keyboard navigation support
- Screen reader compatibility
- High contrast mode available
- Adjustable text sizes

## 📁 Project Structure

```
chronodendra/
├── public/
│   ├── index.html          # Main HTML file
│   ├── assets/
│   │   ├── banner.png      # Project banner image
│   │   └── icons/          # UI icons and graphics
│   └── data/
│       └── fires.json      # Wildfire dataset
├── src/
│   ├── main.js             # Application entry point
│   ├── components/
│   │   ├── Tree.js         # Main tree visualization component
│   │   ├── Ring.js         # Individual ring component
│   │   ├── InfoPanel.js    # Data display panel
│   │   └── Search.js       # Search functionality
│   ├── data/
│   │   ├── fires.js        # Data loading utilities
│   │   └── colors.js       # Color scheme definitions
│   ├── visuals/
│   │   ├── animations.js   # Animation functions
│   │   ├── rendering.js    # Rendering utilities
│   │   └── effects.js      # Visual effects
│   ├── styles/
│   │   ├── main.css        # Main stylesheet
│   │   ├── tree.css        # Tree-specific styles
│   │   └── responsive.css  # Mobile styles
│   └── utils/
│       ├── helpers.js      # Utility functions
│       └── constants.js    # Application constants
├── assets/
│   ├── images/             # Static images
│   └── fonts/              # Custom fonts
├── node_modules/           # Dependencies (generated)
├── package.json            # Project configuration
├── vite.config.js          # Build configuration
├── eslint.config.js        # Linting configuration
├── README.md               # This file
└── .gitignore              # Git ignore rules
```

### Key Files Explanation

- **`src/main.js`**: Initializes the p5.js sketch and sets up the application
- **`src/components/Tree.js`**: Core component managing the tree visualization
- **`src/data/fires.json`**: Contains all wildfire data in JSON format
- **`src/styles/main.css`**: Global styles and responsive design rules

## 🗺️ Roadmap

### Phase 1: Core Functionality (Current)

- ✅ Interactive tree visualization
- ✅ Basic wildfire data integration
- ✅ Responsive web design
- ✅ Netlify deployment

### Phase 2: Enhanced Features (Q2 2024)

- [ ] Integrate real dendrochronological ring-width measurements
- [ ] Add audio layers linked to specific years 🎵
- [ ] Implement color-based visual indicators
- [ ] Expand dataset to include pre-2007 fire events

### Phase 3: Advanced Interactions (Q3 2024)

- [ ] Implement accessibility features according to WCAG standards ♿
- [ ] Add virtual reality support for immersive exploration
- [ ] Create mobile app version using React Native
- [ ] Integrate real-time weather data

### Phase 4: Research Integration (Q4 2024)

- [ ] Partner with universities for scientific validation
- [ ] Add machine learning for fire prediction patterns
- [ ] Implement comparative analysis with other regions
- [ ] Develop educational modules for schools

### Phase 5: Global Expansion (2025)

- [ ] Extend to other countries and regions
- [ ] Multi-language support for international audiences 🌐
- [ ] API for third-party integrations
- [ ] Advanced data visualization tools

### Long-term Vision

- Establish Chronodendra as a global standard for environmental data visualization
- Create a network of similar projects for different environmental indicators
- Develop educational curricula around ecological data literacy

## 🤝 Contributing

We welcome contributions from developers, designers, environmental scientists, and anyone passionate about environmental data visualization!

### Ways to Contribute

#### Code Contributions

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

#### Non-Code Contributions

- Report bugs or suggest features via GitHub Issues
- Improve documentation and tutorials
- Design new visualizations or UI elements
- Validate and expand the wildfire dataset
- Translate the project to other languages

### Development Guidelines

#### Code Style

- Follow ESLint configuration
- Use Prettier for automatic formatting
- Write meaningful commit messages
- Add JSDoc comments for functions

#### Testing

- Test on multiple browsers (Chrome, Firefox, Safari, Edge)
- Ensure mobile responsiveness
- Validate accessibility with screen readers

#### Pull Request Process

1. Update the README.md with details of changes if needed
2. Update the version numbers in any examples files
3. The PR will be merged once you have the sign-off of at least one maintainer

### Community Guidelines

- Be respectful and inclusive
- Focus on constructive feedback
- Help newcomers learn and contribute
- Celebrate diverse perspectives and backgrounds

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### MIT License Summary

- ✅ Commercial use allowed
- ✅ Modification allowed
- ✅ Distribution allowed
- ✅ Private use allowed
- ⚠️ License and copyright notice must be included
- ❌ Liability limitation
- ❌ Warranty disclaimer

### Attribution Requirements

When using or modifying Chronodendra, please attribute the original work to Raquel Benavides (RB.Graphics).

## 👩‍🎨 Author

**Raquel Benavides — RB.Graphics**
Digital Arts & Creative Technologies

Raquel is a multidisciplinary artist and developer specializing in the intersection of environmental science, data visualization, and interactive digital art. Her work explores how technology can help us understand and address complex environmental challenges.

### Connect with Raquel

- **Portfolio**: [rb.graphics](https://rb.graphics) 🎨
- **LinkedIn**: [Raquel Benavides](https://linkedin.com/in/raquel-benavides) 💼
- **Twitter**: [@RaquelB_Graphics](https://twitter.com/RaquelB_Graphics) 🐦
- **Instagram**: [@rb.graphics](https://instagram.com/rb.graphics) 📸
- **GitHub**: [Raquel-bena](https://github.com/Raquel-bena) 💻
- **Email**: raquel@rb.graphics 📧

### About RB.Graphics

RB.Graphics is a creative studio focused on digital art that matters. We combine cutting-edge technology with meaningful narratives to create experiences that educate, inspire, and drive positive change.

---

_Made with ❤️ in Galicia, Spain_ 🇪🇸

_Last updated: April 2024_
