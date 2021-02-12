import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './MrktButton';
import './DonateCard.css';
import Loading from './Loading';

class DonateCardItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            donated: 0,
            waterProjectAddress: '0x5389e39821edc01bb5f6e4b42685c9b9516e1e52',
            coolEarthAddress:'0x3c8cB169281196737c493AfFA8F49a9d823bB9c5',
            saveTheChildrenAddress:'0xA0780a008D9CeFC58821Ca3E05dFE1173087C3C4',
        };
        this.handleDonation = this.handleDonation.bind(this);
    }

    handleDonation() {
        this.setState({
            donated:1,
        })
    }

    render() {
        return (
            <>
            {this.state.donated === 0 && 

            <li className='cards__item'>
            <Link className='cards__item__link' to={this.props.path}>
            <figure className='cards__item__pic-wrap' data-category={this.props.label}>
                <img
                className='cards__item__img'
                alt='Travel Image'
                src={this.props.src}
                />
            </figure>
            <div className='cards__item__info'>
                <h5 className='cards__item__name'>{this.props.name}</h5>
                <h5 className='cards__item__pos'>{this.props.description}</h5>
                <h5 className='cards__item__pos'>Give 0.4 ETH Now {this.props.team}</h5>
                <center><Button buttonStyle='MrktButton--buy' onClick={this.handleDonation}>Donate</Button></center>
            </div>
            </Link>
            </li>

            }
            {this.state.donated === 1 && <Loading></Loading>}
            {this.state.donated === 2 &&
            <div className="donation-complete-top">
                <h4>We just sent 0.4 ETH to address</h4>
            </div> 
            
            }
            </>
          );
    }
}

export default DonateCardItem;

