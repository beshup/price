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
      const donateAmount = 0.4;
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
                      src={player.pic}
                      name={player.name}
                      team={player.team}
                      position={player.position}
                      label='All-Star'
                      path='/marketplace'
                      price={(player.fantasy_score/8).toFixed(2).toString() + ' ETH'}
                  />
              );
          }); 
          return (
              <div className='cards'>
              <h1>Donation</h1>
              <br></br>
              <center><h3>Hey, congrats on your big win!</h3></center>
              <center><h3>We would like to offer up all of this season's revenue for you to donate to the charity of your choice.</h3></center>
              <div className='cards__container'>
                  <div className='cards__wrapper'>
                  <ul className='cards__items'>
                  <DonateCardItem
                      src='https://thewaterproject.org/images/The_Water_Project_Logo.png'
                      description='Providing clean water for regions struck by COVID-19.'
                      name='The Water Project'
                      path='https://thewaterproject.org/donate-ethereum'
                      price='charity'
                      label='SDG: Clean Water and Sanitation'
                  />
                  <DonateCardItem
                      src='https://dappimg.com/media/image/app/edf86b29-8656-414c-b14e-b275d5d0537f.png'
                      description='Crypto Charity For Funding Web3 Social Impact Projects.'
                      name='The Giveth'
                      path='https://giveth.io/'
                      price='charity'
                      label='Driving Crypto Adoption for Charity'
                  />
                  <DonateCardItem
                      src='https://pbs.twimg.com/profile_images/1039157634753077253/viDNvu-2_400x400.jpg'
                      name='Cool Earth'
                      description='Fighting climate change and deforestation around the world.'
                      path='https://www.coolearth.org/cryptocurrency-donations/'
                      price='charity'
                      label='SDG: Climate Action'
                  />
                  <DonateCardItem
                      src='https://www.healthynewbornnetwork.org/hnn-content/uploads/SC_USA_Logo_RedBlack_Stacked-003.jpg'
                      name='Save the Children'
                      description='Making the world a better place for children around the world.'
                      path='https://www.savethechildren.org/us/ways-to-help/ways-to-give/ways-to-help/cryptocurrency-donation'
                      price='charity'
                      label='SDG: Partnerships'
                  />
                  </ul>
                  </div>
              <center><h1 className='disclaimer'>More United Nations SDG Charities Being Added Soon...</h1></center>
              </div>
              </div>
          );
      }
  }
}

export default Donate;
