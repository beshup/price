import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './MrktButton';
import './CardItem.css';

function CardItem(props) {

  function passTransactionData() {
    localStorage.setItem('playerPurchaseName', props.name);
    localStorage.setItem('playerPurchaseTeam', props.team);
    localStorage.setItem('playerPurchasePos', props.position);
    localStorage.setItem('playerPurchasePrice', props.price);
    localStorage.setItem('playerPurchaseImg', props.src);
    localStorage.setItem('playerPurchaseLabel', props.label);
    localStorage.setItem('playerTokenId', props.tokenId);
  }

  function buyHandler() {

  }

  function sellHandler() {

  }

  return (
    <>
      <li className='cards__item'>
        <Link className='cards__item__link' to={props.path}>
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
            <Button buttonStyle='MrktButton--buy' onClick={passTransactionData}>Buy</Button>
            <Button buttonStyle='MrktButton--sell' onClick={passTransactionData}>Sell</Button>
          </div>
        </Link>
      </li>
    </>
  );
}

export default CardItem;
