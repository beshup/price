import React from 'react';
import './BuyAsset.css';

class champBtn extends React.Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    render() {
        if (localStorage.getItem("seasonEnded") === 'true' && this.props.tokenId < 10) {
            return (
                <button className="purchase-confirmation" onClick={this.onClick}>Retrieve Champion NFT</button>
            )
        } else {
            return(<div></div>);
        }
    }

    onClick() {
        this.props.deployerContract.methods.retrieveNFT(this.props.tokenId).send({from:this.props.userAddress})
    }
}

export default champBtn;