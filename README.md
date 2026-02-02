#  Anime Image Generator

A modern web application built with React and TypeScript that generates stunning anime-style character images using AI. Create beautiful anime artwork with various artistic styles and custom prompts.

##  Features

- **Multiple Art Styles**: Generate anime images in 8 different artistic styles:
  - Classic Anime
  - Semi-Realistic
  - Chibi
  - Sketch
  - Watercolor
  - Digital Art
  - Vintage Anime (90s aesthetic)
  - Minimalist

- **Custom Prompts**: Write your own prompts to customize character generation
- **Real-time Generation**: Get AI-generated anime images instantly
- **Download Images**: Save generated images directly to your device
- **Responsive UI**: Beautiful, intuitive interface built with modern React
- **TypeScript Support**: Full type safety for a robust codebase

##  Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Stability AI API key ([Get one here](https://platform.stability.ai/))

### Installation

1. Clone the repository:
``ash
git clone <repository-url>
cd anime-image-generator
``

2. Install dependencies:
``ash
npm install
``

3. Create a .env file in the root directory and add your API key:
``env
REACT_APP_STABILITY_API_KEY=your_api_key_here
``

### Available Scripts

#### `npm start`
Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser. The page will reload when you make changes.

#### `npm run build`
Builds the app for production in the `build` folder. The build is optimized and ready for deployment.

#### `npm test`
Launches the test runner in interactive watch mode.

##  Project Structure

``
anime-image-generator/
 src/
    components/
       AnimeImageGenerator.tsx    # Main component for image generation
    App.tsx                        # Root component
    index.tsx                      # Entry point
    style.css                      # Global styles
 public/
    index.html
    manifest.json
    robots.txt
 package.json
 tsconfig.json
 README.md
``

##  Technologies Used

- **React 19**: Modern UI library with hooks and concurrent features
- **TypeScript**: Type-safe JavaScript for better development experience
- **Lucide React**: Beautiful icon library
- **Stability AI API**: AI-powered image generation
- **Create React App**: Zero-configuration setup

##  How to Use

1. Start the development server: `npm start`
2. Select an art style from the available options
3. (Optional) Enter a custom prompt for more specific character descriptions
4. Click "Generate Image" to create your anime artwork
5. Download the generated image using the download button

##  Environment Variables

- `REACT_APP_STABILITY_API_KEY`: Your Stability AI API key (required)

##  Dependencies

- `react` - UI library
- `react-dom` - DOM rendering
- `typescript` - Type safety
- `lucide-react` - Icons
- `react-scripts` - Build tooling

##  Deployment

The app can be deployed to any static hosting service:

- **Vercel**: `vercel deploy`
- **Netlify**: Connect your GitHub repository
- **GitHub Pages**: Run `npm run build` and push the `build` folder

##  License

This project is open source and available under the MIT License.

##  Contributing

Contributions are welcome! Feel free to submit issues or pull requests to improve the project.

##  Support

For questions or issues, please open an issue on the repository or contact the maintainers.
