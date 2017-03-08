# Packaging

## Description
Here you will find the instructions to build a multi-architecture Debian package of `htest-server`. You can build this package from an Archlinux or a Debian host.

## Software dependencies
- `bash`
- `nodejs >= 6`
- `npm`
- `dpkg-buildpackage`
- `dh_make`

### Debian specific dependencies
| commands | packages and instructions |
|----------|---------------------------|
| `nodejs >= 6` + `npm` | [`nodejs.org` instructions for Debian based distributions](https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions) |
| `dpkg-buildpackage` | `dpkg-dev` in Debian repositories |
| `dh_make` | `dh-make` in Debian repositories |

### Archlinux specific dependencies
| commands | packages |
|----------|----------|
| `nodejs >= 6` + `npm` | `nodejs` in Archlinux community repository |
| `dpkg-buildpackage` | `dpkg` in Archlinux user repository (AUR) |
| `dh_make` | `dh-make` Archlinux user repository (AUR) |

## How to build Debian package?
```
$ ./build.bash
```
Then you should be able to find the built package in the parent folder
```
$ ls ../htest-server_*.deb
../htest-server_0.1_all.deb
```

## How to clean (erase) build files?
```
$ ./clean.bash
```
