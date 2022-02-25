const path = require('path');
const fs = require('fs');
const solc = require('solc');

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
const source = fs.readFileSync(inboxPath, 'utf8');
// Now we have the readFileSync

module.exports = solc.compile(source, 1).contracts[':Inbox'];
// 1 says we are compiling only one contract.

console.log(module.exports);
