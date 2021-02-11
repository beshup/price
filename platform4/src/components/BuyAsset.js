import React from 'react';
import './Cards.css';
import CardItem from './CardItem';
import {TransactionButton} from './TransactionButton';

function Cards() {
  return (
    <div className='cards'>
      <h1>Player Share Purchase</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='https://i.ytimg.com/vi/ZatiWqQjU7M/maxresdefault.jpg'
              name='Lebron James'
              team="Los Angeles Lakers"
              position="SF"
              label='All-Star'
              path='/services'
              price='$25.67'
            />
          </ul>
          <div className="confirm-container">
              <h1>Confirm ETH Address</h1>
              <center><h3>{localStorage.getItem('userETHAddress') || ''}</h3></center>
              <TransactionButton></TransactionButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;
