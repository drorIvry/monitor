import time
import requests

from . import config
from . import system_utils


def main(config_object=None):
    while True:
        status_dict = system_utils.read_system_status(config_object.root_path)
        send_to_server(config_object.remote_server, config_object.remote_api_key, status_dict)
        time.sleep(config_object.monitor_interval)


def send_to_server(server, api_key, data):
    headers = {'monitor-api-key': api_key}
    res = requests.post(url=server + '/state', json=data, headers=headers)
    res.raise_for_status()


if __name__ == '__main__':
    config_file_path = 'C:\\projects\\monitor\\agent\\monitor\\config\\config.json'
    conf = config.config_handler.load_config(config_file_path)
    main(conf)
