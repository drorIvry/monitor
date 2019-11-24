import React, { PureComponent } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

export default function CpuChart({graph_data}) {
        return (
            <LineChart
                width={1000}
                height={500}
                data={graph_data}
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


