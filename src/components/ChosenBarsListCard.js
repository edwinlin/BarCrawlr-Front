import React from "react";

class ChosenBarsListCard extends React.Component {

  componentDidUpdate=()=>{
  }

  render(){
    return (
      <p onClick={()=>this.props.handleChosenCardClick(this.props.bar)}>{this.props.bar.name}</p>
    );
  }
};

export default ChosenBarsListCard;
