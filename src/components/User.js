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
    event:{},
    allUsers:{}
  }

  componentDidMount(){
    // get my location and continuously update
    watchID = navigator.geolocation.watchPosition((position)=> {
      // console.log(position.coords.latitude, position.coords.longitude);
        this.setState({...this.state, location: [position.coords.latitude, position.coords.longitude]})

        // Patch User's location coordinates in the backend
        fetch(`http://localhost:3000/api/v1/users/${this.props.data.user.id}`, {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
            "accepts": "application/json",
            "Authorization": `Bearer ${localStorage.token}`
          },
          body: JSON.stringify({ user:{longitude:position.coords.longitude, latitude:position.coords.latitude} })
        })
          .then(resp => resp.json())
          .then(userData => {
            if(userData.error){
              console.log("something wrong")
            }else{
              console.log("something right", userData)
              this.getAllUserLocations();
            }
          });
    });

    // fetch all bars near my location with Foursquare API
    fetch(`https://api.foursquare.com/v2/venues/search?categoryId=4bf58dd8d48988d116941735&client_id=GM5FQRETMGHS2BJKGF3PQKUQUVO4UITUFWHAXDIFEM2ITPAY&client_secret=1AIBJBHYVGW4UPHS03GG0XYUII1UANFCHAR3J4DFBKTSVRYE&near=${[40.7007099, -73.987246]}&radius=1000&v=${utc}`)
    .then(resp=>resp.json())
    .then(json=>this.setState({...this.state, bars:json.response.venues}))
    console.log("CHECKING EVENT", this.props.data.user)
    // if event is associated with logged in user, set state with event
    // otherwise create the event and set state
    if(!this.props.data.user.event) {
      console.log("NO EVENT EXISTS!", this.props.data.user)
      fetch('http://localhost:3000/api/v1/events', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.token}`
        },
        body: JSON.stringify({event:{name:"Event", user_id: this.props.data.user.id}})
      })
        .then(resp => resp.json())
        .then(event => {
          console.log(event)
          // this.setState({
          //   event: event
          // }, ()=>this.grabEventBars())
          this.grabEventBars(event)
        })
      } else {
        fetch(`http://localhost:3000/api/v1/users/${this.props.data.user.id}`, {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.token}`
          }
        })
          .then(resp => resp.json())
          .then(user => {
            // debugger
            console.log("USER", user);
            console.log("user event", user.event)
            this.setState({
              event: user.event
            }
            // , ()=>this.grabEventBars()
          )
            this.grabEventBars(user.event)
          })
      }
  }

  getAllUserLocations=()=>{
    fetch(`http://localhost:3000/api/v1/users`, {
      method: "GET",
      headers:{
        "content-type": "application/json",
        "accepts": "application/json",
        "Authorization": `Bearer ${localStorage.token}`
      }
    }).then(resp=>resp.json()).then(users=>{
      // console.log("users markers", users)
      this.setState({ ...this.state, allUsers:users}, ()=>{
        // console.log('refs', this)
        this.refs.map.addUserMarkers(this.state.allUsers)
      })
    })
  }

  grabEventBars=(userEvent)=>{
    // fetch event and associated bars
    fetch(`http://localhost:3000/api/v1/events/${userEvent.id}`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.token}`
        }
      }).then(resp=>resp.json()).then(event=>{
        console.log("event now", event)
        this.setState({...this.state, chosenBars:event.bars}, ()=>console.log("set Chosen", this.state.chosenBars))
      })
  }

  componentWillUnmount(){
navigator.geolocation.clearWatch(watchID);
}

  componentDidUpdate(){

  }

  callFunctionFromChild=(removeMarkersFunctionPassedUpFromMapContainer)=>{
    removeMarkersLayer = ()=>removeMarkersFunctionPassedUpFromMapContainer()
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
        if(json.features){
          console.log("JSON features", json.features)
          this.setState({...this.state, areaSearchCoord:[json.features[0].center[1],json.features[0].center[0]]})
          const first = parseFloat(json.features[0].center[1])
          const second = parseFloat(json.features[0].center[0])
          const coord = [first, second]
          // debugger
          // this.getVenuesFoursquare(coord)
          fetch(`https://api.foursquare.com/v2/venues/search?categoryId=4bf58dd8d48988d116941735&client_id=GM5FQRETMGHS2BJKGF3PQKUQUVO4UITUFWHAXDIFEM2ITPAY&client_secret=1AIBJBHYVGW4UPHS03GG0XYUII1UANFCHAR3J4DFBKTSVRYE&near=${coord}&radius=1000&v=${utc}`)
          .then(resp=>resp.json())
          .then(json=>this.setState({...this.state, bars:json.response.venues}))
        }

      })
      // this.callFunctionFromChild(); //this was a mistake. forgot to store function
      // this.refs.map.removeMarkers();
    }else{
      alert("info is blank")
    }
  }

  handleCardClick=(info)=>{
        fetch('http://localhost:3000/api/v1/bars', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.token}`
          },
          body: JSON.stringify({bar:{name:info.name, foursq_id:info.id, latitude:info.location.lat, longitude:info.location.lng, user_id: this.props.data.user.id, event_id:this.state.event.id}})
        })
          .then(resp => resp.json())
          .then(bar => {
            console.log("BAR", bar)
            this.setState({chosenBars:[...this.state.chosenBars, bar]}
          )
        }
      )

  }

  handleChosenCardClick=(info)=>{
    // console.log("chosen", info)
    let newChosen = [...this.state.chosenBars].filter(bar=>bar.id !== info.id)
    this.setState({...this.state, chosenBars:newChosen}, ()=>console.log("User Chosen", this.state.chosenBars))

      fetch(`http://localhost:3000/api/v1/bars/${info.id}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.token}`
        }
      })
  }

  render(){
    return(
      <div id="main-container">
        <div id="navbar">
          <Navbar clearState={this.props.clearState} handleCreateOrganization={this.handleCreateOrganization}/>
        </div>
        <div id="map-component">
          <MapContainer ref='map' callFunctionFromChild={this.callFunctionFromChild} search={this.state.search} bars={this.state.bars} data={this.state}/>
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
