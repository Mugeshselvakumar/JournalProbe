import React from 'react';
import ourStoryImage from '../../assets/ourStoryImage.png'; 

const Ourstory = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between p-8 bg-white h-200">
     
      <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
        <h2 className="text-4xl font-bold text-green-700 mb-4">Our Story</h2>
        <p className="text-lg text-gray-600 mb-6">
    
        Founded in 2023, JournalProbe started as a humble blog by a group of food lovers who wanted
         to share their culinary adventures and discoveries. Over time, we have grown into a
          comprehensive platform that caters to food enthusiasts of all kinds. Whether you are a home cook,
           a professional chef, or simply someone who loves to eat, there is something for everyone at JournalProbe.
        </p>
        {/* <button className="bg-green-700 text-white py-3 px-6 rounded-md hover:bg-green-800 transition duration-300">
          About Agency
        </button> */}
      </div>

      {/* Right Side - Image Section */}
      <div className="md:w-1/2 flex justify-center">
        <img 
          src={ourStoryImage} 
          alt="Our Story Illustration" 
          className="w-full h-auto max-w-md"
        />
      </div>
    </div>
  );
};

export default Ourstory;
