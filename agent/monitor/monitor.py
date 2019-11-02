import logging
import time

import requests

from . import config
from . import system_utils


def main(config_object=None):
    while True:
        logger.info('fetching system stats')
        status_dict = system_utils.read_system_status(config_object.root_path)
        try:
            send_to_server(config_object.remote_server, config_object.remote_api_key, status_dict)
        except Exception:
            logger.exception('error while sending to server')

        logger.info('sent successfully to server')
        time.sleep(config_object.monitor_interval)


def send_to_server(server, api_key, data):
    headers = {'monitor-api-key': api_key}
    res = requests.post(url=server + '/state', json=data, headers=headers)
    res.raise_for_status()


def get_logger(conf_object, name):
    file_logger = logging.getLogger(name)
    fh = logging.FileHandler(conf_object.log_file)
    fh.setLevel(conf_object.log_level)
    formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
    fh.setFormatter(formatter)
    file_logger.addHandler(fh)

    return file_logger


if __name__ == '__main__':
    config_file_path = 'C:\\projects\\monitor\\agent\\monitor\\config\\config.json'
    conf = config.config_handler.load_config(config_file_path)
    logger = get_logger(conf, 'agent-monitor')
    logger.info('configuration file loaded')
    logger.info('agent is up!')
    main(conf)
