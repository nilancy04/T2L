import React, { useState } from 'react';
import axios from 'axios';
import './ConsultantPage.css';

const ConsultantPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    preferences: '',
  });

  const [matches, setMatches] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/match', formData);
      setMatches(response.data.matches);
    } catch (error) {
      console.error('Error fetching matches:', error);
    }
  };

  return (
    <div>
      <h1>Consultant Matchmaking</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Preferences:</label>
          <textarea
            name="preferences"
            value={formData.preferences}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Find Matches</button>
      </form>

      <h2>Recommended Consultants</h2>
      <ul>
        {matches.map((match, index) => (
          <li key={index}>{match.name} - {match.specialty}</li>
        ))}
      </ul>
    </div>
  );
};

export default ConsultantPage;
