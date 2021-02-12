import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './MrktButton';
import './CardItem.css';
import Web3 from 'web3';

function BuyCardItem(props) {

  function passTransactionData() {
    localStorage.setItem('playerPurchaseName', props.name);
    localStorage.setItem('playerPurchaseTeam', props.team);
    localStorage.setItem('playerPurchasePos', props.position);
    localStorage.setItem('playerPurchasePrice', props.price);
    localStorage.setItem('playerPurchaseImg', props.src);
    localStorage.setItem('playerPurchaseLabel', props.label);
  }

  const ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"id","type":"bytes32"}],"name":"ChainlinkCancelled","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"id","type":"bytes32"}],"name":"ChainlinkFulfilled","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"id","type":"bytes32"}],"name":"ChainlinkRequested","type":"event"},{"inputs":[],"name":"buyPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"buyTokens","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"endAuction","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"endSeason","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"entityToPublicShareAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"reqID","type":"bytes32"},{"internalType":"uint256","name":"payout","type":"uint256"}],"name":"fulfill","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getPlayerBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getShareOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"entityId","type":"uint256"}],"name":"get_top_shareholder","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"request_uri","type":"string"}],"name":"giveDividendPerPlayer","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"jobIdMapping","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"lastDividendWithdrawn","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"numEntities","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"request_uri","type":"string"}],"name":"requestDividendWorthyEntities","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"retrieveNFT","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"startSeason","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"token","outputs":[{"internalType":"contract LTokens","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"entityId","type":"uint256"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer_from_backdoor","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"weekPeriod","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"weekTrigger","outputs":[],"stateMutability":"nonpayable","type":"function"}];
  window.web3 = new Web3(window.ethereum);
  window.ethereum.enable();
  // grab the default account address
  var deployerContract = new window.web3.eth.Contract(ABI, "0x762ecabeE51016dd27cf6f52AB170b139d40A168", {});

  function handleBuyShare() {
      console.log(props.tokenId);
      deployerContract.methods.buyTokens(props.tokenId).send({from:window.ethereum.selectedAddress, value:window.web3.utils.toWei('0.1','ether')})
  }


  return (
    <>
      <li className='cards__item'>
        <div className='cards__item__link'>
          <figure className='cards__item__pic-wrap' data-category={props.label}>
            <img
              className='cards__item__img'
              alt='Travel Image'
              src={props.src}
            />
          </figure>
          <div className='cards__item__info'>
            <h5 className='cards__item__name'>{props.name}</h5>
            <h5 className='cards__item__pos'>Team: {props.team}</h5>
            <h5 className='cards__item__pos'>Position: {props.position}</h5>
            <h5 className='cards__item__pos'>Market Price: {props.price}</h5>
          </div>
          <div className="cards_item_buy-sell">
            <button onClick={handleBuyShare}>Buy One Share</button>
          </div>
        </div>
      </li>
    </>
  );
}

export default BuyCardItem;
