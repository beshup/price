import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './MrktButton';
import './AssetCardItem.css';
import ChampBtn from './champBtn'
import './BuyAsset.css';


function PlayerAsset(props) {

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
            <button className="purchase-confirmation">Collect Dividends</button>
            <ChampBtn tokenId={props.tokenId} deployerContract={props.deployerContract} userAddress={props.userAddress}></ChampBtn>
          </figure>
          <div className='cards__item__info'>
            <h5 className='cards__item__name'>{props.name}</h5>
            <h5 className='cards__item__team'>Team: {props.team}</h5>
            <h5 className='cards__item__position'>Position: {props.position}</h5>
            <h5 className='cards__item__quantity'>Shares Owned: {props.sharesOwned}</h5>
          </div>
        </Link>
      </li>
    </>
  );
}

export default PlayerAsset;
