import axios from 'axios';
import config from './config';

export async function getMonitors(username, password) {

    try{
        const data = await axios.get( '/monitors', {
                withCredentials: true,
                auth: {
                    username: '2',
                    password: '1'
                },
            },
        );
        return data
    }
    catch(exception) {
        return null
    }
}

export async function addMonitor(username, password, pcName, monitorName) {

    try{

        const data = await axios.post( '/monitors', {
                pcName,
                monitorName,
            }, {
                withCredentials: true,
                auth: {
                    username: '2',
                    password: '1'
                },
            },
        );
        return data
    }
    catch(exception) {
        return null
    }
}