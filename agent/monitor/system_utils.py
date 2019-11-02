import datetime
import logging
import platform

import psutil

logger = logging.getLogger('agent-monitor')


def if_available(func):
    def inner(*args, **kwargs):
        try:
            response = func(*args, **kwargs)
        except Exception as e:
            logger.debug('Error While getting system status', extra={'exception': e})
            return 'N/A'
        else:
            return response

    return inner


def read_system_status(root):
    return {
        'cpu': {
            'total_load': get_cpu_load(),
            'cpu_count': cpu_count(),
            'cores':  cores_count(),
        },
        'os': get_os_info(),
        'memory': get_memory_load(),
        'disk': get_disks_states(root),
        'network': get_net_if_address(),
        'temps': get_sys_temp(),
        'fans': get_fans_status(),
        'battery': get_sys_battery(),
        'users': get_users(),
        'timestamp': datetime.datetime.utcnow().isoformat()
    }


def get_cpu_load():
    return psutil.cpu_percent(interval=None)


def get_os_info():
    return {
        'name': platform.system(),
        'version': platform.version(),
        'fullname': platform.platform(),
        'architecture': platform.machine(),
        'processor': platform.processor(),
    }


def cpu_count():
    return psutil.cpu_count()


def cores_count():
    return psutil.cpu_count(logical=False)


def get_memory_load():
    mem = psutil.virtual_memory()
    return {
        'total': mem.total,
        'available': mem.available,
        'percent': mem.percent,
        'used': mem.used,
        'free': mem.free,
    }


def get_disks_states(root):
    partitions = get_disks()
    partitions_dict = [
        {
            'device': p.device,
            'mount_point': p.mountpoint,
            'fstype': p.fstype,
            'opts': p.opts
        }
        for p in partitions
    ]

    usage = get_disk_usage(root)

    usage_dict = {
        'total': usage.total,
        'used': usage.used,
        'free': usage.free,
        'percent': usage.percent
    }

    return {
        'partitions': partitions_dict,
        'usage': usage_dict
    }


def get_disks():
    return psutil.disk_partitions()


def get_disk_usage(root):
    return psutil.disk_usage(root)


@if_available
def get_net_if_address():
    net_stat = psutil.net_if_addrs()
    return [
        {
            'name': interface,
            'address': [i.address for i in net_stat[interface]],
            'mask': [i.netmask for i in net_stat[interface]],
            'broadcast': [i.broadcast for i in net_stat[interface]],
            'ptp': [i.ptp for i in net_stat[interface]],
        }
        for interface in net_stat
    ]


@if_available
def get_sys_temp():
    temps = psutil.sensors_temperatures()
    return [
        {
            'name': sensor,
            'label': temps[sensor].label,
            'current': temps[sensor].current,
            'high': temps[sensor].high,
            'critical': temps[sensor].critical,
        }
        for sensor in temps
    ]


@if_available
def get_fans_status():
    fans = psutil.sensors_fans()
    return [
        {
            'name': sensor,
            'label': fans[sensor].label,
            'current': fans[sensor].current,
        }
        for sensor in fans
    ]


@if_available
def get_sys_battery():
    battery = psutil.sensors_battery()
    return {
        'percent': battery.percent,
        'secsleft': battery.secsleft,
        'power_plugged': battery.power_plugged
    }


@if_available
def get_users():
    users = psutil.users()
    return [
        {
            'name': user.name,
            'terminal': user.terminal,
            'host': user.host,
        }
        for user in users
    ]
