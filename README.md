~~[![Angular Logo](https://www.vectorlogo.zone/logos/angular/angular-icon.svg)](https://angular.io/) [![Electron Logo](https://www.vectorlogo.zone/logos/electronjs/electronjs-icon.svg)](https://electronjs.org/)

# Introduction

Bootstrap and package your project with Angular 13 and Electron 17 (Typescript + SASS + Hot Reload) for creating Desktop applications.

Currently runs with:

- Angular v13.2.4
- Electron v17.1.0

With this sample, you can:

- Run your app in a local development environment with Electron & Hot reload
- Run your app in a production environment
- Package your app into an executable file for Linux, Windows & Mac

/!\ Hot reload only pertains to the renderer process. The main electron process is not able to be hot reloaded, only restarted.

/!\ Angular CLI & Electron Builder needs Node 14 or later to work correctly.

## Getting Started

*Install dependencies with npm (used by Electron renderer process):*

``` bash
npm install
```

There is an issue with `yarn` and `node_modules` when the application is built by the packager. Please use `npm` as dependencies manager.

If you want to generate Angular components with Angular-cli , you **MUST** install `@angular/cli` in npm global context.
Please follow [Angular-cli documentation](https://github.com/angular/angular-cli) if you had installed a previous version of `angular-cli`.

``` bash
npm install -g @angular/cli
```

*Install NodeJS dependencies with npm (used by Electron main process):*

``` bash
cd app/
npm install
```

Why two package.json ? This project follow [Electron Builder two package.json structure](https://www.electron.build/tutorials/two-package-structure) in order to optimize final bundle and be still able to use Angular `ng add` feature.

## To build for development

- **in a terminal window** -> npm start

Voila! You can use your Angular + Electron app in a local development environment with hot reload!

The application code is managed by `app/main.ts`. In this sample, the app runs with a simple Angular App (http://localhost:4200), and an Electron window. \
The Angular component contains an example of Electron and NodeJS native lib import. \
You can disable "Developer Tools" by commenting `win.webContents.openDevTools();` in `app/main.ts`.

## Project structure

| Folder | Description                                      |
|--------|--------------------------------------------------|
| app    | Electron main process folder (NodeJS)            |
| src    | Electron renderer process folder (Web / Angular) |

## How to import 3rd party libraries

This sample project runs in both modes (web and electron). To make this work, **you have to import your dependencies the right way**. \

There are two kind of 3rd party libraries :
- NodeJS's one - Uses NodeJS core module (crypto, fs, util...)
    - I suggest you add this kind of 3rd party library in `dependencies` of both `app/package.json` and `package.json (root folder)` in order to make it work in both Electron's Main process (app folder) and Electron's Renderer process (src folder).

Please check `providers/electron.service.ts` to watch how conditional import of libraries has to be done when using NodeJS / 3rd party libraries in renderer context (i.e. Angular).

- Web's one (like bootstrap, material, tailwind...)
    - It have to be added in `dependencies` of `package.json  (root folder)`

## Add a dependency with ng-add

You may encounter some difficulties with `ng-add` because this project doesn't use the defaults `@angular-builders`. \
For example you can find [here](HOW_TO.md) how to install Angular-Material with `ng-add`.

## Browser mode

Maybe you only want to execute the application in the browser with hot reload? Just run `npm run dev:web`.

## Included Commands

| Command             | Description                                                                                           |
|---------------------|-------------------------------------------------------------------------------------------------------|
| `npm run dev`       | Execute the app in the web browser (DEV mode)                                                         |
| `npm run web:build` | Build the app that can be used directly in the web browser. Your built files are in the /dist folder. |
| `npm run e:l`       | Builds your application and start electron locally                                                    |
| `npm run e:b`       | Builds your application and creates an app consumable based on your operating system                  |

**Your application is optimised. Only /dist folder and NodeJS dependencies are included in the final bundle.**

## You want to use a specific lib (like rxjs) in electron main thread ?

YES! You can do it! Just by importing your library in npm dependencies section of `app/package.json` with `npm install --save XXXXX`. \
It will be loaded by electron during build phase and added to your final bundle. \
Then use your library by importing it in `app/main.ts` file. Quite simple, isn't it?
