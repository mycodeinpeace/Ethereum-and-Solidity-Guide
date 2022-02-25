const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
  'faith trick apart okay year truly sauce flame attract engage luxury until',
  'https://rinkeby.infura.io/v3/f7084ae9661b4982b8eb496e9ba4fc3a'// node to connect to
);

const web3 = new Web3(provider);


const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
       .deploy({data: '0x' + bytecode, arguments: ['Hi there!']}) // add 0x bytecode
       .send({from: accounts[0]}); // remove 'gas'

    console.log('Contract deployed to', result.options.address)
};
deploy();
