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
              src='https://i.ytimg.com/vi/ZatiWqQjU7M/maxresdefault.jpg'
              name='Lebron James'
              team="Los Angeles Lakers"
              position="SF"
              label='All-Star'
              path='/services'
            />
            <CardItem
              src='https://pbs.twimg.com/profile_images/1140381676306145280/P4LOFLBQ.jpg'
              name='Kyle Lowry'
              team="Toronto Raptors"
              position="PG"
              label='All-Star'
              path='/services'
            />
            <CardItem
              src='https://i.imgflip.com/vvoo7.jpg'
              name='Russell Westbrook'
              team="Washington Wizards"
              position="PG"
              label='All-Star'
              path='/services'
            />
            <CardItem
              src='http://i.imgur.com/viaQFvq.jpg?1'
              name='Anthony Davis'
              team="Los Angeles Lakers"
              position="PF"
              label='All-Star'
              path='/services'
            />
            <CardItem
              src='https://ftw.usatoday.com/wp-content/uploads/sites/90/2019/02/anizj8.png?w=1000&h=600&crop=1'
              name='Stephen Curry'
              team="Golden State Warriors"
              position="SG"
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
