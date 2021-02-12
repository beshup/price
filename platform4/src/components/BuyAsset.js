import React from 'react';
import CardItem from './CardItem';
import {TransactionButton} from './TransactionButton';
import PurchaseCardItem from './PurchaseCardItem';
import Loading from './Loading';

class Cards extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            buy: false,
            sell: false,
            quantity: 0,
        };
        this.setQuantity = this.setQuantity.bind(this);
        this.setBuy = this.setBuy.bind(this);
        this.setSell = this.setSell.bind(this);
        this.handlePurchase = this.handlePurchase.bind(this);
    }

    setBuy() {
        this.setState({
            buy: true,
            sell: false
        })
    }

    setSell() {
        this.setState({
            buy: false,
            set: true
        })
    }

    setQuantity(n) {
        this.setState({
            quantity: n
        })
    }

    handlePurchase() {
        if(this.state.buy) {
            const y = window.web3.utils.toWei(localStorage.getItem('playerPurchasePrice').slice(0,5),'ether');
            window.deployerContract.methods.buyTokens(y,parseInt(localStorage.getItem('playerTokenId'))).send({from:window.ethereum.selectedAddress, value:y*this.state.quantity})
        } else {
            const x = window.web3.utils.toWei(localStorage.getItem('playerPurchasePrice').slice(0,5),'ether');
            console.log(window.deployerContract.options.address);
            window.deployerContract.methods.sellTokens((x*this.state.quantity).toString()).send({from:window.ethereum.selectedAddress})
            window.tokenContract.methods.safeTransferFrom(window.ethereum.selectedAddress,'0x4F057932615df1050B7df5fDd0EB5CaD2Cf95AA4',parseInt(localStorage.getItem('playerTokenId')),this.state.quantity,'0x').send({from:window.ethereum.selectedAddress})
        }
        
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

    transfer() {
        if (this.buy == true) {
            // address from and to, switch and call function 
        } else {
            
        }
    }

    render() {
        const { error, isLoaded, items } = this.state;
        const numShares = 5;
        const sharePrice = 0.0006;
        const price = parseFloat(localStorage.getItem('playerPurchasePrice').slice(0,-4)).toFixed(2);
        const totalCost = (this.state.quantity*price+(items.average*0.000000001*21000)).toFixed(4);
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <Loading></Loading>;
        } else {
            console.log(items);
            return (
                <div className='cards'>
                <h1>Player Share Transaction</h1>
                <br></br>
                <div className='cards__container'>
                    <div className='cards__wrapper'>
                    <ul className='cards__items'>
                        <PurchaseCardItem
                        buyAssert={this.setBuy}
                        sellAssert={this.setSell}
                        setQuantity={this.setQuantity}
                        src={localStorage.getItem('playerPurchaseImg') || ''}
                        name={localStorage.getItem('playerPurchaseName') || ''}
                        team={localStorage.getItem('playerPurchaseTeam') || ''}
                        position={localStorage.getItem('playerPurchasePos') || ''}
                        label={localStorage.getItem('playerPurchaseLabel') || ''}
                        path='/services'
                        price={localStorage.getItem('playerPurchasePrice') || ''}
                        />
                    </ul>
                    </div>
                    <div className="confirm-container">
                        <h2><center>Confirm ETH Address: </center></h2>
                        <center><h3>{window.ethereum.selectedAddress}</h3></center>
                        <br></br>
                        <center><h2>Price Summary: </h2></center>
                        <h4>{this.state.quantity.toString() + ' Shares x ' + localStorage.getItem('playerPurchasePrice') + '/share + Est. Gas: ' + items.average + ' * 21000 gwei = ' + totalCost.toString() + ' ETH'}</h4>
                        <br></br>
                        <center><button className ="purchase-confirmation" onClick={this.handlePurchase}>Confirm</button></center>
                    </div>
                </div>
                </div>
            );
        }
    }
}

export default Cards;
