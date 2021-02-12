import React from 'react';
import './BuyAsset.css';

class DividendBtn extends React.Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    render() {
        if (this.props.tokenId < 10) {
            return (
                <button className="purchase-confirmation" onClick={this.onClick(this.props.tokenId, this.props.sharesOwned, this.props.userAddress, this.props.deployerContract)}>Collect Dividends</button>
            )
        } else {
            return(<div></div>);
        }
    }

    onClick(tokenId, sharesOwned, userAddress, deployerContract) {
        fetch(`http://hax.hacker.af:5000/to_send_per_entity/${tokenId}/${sharesOwned}/69/100`)
          .then(res => res.json())
          .then(
            (result) => {
               deployerContract.methods.sellTokens(result.to_send).call({from:userAddress})
            },
            (error) => {
              console.log(error)
            }
        )
    }
}

export default DividendBtn;