import React, { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/track-vehicle-details-location')
      .then(response => {
        // First check if the response is ok
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        // Check the content type
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          return response.json();
        } else {
          // If not JSON, read as text and throw error
          return response.text().then(text => {
            throw new Error(`Expected JSON but got ${contentType}: ${text}`);
          });
        }
      })
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
        setError(error.message); // Add error state to your component
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial', backgroundColor: 'white', color: 'black' }}>
      <h1>Vehicle Info</h1>
      <p><strong>Vehicle Number:</strong> {data.vehicle_details.number}</p>
      <p><strong>Model:</strong> {data.vehicle_details.model}</p>
      <p><strong>Speed:</strong> {data.speed} km/h</p>
      <p><strong>Ignition:</strong> {data.ignition ? 'On' : 'Off'}</p>
      <p><strong>Location:</strong> {data.latitude}, {data.longitude}</p>
    </div>
  );
}

export default App;
