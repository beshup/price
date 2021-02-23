import React from 'react';
import './Cards.css';
import CardItem from './CardItem';
import Loading from './Loading';
import Web3 from 'web3';

class Cards extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
        items: []
      };
  }

  componentDidMount() {
      fetch(process.env.REACT_APP_NBA_API)
        .then(res => res.json())
        .then(
          (result) => {
            for(let i=0; i<result.length; ++i) {
              /*window.deployerContract.methods.get_buy_price(result[i].token_id).call().then((price) => {
                result[i].price=(parseFloat(window.web3.utils.fromWei(price))*10).toString().slice(0,-12);
              })*/
              result[i].price = '1'; 
            }
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
      if (error) {
          return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
          return <Loading></Loading>;
      } else {
          console.log(items);
          let arr = items.map((player) => {
              return (
                  <CardItem
                      src={player.image}
                      title={player.name}
                      r1={'Team: ' + player.team}
                      r2={'Position: ' + player.position}
                      label='All-Star'
                      path='/marketplace'
                      r3={player.price + ' ETH'}
                      btn1Title={'Buy'}
                      btn2Title={'Sell'}
                      tokenId={player.token_id}
                  />
              );
          }); 
          return (
              <div className='cards'>
              <h1>Marketplace</h1>
              <div className='cards__container'>
                  <div className='cards__wrapper'>
                  <ul className='cards__items'>
                      {arr.slice(0,5)}
                  </ul>
                  <ul className='cards__items'>
                      {arr.slice(5,10)}
                  </ul>
                  </div>
              </div>
              </div>
          );
      }
  }
}

export default Cards;
