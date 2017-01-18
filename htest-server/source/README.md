# htest-server

## Description
An hardware tester assistant build on the top of a web server

*Note: Only needed devlopement informations are covered for now*

## Software dependencies
- `nodejs`
- `npm`
- `mysql`

## Build
```
$ npm install
```

## Configure
```
$ npm default_config
```
This command will copy the example configuration file in place of the real one used by the server, only if the last one does not exists. Once done edit `config/base.config.json` for your needs

## Run
Ensure that `mysql` is started before launching `htest-server`
```
$ npm start
```
