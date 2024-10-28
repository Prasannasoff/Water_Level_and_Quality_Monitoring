import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaWater, FaMapMarkerAlt, FaFileAlt } from 'react-icons/fa';
import Modal from './Modal';

const WaterLevelChecker = () => {
    const [Details, setDetails] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [condition, setCondition] = useState('critical');
    const location = useLocation();
    const navigate = useNavigate();

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
                        ...response.data,
                        pH: response2.data.pH
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
    };

    // Navigate to analysis page once Details and condition are updated
    useEffect(() => {
        if (Details && condition) {
            navigate('/analysis', { state: { Details, condition } });
        }
    }, [Details, condition, navigate]);

    const handleReport = async (Details) => {
        try {
            const response = await axios.post('http://localhost:5000/getReport', { Details: Details }, {
                responseType: 'blob'
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'Water_Report.pdf');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
    
        } catch (error) {
            console.error("Error generating the report", error);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-8 bg-gradient-to-r from-blue-50 to-blue-100 shadow-2xl rounded-lg mt-10">
            <h2 className="text-3xl font-extrabold text-blue-700 mb-8 text-center">
                Water Level and Quality Checker
            </h2>
            <div className="flex flex-col space-y-6">
                <div className="flex justify-between items-center bg-white p-4 shadow-lg rounded-xl gap-4">
                    <button
                        className="flex items-center justify-center bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
                        onClick={handleCheckIn}
                        style={{ width: '30%' }}
                    >
                        <FaWater className="mr-2 text-lg" />
                        Check-in
                    </button>
                    <button
                        className="flex items-center justify-center bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 focus:outline-none shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
                        onClick={handleLocation}
                        style={{ width: '30%' }}
                    >
                        <FaMapMarkerAlt className="mr-2 text-lg" />
                        Select Location
                    </button>
                    <button
                        className="flex items-center justify-center bg-teal-600 text-white py-3 px-4 rounded-lg hover:bg-teal-700 focus:outline-none shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
                        onClick={() => handleReport(Details)}
                        style={{ width: '30%' }}
                    >
                        <FaFileAlt className="mr-2 text-lg" />
                        Generate Report
                    </button>
                </div>
                <p className="text-gray-600 text-center text-lg mt-4">
                    <span className="font-medium">Latitude:</span> {lat || 'N/A'} | <span className="font-medium">Longitude:</span> {lng || 'N/A'}
                </p>
            </div>

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
