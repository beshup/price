import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './MrktButton';
import './PurchaseCardItem.css';

function PurchaseCardItem(props) {

  function passTransactionData() {
    localStorage.setItem('playerPurchaseName', props.name);
    localStorage.setItem('playerPurchaseTeam', props.team);
    localStorage.setItem('playerPurchasePos', props.position);
    localStorage.setItem('playerPurchasePrice', props.price);
    localStorage.setItem('playerPurchaseImg', props.src);
    localStorage.setItem('playerPurchaseLabel', props.label);
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
            <h5 className='cards__item__team'>Team: {props.team}</h5>
            <h5 className='cards__item__position'>Position: {props.position}</h5>
            <h5 className='cards__item__position'>Market Price: {props.price}</h5>
          </div>
          <div className="shares-quantity">
            <h5 className='cards__item__name'>Enter Share Quantity</h5>
            <center><input className="quantity-input" type="number" min="0" max="1000"></input></center>
            <br></br>
          </div>
          <div className="cards_item_buy-sell">
            <input type="radio" id="buy" name="gender" value="male"></input>
            <label for="buy">Buy</label><br></br>
            <input type="radio" id="sell" name="gender" value="male"></input>
            <label for="sell">Sell</label><br></br>
          </div>
        </div>
      </li>
    </>
  );
}

export default PurchaseCardItem;
