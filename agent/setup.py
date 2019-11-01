import setuptools


setuptools.setup(
    name='monitor_agent',
    packages=setuptools.find_packages(
        exclude=[
            'tests',
            'tests.*',
            '*.tests.*',
            '*.tests',
        ],
    ),
    install_requires=[

    ],
)