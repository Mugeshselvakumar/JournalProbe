4/* eslint-disable no-unused-vars */
import React from 'react'
import Welcome from './Welcome'
import PopJourn from '../PopJourn'
import About from './About'
import CarouselPage from './carouselPage'
import Ourstory from './Ourstory'
const Home = () => {
  return (
  
      <div className=''>
        <Welcome />
        <CarouselPage/>
        <br></br>
        <Ourstory/>
        <br></br>
      </div>
  
  )
}

export default Home