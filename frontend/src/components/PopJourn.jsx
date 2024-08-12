import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';
import { useNavigate } from 'react-router';
const JournalCard = ({ id, title, ima, rating, handleRating }) => {

  return (
    <div className='py-10'>
      <div className="relative flex w-80 flex-col rounded-xl bg-white bg-clip-border text-black shadow-md">
        <img src={ima} className="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-green-700" />
        <div className="p-6">
          <h5 className="mb-2 block text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased h-[5rem] overflow-hidden">
            {title}
          </h5>
        </div>
        <div className="p-6 pt-0 flex justify-center items-center gap-4">
        <Link 
            to={`/${id}`} >
          <button 
            data-ripple-light="true" type="button"
            className="select-none rounded-lg bg-green-700 py-3 px-6 text-center align-middle text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all  disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            >
            Read More
          </button>
        </Link>
          <ReactStars
            count={5}
            onChange={(newRating) => handleRating(id, newRating)}
            size={24}
            activeColor="#ffd700"
            value={rating}
          />
        </div>
      </div>
    </div>
  );
};

const PopJourn = () => {
  const [data, setData] = useState([]);
  const { country } = useParams();

  function getCookieValue(name) {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      cookie = cookie.trim();
      if (cookie.startsWith(name + '=')) {
        return cookie.substring(name.length + 1);
      }
    }
    return null;
  }

  useEffect(() => {
    const fetchData = async () => {
      const token = getCookieValue('journal_token');
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}journal/getJournals`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const filteredJournals = response.data.journals.filter(journal => journal.country.toLowerCase() === country.toLowerCase());
      setData(filteredJournals);
    };
    fetchData();
  }, [country]);

  const handleRating = async (journalId, newRating) => {
    const token = getCookieValue('journal_token');
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}journal/rateJournal`, {
        id: journalId,
        rating: newRating
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
    } catch (error) {
      console.error('Error rating the journal:', error);
    }
  };

  return (
    <>
    <br></br><br></br><br></br><br></br>
    <div className="flex justify-center flex-wrap gap-10">
      {data.map((journal) => (
        <JournalCard
          key={journal._id}
          id={journal._id}
          title={journal.title}
          ima={journal.image}
          rating={journal.rating}
          handleRating={handleRating}
        />
      ))}
    </div>
    </>
  );
};

export default PopJourn;
