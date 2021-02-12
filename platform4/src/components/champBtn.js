import React from 'react';
import './BuyAsset.css';

class champBtn extends React.Component {
    render() {
        if (localStorage.getItem("seasonEnded") == true) {
            return (
                <button className="purchase-confirmation retrieve">Retrieve Champion NFT</button>
            )
        } else {
            return(<div></div>);
        }
    }
}

export default champBtn;