import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards'>
      <h1>Marketplace</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='images/img-9.jpg'
              name='Lebron James'
              team="Los Angeles Lakers"
              position="Small Forward"
              label='All-Star'
              path='/services'
            />
            <CardItem
              src='images/img-9.jpg'
              name='Lebron James'
              team="Los Angeles Lakers"
              position="Small Forward"
              label='Adventure'
              path='/services'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='images/img-9.jpg'
              name='Lebron James'
              team="Los Angeles Lakers"
              position="Small Forward"
              label='All-Star'
              path='/services'
            />
            <CardItem
              src='images/img-9.jpg'
              name='Lebron James'
              team="Los Angeles Lakers"
              position="Small Forward"
              label='All-Star'
              path='/services'
            />
            <CardItem
              src='images/img-9.jpg'
              name='Lebron James'
              team="Los Angeles Lakers"
              position="Small Forward"
              label='All-Star'
              path='/services'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
