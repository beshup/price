import React from 'react';
import './Cards.css';
import CardItem from './CardItem';
import {TransactionButton} from './TransactionButton';
import PurchaseCardItem from './PurchaseCardItem';

function Cards() {
  return (
    <div className='cards'>
      <h1>Player Share Purchase</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <PurchaseCardItem
              src={localStorage.getItem('playerPurchaseImg') || ''}
              name={localStorage.getItem('playerPurchaseName') || ''}
              team={localStorage.getItem('playerPurchaseTeam') || ''}
              position={localStorage.getItem('playerPurchasePos') || ''}
              label={localStorage.getItem('playerPurchaseLabel') || ''}
              path='/services'
              price={localStorage.getItem('playerPurchasePrice') || ''}
            />
          </ul>
          <div className="confirm-container">
              <h1>Confirm ETH Address</h1>
              <center><h3>{localStorage.getItem('userETHAddress') || ''}</h3></center>
              <center><button>Confirm</button></center>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;
