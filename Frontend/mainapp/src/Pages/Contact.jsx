import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaCommentAlt } from 'react-icons/fa';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <>
            <Navbar />
            <div className="flex justify-center items-center min-h-screen py-10 bg-gray-50">
                <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md">
                    <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">Get in Touch</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="relative">
                            <FaUser className="absolute left-3 top-3 text-gray-400" />
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Your Name"
                                className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-blue-400"
                                required
                            />
                        </div>
                        <div className="relative">
                            <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Your Email"
                                className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-blue-400"
                                required
                            />
                        </div>
                        <div className="relative">
                            <FaCommentAlt className="absolute left-3 top-3 text-gray-400" />
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Your Message"
                                className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-blue-400"
                                rows="4"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-md shadow-md hover:bg-gradient-to-l hover:from-blue-600 hover:to-blue-700 hover:shadow-lg transition-all transform hover:-translate-y-1 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Contact;