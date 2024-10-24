import React from "react";
import { MdCheckCircle } from "react-icons/md";  
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const Regulation = () => {
  const regulations = [
    {
      category: "Tamil Nadu Groundwater (Development and Management) Act",
      details: [
        "All groundwater extraction should be registered and licensed by the state government.",
        "Restriction on over-extraction of groundwater, especially in areas identified as over-exploited.",
        "Mandatory rainwater harvesting for all public and private buildings to recharge groundwater.",
        "Regular monitoring of water levels and quality by state authorities.",
      ],
    },
    {
      category: "Water Usage Guidelines",
      details: [
        "Prioritization of drinking water over other uses in times of water scarcity.",
        "Water-saving devices to be installed in public buildings and industries.",
        "Prohibition of untreated sewage or industrial waste being discharged into water bodies.",
        "Enforcement of crop-wise irrigation water allocation for farmers to prevent overuse.",
      ],
    },
    {
      category: "Tamil Nadu Irrigation Regulations",
      details: [
        "Controlled release of water from reservoirs and dams based on monsoon patterns and water availability.",
        "Farmer associations must adhere to water distribution plans designed for equitable access.",
        "Prohibition of constructing illegal check dams or any structure that obstructs the natural flow of water bodies.",
        "Canals and irrigation networks should be regularly maintained by local authorities to avoid water loss.",
      ],
    },
    {
      category: "Sanitation and Water Quality Regulations",
      details: [
        "All local bodies are required to ensure proper sewage management and treatment before discharge.",
        "The Tamil Nadu Pollution Control Board (TNPCB) is responsible for monitoring and maintaining water quality standards in rivers, lakes, and reservoirs.",
        "Industries must adhere to water treatment protocols before discharging waste into water bodies.",
        "Stringent penalties for violation of pollution and sanitation regulations to protect public health and water resources.",
      ],
    },
    {
      category: "Rainwater Harvesting Regulations",
      details: [
        "Rainwater harvesting is mandatory for all residential, commercial, and government buildings in Tamil Nadu.",
        "Failure to install rainwater harvesting structures may result in penalties, including disconnection of water supply.",
        "The design and installation of rainwater harvesting systems must be certified by local authorities.",
        "Public awareness campaigns to promote the benefits and importance of rainwater harvesting for water conservation.",
      ],
    },
    {
      category: "Coastal Zone Regulation (CZR) in Tamil Nadu",
      details: [
        "Water-related activities along coastal areas, including desalination plants, should comply with the Coastal Zone Management Plan (CZMP).",
        "Restriction on construction of structures near water bodies and coastline to avoid erosion and ecological damage.",
        "Fishing and industrial activities along coastal areas must ensure minimal impact on marine resources and water quality.",
      ],
    },
  ];

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-10 p-5 shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-blue-600">Water Regulations in Tamil Nadu</h1>
        {regulations.map((regulation, index) => (
          <div key={index} className="mb-8 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-3">{regulation.category}</h2>
            <ul className="list-none pl-5 text-gray-600">
              {regulation.details.map((detail, i) => (
                <li key={i} className="mb-2 flex items-center">
                  <MdCheckCircle className="text-blue-600 mr-2" /> 
                  {detail}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default Regulation;