import time

from . import config
from . import system_utils


def main(config_object=None):
    while True:
        status_dict = system_utils.read_system_status(config_object.root_path)
        print(status_dict)
        time.sleep(config_object.monitor_interval)


if __name__ == '__main__':
    config_file_path = 'C:\\projects\\monitor\\agent\\monitor\\config\\config.json'
    conf = config.config_handler.load_config(config_file_path)
    print(conf)
    main(conf)
