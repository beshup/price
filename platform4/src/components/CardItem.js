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

  return (
    <>
      <li className='cards__item'>
        {props.path && <Link className='cards__item__link' to={props.path}>
          <figure className='cards__item__pic-wrap' data-category={props.label}>
            <img
              className='cards__item__img'
              alt='Travel Image'
              src={props.src}
            />
          </figure>
          <div className='cards__item__info'>
            <h5 className='cards__item__name'>{props.title}</h5>
            {props.r1 && <h5 className='cards__item__pos'>{props.r1}</h5>}
            {props.r2 && <h5 className='cards__item__pos'>{props.r2}</h5>}
            {props.r3 &&  <h5 className='cards__item__pos'>{props.r3}</h5>}
          </div>
          <div className="cards_item_buy-sell">
            <Button buttonStyle='MrktButton--buy' onClick={props.action1Handler}>{props.btn1Title}</Button>
            <Button buttonStyle='MrktButton--sell' onClick={props.action2Handler}>{props.btn2Title}</Button>
          </div>
        </Link>}
      </li>
    </>
  );
}

export default CardItem;
