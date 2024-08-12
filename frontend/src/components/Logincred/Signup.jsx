import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loginImg from '../../assets/image.png'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import emailjs from 'emailjs-com';

const SignupForm = () => {
    const navigate = useNavigate();
    const toLogin = () => {
        navigate('/login');
    }

    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    const validatePassword = (password) => {
        // Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character
        const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return re.test(password);
    }

    const sendConfirmationEmail = (email, username) => {
        const templateParams = {
            to_email: email,
            to_name: username,
            message: 'Thank you for registering with JournalProbe! Your account has been created successfully.',
        };

        emailjs.send('service_v88fivj', 'template_wh37sew', templateParams, 'iGs1oWMilYPBpmvaI')
            .then((response) => {
                console.log('Confirmation email sent successfully!', response.status, response.text);
            })
            .catch((error) => {
                console.error('Failed to send confirmation email:', error);
            });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            toast.error("Invalid email format");
            return;
        }

        if (!validatePassword(password)) {
            toast.error("Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}users/signup`, {
                userName, email, password
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(response);
            if (response.status === 200) {
                toast.success("Registered successfully");
                document.cookie = `journal_token=${response.data.message.token}`;
                sendConfirmationEmail(email, userName); // Send confirmation email
                navigate('/');
            }
        } catch (err) {
            toast.error("User already exists");
        }
    }

    return (
        <div className="md:w-1/2 bg-gradient-to-r rounded-lb-xl shadow-2xl overflow-hidden p-10 space-y-8 rounded-r-xl">
            <h2 className="text-center text-4xl font-extrabold text-gray-900">
                Register
            </h2>
            <p className="text-center text-gray-900">
                Get started with your account
            </p>
            <form method="POST" action="#" className="space-y-6" onSubmit={handleSubmit}>
                <div className="relative">
                    <input
                        placeholder="Username"
                        className="peer h-10 w-full border-b-2 border-solid border-gray-300 text-black bg-transparent placeholder-transparent focus:outline-none focus:border-gray-500"
                        required=""
                        id="name"
                        name="name"
                        type="text"
                        onChange={(e) => setUserName(e.target.value)}
                    />
                    <label
                        className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-green-700 peer-focus:text-sm"
                        htmlFor="name"
                    >Username</label>
                </div>
                <div className="relative">
                    <input
                        placeholder="Email"
                        className="peer h-10 w-full border-b-2 border-solid border-gray-300 text-black bg-transparent placeholder-transparent focus:outline-none focus:border-gray-500"
                        required=""
                        id="email"
                        name="email"
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label
                        className="absolute left-0 -top-3.5 text-gray-900 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-green-700 peer-focus:text-sm"
                        htmlFor="email"
                    >Email</label>
                </div>
                <div className="relative">
                    <input
                        placeholder="Password"
                        className="peer h-10 w-full border-b-2 border-solid border-gray-300 text-black bg-transparent placeholder-transparent focus:outline-none focus:border-gray-500"
                        required=""
                        id="password"
                        name="password"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <label
                        className="absolute left-0 -top-3.5 text-gray-900 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-green-700 peer-focus:text-sm"
                        htmlFor="password"
                    >Password</label>
                </div>
                <div className="relative">
                    <input
                        placeholder="Confirm Password"
                        className="peer h-10 w-full border-b-2 border-solid border-gray-300 text-black bg-transparent placeholder-transparent focus:outline-none focus:border-gray-500"
                        required=""
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <label
                        className="absolute left-0 -top-3.5 text-gray-900 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-green-700 peer-focus:text-sm"
                        htmlFor="confirmPassword"
                    >Confirm Password</label>
                </div>
                <button
                    className="w-full py-2 px-4 bg-green-700 hover:bg-green-800 rounded-md shadow-lg text-white font-semibold transition duration-200"
                    type="submit"
                >
                    Register
                </button>
                <ToastContainer />
            </form>
            <div className="text-center text-gray-900">Have an account?
                <button className="text-green-800 px-2 hover:underline" onClick={toLogin}>Login</button>
            </div>
        </div>
    );
}

const Signup = () => {
    return (
        <div>
            <div className=''>
                <div className='flex items-center justify-center rounded-2xl h-[86vh]'>
                    <div className='bg-white h-[35rem] w-[55rem] flex rounded-xl'>
                        <div className='hidden w-[50%] md:block'>
                            <img src={loginImg} alt="Signup" className='w-full h-full object-cover' />  
                        </div>
                        <SignupForm />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;
