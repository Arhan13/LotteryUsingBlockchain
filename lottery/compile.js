//Took the solidity and made and ABI and contract Bytecode

const path = require('path');/*The path module will alow us to build a path from compile.js file over
to the inbox.sol file, produces a valid path*/
const fs = require('fs');
const solc = require('solc');

const lotteryPath = path.resolve(__dirname, 'contracts','Lottery.sol');//path directly to the inbox.sol file
//Reading in the raw contents of the source file directly.Creating a temporary variable source
const source = fs.readFileSync(lotteryPath,'utf8');//utf8 should be specified

//console.log(solc.compile(source,1));// 1 is basically the number of files to compile.
module.exports = solc.compile(source,1).contracts[':Lottery'];


//Taking ABI and feeding it to web3
//Making a local copy