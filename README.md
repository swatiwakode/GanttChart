# React Gantt Chart Viewer

A React-based Gantt chart viewer built using the [`vis-timeline`](https://visjs.github.io/vis-timeline/) library. This project visualizes route-based planning data loaded from a JSON file, with adjustable zoom levels and grouped timeline views.

## 🚀 Features 

- 📊 Interactive Gantt-style timeline
- ⏱  Slider for Zoom levels
- 🧠 Optimized rendering with `useMemo` and `useCallback`

## 📦 Technologies Used

- [React](https://reactjs.org/)
- [vis-timeline](https://visjs.github.io/vis-timeline/)


## 🗂️ Project Structure
GANTTCHART/
├── public/               # Static files and HTML template
│   └── index.html
├── src/                  # Application source code
│   ├── components/       # Reusable React components (e.g., GanttChart, ZoomSlider)
│   ├── data/             # Static or mock route planning JSON data
│   └── App.jsx           # Main application component ( Entry point for React app)
├── webpack.config.js     # Webpack configuration
├── package.json          # Project metadata and scripts
└── README.md             # Project documentation


## ▶️ How to Run

✅ Prerequisites
Install Node.js (v16 or later)

npm is included with Node.js

📦 Step 1: Install Dependencies
Run this in the root of the project:

npm install

🚀 Step 2: Start the Development Server
This runs the app in development mode with hot-reloading:

npm start
Open your browser and go to http://localhost:3000

🏗️ Step 3: Build for Production
Compile and bundle the app for deployment:

npm run build
Output is saved in the /dist directory

## 📌 Notes
You can customize the port and paths in webpack.config.js.

