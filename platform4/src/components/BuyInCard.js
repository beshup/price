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

  function handleBuyShare() {
      console.log(props.tokenId);
      window.deployerContract.methods.buyTokens(window.web3.utils.toWei('0.1','ether'),props.tokenId).send({from:window.ethereum.selectedAddress, value:window.web3.utils.toWei('0.1','ether')})
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
