// road-condition-app/src/ProcessRoad.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from './Sidebar'; // Assuming you have a Sidebar component
import LoadingAnimation from './LoadingAnimation'; // A loading animation component

function ProcessRoad() {
  const { roadId } = useParams();
  const [loading, setLoading] = useState(true);
  const [roadData, setRoadData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/process-road/${roadId}`);
        const data = await response.json();
        setRoadData(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [roadId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingAnimation /> {/* Your loading animation component */}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      <Sidebar /> {/* Sidebar component */}
      <main className="flex-1 p-4">
        {/* Add map or other results display logic here */}
        <h1 className="text-2xl font-bold mb-4">Road Condition Results</h1>
        {/* Example: Displaying the road data */}
        <pre>{JSON.stringify(roadData, null, 2)}</pre>
      </main>
    </div>
  );
}

export default ProcessRoad;
