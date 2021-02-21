import React from 'react';
import './Cards.css';
import BuyCardItem from './BuyInCard';
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
                  <BuyCardItem
                      src={player.image}
                      name={player.name}
                      team={player.team}
                      position={player.position}
                      label='All-Star'
                      path='/marketplace'
                      price={0.1}
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

  /*render () {
    return (
      <div className='cards'>
        <h1>Marketplace</h1>
        <div className='cards__container'>
          <div className='cards__wrapper'>
            <ul className='cards__items'>
              <CardItem
                src='https://i.ytimg.com/vi/ZatiWqQjU7M/maxresdefault.jpg'
                name='Lebron James'
                team="Los Angeles Lakers"
                position="SF"
                label='All-Star'
                path='/services'
                price='$25.67'
              />
              <CardItem
                src='https://pbs.twimg.com/profile_images/1140381676306145280/P4LOFLBQ.jpg'
                name='Kyle Lowry'
                team="Toronto Raptors"
                position="PG"
                label='All-Star'
                path='/services'
                price='$4.32'
              />
              <CardItem
                src='https://i.imgflip.com/vvoo7.jpg'
                name='Russell Westbrook'
                team="Washington Wizards"
                position="PG"
                label='All-Star'
                path='/services'
                price='$6.79'
              />
              <CardItem
                src='http://i.imgur.com/viaQFvq.jpg?1'
                name='Anthony Davis'
                team="Los Angeles Lakers"
                position="PF"
                label='All-Star'
                path='/services'
                price='$58.97'
              />
              <CardItem
                src='https://ftw.usatoday.com/wp-content/uploads/sites/90/2019/02/anizj8.png?w=1000&h=600&crop=1'
                name='Stephen Curry'
                team="Golden State Warriors"
                position="SG"
                label='All-Star'
                path='/services'
                price='$77.87'
              />
            </ul>
          </div>
        </div>
      </div>
    );
  }*/
}

export default InitialCards;
