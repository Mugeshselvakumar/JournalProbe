import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';

const JournalView = () => {
  const { journalid } = useParams();
  const [blog, setBlogs] = useState({});
  const [date, setDate] = useState('');
  const [comments, setComments] = useState([]);
  const [commentBoxVisible, setCommentBoxVisible] = useState(false);
  const [comment, setComment] = useState('');
  const [author, setAuthor] = useState('');

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
  const navigate = useNavigate();

  const backClick = ()=>{
    navigate('/journals');
  }

  useEffect(() => {
    const fetchJournal = async () => {
      const Token = getCookieValue('journal_token');
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}journal/getJournalbyId`, { id: journalid }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Token}`
        }
      });
      setBlogs(response.data.message);
    };

    const fetchComments = async () => {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}comments/${journalid}/comments`);
      setComments(response.data);
    };

    fetchJournal();
    fetchComments();
  }, [journalid]);

  useEffect(() => {
    if (blog.date) {
      setDate(blog.date.split('T')[0]);
    }
  }, [blog.date]);

  const handleCommentToggle = () => {
    setCommentBoxVisible(!commentBoxVisible);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleAuthorChange = (e) => {
    setAuthor(e.target.value);
  };

  const handleCommentSubmit = async () => {
    const token = getCookieValue('journal_token');
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}comments/addComment`, {
        journalId: journalid,
        comment: comment,
        author: author,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.status === 200) {
        alert('Comment added successfully');
        setComment('');
        setAuthor('');
        setCommentBoxVisible(false);
        setComments([...comments, response.data]);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <br />
      <div className='w-[100%] flex justify-center items-center'>
        <div className='text-[#333] sm:w-[90%] flex flex-col justify-center items-center mb-5 py-10 shadow-xl rounded-md bg-white'>
          <div className=' text-5xl sm:text-3xl sm:w-[90%] mt-10 sm:px-5'>
            {blog.blogTitle}
          </div>
          <div className='flex flex-col sm:flex-row sm:w-[90%] sm:pt-10 sm:pb-10 justify-center items-center gap-5'>
            <div className='w-[90%] mt-5 sm:w-[40%] sm:mt-0'>
              <img src={blog.image} className='rounded-md' alt='Journal Cover' />
            </div>
            <div className='flex flex-col w-[90%] gap-5 sm:w-[60%] py-5'>
              <div className='text-l sm:text-3xl'>{blog.description}</div>
              <div className='flex items-center gap-5 justify-between sm:justify-normal'>
                <div className='flex flex-col items-end w-full'>
                  <div className='bg-gray-200 p-[1rem] rounded-md flex flex-col items-start'>
                    <div className='text-[1rem] text-gray-700'>Author : {blog.author}</div>
                    <div className='text-[1rem] text-gray-700'>Date : {date}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='w-[90%] text-left'>
            <div dangerouslySetInnerHTML={{ __html: blog.journalContent }}></div>
          </div>
          <div className='w-[90%] text-left mt-5'>
            <button
              className='bg-green-400 text-white px-4 py-2 rounded-lg'
              onClick={handleCommentToggle}
            >
              Comment
            </button>
            {commentBoxVisible && (
              <div className='mt-4'>
                <input
                  type="text"
                  value={author}
                  onChange={handleAuthorChange}
                  placeholder='Enter your name...'
                  className='w-full p-2 border border-gray-300 rounded-lg mb-2'
                />
                <textarea
                  name="message"
                  value={comment}
                  onChange={handleCommentChange}
                  placeholder='Enter your comment...'
                  className='w-full p-2 border border-gray-300 rounded-lg'
                />
                <button
                  onClick={handleCommentSubmit}
                  className='mt-2 px-4 py-2 bg-green-400 text-white rounded-lg'
                >
                  Submit Comment
                </button>
               
              </div>
            )}
           <div className='flex items-center justify-center w-full mt-[2rem]'>
            
              <button onClick={()=>backClick()} className='p-[0.8rem] bg-green-500 text-xl rounded-md text-white'>Back to journals</button>
          </div>
          </div>
          <div className='w-[90%] text-left mt-5'>
            {comments.map((comment, index) => (
              <div key={index} className='mb-4 p-4 border border-gray-200 rounded-lg'>
                <div className='text-gray-800 font-medium'>{comment.author}</div>
                <div className='text-gray-600'>{comment.comment}</div>
                <div className='text-gray-500 text-sm'>{new Date(comment.date).toLocaleDateString()}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default JournalView;
