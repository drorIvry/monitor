import json

from collections import namedtuple


def load_config(config_file_path):
    with open(config_file_path) as config_json:
        config_dict = json.load(config_json)
        config_object = namedtuple("Config", config_dict.keys())(*config_dict.values())

        return config_object
