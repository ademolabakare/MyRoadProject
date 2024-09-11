// Handle road data processing (including file upload)
exports.processRoadData = async (req, res) => {
    const { roadName, location } = req.body;
    const file = req.file;
  
    try {
      let coordinates = [];  // Replace with actual coordinates extraction logic
  
      // If file is uploaded, process the shapefile
      if (file) {
        // Example logic to parse file and extract coordinates (to be implemented)
      }
  
      // Insert data into PostgreSQL/PostGIS
      const result = await pool.query(
        `INSERT INTO roads (road_name, location, coordinates) VALUES ($1, $2, ST_GeomFromText($3, 4326)) RETURNING *`,
        [roadName, location, 'POINT(0 0)'] // Replace POINT(0 0) with actual coordinates
      );
  
      res.status(201).json({
        message: 'Road data successfully processed',
        roadData: [{
          roadName: result.rows[0].road_name,
          latitude: 0, // Replace with actual latitude
          longitude: 0, // Replace with actual longitude
        }],
      });
    } catch (error) {
      console.error('Error processing road data:', error);
      res.status(500).json({ error: 'Failed to process road data' });
    }
  };
  