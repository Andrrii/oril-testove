import React from "react"
import OrilService from "../../services/oril-service";
import Chart from "../chart"
import "./item-chart.css"

export default class ItemChart extends React.Component {
    oril = new OrilService();
    
    state = {
        itemList:[],
        dataList : []
    }
    
    update = () => {
        this.oril.getPerson(this.props.personId).then(people => {
           this.setState({itemList: people})
        })
    }

    componentDidMount(){
        this.update()
        setTimeout(() =>{this.changeData("day")},1000)
        
    }

    _setData = (test,label) => {
        try{
        let min ,max ,medium = 0;
        let sum = 0
        test.map(item => sum+=item.curency)
        
        min = test.reduce((acc, curr) => acc.curency < curr.curency ? acc : curr);
        max = test.reduce((acc, curr) => acc.curency > curr.curency ? acc : curr);
        
        medium = (sum/test.length).toFixed(0)
            this.setState({
                ...this.state,
                dataList:test,
                label,
                sum:sum.toFixed(0),
                min:+min.curency,
                max:+max.curency,
                medium
            })
        }catch(e){
            this.setState({error:true})
        }
    }

    changeData = (data) => {
        const {itemList} = this.state
        if (data === "day" ){
            const test = itemList.slice(-12)
            this._setData(test,"Week")
        }
        else if(data === "month"){
            const test = itemList.slice(-55)
            this._setData(test,"Month")
        }
        else if (data === "year"){
            const test = itemList.slice(288,788)
            this._setData(test,"Year")
        }
    }


    render(){
        const {dataList,sum,min,max,medium,error} = this.state
        if(error){
            return (
                <h1>Go to first page</h1>
            )
        }
        return (
            <>
            <div className="w3-bar w3-hover bar">
                <button 
                    onClick={() => {this.changeData("day")}} className="w3-button w3-white w3-border btn"
                >
                    Week
                </button>
                <button 
                    onClick={() => {this.changeData("month")}} className="w3-button w3-white w3-border btn"
                >
                    Month
                </button>
                <button 
                    onClick = {() => {this.changeData("year")}} className="w3-button w3-white w3-border btn"
                >
                    Year
                </button>
            </div>    
            <h1 className = "label">{this.state.label}</h1>        

            <Chart dataList = {dataList} />

            <div className = "counter">
                <h3 className = "header-3">Total</h3>
                <h1 className = "header-1">$ {+sum}</h1>
            </div>
            <div className = "counters w3-row">
                <div className="w3-col s4 w3-center">
                    <h3 className = "header-3">Min</h3>
                    <h1 className = "header-1">$ {min}</h1>
                </div>
                <div className="w3-col s4 w3-center">
                    <h3 className = "header-3">Medium</h3>
                    <h1 className = "header-1">$ {medium}</h1>
                </div>
                <div className="w3-col s4 w3-center">
                    <h3 className = "header-3">Max</h3>
                    <h1 className = "header-1">$ {max}</h1>
                </div>
            </div>
            </>
        );
    }
}

