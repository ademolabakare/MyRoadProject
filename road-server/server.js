const express = require('express');
const { Pool } = require('pg');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 5000;

// Middleware
app.use(express.json());
app.use(cors());

// PostgreSQL Pool Setup
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'road_condition_db',
  password: 'adebabalola',
  port: 5433,
});

// Set up Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Ensure the 'uploads' folder exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});
const upload = multer({ storage });

// Handle GET requests to the root ("/") path
app.get('/', (req, res) => {
  res.send('Welcome to the Road Condition Web App Backend!');
});

// Handle File Upload and Data
app.post('/upload', upload.single('shapeFile'), async (req, res) => {
  const { roadName, location } = req.body;
  const shapeFile = req.file;

  if (!shapeFile) {
    return res.status(400).send('No file uploaded');
  }

  try {
    // Dynamically import shpjs
    const { parseShp } = await import('shpjs');

    // Read and parse the shapefile
    const shapefileData = fs.readFileSync(shapeFile.path);
    const geojsonArray = await parseShp(shapefileData);

    // Debugging: Check the structure of the GeoJSON
    console.log('GeoJSON:', geojsonArray);

    if (!Array.isArray(geojsonArray) || geojsonArray.length === 0) {
      throw new Error('Invalid GeoJSON structure');
    }

    // Process the first GeoJSON feature
    const firstGeojson = geojsonArray[0];
    let coordinates;

    if (firstGeojson.type === 'LineString') {
      // Convert LineString to WKT (Well-Known Text) format
      coordinates = `LINESTRING(${firstGeojson.coordinates.map(coord => coord.join(' ')).join(',')})`;
    } else {
      throw new Error('Unsupported GeoJSON type');
    }

    // Save data to PostgreSQL
    const query = `
      INSERT INTO roads (road_name, location, coordinates)
      VALUES ($1, $2, ST_GeomFromText($3, 4326))
    `;
    const values = [roadName, location, coordinates];

    await pool.query(query, values);

    console.log('Road Name:', roadName);
    console.log('Location:', location);
    console.log('File:', shapeFile);

    res.status(200).send('File uploaded and data processed');
  } catch (error) {
    console.error('Error uploading file or saving data:', error);
    res.status(500).send('Server error');
  }
});

// road-server/server.js
//const express = require('express');
const { processRoad } = require('./processRoad');
//const cors = require('cors');

//const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/process-road', async (req, res) => {
  const roadId = req.body.roadId; // Frontend will send roadId in the request body

  try {
    const resultUrl = await processRoad(roadId);
    res.json({ url: resultUrl }); // Send back the GeoTIFF URL to the frontend
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to process the road data." });
  }
});

//const PORT = 5000;
//app.listen(PORT, () => {
  //console.log(`Server running on port ${PORT}`);
//});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
