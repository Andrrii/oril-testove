import React from 'react'
import "./chart.css"
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
  } from "recharts";

export default class Chart extends React.Component {
    
    _strDays = (str) => {
        return str.toString().slice(0,-12)
    }
    _strMonths = (str) => {
        return str.toString().slice(-17,-12)
    }

    _strYears = (str) => {
        return str.toString().slice(-14,-8)
    }


    render() {
        const {dataList} = this.props
        return (
            <ResponsiveContainer
            className = "chart"
             width="85%"
             height={300}
            >
                 <AreaChart data = {dataList}>

                     <defs>
                         <linearGradient id = "color" x1 = "0" y1 = "0" x2 = "0" y2 = "1">
                             <stop offset = "0%" stopColor = "#007AFF" stopOpacity ={0.6} />
                             <stop offset = "75%" stopColor = "#007AFF" stopOpacity ={0.05} />

                         </linearGradient>
                     </defs>

                     <Area dataKey = "curency" stroke = "#007AFF" fill = "url(#color)" />

                     <XAxis 
                         dataKey = "formatDate" 
                         tickFormatter = {
                                 str => {
                                     if(dataList.length < 25) {
                                         return this._strDays(str)
                                     }
                                     else if(dataList.length > 25 && dataList.length <=100){
                                         return this._strMonths(str)
                                     } 
                                     else {
                                         return this._strYears(str)
                                     }
                                     }
                             }
                         axisLine = {false}
                         tickLine = {false}
                     />

                     <YAxis 
                         dataKey = "curency"
                         axisLine = {false}
                         tickLine = {false}
                         tickFormatter = {number => `$${number}`}/
                     >

                     <Tooltip />

                     <CartesianGrid opacity = {0.3} horizontal = {false}/>
                 </AreaChart>
         </ResponsiveContainer>
        )
    }
}