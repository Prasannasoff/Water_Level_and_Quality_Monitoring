import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './WaterAnalysis.css';  // Import the CSS for waves

const WaterAnalysis = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { Details, condition } = location.state || {};
    
    const getPhRepresentation = (pH) => {
        if (pH >= 7) return { color: 'green', label: 'Neutral/Alkaline' };
        if (pH > 5 && pH < 7) return { color: 'yellow', label: 'Moderately Acidic' };
        return { color: 'red', label: 'Highly Acidic' };
    };

    const { color, label } = getPhRepresentation(Details?.pH);
    const waterLevelHeight = Math.min(Math.max(Details?.WATER_LEVEL * 10, 0), 100);

    return (
        <div className="p-8 bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen flex flex-col items-center">
            <h2 className="text-4xl font-bold mb-6 text-center">Water Analysis Report</h2>

            <div className="bg-white p-6 rounded-lg shadow-lg w-4/5">
                <h3 className="text-2xl font-semibold text-blue-600">Location Information</h3>
                <p><strong>District:</strong> {Details?.DISTRICT}</p>
                <p><strong>Block:</strong> {Details?.BLOCK_NAME}</p>
                <p><strong>Village:</strong> {Details?.VILLAGE_NAME}</p>

                <h3 className="text-2xl font-semibold text-blue-600 mt-6">Water Quality Analysis</h3>
                <div className={`p-4 rounded-lg text-center font-semibold`} style={{ color }}>
                    pH Level: {Details?.pH} ({label})
                </div>
                <div className="mt-4">
                    <img src={`/images/ph-${color}.png`} alt="pH representation" className="w-full" />
                </div>

                <h3 className="text-2xl font-semibold text-blue-600 mt-6">Water Level Analysis</h3>
                
                {/* Water wave and level display */}
                <div className="flex items-center mt-6">
                    {/* Circular beaker with animated wave */}
                    <div className="beaker-container">
                        <div className="wave wave-01"></div>
                        <div className="wave wave-02"></div>
                        {/* <div className="wave wave-03"></div> */}
                    </div>
                    
                    {/* Water level display */}
                    <div className="ml-6 text-center">
                        <p className="text-3xl font-bold">{waterLevelHeight}%</p>
                        <p className="text-lg font-semibold">{condition?.toUpperCase()}</p>
                    </div>
                </div>

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
