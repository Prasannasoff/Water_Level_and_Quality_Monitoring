import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/signup', {
        fullname: name,
        email: email,
        password: password
      });
      navigate('/home');
    } catch (error) {
      setError('Something went wrong. Please try again.');
      setSuccess('');
    }
  };
  return (
    <div className="flex items-center justify-center mt-28">
      <div className="w-96 border rounded bg-white px-7 py-10">
        <form onSubmit={handleSignUp}>
          <h4 className="text-2xl mb-7">Sign Up</h4>

          <input
            type="text"
            placeholder="Name"
            className="w-full text-sm bg-transparent border border-gray-300 px-5 py-3 rounded mb-4 focus:outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Email"
            className="w-full text-sm bg-transparent border border-gray-300 px-5 py-3 rounded mb-4 focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full text-sm bg-transparent border border-gray-300 px-5 py-3 rounded mb-4 focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="text-red-500 text-xs pb-1">{error}</p>}
          {success && <p className="text-green-500 text-xs pb-1">{success}</p>}

          <button
            type="submit"
            className="w-full text-sm bg-blue-500 text-white p-2 rounded my-1"
          >
            Sign Up
          </button>

          <p className="text-sm text-center mt-4">
            Already registered?{' '}
            <Link to="/" className="font-medium text-blueColor underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
