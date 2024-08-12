import React, { useState } from 'react';
import axios from 'axios';
import contactas from '../../assets/contactas.png';
import emailjs from 'emailjs-com';

const Contactus = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendEmailAndStoreData = async (e) => {
    e.preventDefault();

    const templateParams = {
      fullName: formData.fullName,
      email: formData.email,
      message: formData.message,
    };

    try {
      // Send email using emailjs
      await emailjs.send('service_mi71sks', 'template_24cv2x6', templateParams, '4rcP9ONkSzPtyasdG');

      // Store data in the database
      await axios.post('http://localhost:5000/api/contactus', formData);

      // Clear form fields after successful submission
      setFormData({ fullName: '', email: '', message: '' });
      
      alert('Your message has been sent successfully!'); // Optional: Alert user of successful submission
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 overflow-hidden">
        <img
          src={contactas}
          alt="Beach view"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-1/2 flex flex-col justify-center p-10 bg-white">
        <h2 className="text-4xl mb-6 font-semibold text-green-700">Contact Us</h2>
        <p className="text-lg mb-8 text-gray-600">Planning to visit a tourist place? Get insider tips on where to go, things to do, and find the best place for your next adventure.</p>
        <form onSubmit={sendEmailAndStoreData}>
          <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2">Full Name</label>
            <input
              type="text"
              name="fullName"
              placeholder="Your Full Name"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-green-500 shadow-bottom"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Your Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-green-500 shadow-bottom"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2">Message</label>
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-green-500 h-32 resize-none shadow-bottom"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-green-700 text-white rounded-md hover:bg-green-800 transition duration-300"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contactus;
