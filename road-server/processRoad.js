// road-server/processRoad.js
const { Client } = require('pg');
const { parse } = require('wellknown');
const ee = require('@google/earthengine');
const { GoogleAuth } = require('google-auth-library');
const path = require('path');

// Authenticate Google Earth Engine with the service account
const keyFile = path.join(__dirname, 'service-account-key.json'); // Path to your service account key file
const auth = new GoogleAuth({
  keyFilename: keyFile,
  scopes: ['https://www.googleapis.com/auth/earthengine.readonly'],
});

async function getRoadGeometryFromDB(roadId) {
  const client = new Client({
    connectionString: 'postgres://username:password@localhost:5433/road_condition',
  });

  await client.connect();
  const result = await client.query("SELECT ST_AsText(geom) FROM roads WHERE id = $1", [roadId]);
  await client.end();

  if (result.rows.length > 0) {
    const wkbString = result.rows[0].st_astext;
    const geojsonGeom = parse(wkbString); // Convert WKT (well-known text) to GeoJSON
    return geojsonGeom;
  } else {
    throw new Error("Road not found");
  }
}

async function processRoad(roadId) {
  const geojsonGeom = await getRoadGeometryFromDB(roadId);

  // Authenticate with Google Earth Engine
  const authClient = await auth.getClient();
  ee.data.setAuthToken(authClient.credentials.access_token);
  ee.initialize();

  const roadGeometry = ee.Geometry(geojsonGeom);

  const sentinel1 = ee.ImageCollection('COPERNICUS/S1_GRD')
    .filterBounds(roadGeometry)
    .filterDate('2023-01-01', '2023-12-31')
    .select('VV');

  const roadConditions = sentinel1.median().clip(roadGeometry);

  const url = await roadConditions.getDownloadURL({ format: 'GeoTIFF' });

  return url;
}

module.exports = { processRoad };
