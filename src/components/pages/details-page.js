import React from "react"
import ItemChart from "../item-chart"
import "./style.css"

export default class DetailsPage extends React.Component {


    render(){
        return (
            <div className="block">
                <ItemChart personId = {this.props.personId} />
            </div>
        );
    
    }
}

