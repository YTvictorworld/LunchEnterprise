const { join } = require('path');
const Chalk = require('Chalk');
const FileSystem = require('fs');
const Vite = require('vite');
const compileTs = require('./private/tsc');

function buildRenderer() { 
    return Vite.build({ 
        configFile: join(__dirname, '../vite.config.ts'),
        base: './',
        mode: 'production'
    });
}

function buildMain(){ 
    if(!FileSystem.existsSync(join(__dirname, '..', 'src', 'client', 'app.js'))) {
        console.error(Chalk.redBright('Could not find the compiled main process file. Please run "npm run build" first.'));
        return;
    }
    const mainPath = join(__dirname, '..', 'src', 'client', 'app.js');
    return compileTs(mainPath);
}

FileSystem.rmSync(join(__dirname, '..', 'dist'), { recursive: true, force: true });

console.log(Chalk.yellowBright('Building renderer... & main...'));
Promise.allSettled([buildRenderer(), buildMain()]).then(() => {
    console.log(Chalk.greenBright('Build complete!'));
});

