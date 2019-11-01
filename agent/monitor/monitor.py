import time

from . import config


def main(config_object=None):
    while True:
        # monitor
        time.sleep(config_object.monitor_inteval)


if __name__ == '__main__':
    config_file_path = './config/config.json'
    conf = config.config_handler.load_config(config_file_path)
    print(conf)
    main()
