import React, { PureComponent } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

const data =  [{"total_load": 0, "cpu_count": 8, "cores": 4, "time": "2019-11-08T18:45:06.264Z"}, {
    "total_load": 9.7,
    "cpu_count": 8,
    "cores": 4,
    "time": "2019-11-08T18:45:28.358Z"
}, {"total_load": 5.6, "cpu_count": 8, "cores": 4, "time": "2019-11-08T18:45:38.381Z"}, {
    "total_load": 5,
    "cpu_count": 8,
    "cores": 4,
    "time": "2019-11-08T18:45:48.398Z"
}, {"total_load": 6.9, "cpu_count": 8, "cores": 4, "time": "2019-11-08T18:45:58.414Z"}];

export default function CpuChart(graph_data) {
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
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="total_load" stroke="#82ca9d" />
            </LineChart>
        );
    }


