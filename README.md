# Chronodendra (Tree Rings)


![Banner](./assets/banner.png)


## Overview
Chronodendra is a digital art and data visualization project that uses dendrochronology to build an interactive timeline of forest fires in Galicia (Spain). Each tree ring represents a year between 2007–2025 and is connected to verified wildfire records. The project combines biological principles, environmental data and interactive design to create a rigorous and accessible digital archive.


## Concept
Trees store environmental information within their annual growth rings. Chronodendra translates this natural data structure into a digital model where:
- Each ring corresponds to a specific year.
- Each year links to a documented wildfire event.
- The tree trunk functions as a circular chronological archive.


This cross-disciplinary approach bridges biology, data visualization and technology to highlight how ecological memory can be modelled digitally.


## Objectives
- Represent ecological memory through a biologically inspired data structure.
- Visualize environmental and anthropogenic impact using real wildfire datasets.
- Reframe trees as natural information systems capable of narrating environmental history.
- Provide a clear, data-driven tool for environmental awareness and research.


## Data Model
- **Years covered:** 2007–2025
- **Sources:** news articles, institutional wildfire reports, environmental datasets
- **Format:** structured JSON mapping `{ year: event }`


## Interaction and User Experience
- Web-based visualization of a tree trunk cross-section.
- Rings displayed as interactive radial segments.
- Selection of a ring opens a detailed wildfire record for the corresponding year.
- Non-linear navigation enabling exploration of the timeline in any order.


## Technical Stack
### Frontend
- HTML, CSS, JavaScript
- SVG, Canvas or WebGL (depending on final implementation)


### Data
- JSON-formatted wildfire dataset


### Interaction Layer
- Event listeners for radial segment selection
- Modal or side-panel interface for data presentation


## Installation and Setup
```bash
# Clone the repository
$ git clone https://github.com/yourusername/chronodendra.git


# Enter the project directory
$ cd chronodendra


# Install dependencies
$ npm install


# Start the local development server
$ npm run dev
```


*Note: Commands may vary depending on the chosen framework (Vite, React, Vanilla JavaScript, etc.).*


## Project Structure
```
chronodendra/
├── public/
├── src/
│ ├── data/
│ ├── components/
│ ├── visuals/
│ └── styles/
├── assets/
└── README.md
```


## Roadmap
- Integrate real dendrochronological ring-width measurements.
- Add audio or color-based layers linked to specific years.
- Expand the dataset to include pre-2007 fire events.
- Implement accessibility features according to WCAG standards.
- Deploy a stable, interactive online version.


## Contributing
Contributions and suggestions are welcome. Please open an issue or submit a pull request to propose improvements or new features.


## License
Released under the license selected by RB.Graphics.


## Author
**Raquel Benavides — RB.Graphics**
Digital Arts & Creative Technologies.