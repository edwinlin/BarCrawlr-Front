import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import { CurrentLocation } from './Map'
const mapStyles = {
  width: '100%',
  height: '45%'
};

export class MapContainer extends Component {

  state = {
   showingInfoWindow: false,  //Hides or the shows the infoWindow
   activeMarker: {},          //Shows the active marker upon click
   selectedPlace: {},          //Shows the infoWindow to the selected place upon a marker
   location: "Your Location"
  };

  onMarkerClick = (props, marker, e) =>
    {console.log("lat", props.mapCenter["lat"]);
    console.log("lng", props.mapCenter["lng"]);
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${props.mapCenter["lat"]},${props.mapCenter["lng"]}&result_type=point_of_interest&key=AIzaSyD8Uq8CZOkEU2r9PbB8l66VTiXsXhY44V0`)
    .then(resp=>resp.json())
    .then(json=>{this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
      location:json.results[0].formatted_address
    })})
    };

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  render() {
    return (
      <CurrentLocation
        centerAroundCurrentLocation
        google={this.props.google}
      >
        <Marker onClick={this.onMarkerClick} name={this.state.location} />
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow>
      </CurrentLocation>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyD8Uq8CZOkEU2r9PbB8l66VTiXsXhY44V0'
})(MapContainer);
