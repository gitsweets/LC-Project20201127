let projectName = process.argv[2];
// console.log(projectName);
let fs = require('fs');
// console.log("__dirname", __dirname);
fs.writeFileSync('./multi_page_config/project.js', `exports.name = '${projectName}'`);

let exec = require('child_process').execSync;
exec('npm run multi-page-dev-run', {stdio: 'inherit'});