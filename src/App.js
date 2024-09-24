// import { useEffect, useState } from 'react';
// import './App.css';
// import { getAllPokemonList } from './api/pokemon';

// function App() {
//   const [pokemonData, setPokemonData] = useState([]);
//   const [deferredPrompt, setDeferredPrompt] = useState(null);


//   useEffect(() => {
//     async function fetchData(){
//       const data = await getAllPokemonList();
//       setPokemonData(data?.results)
//     }
//     fetchData();
//   })


//   return (
//     <div className="App">
//       <div style={{
//         marginTop:'4opx', justifyContent:'space-around', display:'flex', flexWrap:'wrap', width:'90%', margin:'auto'
//       }}>
//         {
//           pokemonData?.map((poke, i) => {
//             return (
//               <div key={i} style={{width:'400px', height:'330px', border:'2px solid black', margin:'30px 10px'}}>
//                 <img style={{height:'300px', width:'300px'}}
//                 alt = 'pokemon'
//                 src={`https://img.pokemondb.net/artwork/large/${poke.name}.jpg`} />
//               </div>
//             )
//           })
//         }
//       </div>
//     </div>
//   );
// }

// export default App;

import React, { useState } from "react";
import './App.css';

const App = () => {
  const [locationName, setLocationName] = useState("");
  const [color, setColor] = useState("#ff0000");
  const [location, setLocation] = useState(null);
  const [savedLocations, setSavedLocations] = useState([]);

  // Function to get current location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          setLocation({ lat, lon });
        },
        (error) => {
          console.error("Error getting location: ", error);
          alert("Failed to retrieve location.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  // Function to save the current location
  const saveLocation = () => {
    if (!location) {
      alert("Please get your current location first.");
      return;
    }

    if (!locationName) {
      alert("Please enter a name for the location.");
      return;
    }

    const newLocation = {
      name: locationName,
      lat: location.lat,
      lon: location.lon,
      color: color,
    };

    setSavedLocations([...savedLocations, newLocation]);
    setLocationName("");
    setLocation(null);
  };

  return (
    <div className="container">
      <h1>Save Your Favorite Locations</h1>
      <div className="location-box">
        <label htmlFor="location-name">Location Name:</label>
        <input
          type="text"
          id="location-name"
          value={locationName}
          onChange={(e) => setLocationName(e.target.value)}
          placeholder="Enter location name"
        />

        <label htmlFor="color">Pick a Color:</label>
        <input
          type="color"
          id="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />

        <button onClick={getCurrentLocation}>Use Current Location</button>
        <p>
          {location
            ? `Latitude: ${location.lat}, Longitude: ${location.lon}`
            : "Location will be displayed here..."}
        </p>

        <button onClick={saveLocation}>Save Location</button>
      </div>

      <div className="saved-locations">
        <h2>Saved Locations</h2>
        <ul id="locations-list">
          {savedLocations.map((loc, index) => (
            <li key={index} style={{ borderColor: loc.color }}>
              <a
                href={`https://www.google.com/maps?q=${loc.lat},${loc.lon}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {loc.name}
              </a>
              <small>
                ({loc.lat}, {loc.lon})
              </small>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
