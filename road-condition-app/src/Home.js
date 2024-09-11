import React, { useState } from 'react';
import './App.css';   // Import global styles
import './index.css'; // Import global styles
import { FaUpload } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';


function Home() {
  const [roadName, setRoadName] = useState('');
  const [location, setLocation] = useState('');
  const [shapeFile, setShapeFile] = useState(null);
  const navigate = useNavigate();  // To redirect after submission

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('roadName', roadName);
    formData.append('location', location);
    formData.append('shapeFile', shapeFile);

    try {
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        //const roadId = result.roadId || roadName; // Ensure roadId is defined here
        navigate(`/process-road/${roadName}`);
      } else {
        alert('Failed to submit data');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-map bg-cover bg-center">
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      <div className="relative p-8 bg-white bg-opacity-50 backdrop-blur-lg rounded-lg shadow-md max-w-lg w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Road Condition Web App</h1>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label htmlFor="roadName" className="block text-gray-700 mb-2">Road Name</label>
            <input
              type="text"
              id="roadName"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter road name"
              value={roadName}
              onChange={(e) => setRoadName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="location" className="block text-gray-700 mb-2">Location</label>
            <input
              type="text"
              id="location"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="shapeFile" className="block text-gray-700 mb-2">Upload Shape File</label>
            <div className="flex items-center">
              <input
                type="file"
                id="shapeFile"
                className="hidden"
                onChange={(e) => setShapeFile(e.target.files[0])}
                required
              />
              <label htmlFor="shapeFile" className="flex items-center cursor-pointer px-4 py-2 border rounded-lg bg-blue-500 text-white hover:bg-blue-600">
                <FaUpload className="mr-2" /> Upload File
              </label>
            </div>
          </div>
          <button type="submit" className="mx-auto block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Home;
