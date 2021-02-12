import React from 'react';
import './Footer.css';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import Web3 from 'web3'

class Footer extends React.Component {
  constructor(props) {
    super(props);
    window.web3 = new Web3(window.ethereum);
    this.state = {password: '', deployerContract: new window.web3.eth.Contract([], window.web3.eth.defaultAccount, {})};

    this.handleChange = this.handleChange.bind(this);
    // grab the default account address

    const userAddress = window.ethereum.selectedAddress
    const accounts = window.web3.eth.getAccounts()
    this.setState({account: accounts[0]})
  }


  handleChange(event) {
    this.setState({password: event.target.value});
    localStorage.setItem('userETHAddress', event.target.value);
  }

  startSeason(event) {
    this.state.deployerContract.methods.startSeason()
    localStorage.removeItem("seasonEnded")
    localStorage.setItem('seasonStarted', true)
  }

  endWeek(event) {
    this.state.deployerContract.methods.endWeek()
  }

  endSeason(event) {
    this.state.deployerContract.methods.endSeason()
    localStorage.setItem("seasonEnded", true)
  }

  render() {
    return (
      <div className='footer-container'>
        <section className='footer-subscription'>
          <p className='footer-subscription-heading'>
            Get Updates From OurName!
          </p>
          <div className='input-areas'>
            <form>
              <input
                onChange={this.handleChange}
                className='footer-input'
                name='email'
                type='email'
                placeholder='Your Email'
              />
              <Button link='/services' buttonStyle='btn--outline'>Subscribe</Button>
            </form>
            {this.state.password==='admin' && <button onChange={this.startSeason()}>Admin -- Start Season</button>}
            {this.state.password==='admin' && <button onChange={this.endWeek()}>Admin -- End Week</button>}
            {this.state.password==='admin' && <button onChange={this.endSeason()}>Admin -- End Season</button>}
          </div>
        </section>
        <section class='social-media'>
          <div class='social-media-wrap'>
            <div class='footer-logo'>
              <Link to='/' className='social-logo'>
                Stonks
                <i class='fab fa-typo3' />
              </Link>
            </div>
            <small class='website-rights'>Stonks © 2020</small>
            <div class='social-icons'>
              <Link
                class='social-icon-link facebook'
                to='/'
                target='_blank'
                aria-label='Facebook'
              >
                <i class='fab fa-facebook-f' />
              </Link>
              <Link
                class='social-icon-link instagram'
                to='/'
                target='_blank'
                aria-label='Instagram'
              >
                <i class='fab fa-instagram' />
              </Link>
              <Link
                class='social-icon-link youtube'
                to='/'
                target='_blank'
                aria-label='Youtube'
              >
                <i class='fab fa-youtube' />
              </Link>
              <Link
                class='social-icon-link twitter'
                to='/'
                target='_blank'
                aria-label='Twitter'
              >
                <i class='fab fa-twitter' />
              </Link>
              <Link
                class='social-icon-link twitter'
                to='/'
                target='_blank'
                aria-label='LinkedIn'
              >
                <i class='fab fa-linkedin' />
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Footer;
