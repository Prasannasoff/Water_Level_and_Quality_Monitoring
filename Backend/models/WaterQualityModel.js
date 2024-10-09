const mongoose = require('mongoose');

// Define the schema for individual water level entries
const waterQualityEntrySchema = new mongoose.Schema({
    Well_Id: { type: String, required: true },
    Unique_Number: { type: Number, required: true },
    State: { type: String, required: true },
    District: { type: String, required: true },
    Block: { type: String, required: true },
    Location: { type: String, required: true },
    Latitude: { type: Number, required: true },
    Longitude: { type: Number, required: true },
    Year: { type: Number, required: true },
    pH: { type: Number, required: true }
}, { _id: false }); // Disable automatic _id generation for entries

// Define the main schema that contains an array for the state (e.g., TN)
const stateWaterQualitySchema = new mongoose.Schema({
    TN: [waterQualityEntrySchema]  // Array of water level entries
});

// Export the model
module.exports = mongoose.model('WaterQuality', stateWaterQualitySchema);
