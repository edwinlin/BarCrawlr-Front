import React from "react";
import { NavLink, Link, withRouter } from "react-router-dom";
import ChosenBarsListCard from './ChosenBarsListCard'

class ChosenBarsList extends React.Component {
  state = {
    placeholder:"",
    chosenBars:[]
  }

componentDidMount=()=>{

}

componentDidUpdate=()=>{
  // if(this.props.bars.chosenBars){
  //   this.setState({array: [...this.state.array, this.props.bars.chosenBars]})
  // }
  // console.log("ChosenBarsList", Array.isArray(this.props.data.chosenBars))
  // console.log("ChosenBarsList props", this.props.data.chosenBars)
  console.log("chosen mount bars", this.props.data.chosenBars)
}

  render() {
    return(
      <div>
        <div id="chosen-title">
        <h3 onClick={()=>this.props.toggleBarcrawl()}>Bar Crawl List</h3>
        </div>
        <div id="chosen-list">
          <ul className="chosen-bars-list">
          {Array.isArray(this.props.data.chosenBars) ? this.props.data.chosenBars.map(bar=><ChosenBarsListCard handleChosenCardClick={this.props.handleChosenCardClick} bar={bar} data={this.props.data} />) : this.setState({...this.state})}

          </ul>
        </div>
      </div>
    )
  }
};

export default withRouter(ChosenBarsList);
