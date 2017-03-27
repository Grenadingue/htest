# htest
`htest = hardware tester`

## Description
An hardware tester assistant, build on the top of a web server, designed for [Ordissimo](http://www.ordissimo.eu/en/about/change-mind)

*Warning: this project is currently not usable in a production environment, it lacks a major part of its development, the tests execution*

## User documentation
### Use
*Incoming...*

## Technical documentation
* __Compatibility__: Debian/Ubuntu and derivates
* __Prerequisites__: `MongoDB` >= 2.4 and `Node.js` >= 6 are already installed

### Install
* Go the the ["release" tab](https://github.com/Grenadingue/htest/releases) of the github page
* Select and download the last `.deb` available
* Install the package `sudo dpkg -i htest-server_X.X_all.deb` on the target machine
* Edit `/etc/htest-server/base.config.json` for your needs
* `webServer`
  * `port` => server listening port
  * `hostname` => server listening hostname (the server will deny any connection attempt with any other hostname)
* `dataBase` => mongoDB server connection url
* `fileSystem` (the server creates the directories if they do not exist)
  * `uploadDirectory` => server upload directory (clients to server)
  * `downloadDirectory` => server download directory (server to clients)
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

### Software packaging
See [`packaging instructions`](htest-server/README.md)

### Development
#### How to build and launch in development mode?
See [`build and launch instructions`](htest-server/source/README.md)

#### Current state
##### Overview
*Incoming...*

##### API
See [`application programming interface description`](htest-server/source/documentation/API.md) *(in construction)*

#### Future
*Incoming...*
