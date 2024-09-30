import React from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet/dist/leaflet.css';

const Map = () => {
  return (
    <div className="h-auto w-full">
      <MapContainer center={[-33.919667, 18.419253]} zoom={10} className="w-full">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="Map data &copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
        />
        <Marker position={[-33.919667, 18.419253]}></Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
