import React from "react";
import { FaWater, FaFaucet, FaShower, FaTint, FaUmbrella, FaThermometerHalf } from "react-icons/fa"; 
import Navbar from '../Components/Navbar';  
import Footer from '../Components/Footer'; 

const getIcon = (category) => {
  switch (category) {
    case "Mega Combined Water Supply Schemes":
      return <FaFaucet className="absolute text-blue-150 text-opacity-20 text-3xl -left-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />;
    case "JJM Schemes":
      return <FaTint className="absolute text-blue-150 text-opacity-20 text-2xl -left-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />;
    case "AMRUT Schemes":
      return <FaShower className="absolute text-blue-150 text-opacity-20 text-3xl -left-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />;
    case "Under Ground Sewerage Schemes":
      return <FaThermometerHalf className="absolute text-blue-150 text-opacity-20 text-3xl -left-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />;
    case "Rural Water Supply Schemes":
      return <FaUmbrella className="absolute text-blue-150 text-opacity-20 text-3xl -left-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />;
    case "Urban Water Supply Schemes":
      return <FaWater className="absolute text-blue-150 text-opacity-20 text-3xl -left-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />;
    default:
      return <FaWater className="absolute text-blue-150 text-opacity-20 text-3xl -left-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />;
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
  return (
    <>
      <Navbar />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">Schemes</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {schemes.map((scheme, index) => (
            <div
              key={index}
              className="relative bg-white shadow-lg rounded-lg p-5 hover:shadow-xl transition-shadow duration-300"
            >
              <h2 className="text-2xl font-semibold text-gray-700 mb-3">
                {scheme.category}
              </h2>
              <ul className="list-none ml-5 text-gray-600 relative">
                {scheme.details.map((detail, idx) => (
                  <li key={idx} className="mb-4 relative flex items-start">
                    {getIcon(scheme.category)} {/* Add category-specific icon */}
                    <span className="ml-10">{detail}</span> {/* Increased margin to prevent overlap */}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-gray-600">
            For more information, please contact our support team.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Schems;