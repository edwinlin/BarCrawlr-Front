import React from "react";
// const array = [];
// let chosenBarsIds = [];

class BarsListCard extends React.Component {

  render(){
    // console.log(this.state)
    // debugger
    // if(this.props.data.chosenBars.length>=1){
    //   chosenBarsIds =
    // }

    return (
      <p onClick={
        ()=>{
          // console.log("BOOYA", this.props.data.chosenBars.map(bar=>{
          //   if(bar.foursq_id){
          //     return bar.foursq_id
          //   }else{
          //     return bar.id
          //   }
          // }))
          // console.log("kasha", this.props.bar.id)
          if( this.props.data.chosenBars.map(bar=>bar.foursq_id).includes(this.props.bar.id) ){
            alert("OOPS")
          }else{
            this.props.handleCardClick(this.props.bar)
          }
        }}
        >{this.props.bar.name}</p>
    );
  }
};

export default BarsListCard;
