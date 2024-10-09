// import React from 'react';

// const Modal = ({ show, onClose, district, block, village, waterLevel, condition }) => {
//   if (!show) return null;

//   return (
//     <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
//       <div className="bg-white rounded-lg shadow-lg w-[600px] p-6">
//         <div className="flex justify-between items-center mb-4">
//           <h3 className="text-xl font-semibold">Status-Checking</h3>
//           <button
//             onClick={onClose}
//             className="text-gray-500 hover:text-gray-900 focus:outline-none"
//           >
//             ✕
//           </button>
//         </div>
//         <div className="mb-4">
//           <p><strong>District:</strong> {district}</p>
//           <p><strong>Block:</strong> {block}</p>
//           <p><strong>Village:</strong> {village}</p>
//           <p><strong>Quality Level:</strong> {waterLevel}</p>
//           <p><strong>Status:</strong> {condition}</p>


//         </div>
//         <div className="flex justify-end">
//           <button
//             onClick={onClose}
//             className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Modal;

import React from 'react';
import { AiFillWarning, AiFillCheckCircle, AiFillExclamationCircle } from 'react-icons/ai'; // Import icons

const Modal = ({ show, onClose, district, block, village, Details, condition }) => {
    if (!show) return null;

    // Define icons for each condition
    const renderIcon = () => {
        switch (condition) {
            case 'critical':
                return (
                    <div className="flex items-center text-red-600 pt-[30px]">
                        <AiFillWarning className="text-[40px]" />
                        <span className="ml-2 text-xl font-semibold">Critical!</span>
                    </div>
                );
            case 'moderate':
                return (
                    <div className="flex items-center text-yellow-500 pt-[30px]">
                        <AiFillExclamationCircle className="text-[40px]" />
                        <span className="ml-2 text-xl font-semibold">Moderate</span>
                    </div>
                );
            case 'safe':
                return (
                    <div className="flex items-center text-green-500 pt-[30px]">
                        <AiFillCheckCircle className="text-[40px]" />
                        <span className="ml-2 text-xl font-semibold">Safe</span>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-lg shadow-lg w-[600px] p-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold">Status-Checking</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-900 focus:outline-none"
                    >
                        ✕
                    </button>
                </div>
                <div className="mb-4">
                    <p><strong>District:</strong> {Details.DISTRICT}</p>
                    <p><strong>Block:</strong> {Details.BLOCK_NAME}</p>
                    <p><strong>Village:</strong> {Details.VILLAGE_NAME}</p>
                    <p><strong>Water Level:</strong> {Details.WATER_LEVEL} meters</p>

                    {Details.pH ? <p><strong>Water Quality:</strong> {Details.pH} pH</p> : <p><strong>Water Quality not available for this location</strong> </p>}
                    {renderIcon()}  {/* Render the icon based on the condition */}
                </div>
                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
