# htest
`htest = hardware tester`

*__/!\ Warning__: this project is currently not usable in a production environment, it lacks a major part of its [development](#current-state)*

## Description
An hardware tester assistant, build on the top of a web server, designed for [Ordissimo](http://www.ordissimo.eu/en/about/change-mind)

## Summary
* [User documentation](#user-documentation)
* [Technical documentation](#technical-documentation)
  * [Install](#install)
  * [Update](#update)
  * [Development](#development)
    * [Build and launch](#build-and-launch)
    * [Software packaging](#software-packaging)
    * [Current state](#current-state)
      * [Overview](#overview)
      * [API](#api)
    * [Future](#future)

## User documentation
See [`user guide`](htest-server/source/documentation/user_guide.md)

## Technical documentation
* __Compatibility__: Debian/Ubuntu and derivates
* __Prerequisites__: `MongoDB` >= 2.4 and `Node.js` >= 6 are already installed

### Install
* Go the the ["release" tab](https://github.com/Grenadingue/htest/releases) of the github page
* Select and download the last `.deb` available
* Install the package `sudo dpkg -i htest-server_X.X_all.deb` on the target machine
* Edit `/etc/htest-server/base.config.json` for your needs
```js
{
  "webServer": {
    "port": 8080, // server listening port
    "hostname": "127.0.0.1" // server listening hostname (the server will deny any connection attempt with any other hostname)
  },
  "dataBase": "mongodb://username:password@host:port/database_name", // mongoDB server connection url
  "fileSystem": { // (the server creates the directories if they do not exist)
    "uploadDirectory": "/tmp/htest-server/uploads", // server upload directory (clients to server)
    "downloadDirectory": "/tmp/htest-server/downloads" // server download directory (server to clients)
  }
}
```
* Start the htest-server daemon `sudo systemctl start htest-server`
* Retrieve the daemon status `sudo systemctl status htest-server`

### Update
* Go the the ["release" tab](https://github.com/Grenadingue/htest/releases) of the github page
* Select and download the last `.deb` available
* Update the package `sudo dpkg -i htest-server_X.X_all.deb` on the target machine
* Edit `/etc/htest-server/base.config.json` for your needs if `/etc/htest-server/base.config.json.new` has a different format
* You may need to reload `systemctl` configuration by typing `sudo systemctl daemon-reload`
* Restart the htest-server daemon `sudo systemctl restart htest-server`
* Retrieve the daemon status `sudo systemctl status htest-server`

### Development
#### Build and launch
See [`build and launch instructions`](htest-server/source/README.md)

#### Software packaging
See [`packaging instructions`](htest-server/README.md)

#### Current state
##### Overview
*Incoming...*

##### API
See [`application programming interface description`](htest-server/source/documentation/API.md) *(in construction)*

#### Future
*Incoming...*
