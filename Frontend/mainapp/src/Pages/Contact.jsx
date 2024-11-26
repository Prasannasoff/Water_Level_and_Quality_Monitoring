import React, { useState } from 'react';
import axios from 'axios';
import { FaUser, FaEnvelope, FaCommentAlt } from 'react-icons/fa';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            await axios.post('http://localhost:8080/send-mail', formData);
            setSuccess('Message sent successfully!');
            setFormData({ name: '', email: '', message: '' });
        } catch (err) {
            setError('Failed to send the message. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 to-indigo-100 py-10 px-4">
                <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-center py-6">
                        <h2 className="text-3xl font-bold">Contact Us</h2>
                        <p className="mt-2 text-sm">We'd love to hear from you!</p>
                    </div>
                    <div className="p-8">
                        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
                        {success && <div className="text-green-500 text-center mb-4">{success}</div>}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="relative">
                                <FaUser className="absolute left-3 top-3 text-blue-400 text-xl" />
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Your Name"
                                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition duration-300 hover:shadow-md"
                                    required
                                />
                            </div>
                            <div className="relative">
                                <FaEnvelope className="absolute left-3 top-3 text-blue-400 text-xl" />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Your Email"
                                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition duration-300 hover:shadow-md"
                                    required
                                />
                            </div>
                            <div className="relative">
                                <FaCommentAlt className="absolute left-3 top-3 text-blue-400 text-xl" />
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Your Message"
                                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition duration-300 hover:shadow-md"
                                    rows="4"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-indigo-500 to-blue-500 text-white py-3 rounded-lg shadow-lg transition-transform transform duration-300 hover:scale-105 focus:ring-4 focus:ring-indigo-400 focus:outline-none"
                                disabled={loading}
                            >
                                {loading ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Contact;
