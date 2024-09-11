import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = ({ roadData }) => {
  const [mapCenter, setMapCenter] = useState([51.505, -0.09]); // Default to London coordinates
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    if (roadData) {
      // Extract coordinates from roadData and set them as markers
      const newMarkers = roadData.map(road => ({
        position: [road.latitude, road.longitude],
        title: road.roadName
      }));

      if (newMarkers.length > 0) {
        setMapCenter(newMarkers[0].position); // Set center to the first marker
      }

      setMarkers(newMarkers);
    }
  }, [roadData]);

  return (
    <MapContainer center={mapCenter} zoom={13} style={{ height: '500px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {markers.map((marker, index) => (
        <Marker key={index} position={marker.position}>
          <Popup>{marker.title}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
