import React from 'react'
import Welcome from './Welcome'
import PopJourn from '../PopJourn'
import About from './About'
import CarouselPage from './carouselPage'
import Ourstory from './Ourstory'
const Landingpage = () => {
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

export default Landingpage