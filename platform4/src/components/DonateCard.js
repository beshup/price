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
            amountToDonate: 0.4,
            waterProjectAddress: '0x5389e39821edc01bb5f6e4b42685c9b9516e1e52',
            coolEarthAddress:'0x3c8cB169281196737c493AfFA8F49a9d823bB9c5',
            saveTheChildrenAddress:'0xA0780a008D9CeFC58821Ca3E05dFE1173087C3C4',
        };
        this.handleDonation = this.handleDonation.bind(this);
    }

    handleDonation() {
        window.web3.eth.sendTransaction({to: process.env.REACT_APP_DEPLOYER_CONTRACT_ADDRESS,from:window.ethereum.selectedAddress,value:window.web3.utils.toWei('0.4','ether')})

        this.setState({
            donated:1,
            amountToDonate:0
        })
    }

    render() {
        return (
            <>

            <li className='cards__item'>
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
                <h5 className='cards__item__pos'>{this.props.description}</h5>
                <h5 className='cards__item__pos'>Give 0.4 ETH Now {this.props.team}</h5>
                <center><button onClick={this.handleDonation}>Donate</button></center>
            </div>
            </div>
            </li>
            </>
          );
    }
}

export default DonateCardItem;

