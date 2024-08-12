import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaThumbsUp } from 'react-icons/fa';
import { FcLike } from "react-icons/fc";

const Journals = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState(data);

  const getCookieValue = (name) => {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      cookie = cookie.trim();
      if (cookie.startsWith(name + '=')) {
        return cookie.substring(name.length + 1);
      }
    }
    return null;
  };

  const handleSearch = () => {
    const value = search.toLowerCase();
    if (value === "") {
      setFilteredData(data);
      return;
    }
    const filtered = data.filter(
      item =>
        item.title.toLowerCase().includes(value) ||
        item.description.toLowerCase().includes(value) ||
        item.author.toLowerCase().includes(value)
    );
    setFilteredData(filtered);
  };

  const handleLike = async (journalId) => {
    const token = getCookieValue('journal_token');
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}likes/likeJournal`, {
        id: journalId
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.status === 200) {
        const updatedData = data.map(journal =>
          journal._id === journalId ? { ...journal, likes: journal.likes + 1 } : journal
        );
        setData(updatedData);
        setFilteredData(updatedData);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleView = async (journalId) => {
    const token = getCookieValue('journal_token');
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}likes/viewJournal`, {
        id: journalId
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.status === 200) {
        const updatedData = data.map(journal =>
          journal._id === journalId ? { ...journal, views: journal.views + 1 } : journal
        );
        setData(updatedData);
        setFilteredData(updatedData);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = getCookieValue('journal_token');
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}journal/getJournals`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setData(response.data.journals);
    };
    fetchData();
  }, []);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);
  
  // const [like, setLike] = useState(journal.likes);
  // const [unlike, setUnlike] = useState(false);
  

  // const handlelikes = () => {
  //   setLike(unlike ? like - 1 : like + 1);
  // };
  
  return (
    <>
      <br /><br /><br />
      <div className='p-4 flex justify-end items-center'>
        <input
          type='text'
          placeholder='Search...'
          className='border-0 border-b-2 border-solid border-b-gray-600 w-60 h-10 p-2 bg-[#f3f4f5]'
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className='h-10 w-20 bg-green-700 ml-2 rounded-lg text-white'
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4'>
        {filteredData.map((journal, index) => (
          <div
            key={index}
            className={`relative flex flex-col bg-white shadow-lg rounded-lg overflow-hidden group hover:shadow-2xl transition-shadow transform hover:scale-105`}
          >
            <Link 
              to={`/${journal._id}`}
              className='flex-1'
              onClick={() => handleView(journal._id)}
            >
              <img src={journal.image} alt='journal' className='h-[200px] w-full object-cover transition-transform group-hover:scale-110' />
              <br></br>
              <div className='flex flex-col flex-1'>
                <div className='text-2xl font-bold mb-2'>{journal.title}</div>
                <div className='p-6 flex-1'>
                  <div className='flex justify-between mb-2'>
                    <div>@{journal.author}</div>
                    <div>{(journal.date).split("T")[0]}</div>
                  </div>
                  <div className='text-gray-700 mb-4'>{journal.description}</div>
                </div>
              </div>
            </Link>
            <div className='flex-none bg-gray-100 p-4 flex justify-between items-center'>
              <div className='flex items-center'>
                <span className='ml-2 text-green-700'><FcLike /></span>
              </div>
              <div>
                <span>{journal.views} Views</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <br /><br /><br />
    </>
  );
};

export default Journals;
