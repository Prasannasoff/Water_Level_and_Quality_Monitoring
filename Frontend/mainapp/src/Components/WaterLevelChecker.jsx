import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useLocation and useNavigate
import Modal from './Modal';

const WaterLevelChecker = () => {
    const [Details, setDetails] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [condition, setCondition] = useState('critical');
    const location = useLocation(); // Get location state from navigate
    const navigate = useNavigate();

    // Get lat and lng from state
    const { lat, lng } = location.state || { lat: '', lng: '' };

    // useEffect(() => {
    //   if (!lat || !lng) {
    //     // If no lat and lng, redirect back to the map page to select location
    //     navigate('/location');
    //   }
    // }, [lat, lng, navigate]);
    const handleLocation = () => {
        navigate('/location');
    }
    const handleCheckIn = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/water-level', {
                params: { lat, lng }
            });
            const response2 = await axios.get('http://localhost:5000/api/water-quality', {
                params: { lat, lng }
            });
            if (response.data && response2.data) {
                const levelDistrict = response.data.DISTRICT;
                const toDistrict = levelDistrict.toLowerCase();
                console.log(toDistrict);
                const qualityDistrict = response2.data.District.toLowerCase();
                const qualityBlock = response2.data.Block.toLowerCase();
                console.log("District" + levelDistrict);
                console.log("Block" + response.data.BLOCK_NAME);
                console.log("WaterQuality" + qualityDistrict);
                console.log("WaterQuality" + qualityBlock);

                if (qualityDistrict.toLowerCase() === toDistrict && qualityBlock.toLowerCase() == response.data.BLOCK_NAME.toLowerCase()) {
                    const combinedDetails = {
                        ...response.data,  // Spread the water level data
                        pH: response2.data.pH  // Add the pH value from water quality response
                    };
                    console.log("PH" + combinedDetails.pH)
                    setDetails(combinedDetails);
                }
                else {
                    setDetails(response.data)
                }
                const waterlevel = response.data.WATER_LEVEL;
                if (waterlevel > 2.5) {
                    setCondition('safe');
                } else if (waterlevel >= 2 && waterlevel <= 2.5) {
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

    return (
        <div className="grid gap-10 bg-gray-100 rounded-[10px] p-[3rem] mt-10">
            <div className="flex justify-between items-center rounded-[8px] gap-[10px] bg-white p-5 shadow-lg">
                <button
                    className="bg-blue-500 text-white h-full p-5 px-10 rounded-[10px] hover:bg-blue-600"
                    onClick={handleCheckIn}
                >
                    Check-in
                </button>
                <button
                    className="bg-blue-500 text-white h-full p-5 px-10 rounded-[10px] hover:bg-blue-600"
                    onClick={handleLocation}
                >
                    Select Location
                </button>
                <p>{lat}</p>

            </div>

            {/* Modal to display form data */}
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
