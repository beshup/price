import React from 'react';
import './BuyAsset.css';

class champBtn extends React.Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    render() {
        if (localStorage.getItem("seasonEnded") == true && this.props.tokenId < 10) {
            return (
                <button className="purchase-confirmation retrieve" onClick={this.onClick(this.props.tokenId)}>Retrieve Champion NFT</button>
            )
        } else {
            return(<div></div>);
        }
    }

    onClick(tokenId) {
        this.props.deployerContract.methods.retrieveNFT(tokenId).call({from:this.props.userAddress})
    }
}

export default champBtn;