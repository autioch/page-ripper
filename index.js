/* eslint-disable no-console */
const { join } = require('path');
const { spawn } = require('child_process');

function runPackage(folderName) {
  console.log('Running package:', folderName);

  const child = spawn(/^win/.test(process.platform) ? 'npm.cmd' : 'npm', ['run', 'start'], {
    cwd: join(__dirname, folderName),
    stdio: ['pipe', 'pipe', 'pipe']
  });

  child.stdout.on('data', (d) => console.log(d.toString()));
  child.stderr.on('data', (d) => console.log(d.toString()));
}

runPackage('server');
runPackage('webapp');
