import React, { useState } from 'react';
import '../App.css';
import { Button } from './Button';
import './HeroSection.css';

const Web3 = require("web3");


const ethEnabled = () => {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    window.ethereum.enable();
    return true;
  }
  return false;
}

if (ethEnabled()) {
  var MetaMask = "True"
}
else {
  var MetaMask = "False"
  document.body.innerHTML = "DOWNLOAD FUCKING METAMASK"
  document.location.href = "http://metamask.io"
}

class HeroSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
  }


  handleChange(event) {
    console.log(window.ethereum.selectedAddress)
    this.setState({value: event.target.value});
    localStorage.setItem('userETHAddress', event.target.value);
  }

  endWeek() {

  }
  
  render() {
    return (
      <div className='hero-container'>
        <video src='/videos/broll2.mp4' autoPlay loop muted />
        <h1>NYSE - NBA EDITION</h1>
        <p>Enter ETH Address</p>
        <form autocomplete="off">
              <input
                onChange={this.handleChange}
                value={window.ethereum.selectedAddress}
                
                size='50'
                className='address-input'
                name='email'
                type='email'
                placeholder = {window.ethereum.selectedAddress}
              />
        </form>
        {this.state.value !== '' && 
        MetaMask == "True" &&
        <Button
        link='/products'
        buttonStyle='btn--primary'
        onClick={ethEnabled}
        >
        Check Holdings!
        </Button>}
        {this.state.value === 'admin' && 
        <button className="admin-end-week" onClick={this.endWeek()}>End the Week - Admin</button>
        }
      </div>
    );
  }
}

export default HeroSection;
