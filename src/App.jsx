// import { useState ,useEffect, use} from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const[Data,setData] = useState([])
//   useEffect(() => {
//     fetch(`https://get-vehilce-track-details.onrender.com//track-vehicle-details-location`)
//     .then((res)=> res.json())
//     .then((data) => {
//       console.log(data)
//       setData(data)
//     })
//     .catch((err) => {
//       console.log(err)
//     })
//   }, [])



//   return (
//     <>
//       <h1>h</h1>
//     </>
//   )
// }

// export default App



import React, { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/track-vehicle-details-location')
      .then(res => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  if (!data) return null; // no loading screen, just render nothing until data is fetched

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
