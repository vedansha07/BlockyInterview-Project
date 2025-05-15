import React, { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/track-vehicle-details-location')
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => setData(data))
      .catch(error => {
        console.error('Error fetching data:', error);
        setError(error.message);
      });
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>Loading...</div>;

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
