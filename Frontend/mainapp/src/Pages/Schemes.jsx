import React, { useState } from "react";
import { FaWater, FaFaucet, FaShower, FaTint, FaUmbrella, FaThermometerHalf } from "react-icons/fa";
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const getIcon = (category) => {
  switch (category) {
    case "Mega Combined Water Supply Schemes":
      return <FaFaucet className="text-blue-600 text-3xl" />;
    case "JJM Schemes":
      return <FaTint className="text-green-600 text-3xl" />;
    case "AMRUT Schemes":
      return <FaShower className="text-purple-600 text-3xl" />;
    case "Under Ground Sewerage Schemes":
      return <FaThermometerHalf className="text-red-600 text-3xl" />;
    case "Rural Water Supply Schemes":
      return <FaUmbrella className="text-yellow-600 text-3xl" />;
    case "Urban Water Supply Schemes":
      return <FaWater className="text-blue-800 text-3xl" />;
    default:
      return <FaWater className="text-gray-600 text-3xl" />;
  }
};

const schemes = [
  {
    category: "Mega Combined Water Supply Schemes",
    details: [
      "PROVIDING CWSS TO SANKARANKOIL, PULIYANKUDI MUNICIPALITIES...",
      "Combined Water Supply Scheme to Aruppukottai, Sattur...",
      "AUGMENTATION OF WATER SUPPLY SCHEME TO 708 HABITATIONS...",
    ],
  },
  {
    category: "JJM Schemes",
    details: [
      "PROVIDING CWSS to 67 Rural Habitations in Kumbakonam...",
      "Providing CWSS to 756 Habitations in K.Paramathi...",
    ],
  },
  {
    category: "AMRUT Schemes",
    details: [
      "UGSS TO KURICHI AND KUNIYAMUTHUR AREAS...",
      "WATER SUPPLY IMPROVEMENT SCHEME TO NAGERCOIL...",
    ],
  },
  {
    category: "Under Ground Sewerage Schemes",
    details: [
      "Sanitation is essential for enhancing the quality of life and improving productivity.",
      "The State Government has accorded priority for implementation of sewerage schemes for district headquarters, all municipalities, places of tourism importance, and temple towns.",
    ],
  },
  {
    category: "Jal Jeevan Mission (JJM) Schemes",
    details: [
      "Providing CWSS to 67 Rural Habitations in Kumbakonam, Thirupanandal, and Thiruvidaimarudur Unions of Thanjavur District.",
      "CWSS to 109 rural habitations in Lalgudi and Pullambadi unions of Trichy District under JJM.",
      "CWSS to 252 Habitations in Papanasam and Ammapettai Unions of Thanjavur District.",
    ],
  },
  {
    category: "Rural Water Supply Schemes",
    details: [
      "Provision of safe drinking water to rural areas through piped water supply schemes.",
      "Special focus on addressing water scarcity in habitations with high fluoride and brackish water contamination.",
      "Utilization of surface water from nearby rivers or reservoirs for remote habitations.",
    ],
  },
  {
    category: "Urban Water Supply Schemes",
    details: [
      "Water supply augmentation in major cities like Chennai, Coimbatore, and Madurai.",
      "Establishment of desalination plants along coastal areas to address water shortages.",
      "Improvement of water distribution systems and infrastructure in fast-growing urban areas.",
    ],
  },
  {
    category: "Integrated Water Supply Schemes",
    details: [
      "Combined water supply projects covering both rural and urban areas within districts.",
      "Bulk water supply to habitations, municipalities, and town panchayats with river Cauvery and Tamiraparani as key sources.",
      "Infrastructure development for water storage, treatment, and distribution to multiple areas.",
    ],
  },
];

const Schems = () => {
  const [selectedScheme, setSelectedScheme] = useState(null);

  const handleSchemeClick = (scheme) => {
    setSelectedScheme(scheme);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-6 flex">
        {/* Left Side - Scheme Names */}
        <div className="w-1/3 pr-4 bg-gray-100 rounded-lg shadow-md p-4">
          <h1 className="text-3xl font-bold text-blue-600 mb-6">Schemes</h1>
          <ul className="list-none">
            {schemes.map((scheme, index) => (
              <li
                key={index}
                className={`flex items-center cursor-pointer p-3 rounded-lg transition-all duration-300 
                ${selectedScheme === scheme ? 'bg-blue-200 font-semibold' : 'hover:bg-blue-50'}`}
                onClick={() => handleSchemeClick(scheme)}
              >
                {getIcon(scheme.category)}
                <span className="ml-3">{scheme.category}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Side - Scheme Details */}
        <div className="w-2/3 pl-4">
          {selectedScheme ? (
            <div className={`relative bg-white shadow-lg rounded-lg p-5 transition-transform duration-300 transform hover:-translate-y-1 
            ${selectedScheme.category === "Mega Combined Water Supply Schemes" ? 'border-l-4 border-blue-600' : ''}
            ${selectedScheme.category === "JJM Schemes" ? 'border-l-4 border-green-600' : ''}
            ${selectedScheme.category === "AMRUT Schemes" ? 'border-l-4 border-purple-600' : ''}
            ${selectedScheme.category === "Under Ground Sewerage Schemes" ? 'border-l-4 border-red-600' : ''}
            ${selectedScheme.category === "Rural Water Supply Schemes" ? 'border-l-4 border-yellow-600' : ''}
            ${selectedScheme.category === "Urban Water Supply Schemes" ? 'border-l-4 border-blue-800' : ''}
            `}>
              <h2 className="text-2xl font-semibold text-gray-700 mb-3">
                {selectedScheme.category}
              </h2>
              <ul className="list-none ml-5 text-gray-600 relative">
                {selectedScheme.details.map((detail, idx) => (
                  <li key={idx} className="mb-4 relative flex items-start transition-all duration-300 transform hover:scale-105">
                    {getIcon(selectedScheme.category)}
                    <span className="ml-3">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="text-center text-gray-600">Please select a scheme to view details.</div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Schems;
