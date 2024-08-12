/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { TbEdit } from "react-icons/tb";
import { MdDeleteOutline } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';


const Profile = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [data, setData] = useState([]);
    const [flag, setFlag] = useState(1);

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
     

    const token = getCookieValue('journal_token');

    const fetchData = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}journal/getUserJournal`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            setData(response.data.message);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchData();
    }, [flag]);

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        const token = getCookieValue('journal_token');
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}users/getUser`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            setUserName(res.data.message.username);
        } catch (err) {
            console.log(err);
        }
    };

    const handleEdit = (journal_id) => {
        navigate(`/addjournals/${journal_id}`);
    };

    const handleDelete = async (userName, title) => {
        const token = getCookieValue('journal_token');
        try {
            await axios.post(`${import.meta.env.VITE_BASE_URL}journal/deleteJournal`, {
                userName,
                title
            },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
            toast.success('Deleted Successfully');
            setFlag(!flag);
        } catch (err) {
            toast.error('Deletion failed');
            console.log(err.message);
        }
    };

    return (
        <div className='w-full'>
            <div className='flex flex-col gap-x-5 my-5 rounded-xl'>
                <div className='w-[95%] rounded-xl'>
                    <div className='h-[20rem] flex flex-row shadow-xl items-center justify-center'>
                        <div className='hidden lg:block rounded-full'>
                            <img src={'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}
                                className='h-[15rem] p-4 rounded-[100%]'
                            />
                        </div>
                        <div className='flex flex-col ml-5'>
                            <p className='text-7xl'>{userName}</p>
                            <div className='py-2'><p className='0'>@{userName}</p></div>
                            <button className='bg-green-700 py-2 rounded-lg text-white' onClick={() => {
                                document.cookie = "journal_token='';max-age=0";
                                navigate('/login');
                            }}>Logout</button>
                        </div>
                    </div>
                    <div className='mt-10'>
                        <hr className='h-[0.2rem] mb-[2rem] bg-white' />
                        
                        <h2 className="text-5xl font-bold text-green-700 mb-4">Your Articles</h2>
                        <br></br>
                        <br></br>
                        <div className='mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                            {data.map((journal, index) => (
                                <div
                                    key={index}
                                    className='relative bg-white shadow-lg rounded-lg overflow-hidden flex flex-col group transition-transform transform hover:scale-105 hover:border-gray-300 border border-transparent'
                                >
                                    <img src={journal.image} alt='journal' className='h-[200px] w-full object-cover transition-transform group-hover:scale-110' />
                                    <div className='p-6 flex-1'>
                                        <Link to={`/${journal._id}`}>
                                            <h2 className='text-2xl font-bold mb-2'>{journal.title}</h2>
                                            <div className='flex justify-between mb-4'>
                                                <div>@{journal.author}</div>
                                                <div>Date: {(journal.date).split("T")[0]}</div>
                                            </div>
                                            <p className='text-gray-700 mb-4'>{journal.description}</p>
                                        </Link>
                                    </div>
                                    {/* <Link to={`/${journal._id}`}>
                                    <div className='absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center'>
                                        <p className='text-white text-lg font-semibold'>View Journal</p>
                                    </div>
                                    </Link> */}
                                    
                                    <div className='flex-none bg-gray-100 p-4 flex justify-between items-center'>
                                        <button className='p-2 text-xl bg-green-400 rounded-md hover:bg-green-500 transition-colors' onClick={() => { handleEdit(journal._id) }}><TbEdit /></button>
                                        <button className='p-2 text-xl bg-red-500 rounded-md hover:bg-red-600 transition-colors text-white' onClick={() => { handleDelete(journal.userName, journal.title) }}><MdDeleteOutline /></button>
                                    </div>
                                    
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Profile;
