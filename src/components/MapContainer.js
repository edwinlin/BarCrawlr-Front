import React from 'react';
import L from 'leaflet';
let mymap = null;
let marker = null;
let flag = 0;
const markerArray = [];
let markerGroup;
let usersMarkerGroup;
let barcrawlMarkerGroup;

class MapContainer extends React.Component {
  state = {
    location: "",
    changed:0
  }

  removeMarkers=()=>{
    console.log("REMOVE MARKERS")
    // this.props.bars.forEach(bar=>
      mymap.removeLayer(markerGroup)
    // )
  }

  removeUsersMarkers=()=>{
    mymap.removeLayer(usersMarkerGroup)
  }

  removeBarCrawlMarkers=()=>{
    mymap.removeLayer(barcrawlMarkerGroup)
  }

  addMarkers=()=>{
    // console.log("hello", this.props.bars)
    markerGroup = L.layerGroup().addTo(mymap);

    this.props.bars.forEach(
      bar=>{
        const beerIcon = L.icon({
            iconUrl: 'http://pluspng.com/img-png/png-pub-beer-mug-alcohol-pub-drink-bar-glass-ale-720.png',
            iconSize: [38, 45], // size of the icon
        });
        // create marker object, pass custom icon as option, add to map
        // L.marker([bar.location.lat, bar.location.lng], {icon: beerIcon}).addTo(mymap);
        const marker = L.marker([bar.location.lat, bar.location.lng], {icon: beerIcon, title: bar.name, bar_id: bar.id}).bindPopup(bar.name).addTo(markerGroup).on('click', function(e) {
        // marker.bindPopup(bar.name).openPopup()
    // console.log(this);
      });
    })
  }

  addUserMarkers=(usersData)=>{
    console.log("usersInfoMarkers", usersData)

    usersMarkerGroup = L.layerGroup().addTo(mymap);
    if(Array.isArray(usersData)){
      usersData.forEach(
        user=>{
          console.log("users Markers proxy", user)
          const userIcon = L.icon({
              iconUrl: 'https://dumielauxepices.net/sites/default/files/map-clipart-transparent-background-675123-8709320.svg',
              iconSize: [38, 45], // size of the icon
          });
          const marker = L.marker([user.latitude, user.longitude], {icon: userIcon, title: user.name, bar_id: user.id}).bindPopup(user.name).addTo(usersMarkerGroup).on('click', function(e) {
          });
        }
      )
    }
  }

  addBarCrawlMarkers=()=>{
    console.log("BAR CRAWL MARKERS")
    barcrawlMarkerGroup = L.layerGroup().addTo(mymap);

    this.props.data.chosenBars.forEach(bar=>{
      const barCrawlIcon = L.icon({
          iconUrl: 'http://joshuafrazier.info/images/firefox.svg',
          iconSize: [38, 45], // size of the icon
      });
      const marker = L.marker([bar.latitude, bar.longitude], {icon: barCrawlIcon, title: bar.name, bar_id: bar.id}).bindPopup(bar.name).addTo(barcrawlMarkerGroup).on('click', function(e) {});
    })
  }

  componentDidMount=()=> {
    console.log(this.props)
    this.props.callFunctionFromChild(()=>this.removeMarkers())
    // this.setState({...this.state, location:this.props.location})
    // setTimeout(()=>{console.log("boo",this.state.location)}, 8000);

    // create map
      mymap = L.map('mapid').setView([40.7007099, -73.987246], 13);
      marker = new L.Marker([40.7007099, -73.987246])
      marker.addTo(mymap)

    	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    		maxZoom: 18,
    		id: 'mapbox.streets'
    	}).addTo(mymap);

  }

componentDidUpdate=(prevProps, prevState, snapshot)=>{

  // if(this.props.data.search !== ""){

    // console.log("data props", typeof this.props.data.areaSearchCoord[0])

    if(typeof this.props.data.areaSearchCoord[0] === "number"){
      this.removeMarkers();
      this.addMarkers();
      this.removeUsersMarkers();
      this.addUserMarkers();

      mymap.panTo([this.props.data.areaSearchCoord[0], this.props.data.areaSearchCoord[1]])

    }
    // marker.setLatLng(this.props.data.areaSearchCoord);
  //   // marker.addTo(mymap)
  // }
  // if(this.state.changed==0){
    // this.setState(prevState=>({changed:1}))
    if(this.props.bars.length>1){
      flag+=1;
    }
    if(flag < 2){
      // console.log('bloob')
      // this.removeMarkers();
      if(prevState !== this.state){
        console.log("diffERENT")
      }
      this.addMarkers();
      // this.addUserMarkers();
    }
  }

  render() {
    return <div id="mapid"></div>
  }
}

export default MapContainer;
