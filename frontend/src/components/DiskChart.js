import React, { PureComponent } from 'react';
import {
    PieChart, Pie, Tooltip, Cell,
} from 'recharts';

const data = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];


export default class DiskChart extends PureComponent {

    render() {
        return (
            <PieChart width={350} height={250} onMouseEnter={this.onPieEnter}>
                <Pie
                    data={data}
                    cx={180}
                    cy={100}
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                >
                    {
                        data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                    }
                </Pie>
                <Tooltip />

            </PieChart>
        );
    }
}

