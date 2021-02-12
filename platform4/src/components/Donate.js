import React from 'react';
import './Cards.css';
import CardItem from './CardItem';
import Loading from './Loading';
import DonateCardItem from './DonateCard';

class Donate extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
        items: []
      };
  }

  componentDidMount() {
      fetch("http://hax.hacker.af:5000/grip_league")
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
                  <DonateCardItem
                      src={player.image}
                      name={player.name}
                      team={player.team}
                      position={player.position}
                      label='All-Star'
                      path='/services'
                      price={(player.fantasy_score/8).toFixed(2).toString() + ' ETH'}
                  />
              );
          }); 
          return (
              <div className='cards'>
              <h1>Marketplace</h1>
              <div className='cards__container'>
                  <div className='cards__wrapper'>
                  <ul className='cards__items'>
                  <DonateCardItem
                      src='charity'
                      name='charity'
                      team='charity'
                      position='charity'
                      label='All-Star'
                      path='/services'
                      price='charity'
                  />
                  <DonateCardItem
                      src='charity'
                      name='Unicef'
                      team='charity'
                      position='charity'
                      label='All-Star'
                      path='/services'
                      price='charity'
                  />
                  <DonateCardItem
                      src='charity'
                      name='Other Charity'
                      team='charity'
                      position='charity'
                      label='All-Star'
                      path='/services'
                      price='charity'
                  />
                  <DonateCardItem
                      src='charity'
                      name='Other other charity'
                      team='charity'
                      position='charity'
                      label='All-Star'
                      path='/services'
                      price='charity'
                  />
                  </ul>
                  </div>
              </div>
              </div>
          );
      }
  }
}

export default Donate;
