import React from 'react';
import L from 'leaflet';
let mymap = null;
let marker = null;

class MapContainer extends React.Component {
  state = {
    location: "",
    changed:0
  }

  componentDidMount=()=> {
    const watchID = navigator.geolocation.watchPosition((position)=> {
      console.log(position.coords.latitude, position.coords.longitude);
        this.setState({location: [position.coords.latitude, position.coords.longitude]})
    });
    // setTimeout(()=>{console.log("boo",this.state.location)}, 8000);

    // create map
      mymap = L.map('mapid').setView([40.7007099, -73.987246], 15);
      marker = new L.Marker([40.7007099, -73.987246])
      marker.addTo(mymap)

    	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    		maxZoom: 18,
    		id: 'mapbox.streets'
    	}).addTo(mymap);


  }

componentDidUpdate=()=>{

  if(this.state.location !== ""){
    marker.setLatLng(this.state.location);
    // marker.addTo(mymap)
    mymap.panTo(this.state.location)
  }
  // if(this.state.changed==0){
  //   this.setState(prevState=>({changed:1}))
  //   setTimeout(function(){console.log(this.props)},8000)
  // }
}

searchClicked=()=>{
  // this.props.bars.forEach(
  //   bar=>{
  //     var firefoxIcon = L.icon({
  //         iconUrl: 'https://www.pinclipart.com/picdir/big/193-1932955_beer-clip-cartoon-clip-free-download-beer-clipart.png',
  //         iconSize: [38, 45], // size of the icon
  //         });
  //
  //     // create marker object, pass custom icon as option, add to map
  //     L.marker([bar.location.lat, bar.location.lng], {icon: firefoxIcon}).addTo(mymap);
  //   }
  // )
  console.log("searched")
}

  render() {
    return <div id="mapid"></div>
  }
}

export default MapContainer;
