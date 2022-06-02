import { app, BrowserWindow, screen } from 'electron';
import * as path from 'path';
import * as fs from 'fs';
import * as url from 'url';

let win: BrowserWindow = null;
const args: string[] = process.argv.slice(1),
  serve: boolean = args.some(val => val === '--serve');

require('electron-reload')(__dirname, {
  hardResetMethod: 'exit',
  argv: ['--devTools']
});

import { ipcMain } from 'electron';
import { ipcRenderer } from 'electron';



ipcMain.on('btnAction', (event, mail) => {
  if (mail) {
    let ev = event;
    // event.sender.send('leakReturn', 'nique tes morts');

    // puppeteer.launch().then((browser) => {

    //   console.log(1)

    //   browser.newPage().then((page) => {
    //     console.log(2)

    //     page.goto('https://monitor.firefox.com/').then(() => {
    //       console.log(3)


    //       page.type('#scan-email', mail).then(() => {
    //         console.log(4)

    //         page.screenshot({ path: 'example.png' }).then(() => {
    //           console.log(5)

    //           page.keyboard.press('Enter').then(() => {
    //             console.log(6)

    //             page.waitForNavigation().then(() => {
    //               console.log(7)

    //               page.screenshot({ path: 'enter.png' }).then(() => {
    //                 console.log(8)

    //                 ev.sender.send('leakReturn', 'result');
    //                 console.log(9)

    //                 browser.close().then()
    //                 console.log(10)

    //               })

    //             })

    //           })

    //         })

    //       })

    //     })

    //   })


    // })


    (async () => {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto('https://monitor.firefox.com/');
      // await page.$eval('input[id=scan-email]', el => el.value = 'Adenosine triphosphate');
      await page.type('#scan-email', mail);
      await page.screenshot({ path: 'example.png' });
      console.log('keyboard');
      await page.keyboard.press('Enter');


      console.log('waitForNavigation');
      await page.waitForNavigation();
      console.log('New Page URL:', page.url());
      await page.screenshot({ path: 'enter.png' });

      // const data = await page.evaluate(() => {
      //   return document.getElementsByClassName('.scan-results')
      // });
      const infoText = await page.evaluate(() => document.querySelector('.scan-results-headline').textContent);

      const infoDetail = await page.evaluate(function () {
        var infos : Array<{plateforme: string, date: string,dataCompromises:string,logo:string}> = [];
        document.querySelectorAll('.breach-card').forEach(function (el) {
          let leak = { plateforme: '', date: '', dataCompromises: '' , logo :""};
          leak.plateforme = el.querySelector('.breach-title').textContent;
          leak.date = el.querySelectorAll('.breach-value')[0].textContent;
          leak.dataCompromises = el.querySelectorAll('.breach-value')[1].textContent;
          let img = el.querySelector('img');
          leak.logo = img.src
          infos.push(leak);
        });
        return infos
      }
      );
      const data = {
        infoText: infoText,
        infoDatail: infoDetail
      }
      console.log(data);
      ev.sender.send('leakReturn', data);

      console.log('FDP');

      await browser.close();
    })();
  }

});

const puppeteer = require('puppeteer');



function createWindow(): BrowserWindow {

  const size = screen.getPrimaryDisplay().workAreaSize;

  // Create the browser window.
  win = new BrowserWindow({
    x: 0,
    y: 0,
    width: 1280,
    height: 720,
    webPreferences: {
      nodeIntegration: true,
      allowRunningInsecureContent: (serve),
      contextIsolation: false,  // false if you want to run e2e test with Spectron
    },
  });

  if (serve) {
    const debug = require('electron-debug');
    debug();

    require('electron-reloader')(module);
    win.loadURL('http://localhost:4200').then();
  } else {
    // Path when running electron executable
    let pathIndex: string = './index.html';

    if (fs.existsSync(path.join(__dirname, '../dist/index.html'))) {
      // Path when running electron in local folder
      pathIndex = '../dist/index.html';
    }

    win.loadURL(url.format({
      pathname: path.join(__dirname, pathIndex),
      protocol: 'file:',
      slashes: true
    })).then();
  }

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });

  return win;
}

try {
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  // Added 400 ms to fix the black background issue while using transparent window. More details at https://github.com/electron/electron/issues/15947
  app.on('ready', () => setTimeout(createWindow, 400));

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });

} catch (e) {
  // Catch Error
  // throw e;
}
