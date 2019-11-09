import React, { PureComponent } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

const data = [
    {
        name: '2019-11-08T18:45:38.381+00:00', load: 2, amt: 2400,
    },
    {
        name: '2019-11-08T18:45:38.381+00:00', load: 5, pv: 1398, amt: 2210,
    },
    {
        name: '2019-11-08T18:45:38.381+00:00', load: 34, pv: 9800, amt: 2290,
    },
    {
        name: '2019-11-08T18:45:38.381+00:00', load: 66, pv: 3908, amt: 2000,
    },
    {
        name: '2019-11-08T18:45:38.381+00:00', load: 99, pv: 4800, amt: 2181,
    },
    {
        name: '2019-11-08T18:45:38.381+00:00', load: 4, pv: 3800, amt: 2500,
    },
    {
        name: '2019-11-08T18:45:38.381+00:00', load: 24, pv: 4300, amt: 2100,
    },
];

export default class CpuChart extends PureComponent {
    render() {
        return (
            <LineChart
                width={1000}
                height={500}
                data={data}
                margin={{
                    top: 5, right: 30, left: 200, bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="load" stroke="#82ca9d" />
            </LineChart>
        );
    }
}