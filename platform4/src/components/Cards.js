import React from 'react';
import './Cards.css';
import CardItem from './CardItem';
import Loading from './Loading';
import Web3 from 'web3';
import { Line } from 'react-chartjs-2';

class Cards extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
        items: []
      };
  }

  generateData() {
    return {
      labels: ['O', 'N', 'D', 'J', 'F', 'M'],
      datasets: [
        {
          label: 'Share Price (ETH)',
          data: [Math.floor(Math.random()*20), Math.floor(Math.random()*20), Math.floor(Math.random()*20), Math.floor(Math.random()*20), Math.floor(Math.random()*20), Math.floor(Math.random()*20)],
          fill: false,
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgba(255, 99, 132, 0.2)',
        },
      ],
    };
  }

  componentDidMount() {
      fetch(process.env.REACT_APP_NBA_API + 'grip_league')
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
          const data = {
            labels: ['O', 'N', 'D', 'J', 'F', 'M'],
            datasets: [
              {
                label: 'Share Price (ETH)',
                data: [12, 19, 3, 5, 2, 3],
                fill: false,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgba(255, 99, 132, 0.2)',
              },
            ],
          };
          const options = {
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
          };
          let arr = items.map((player) => {
              return (
                  <CardItem
                      src={player.pic}
                      title={player.name}
                      graphEnabled={true}
                      graphData={this.generateData()}
                      graphOptions={options}
                      label='All-Star'
                      path='/marketplace'
                      mainBtnText='More'
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
                  <ul className='cards__items'>
                      {arr.slice(10,15)}
                  </ul>
                  <ul className='cards__items'>
                      {arr.slice(15,20)}
                  </ul>
                  <ul className='cards__items'>
                      {arr.slice(20,25)}
                  </ul>
                  <ul className='cards__items'>
                      {arr.slice(25,30)}
                  </ul>
                  <ul className='cards__items'>
                      {arr.slice(30,35)}
                  </ul>
                  <ul className='cards__items'>
                      {arr.slice(35,40)}
                  </ul>
                  <ul className='cards__items'>
                      {arr.slice(40,45)}
                  </ul>
                  <ul className='cards__items'>
                      {arr.slice(45,50)}
                  </ul>
                  </div>
              </div>
              </div>
          );
      }
  }
}

export default Cards;
