import React, { Component } from 'react';
import {connect} from 'react-redux';
import Navbar from './Navbar'
import MapContainer from './MapContainer'
import BarsList from './BarsList'
// import UsersList from './UsersList'

var utc = new Date().toJSON().slice(0,10).replace(/-/g,'');

class User extends Component {

  state = {
    bars:[],
    search:""
  }

  handleCreateOrganization=()=>{
    const postObj = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name:"test1"})
    }
    fetch('http://localhost:3000/api/v1/organizations', postObj)
    .then(resp=>resp.json()).then(console.log)
  }

  componentDidMount(){
    // fetch('http://localhost:3000/api/v1/organizations').then(resp=>resp.json())
    // .then(console.log)
    // if(this.state.search===""){
      fetch(`https://api.foursquare.com/v2/venues/search?categoryId=4bf58dd8d48988d116941735&client_id=GM5FQRETMGHS2BJKGF3PQKUQUVO4UITUFWHAXDIFEM2ITPAY&client_secret=1AIBJBHYVGW4UPHS03GG0XYUII1UANFCHAR3J4DFBKTSVRYE&near=40.7006855,-73.98763389999999&radius=1000&v=${utc}`)
      .then(resp=>resp.json())
      .then(json=>this.setState({bars:[...this.state.bars, ...json.response.venues]}))
    // })
  }

  handleBarsListSearch=(e, info)=>{
    e.preventDefault();
    console.log("placeholder info", info)
    this.setState({search:info})

  }

passFunctionUp=()=>{

}
  render(){
    return(
      <div id="main-container">
        <div id="navbar">
          <Navbar clearState={this.props.clearState} handleCreateOrganization={this.handleCreateOrganization}/>
        </div>
        <div id="map-component">
        <MapContainer passFunctionUp={this.passFunctionUp} search={this.state.search} bars={this.state.bars}/>
        </div>
        <div id="bars-list-component">
        <BarsList bars={this.state.bars} handleSearch={this.handleBarsListSearch}/>
        </div>
      </div>
    )
  }
}

export default User
