# node-fxos

Simplify interaction between mankind and FirefoxOS during webapps development

See the presentation [here](http://nicola.github.io/node-fxos-presentation)

## Idea

Instead of having a big tool that does everything, the idea here is to have very little libraries that do one thing well, so that you can roll your own command line tool, deployment and testing strategies and gulp/grunt script to enhance your Firefox OS development experience.

The aim of these components is to use the [Firefox Remote Debugging Protocol](https://wiki.mozilla.org/Remote_Debugging_Protocol) with [harthur/firefox-client](https://github.com/harthur/firefox-client).

## Modules

- [x] **[fx-ports](https://github.com/nicola/fx-ports)** - Find Firefox(OS) listening debugging ports
- [x] **[fxos-simulators](https://github.com/nicola/fxos-simulators)** - Find FirefoxOS simulators binaries
- [x] **[fxos-start](https://github.com/nicola/fxos-start)** - Start a FirefoxOS simulator
- [x] **[fxos-deploy](https://github.com/nicola/fxos-deploy)** - Deploy a webapp to FirefoxOS
- [x] **[fxos-findapp](https://github.com/nicola/fxos-findapp)** - Find an app on FirefoxOS given a manifest
- [x] **[fxos-reloadcss](https://github.com/nicola/fxos-reloadcss)** - Live-reload CSS in FirefoxOS
- [ ] **fxos-screenshot**
- [x] **fxos-console**

## Projects using fxos modules

- **[FirefoxOS Gulp Example](https://github.com/nicola/gulp-firefoxos-example)**: Gulpfile.js using node-fxos modules
- **Fireplay Atom**: Plugin for Atom for live editing FirefoxOS apps' HTML and CSS
