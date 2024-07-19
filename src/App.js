import React from 'react';

import './App.css';
import "leaflet/dist/leaflet.css";

import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { Icon, divIcon, point } from "leaflet";

import MarkerClusterGroup from 'react-leaflet-cluster';

const customIcon = new Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconSize: [38, 38]
});

const createClusterCustomIcon = function (cluster) {
  return new divIcon({
    html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
    className: "custom-marker-cluster",
    iconSize: point(33, 33, true)
  });
};

const App = () => {
  const position = [51.505, -0.09];

  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    alert(`Clicked at: ${lat}, ${lng}`);
  };

  const MapEventsHandler = ({ handleMapClick }) => {
    useMapEvents({
      click: (e) => handleMapClick(e),
    });
    return null;
  };

  const markers = [
    {
      geocode: [51.505, 0],
      popup: "Hello, I am pop up 1"
    },
    {
      geocode: [51.515, 0.02],
      popup: "Hello, I am pop up 2"
    },
    {
      geocode: [51.525, 0.04],
      popup: "Hello, I am pop up 3"
    }
  ];

  return (
    <div className="App">

      <div className='title-description'>
        <h1>React Leaflet Map</h1>
        <p>
          A quickly built Leaflet Map Playground based on{' '}
          <a href="https://www.youtube.com/watch?v=jD6813wGdBA" target="_blank" rel="noopener noreferrer">
              React Leaflet Tutorial
          </a>
        </p>
      </div>

      <MapContainer center={position} zoom={13} scrollWheelZoom={false} className="leaflet-container">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
         <MapEventsHandler handleMapClick={handleMapClick} />
        <MarkerClusterGroup chunkedLoading iconCreateFunction={createClusterCustomIcon}>
          {markers.map((marker, index) => (
            <Marker key={index} position={marker.geocode} icon={customIcon}>
              <Popup>{marker.popup}</Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
   
    </div>
  );
};

export default App;