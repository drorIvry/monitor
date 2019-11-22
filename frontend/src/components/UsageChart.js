import React, { PureComponent } from 'react';
import {
    PieChart, Pie, Tooltip, Cell, Legend,
} from 'recharts';
import {toggleProgressBar} from "../actions/FrameActions";
import {updateDashboard} from "../actions/DashboardActions";
import {connect} from "react-redux";

function getTooltip({ active, payload, label }){
    if (active) {
        return (
            <div>
                <p>{payload[0].name + ': ' + Number(payload[0].value).toFixed(3) + 'GB'}</p>
            </div>
        )
    }
}

const COLORS = ['#ff4e46', '#00C49F', '#FFBB28', '#ff4e46'];


export default class UsageChart extends PureComponent {

    convertToGB(value) {
        return value/1024/1024/1024;
    }


    render() {
        return (
            <PieChart width={350} height={250} onMouseEnter={this.onPieEnter}>
                <Pie
                    data={this.props.data}
                    cx={220}
                    cy={100}
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                >
                    {
                        this.props.data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                    }
                </Pie>
                <Legend />
                <Tooltip content={getTooltip}/>

            </PieChart>
        );
    }
};