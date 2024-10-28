import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BsDropletHalf, BsMap, BsGeoAlt, BsBuilding } from 'react-icons/bs';
import { FaTint } from 'react-icons/fa'; // New icon for pH level
import './WaterAnalysis.css'; // Import the CSS for waves

const WaterAnalysis = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { Details, condition } = location.state || {};
    const [isVisible, setIsVisible] = useState(false); // State to control visibility of water level

    const getPhRepresentation = (pH) => {
        if (pH >= 7) return { color: 'green', label: 'Neutral/Alkaline' };
        if (pH > 5 && pH < 7) return { color: 'yellow', label: 'Moderately Acidic' };
        return { color: 'red', label: 'Highly Acidic' };
    };

    const { color, label } = getPhRepresentation(Details?.pH);
    const waterLevelHeight = Math.min(Math.max(Details?.WATER_LEVEL * 10, 0), 100);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true); // Set the water level to be visible after component mounts
        }, 100); // Delay for animation effect
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="p-8 bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen flex flex-col items-center">
            <h2 className="text-4xl font-bold mb-6 text-center">Water Analysis Report</h2>

            <div className="bg-white p-6 rounded-lg shadow-lg w-4/5">
                {/* Location Information */}
                <h3 className="text-2xl font-semibold text-blue-600 flex items-center mb-4">
                    <BsMap className="mr-2" /> Location Information
                </h3>
                <p className="flex items-center mb-2"><BsBuilding className="mr-2 text-blue-600" /><strong>District:</strong> {Details?.DISTRICT}</p>
                <p className="flex items-center mb-2"><BsMap className="mr-2 text-blue-600" /><strong>Block:</strong> {Details?.BLOCK_NAME}</p>
                <p className="flex items-center mb-4"><BsGeoAlt className="mr-2 text-blue-600" /><strong>Village:</strong> {Details?.VILLAGE_NAME}</p>

                {/* Water Quality Analysis */}
                <h3 className="text-2xl font-semibold text-blue-600 flex items-center mb-4">
                    <BsDropletHalf className="mr-2" /> Water Quality Analysis
                </h3>
                <div className={`p-4 rounded-lg text-center font-semibold`} style={{ color }}>
                    <div className="flex items-center justify-center">
                        <FaTint className="mr-2 text-3xl animate-pulse" />
                        <span>pH Level: {Details?.pH} ({label})</span>
                    </div>
                </div>

                {/* Water Level Analysis */}
                <h3 className="text-2xl font-semibold text-blue-600 mt-6 mb-4">Water Level Analysis</h3>
                
                {/* Water wave and level display */}
                <div className="flex items-center justify-center mt-6">
                    {/* Circular beaker with animated wave */}
                    <div className="beaker-container">
                        <div className="wave wave-01"></div>
                        <div className="wave wave-02"></div>
                    </div>
                    
                    {/* Water level display with animation */}
                    <div className="ml-6 text-center">
                        <p className={`text-3xl font-bold transition-transform duration-500 ${isVisible ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
                            {waterLevelHeight}%
                        </p>
                        <p className={`text-lg font-semibold transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                            {condition?.toUpperCase()}
                        </p>
                    </div>
                </div>

                {/* Back Button */}
                <div className="flex justify-end mt-6">
                    <button
                        onClick={() => navigate(-1)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                        Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WaterAnalysis;
