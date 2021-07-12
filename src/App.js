import React from "react"
import { DetailsPage, ListPage } from "./components/pages";
import {
  HashRouter as Router,
  Switch,
  Route,
  
} from "react-router-dom";

import './App.css';



export default class App extends React.Component  {
  state  = {
    onPersonSelected : null
  }

  onPersonSelected = id => {
    this.setState({
      onPersonSelected:id
    })
  }
  
  render() {
    return (
      
        <div className="App">
          <Router>
            <Switch>
                <Route path = '/' exact render = {() => (<ListPage onPersonSelected = {this.onPersonSelected} />)}/>
                <Route path = '/detail/:id?' exact component = {() => (<DetailsPage personId = {this.state.onPersonSelected} />)}/>
            </Switch>
          </Router>
          
        </div>
    );
   }
}



