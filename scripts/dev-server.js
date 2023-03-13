process.env.NODE_ENV = 'development';

const vite = require('vite');
const ChildProcess = require('child_process');
const { join } = require('path');
const Chalk = require('Chalk');
const Chokidar = require('chokidar');
const Electron = require('electron');
const compileTs = require('./private/tsc');
const FileSystem = require('fs');
const { EOL } = require('os');

let viteServer = null;
let electronProcess = null;
let electronProcessLocker = false;
let rendererPort = 0;

async function startRenderer() {
    viteServer = await vite.createServer({
        configFile: join(__dirname, '../vite.config.ts'),
        mode: 'development'
    });
    await viteServer.listen();
}

async function startElectron() {
    if(electronProcess) { 
        return;
    }
    /*  try { 
        await compileTs(join(__dirname, '../', 'src', 'client'));
    } catch (e) { 
        console.error(Chalk.redBright('Could not start Electron because of the above typescript error(s).'));
        electronProcessLocker = false;
        return;
    }  */


const args = [
    join(__dirname, "..", "src", "client", "app.js"),
    rendererPort,
];
electronProcess = ChildProcess.spawn(Electron, args)
electronProcessLocker = false;
electronProcess.stdout.on('data', data => {
    if(data == EOL) { 
        return;
    }
    process.stdout.write(Chalk.yellowBright('[electron] ') + Chalk.white(data.toString())); 
});
electronProcess.stderr.on('data', data => 
        process.stderr.write(Chalk.blueBright(`[electron] `) + Chalk.white(data.toString()))
    );

    electronProcess.on('exit', () => 
    stop()
    );
}

function restartElectron() {
    if (electronProcess) {
        electronProcess.removeAllListeners('exit');
        electronProcess.kill();
        electronProcess = null;
    }

    if (!electronProcessLocker) {
        electronProcessLocker = true;
        startElectron();
    }
}

/* function copyStaticFiles() {
        copy('index.html');
} 
function copy(path) {
    const file = join(__dirname, 'assets', path);
    const target = join(__dirname, '..', 'dist', 'client', path);
    FileSystem.copyFileSync(file, target);
}
 */

function stop() {
    if (electronProcess) {
        electronProcess.kill();
        viteServer.close();
        process.exit();
    }
}

async function start() {
    console.log(`${Chalk.greenBright('=======================================')}`);
    console.log(`${Chalk.greenBright('Starting Electron + Vite Dev Server...')}`);
    console.log(`${Chalk.greenBright('=======================================')}`);
    
    startRenderer();
    startElectron();

   const path = join(__dirname, '..', 'src', 'client');
    Chokidar.watch(path, {
        cwd: path,
    }).on('change', (path) => {
        //Si el cambio fue en la db no se reinicia el electron
        if(path.includes('db')) {
            return;
        }
        console.log(Chalk.blueBright(`[electron] `) + `Change in ${path}. reloading... 🚀`);
        restartElectron();
        startRenderer();
    }); 
}

start();