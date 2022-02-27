const path = require('path');
const fs = require('fs');
const solc = require('solc');

const lotteryPath = path.resolve(__dirname, 'contracts', 'Lottery.sol');
const source = fs.readFileSync(lotteryPath, 'utf8');
// Now we have the readFileSync

module.exports = solc.compile(source, 1).contracts[':Lottery'];
// 1 says we are compiling only one contract.

console.log(module.exports);
