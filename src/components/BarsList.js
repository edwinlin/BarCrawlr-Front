import React from "react";
import { NavLink, Link, withRouter } from "react-router-dom";
import BarsListCard from './BarsListCard'
import { Form } from 'semantic-ui-react'

const BarsList = (props) => {
  let placeholder = "";
  return (
    <div>
    <Form onSubmit={(e)=>props.handleSearch(e, placeholder)}>
      <Form.Group>
        <Form.Input style={{width: "35vw"}} placeholder='Search for Bars' onChange={(e)=> placeholder = (e.target.value) }/>
        <Form.Button content='Submit' />
      </Form.Group>
    </Form>

    <ul className="bars-list">
      {props.bars.map(bar=><BarsListCard bar={bar}/>)}
    </ul>
    </div>
  );
};

export default withRouter(BarsList);
