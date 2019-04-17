import React from "react";
import { NavLink, Link, withRouter } from "react-router-dom";
import BarsListCard from './BarsListCard'
import { Form } from 'semantic-ui-react'

class BarsList extends React.Component {
  state = {
    placeholder:""
  }
  componentDidUpdate=()=>{
    // console.log("BarsList", this.props.bars)
  }
  render() {
    return(
      <div>
      <Form onSubmit={(e)=>this.props.handleSearch(e, this.state.placeholder)}>
        <Form.Group>
          <Form.Input style={{width: "35vw"}} placeholder='Search for Bars' onChange={(e)=> this.setState({...this.state, placeholder:(e.target.value)}) }/>
          <Form.Button content='Submit' />
        </Form.Group>
      </Form>

      <ul className="bars-list">
        {this.props.bars.map(bar=><BarsListCard data={this.props.data} bar={bar} handleCardClick={this.props.handleCardClick}/>)}
      </ul>
      </div>
    )
  }
};

export default withRouter(BarsList);
