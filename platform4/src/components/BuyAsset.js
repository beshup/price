import React from 'react';
import './BuyAsset.css';
import CardItem from './CardItem';
import {TransactionButton} from './TransactionButton';
import PurchaseCardItem from './PurchaseCardItem';

class Cards extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            numShares: 0,
            buy: true,
            error: null,
            isLoaded: false,
            items: []
        };
    }

    componentDidMount() {
        fetch("https://ethgasstation.info/json/ethgasAPI.json")
            .then(res => res.json())
            .then(
            (result) => {
                this.setState({
                isLoaded: true,
                items: result
                });
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                this.setState({
                isLoaded: true,
                error
                });
            }
            )
        }

    render() {
        const { error, isLoaded, items } = this.state;
        const numShares = 5;
        const sharePrice = 6;
        const totalCost = numShares*sharePrice+(items.average/1000);
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            console.log(items);
            return (
                <div className='cards'>
                <h1>Player Share Transaction</h1>
                <br></br>
                <center><button className ="purchase-confirmation">Collect Dividends</button></center>
                <div className='cards__container'>
                    <div className='cards__wrapper'>
                    <ul className='cards__items'>
                        <PurchaseCardItem
                        src={localStorage.getItem('playerPurchaseImg') || ''}
                        name={localStorage.getItem('playerPurchaseName') || ''}
                        team={localStorage.getItem('playerPurchaseTeam') || ''}
                        position={localStorage.getItem('playerPurchasePos') || ''}
                        label={localStorage.getItem('playerPurchaseLabel') || ''}
                        path='/services'
                        price={localStorage.getItem('playerPurchasePrice') || ''}
                        />
                    </ul>
                    <div className="confirm-container">
                        <h1>Confirm ETH Address</h1>
                        <center><h3>{localStorage.getItem('userETHAddress') || ''}</h3></center>
                        <br></br>
                        <center><h3>Price Summary</h3></center>
                        <h4>{numShares.toString() + ' Shares * $' + sharePrice.toString() + '/share + Est. Gas: ' + items.average + ' gwei = ' + totalCost.toString() + ' ETH'}</h4>
                        <br></br>
                        <center><button className ="purchase-confirmation">Confirm</button></center>
                    </div>
                    </div>
                </div>
                </div>
            );
        }
    }
}

export default Cards;
