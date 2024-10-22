import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import Modal from './Modal';

const WaterLevelChecker = () => {
    const [Details, setDetails] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [condition, setCondition] = useState('critical');
    const location = useLocation(); // Get location state from navigate
    const navigate = useNavigate();

    // Get lat and lng from state
    const { lat, lng } = location.state || { lat: '', lng: '' };

    const handleLocation = () => {
        navigate('/location');
    };

    const handleCheckIn = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/water-level', {
                params: { lat, lng }
            });
            const response2 = await axios.get('http://localhost:8080/api/water-quality', {
                params: { lat, lng }
            });

            if (response.data && response2.data) {
                const levelDistrict = response.data.DISTRICT.toLowerCase();
                const qualityDistrict = response2.data.District.toLowerCase();
                const qualityBlock = response2.data.Block.toLowerCase();

                if (qualityDistrict === levelDistrict && qualityBlock === response.data.BLOCK_NAME.toLowerCase()) {
                    const combinedDetails = {
                        ...response.data,  // Spread the water level data
                        pH: response2.data.pH  // Add the pH value from water quality response
                    };
                    setDetails(combinedDetails);
                } else {
                    setDetails(response.data);
                }

                const waterLevel = response.data.WATER_LEVEL;
                if (waterLevel > 2.5) {
                    setCondition('safe');
                } else if (waterLevel >= 2 && waterLevel <= 2.5) {
                    setCondition('moderate');
                } else {
                    setCondition('critical');
                }
            }
        } catch (err) {
            console.error("Error in fetching water level", err);
            setDetails(null);
        }

        setShowModal(true);
    };
    const handleReport = async (Details) => {
        try {
            const response = await axios.post('http://localhost:5000/getReport', { Details: Details }, {
                responseType: 'blob' // Important to handle file download
            });
    
            // Create a link element to download the file
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'Water_Report.pdf'); // Set the file name
            document.body.appendChild(link);
            link.click(); // Trigger the download
            document.body.removeChild(link); // Clean up the link element
    
        } catch (error) {
            console.error("Error generating the report", error);
        }
    };
    
    return (
        <div className="max-w-3xl mx-auto p-6 bg-gray-50 shadow-lg rounded-lg mt-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Water Level and Quality Checker</h2>
            <div className="flex flex-col space-y-4">
                <div className="flex justify-between items-center bg-white p-4 shadow-md rounded-md gap-4">
                    <button
                        className="bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 focus:outline-none shadow-md transition duration-300 ease-in-out transform hover:scale-105"
                        onClick={handleCheckIn}
                        style={{ width: '45%', boxShadow: '0 4px 12px -2px rgba(0, 0, 0, 0.3)' }} // Set width and bottom shadow
                    >
                        Check-in
                    </button>
                    <button
                        className="bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 focus:outline-none shadow-md transition duration-300 ease-in-out transform hover:scale-105"
                        onClick={handleLocation}
                        style={{ width: '45%', boxShadow: '0 4px 12px -2px rgba(0, 0, 0, 0.3)' }} // Set width and bottom shadow
                    >
                        Select Location
                    </button>
                    <button
                        className="bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 focus:outline-none shadow-md transition duration-300 ease-in-out transform hover:scale-105"
                        onClick={()=>handleReport(Details)}
                        style={{ width: '45%', boxShadow: '0 4px 12px -2px rgba(0, 0, 0, 0.3)' }} // Set width and bottom shadow
                    >
                        Generate Report
                    </button>
                </div>
                <p className="text-gray-500 text-center">Latitude: {lat || 'N/A'} | Longitude: {lng || 'N/A'}</p>
            </div>

            {/* Modal to display data */}
            <Modal
                show={showModal}
                onClose={() => setShowModal(false)}
                Details={Details}
                condition={condition}
            />
        </div>
    );
};

export default WaterLevelChecker;