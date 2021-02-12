import React from 'react';
import './Footer.css';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import Web3 from 'web3'

require('dotenv').config();

class Footer extends React.Component {
  constructor(props) {
    super(props);
    window.web3 = new Web3(window.ethereum);
    const ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"id","type":"bytes32"}],"name":"ChainlinkCancelled","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"id","type":"bytes32"}],"name":"ChainlinkFulfilled","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"id","type":"bytes32"}],"name":"ChainlinkRequested","type":"event"},{"inputs":[],"name":"buyPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"buyTokens","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"endAuction","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"endSeason","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"entityToPublicShareAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"reqID","type":"bytes32"},{"internalType":"uint256","name":"payout","type":"uint256"}],"name":"fulfill","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getPlayerBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getShareOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"entityId","type":"uint256"}],"name":"get_top_shareholder","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"request_uri","type":"string"}],"name":"giveDividendPerPlayer","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"jobIdMapping","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"lastDividendWithdrawn","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"numEntities","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"request_uri","type":"string"}],"name":"requestDividendWorthyEntities","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"retrieveNFT","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"startSeason","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"entityId","type":"uint256"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer_from_backdoor","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"weekPeriod","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"weekTrigger","outputs":[],"stateMutability":"nonpayable","type":"function"}];
    this.state = {password: '', deployerContract: new window.web3.eth.Contract(ABI, process.env.DEPLOYER_CONTRACT_ADDRESS)};

    this.handleChange = this.handleChange.bind(this);
    // grab the default account address

    this.setState({userAddress: window.ethereum.selectedAddress})
    const accounts = window.web3.eth.getAccounts()
    this.setState({account: accounts[0]})
  }


  handleChange(event) {
    this.setState({password: event.target.value});
    localStorage.setItem('userETHAddress', event.target.value);
  }

  startSeason(event) {
    this.state.deployerContract.methods.startSeason().call({from:this.state.userAddress})
    localStorage.removeItem("seasonEnded")
  }

  endWeek(event) {
    this.state.deployerContract.methods.endWeek().call({from:this.state.userAddress})
  }

  endSeason(event) {
    this.state.deployerContract.methods.endSeason().call({from:this.state.userAddress})
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
