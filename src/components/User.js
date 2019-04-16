import React, { Component } from 'react';
import {connect} from 'react-redux';
import Navbar from './Navbar'
import MapContainer from './MapContainer'
import BarsList from './BarsList'
import ChosenBarsList from './ChosenBarsList'
import { Grid } from 'semantic-ui-react'

// import UsersList from './UsersList'
let removeMarkersLayer = ""
var utc = new Date().toJSON().slice(0,10).replace(/-/g,'');
let watchID = null;

class User extends Component {

  state = {
    bars:[],
    chosenBars:[],
    search:"",
    location:"",
    areaSearchCoord:"",
    event: {}
  }

  componentDidMount(){
    watchID = navigator.geolocation.watchPosition((position)=> {
      // console.log(position.coords.latitude, position.coords.longitude);
        this.setState({...this.state, location: [position.coords.latitude, position.coords.longitude]})
    });
    fetch(`https://api.foursquare.com/v2/venues/search?categoryId=4bf58dd8d48988d116941735&client_id=GM5FQRETMGHS2BJKGF3PQKUQUVO4UITUFWHAXDIFEM2ITPAY&client_secret=1AIBJBHYVGW4UPHS03GG0XYUII1UANFCHAR3J4DFBKTSVRYE&near=${[40.7007099, -73.987246]}&radius=1000&v=${utc}`)
    .then(resp=>resp.json())
    .then(json=>this.setState({...this.state, bars:json.response.venues}))

    if(!this.props.user.events.length > 0) {
      fetch('http://localhost:3000/api/v1/events', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.token}`
        },
        body: JSON.stringify({event: {name: info.name, user_id: this.props.user.id}})
      })
        .then(resp => resp.json())
        .then(event => {
          console.log(event)
          this.setState({
            event: event
          })
        })
      } else {
        fetch(`http://localhost:3000/api/v1/users/${this.props.user.id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.token}`
          }
        })
          .then(resp => resp.json())
          .then(user => {
            console.log(user);
            console.log(user.events)
            this.setState({
              event: user.events[-1]
            })
          })
      }
  }

  componentDidUpdate(){

  }

  componentWillUnmount(){
    navigator.geolocation.clearWatch(watchID);
  }

  callFunction=(someFunc)=>{
    removeMarkersLayer = ()=>someFunc()
  }

  getVenuesFoursquare=(centerCoord)=>{
    fetch(`https://api.foursquare.com/v2/venues/search?categoryId=4bf58dd8d48988d116941735&client_id=GM5FQRETMGHS2BJKGF3PQKUQUVO4UITUFWHAXDIFEM2ITPAY&client_secret=1AIBJBHYVGW4UPHS03GG0XYUII1UANFCHAR3J4DFBKTSVRYE&near=${[40.7165, -73.9963]}&radius=1000&v=${utc}`)
    .then(resp=>resp.json())
    .then(json=>this.setState({bars:json.response.venues}))
  }

  handleBarsListSearch=(e, info)=>{
    e.preventDefault();
    this.setState({search:info})
    if(info !== ""){
      fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${info}.json?proximity=${this.state.location[1]},${this.state.location[0]}&access_token=pk.eyJ1IjoiZWR3aW5wbHoiLCJhIjoiY2p1NDh0bGZiMHZmdTQ0cGdlNjI0MTNyNiJ9.yrLoZD4FEspnSAU8N_Tt6Q`)
      .then(resp=>resp.json())
      .then(json=>{
        removeMarkersLayer();
        this.setState({...this.state, areaSearchCoord:[json.features[0].center[1],json.features[0].center[0]]})
        const first = parseFloat(json.features[0].center[1])
        const second = parseFloat(json.features[0].center[0])
        const coord = [first, second]
        // debugger
        // this.getVenuesFoursquare(coord)
        fetch(`https://api.foursquare.com/v2/venues/search?categoryId=4bf58dd8d48988d116941735&client_id=GM5FQRETMGHS2BJKGF3PQKUQUVO4UITUFWHAXDIFEM2ITPAY&client_secret=1AIBJBHYVGW4UPHS03GG0XYUII1UANFCHAR3J4DFBKTSVRYE&near=${coord}&radius=1000&v=${utc}`)
        .then(resp=>resp.json())
        .then(json=>this.setState({...this.state, bars:json.response.venues}))

      })
      // this.callFunction(); //this was a mistake. forgot to store function
      // this.refs.map.removeMarkers();
    }else{
      alert("info is blank")
    }
  }

  handleCardClick=(info)=>{
    // debugger
    this.setState({chosenBars:[...this.state.chosenBars, info]}, ()=>{
      console.log("User info", info)

          fetch('http://localhost:3000/api/v1/bars', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${localStorage.token}`
            },
            body: JSON.stringify({bar: {event_id: this.state.event.id}})
          })
            .then(resp => resp.json())
            .then(bar => {
              console.log(bar)
            })
        })
    }

  handleChosenCardClick=(info)=>{
    // console.log(info.id)
    let newChosen = [...this.state.chosenBars].filter(bar=>bar.id !== info.id)
    this.setState({...this.state, chosenBars:newChosen}, ()=>console.log("User Chosen", this.state.chosenBars))
  }

  render(){
    console.log(this.state);
    return(
      <div id="main-container">
        <div id="navbar">
          <Navbar clearState={this.props.clearState} handleCreateOrganization={this.handleCreateOrganization}/>
        </div>
        <div id="map-component">
          <MapContainer ref='map' callFunction={this.callFunction} search={this.state.search} bars={this.state.bars} data={this.state}/>
        </div>
        <Grid>
          <Grid.Column width={8}>
            <div id="bars-list-component">
              <BarsList data={this.state} bars={this.state.bars} handleSearch={this.handleBarsListSearch} handleCardClick={this.handleCardClick}/>
            </div>
          </Grid.Column>
          <Grid.Column width={8}>
            <div id="chosenBars-list-component">
              <ChosenBarsList handleChosenCardClick={this.handleChosenCardClick} data={this.state}/>
            </div>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

export default User
