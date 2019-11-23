import Alerts from '../dal/Alerts'

export default function getAlerts(data, monitor, accountID){
    const alerts = [];
    console.log(data)
    if(data.cpu.total_load > 80){
        alerts.push(getCPUAlert(data.cpu.total_load, monitor, accountID));
    }

    if(data.memory.percent > 80){
        alerts.push(getMemoryAlert(data.cpu.percent, monitor, accountID));
    }

    if(data.disk.usage.percent > 80){
        alerts.push(getDiskAlert(data.cpu.percent, monitor, accountID));
    }

    if(data.battery.percent < 10){
        alerts.push(getBatteryAlert(data.cpu.percent, monitor, accountID));
    }

    return alerts;
}

function getCPUAlert(load, monitor, accountID) {
    return new Alerts({
        MonitorName: monitor.MonitorName,
        Alert: 'CPU Is Overloaded. CPU  Load: ' + load +'%',
        PCName: monitor.PCName,
        AlertDate: new Date(),
        MonitorID: monitor._id,
        AccountID: accountID,
    })
}

function getMemoryAlert(load, monitor, accountID) {
    return new Alerts({
        MonitorName: monitor.MonitorName,
        Alert: 'Memory Is Running Out. Memory  Load: ' + load+'%',
        PCName: monitor.PCName,
        AlertDate: new Date(),
        MonitorID: monitor._id,
        AccountID: accountID,
    })
}

function getDiskAlert(load, monitor, accountID) {
    return new Alerts({
        MonitorName: monitor.MonitorName,
        Alert: 'Disk Space Is Running Out. Disk  Load: ' + load+'%',
        PCName: monitor.PCName,
        AlertDate: new Date(),
        MonitorID: monitor._id,
        AccountID: accountID,
    })
}

function getBatteryAlert(load, monitor, accountID) {
    return new Alerts({
        MonitorName: monitor.MonitorName,
        Alert: 'Battery Is Running Out. Battery Remaining: ' + load+'%',
        PCName: monitor.PCName,
        AlertDate: new Date(),
        MonitorID: monitor._id,
        AccountID: accountID,
    })
}