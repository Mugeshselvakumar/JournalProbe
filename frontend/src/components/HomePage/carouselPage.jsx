import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import jp1 from '../../assets/jp1.jpg';
import jp2 from '../../assets/jp2.jpg';
import jp3 from '../../assets/jp3.jpg';
import jp4 from '../../assets/jp4.jpg';
import jp5 from '../../assets/jp5.jpg';
import jp6 from '../../assets/jp6.jpg';
import { useNavigate } from 'react-router';

const CarousalPage = () => {
  const navigate = useNavigate();

  const toExplore = (country) => {
    navigate(`/popjourn/${country}`);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '0',
    arrows: true,
    autoplay: true, 
    autoplaySpeed: 3000, 
  };

  const cardStyle = {
    backgroundColor: '#f4f7f0',
    color: '#2d2d2d',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    width: '350px', 
    height: '450px', 
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  };

  const buttonStyle = {
    backgroundColor: '#28a745',
    color: '#fff',
    padding: '10px 20px',
    borderRadius: '5px',
    textDecoration: 'none',
    marginTop: 'auto', 
  };

  return (
    <div style={{ padding: '40px', backgroundColor: '#e8f5e9' }}>
    <h2 className="text-4xl font-bold text-green-700 mb-4"> Country Journal</h2>
      <Slider {...settings}>
        <div style={{ padding: '10px' }}>
          <div style={cardStyle}>
            <img src={jp1} alt="India" style={{ borderRadius: '10px', height: '200px' }} />
            <h3 className="text-xl font-bold text-green-300 mb-4">India</h3>
            <p>The diverse landscapes and rich history attract millions of international and domestic tourists annually, enhancing global awareness of India's cultural wealth.</p>
            <button style={buttonStyle} onClick={() => toExplore('india')}>Learn More</button>
          </div>
        </div>
        <div style={{ padding: '10px' }}>
          <div style={cardStyle}>
            <img src={jp2} alt="London" style={{ borderRadius: '10px', height: '200px' }} />
            <h3 className="text-xl font-bold text-green-300 mb-4">London</h3>
            <p>The city's rich history, iconic landmarks, and vibrant cultural scene attract millions of visitors each year, enhancing its global reputation and cultural influence.</p>
            <button style={buttonStyle} onClick={() => toExplore('london')}>Learn More</button>
          </div>
        </div>
        <div style={{ padding: '10px' }}>
          <div style={cardStyle}>
            <img src={jp3} alt="China" style={{ borderRadius: '10px', height: '200px' }} />
            <h3 className="text-xl font-bold text-green-300 mb-4">China</h3>
            <p>The country's unique blend of ancient traditions and modern attractions, along with its natural beauty, enhances China's global cultural presence.</p>
            <button style={buttonStyle} onClick={() => toExplore('China')}>Learn More</button>
          </div>
        </div>
        <div style={{ padding: '10px' }}>
          <div style={cardStyle}>
            <img src={jp4} alt="Mexico" style={{ borderRadius: '10px', height: '200px' }} />
            <h3 className="text-xl font-bold text-green-300 mb-4">Mexico</h3>
            <p>Visitors are drawn to its pristine landscapes and unique wildlife, increasing global understanding of this remote region's environmental significance.</p>
            <button style={buttonStyle} onClick={() => toExplore('Mexico')}>Learn More</button>
          </div>
        </div>
        <div style={{ padding: '10px' }}>
          <div style={cardStyle}>
            <img src={jp5} alt="Canada" style={{ borderRadius: '10px', height: '200px' }} />
            <h3 className="text-xl font-bold text-green-300 mb-4">Canada</h3>
            <p>The continent's diverse landscapes, wildlife, and rich cultural heritage attract millions of visitors, showcasing Canada's natural beauty and cultural richness to the world.</p>
            <button style={buttonStyle} onClick={() => toExplore('Canada')}>Learn More</button>
          </div>
        </div>
        <div style={{ padding: '10px' }}>
          <div style={cardStyle}>
            <img src={jp6} alt="America" style={{ borderRadius: '10px', height: '200px' }} />
            <h3 className="text-xl font-bold text-green-300 mb-4">America</h3>
            <p>Natural wonders to historic landmarks, draw millions of visitors, enhancing the global profile and appreciation of American culture and landscapes.</p>
            <button style={buttonStyle} onClick={() => toExplore('america')}>Learn More</button>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default CarousalPage;
