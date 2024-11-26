// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//     fullname: {
//         type: String,
//         required: true,
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true,
//     },
//     password: {
//         type: String,
//         required: true,
//     }
// });

// module.exports = mongoose.model("User", userSchema);
const { DataTypes } = require('sequelize');
const sequelize = require('../config/sqlConfig');

const User = sequelize.define('User', {
    fullname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'users', // MySQL table name
    timestamps: false, // Disable createdAt and updatedAt
});

module.exports = User;
