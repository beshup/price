import React, { useState } from 'react';
import '../App.css';
import { Button } from './Button';
import './HeroSection.css';

class HeroSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
    localStorage.setItem('userETHAddress', event.target.value);
  }
  
  render() {
    return (
      <div className='hero-container'>
        <video src='/videos/broll2.mp4' autoPlay loop muted />
        <h1>NYSE - NBA EDITION</h1>
        <p>Enter ETH Address</p>
        <form>
              <input
                onChange={this.handleChange}
                value={this.state.value}
                size='50'
                className='address-input'
                name='email'
                type='email'
                placeholder=''
              />
        </form>
        {this.state.value !== '' && 
        <Button
        link='/products'
        buttonStyle='btn--primary'
        >
        Check Holdings!
        </Button>}
      </div>
    );
  }
}

export default HeroSection;
