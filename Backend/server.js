const express = require('express');
const mongoose = require('mongoose');
const WaterLevel = require('./models/WaterLevelModel'); // Import the water level model
const User = require('./models/User.model.js');
const WaterQuality = require('./models/WaterQualityModel.js');
const axios = require('axios');
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors());
require("dotenv").config(); 
const dbConfig = require("./config/dbConfig.js");


function haversineDistance(coord1, coord2) {
    const toRad = (value) => (value * Math.PI) / 180; 
    const R = 6371; 

    const dLat = toRad(coord2.latitude - coord1.latitude);
    const dLon = toRad(coord2.longitude - coord1.longitude);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(coord1.latitude)) * Math.cos(toRad(coord2.latitude)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; 
}

app.get('/api/water-level', async (req, res) => {
    const { lat, lng } = req.query;
    console.log(lat, lng);
    if (!lat || !lng) {
        return res.status(400).json({ message: 'Latitude and longitude are required' });
    }

    try {
        const waterDataDoc = await WaterLevel.findOne(); 

        if (!waterDataDoc) {
            return res.status(404).json({ message: 'No water level data found' });
        }

       
        const userCoords = {
            latitude: parseFloat(lat),
            longitude: parseFloat(lng)
        };

        // Find the nearest water data
        const nearestWaterData = waterDataDoc.TN.reduce((closest, entry) => {
            const entryCoords = { latitude: entry.LATITUDE, longitude: entry.LONGITUDE };
            const distance = haversineDistance(userCoords, entryCoords);

            if (!closest || distance < closest.distance) {
                return { entry, distance }; // Return entry with its distance
            }
            return closest;
        }, null);

        if (nearestWaterData) {
            res.json(nearestWaterData.entry);  // Return the nearest water data entry
        } else {
            res.status(404).json({ message: 'No matching water level data found' });
        }
    } catch (err) {
        console.error('Error fetching water level:', err);
        res.status(500).json({ message: 'Error fetching water level' });
    }
});
app.get('/api/water-quality', async (req, res) => {
    const { lat, lng } = req.query;
    console.log(lat, lng);
    if (!lat || !lng) {
        return res.status(400).json({ message: 'Latitude and longitude are required' });
    }

    try {
  
        const waterDataDoc = await WaterQuality.findOne(); // Get the first document

        if (!waterDataDoc) {
            return res.status(404).json({ message: 'No water level data found' });
        }

        // Convert latitude and longitude to numbers
        const userCoords = {
            latitude: parseFloat(lat),
            longitude: parseFloat(lng)
        };

        // Find the nearest water data
        const nearestWaterData = waterDataDoc.TN.reduce((closest, entry) => {
            const entryCoords = { latitude: entry.Latitude, longitude: entry.Longitude };
            const distance = haversineDistance(userCoords, entryCoords);

            if (!closest || distance < closest.distance) {
                return { entry, distance }; // Return entry with its distance
            }
            return closest;
        }, null);

        if (nearestWaterData) {
            res.json(nearestWaterData.entry);  // Return the nearest water data entry
        } else {
            res.status(404).json({ message: 'No matching water quality data found' });
        }
    } catch (err) {
        console.error('Error fetching water level:', err);
        res.status(500).json({ message: 'Error fetching water quality' });
    }
});
// app.get('/api/water-quality', async (req, res) => {
//     const { district, blockName, villageName } = req.query;

//     try {
//         // Find the document containing the TN array
//         const waterQualityDoc = await WaterQuality.findOne(); // Get the first document

//         if (!waterQualityDoc) {
//             return res.status(404).json({ message: 'No water level data found' });
//         }

//         // Filter the TN array to find the matching entry
//         const waterData = waterQualityDoc.TN.find(entry =>
//             entry.District === district &&
//             entry.Block === blockName &&
//             entry.Location === villageName
//         );

//         if (waterData) {
//             res.json(waterData);  // Return the found water data
//         } else {
//             res.status(404).json({ message: 'Water level data not found' });
//         }
//     } catch (err) {
//         console.error('Error fetching water level:', err);
//         res.status(500).json({ message: 'Error fetching water level' });
//     }

// });


app.get('/api/insert', async (req, res) => {
    try {
        // Insert the data object into the WaterQuality collection
        const result = await WaterQuality.create(data);  // Insert as a single document with TN array

        // Send success response
        res.status(200).json({ message: 'Data inserted successfully', result });
    } catch (err) {
        console.error('Error inserting data:', err);
        res.status(500).json({ message: 'Error inserting data' });
    }
});
app.post('/api/signup', async (req, res) => {
    const { fullname, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const newUser = new User({
            fullname,
            email,
            password, // Remember to hash this before saving it in a production app
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        if (user.password !== password) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Start the server
app.listen(8080, () => {
    console.log('Server running on port 8080');
});