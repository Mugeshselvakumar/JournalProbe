/* eslint-disable no-unused-vars */
import React from 'react'
import homeimg from '../../assets/homepage.png'
import { TypeAnimation } from 'react-type-animation';
import { useNavigate } from 'react-router';

const Welcome = () => {
  const navigate = useNavigate()
  const toExplore=()=>{
    navigate('/journals')
  }
  return (
    <section  className='h-[70vh] mt-20'>
        <div className='h-full flex justify-center items-center relative pb-10 '>
        <div className='flex flex-col px-[9rem] z-10 '>
            <p className='text-6xl flex flex-start'> <TypeAnimation
               sequence={[
                'Welcome to JournalProbe',
                  1000, 
                    ]}
                  wrapper="span"
                 speed={50}
                  repeat={Infinity}
              /></p> 
            <p className='py-2'>Capture.Preserve.Share.</p>
            <div className='py-10 flex flex-start'><button className='w-[12rem] h-[3.5rem] bg-green-700 rounded-full' onClick={toExplore}>
                <span className='text-2xl text-white'>Explore</span>
            </button>
            </div> 
       </div>
           
        </div>
      <div>  
      </div>
      
    </section>
  )
}
export default Welcome