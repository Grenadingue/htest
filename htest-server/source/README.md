# htest-server
## Description
An hardware tester assistant build on the top of a web server

*__Note__: Only needed devlopement informations are covered here*  
*__Note2__: For every instruction, we will asume that you are located in `htest-server/source` folder*

## Software dependencies
- `nodejs >= 6`
- `npm`
- `mongodb >= 2.4`

## Build
```
$ npm install
```

## Configure
```
$ npm default_config
```
This command will copy the default configuration file in place of the real one used by the software, only if the last one does not exists. Once done, edit `./config/base.config.json` for your needs

## Run
Ensure that `mongodb` is started before launching `htest-server`
```
$ npm run dev  # will relaunch the software at any file change observed
```
or
```
$ npm start  # will launch the software in a more classic way (no automatic restart)
```
