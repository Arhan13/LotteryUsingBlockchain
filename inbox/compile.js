const path = require('path');/*The path module will alow us to build a path from compile.js file over
to the inbox.sol file, produces a valid path*/
const fs = require('fs');
const solc = require('solc');

const inboxPath = path.resolve(__dirname, 'contracts','Inbox.sol');//path directly to the inbox.sol file
//Reading in the raw contents of the source file directly.Creating a temporary variable source
const source = fs.readFileSync(inboxPath,'utf8');//utf8 should be specified

//console.log(solc.compile(source,1));// 1 is basically the number of files to compile.
module.exports = solc.compile(source,1).contracts[':Inbox'];