import React from 'react';
import './Cards.css';
import BuyCardItem from './BuyInCard';
import CardItem from './CardItem';
import Loading from './Loading';

class InitialCards extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
        items: []
      };
  }

  componentDidMount() {
      fetch(process.env.REACT_APP_NBA_API + 'grip_league')
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
      if (error) {
          return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
          return <Loading></Loading>;
      } else {
          console.log(items);
          let arr = items.map((player) => {
              return (
                  <CardItem
                      src={player.pic}
                      title={player.name}
                      r1={'Team: ' + player.team}
                      r2={'Position: ' + player.position}
                      label='All-Star'
                      path='/marketplace'
                      r3={'0.1 ETH'}
                      mainBtnText={'Buy In'}
                      tokenId={player.token_id}
                  />
              );
          }); 
          return (
              <div className='cards'>
              <h1>Initial Buy In</h1>
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

export default InitialCards;
