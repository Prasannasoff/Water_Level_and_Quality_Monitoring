import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { useNavigate } from 'react-router-dom'; // Import useLocation and useNavigate
import 'leaflet/dist/leaflet.css';

const MapComponent = () => {
    const mapContainerRef = useRef(null);
    const mapRef = useRef(null);
    const markerRef = useRef(null); // Use a ref to store the marker
    const [coordinates, setCoordinates] = useState({ lat: '', lng: '' });
    const navigate = useNavigate();

    useEffect(() => {
        if (mapContainerRef.current && !mapRef.current) {
            // Initialize the map
            mapRef.current = L.map(mapContainerRef.current).setView([12.1156, 78.4025], 13);

            // Set up the OpenStreetMap tile layer
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(mapRef.current);

            // Event listener for map clicks
            mapRef.current.on('click', function (e) {
                const { lat, lng } = e.latlng;
                setCoordinates({ lat, lng });

                // Remove the existing marker
                if (markerRef.current !== null) {
                    mapRef.current.removeLayer(markerRef.current);
                }

                // Add a new marker with default icon
                markerRef.current = L.marker([lat, lng]).addTo(mapRef.current);
            });
        }

        return () => {
            // Cleanup the map instance on unmount
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, []);

    // Clear button handler
    const handleClear = () => {
        if (markerRef.current !== null) {
            mapRef.current.removeLayer(markerRef.current);
            markerRef.current = null; // Reset the marker ref
        }
        setCoordinates({ lat: '', lng: '' });
    };

    const handleConfirmLocation = () => {
        navigate('/home', { state: { lat: coordinates.lat, lng: coordinates.lng } });
    };

    return (
        <div>
            <h3>Click on the Map to Get Latitude and Longitude</h3>
            <div ref={mapContainerRef} id="map" style={{ height: '400px', width: '100%' }}></div>
            <p>
                Latitude: {coordinates.lat}, Longitude: {coordinates.lng}
            </p>
            <button onClick={handleClear}>Clear Selection</button>
            <button className="bg-blue-500 text-white h-full p-5 px-10 rounded-[10px] hover:bg-blue-600" onClick={handleConfirmLocation}>
                Confirm Location
            </button>
        </div>
    );
};

export default MapComponent;
