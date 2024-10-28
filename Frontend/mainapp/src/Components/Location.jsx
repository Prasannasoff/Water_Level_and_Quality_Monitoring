import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { useNavigate } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import '../css/MapStyles.css'; // Link your CSS file

const MapComponent = () => {
    const mapContainerRef = useRef(null);
    const mapRef = useRef(null);
    const markerRef = useRef(null);
    const [coordinates, setCoordinates] = useState({ lat: 12.1156, lng: 78.4025 }); 
    const navigate = useNavigate();

    const customIcon = L.icon({
        iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/RedDot.svg',
        iconSize: [38, 45],
        iconAnchor: [19, 45],
    });

    useEffect(() => {
        if (mapContainerRef.current && !mapRef.current) {
            mapRef.current = L.map(mapContainerRef.current).setView([coordinates.lat, coordinates.lng], 13);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: false, 
            }).addTo(mapRef.current);

            mapRef.current.on('click', function (e) {
                const { lat, lng } = e.latlng;
                setCoordinates({ lat, lng });

                if (markerRef.current !== null) {
                    mapRef.current.removeLayer(markerRef.current);
                }

                markerRef.current = L.marker([lat, lng], { icon: customIcon }).addTo(mapRef.current);
                mapRef.current.setView([lat, lng], 13); 
            });
        }

        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, [coordinates, customIcon]);

    const handleClear = () => {
        if (markerRef.current !== null) {
            mapRef.current.removeLayer(markerRef.current);
            markerRef.current = null;
        }
        setCoordinates({ lat: 12.1156, lng: 78.4025 });
        mapRef.current.setView([12.1156, 78.4025], 13);
    };

    const handleConfirmLocation = () => {
        navigate('/home', { state: { lat: coordinates.lat, lng: coordinates.lng } });
    };

    return (
        <div className="map-page-container">
            <h1 className="title">Map Check-in</h1>
            <div className="map-container-wrapper">
                <div ref={mapContainerRef} id="map" className="map-container"></div>
            </div>
            <div className="info-section">
                <p className="coordinates">
                    <strong>Latitude:</strong> {coordinates.lat || 'N/A'}, <strong>Longitude:</strong> {coordinates.lng || 'N/A'}
                </p>
                <div className="button-group">
                    <button className="btn clear-btn" onClick={handleClear}>Clear Selection</button>
                    <button className="btn confirm-btn" onClick={handleConfirmLocation}>Confirm Location</button>
                </div>
            </div>
        </div>
    );
};

export default MapComponent;
