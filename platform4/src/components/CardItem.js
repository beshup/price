import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './MrktButton';
import './CardItem.css';

function CardItem(props) {
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
            <h5 className='cards__item__team'>Team: {props.team}</h5>
            <h5 className='cards__item__position'>Position: {props.position}</h5>
            <h5 className='cards__item__position'>Market Price: {props.price}</h5>
          </div>
          <div className="cards_item_buy-sell">
            <Button buttonStyle='MrktButton--buy'>Buy</Button>
            <Button buttonStyle='MrktButton--sell'>Sell</Button>
          </div>
        </Link>
      </li>
    </>
  );
}

export default CardItem;
