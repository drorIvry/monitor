import axios from 'axios';
import config from './config';

export async function getMonitors(username, password) {
    const data = await axios.get(config.server + '/monitors', {
        auth: {
            username: '2',
            password: '1'
        }
    })

    console.log(data)

    return data;
}

export async function addMonitor(username, password, pcName, monitorName) {

    try{

        const data = await axios.post(config.server + '/monitors', {
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