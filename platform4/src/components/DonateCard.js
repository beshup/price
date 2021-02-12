import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './MrktButton';
import './DonateCard.css';

class PurchaseCardItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {numShares: '', buy: true, sell: true};
    
        this.handleChange = this.handleChange.bind(this);
        this.confirmBuy = this.confirmBuy.bind(this);
        this.confirmSell = this.confirmSell.bind(this);
      }
    
      handleChange(event) {
        this.setState({numShares: event.target.value});
        localStorage.setItem('pricePerShare', event.target.value);
        this.props.setQuantity(event.target.value);
      }

      // KEY NOTE: IF BOTH BUY AND SELL ARE TRUE THIS IS INVALID CASE, CAN FIX TMR

      confirmBuy() {
          this.setState({
              buy: true
          });
          console.log(this.state.buy);
      }

      confirmSell() {
        this.setState({
            sell: true
        });
        console.log(this.state.sell);
      }

    render() {
        return (
            <>
              <li className='cards__item'>
                <a className='link_website' href={this.props.path}>
                <div className='cards__item__link'>
                  <figure className='cards__item__pic-wrap' data-category={this.props.label}>
                    <img
                      className='cards__item__img'
                      alt='Travel Image'
                      src={this.props.src}
                    />
                  </figure>
                  <div className='cards__item__info'>
                    <h5 className='cards__item__name'>{this.props.name}</h5>
                    <h5 className='cards__item__team'>{this.props.team}</h5>
                    <h5 className='cards__item__position'>Click here to know more about this{this.props.position}</h5>
                    <h5 className='cards__item__position'>{this.props.price}</h5>
                  </div>
                  <div className="shares-quantity">
                    <h5 className='cards__item__name'>Enter purchase amount</h5>
                    <center><input className="quantity-input" type="number" min="0" max="1000" onChange={this.handleChange}></input></center>
                    <br></br>
                  </div>
                  </div>
                </a>
              </li>
            </>
          );
    }
}

export default PurchaseCardItem;
