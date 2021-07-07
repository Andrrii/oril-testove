import React, { useState,useEffect } from "react"
import OrilService from "../../services/oril-service"
import {withRouter} from 'react-router-dom';
import Spinner from "../spinner"
import "./table.css"
import './input.css'

class Table extends React.Component {
  oril = new OrilService();

  state = {
      personList:[
       // {isActive: false, _id: "60b8c59f81ada4e89cf6dfca", name: "Beer Coin", id: "beer_coin", createdAt: "27-05-21"},
       //{isActive: true, _id: "60b8c59f81ada4e89cf6dfcb", name: "Cat Coin", id: "cat_coin", createdAt: "15-01-21"}
    ],
    search : "",
    sort:"Name",
  }

  
  
  componentDidMount(){
    this.update()
  }

   update = () => {
    this.oril.getAllPeople().then(people => {
       this.setState({personList: people})
    })
  }

  
  nextPath(path) {
    this.props.history.push(path);
  } 

  handleInputChange = (event) => {
    
    const query = event.currentTarget.value;
    this.setState({
      search:query
    })
  }

  _handleOptionChange = e => {
    const {personList} = this.state
    const value = e.currentTarget.value
    if(value === "date") {
      const res = personList.sort(this._byField("date",true))
      this.setState({personList: res})
    }
    else if(value === "name"){
      const res = personList.sort(this._byField("name"))
      this.setState({personList: res})
    }
    else if(value === "state"){
      const res = personList.sort(this._byField("isActive",true))
      this.setState({personList: res})
    }
    
  }

  _byField =(field,reverse = false) => {
    if(reverse){return((a, b) =>a[field] < b[field] ? 1 : -1);}
    return((a, b) =>a[field] > b[field] ? 1 : -1);
  }

  render() {
      
    const {personList,search} = this.state
    
    return (
        <>  
        <input onChange = {(event) => this.handleInputChange(event)} type = "text" className = "input-clc ic-fa" placeholder = "Search by name"  />

        <table className = "w3-table-all w3-hoverable tbl">
            <thead>
                <tr className="w3-light-grey">
                    <th className="tbl-th">
                    <select defaultValue={'name'} value = {this.value} className="tbl-th"  name="option" onChange = {(event) => this._handleOptionChange(event)}>
                      <option value="name">Name</option>
                      <option value="date">Date</option>
                      <option value="state">State</option>
                    </select>
                    </th>
                    <th className="tbl-th">Date</th>
                    <th className="tbl-th">State</th>
                </tr>
            </thead>
            <tbody>
              
            { 
                personList.length ===0?<tr><td><Spinner /></td></tr>:
                personList.filter(item => item.name.includes(search)).map((item)=>{ return (
            <tr className = "w3-hover-gray" key = {item.id} onClick = {() => {
              this.props.onPersonSelected(item.id)
              this.nextPath(`/detail/${item.id}`)
              }}>
                <td key = {item.id} ><b>{item.name}</b></td>
                <td>{item.createdAt}</td>
                {item.isActive? 
                    <td style={{color: '#5D5FEF'}}>Active</td> :
                    <td style={{color: '#EF5DA8'}}>Disable</td>}
            </tr>
            )}) 
                }
                </tbody>
        </table>
        </>
    )
        
    }
}

export default withRouter(Table)