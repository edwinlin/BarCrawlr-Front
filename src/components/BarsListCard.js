import React from "react";
const array = [];
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
          if( !this.props.data.chosenBars.includes(this.props.bar) ){

            this.props.handleCardClick(this.props.bar)
          }
        }}
        >{this.props.bar.name}</p>
    );
  }
};

export default BarsListCard;
