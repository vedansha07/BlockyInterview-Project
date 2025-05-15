import React, { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const apiUrl = import.meta.env.PROD 
      ? 'https://get-vehilce-track-details.onrender.com/track-vehicle-details-location'
      : '/api/track-vehicle-details-location';

    fetch(apiUrl)
      .then(res => res.json())
      .then(data => setData(data))
      .catch(console.error);
  }, []);

  if (!data) return null;

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' ,backgroundColor: 'white' ,color: 'black'}}>
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
