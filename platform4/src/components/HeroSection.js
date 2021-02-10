import React, { useState } from 'react';
import '../App.css';
import { Button } from './Button';
import './HeroSection.css';

function HeroSection() {
  const [display, setDisplay] = useState(false);

  const handleChange = () => {
    setDisplay(true);
  }
  
  return (
    <div className='hero-container'>
      <video src='/videos/broll2.mp4' autoPlay loop muted />
      <h1>NYSE - NBA EDITION</h1>
      <p>Enter ETH Address</p>
      <form>
            <input
              onChange={handleChange}
              size='50'
              className='address-input'
              name='email'
              type='email'
              placeholder=''
            />
      </form>
      {display && <Button buttonStyle='btn--primary'>Check Holdings!</Button>}
    </div>
  );
}

export default HeroSection;
