const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const { interface, bytecode } = require('../compile');

let lottery;
let accounts;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    lottery = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode })
        .send({ from: accounts[0], gas: '1000000'});
});

describe('Lottery Contract', () => {
    it('deploys a contract', () => {
        assert.ok(lottery.options.address);
    });

    it('allows one account to enter', async () => {
        // Enter the lottery
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('0.02', 'ether')
        });

        // Get the list of players who entered the lottery
        const players = await lottery.methods.getPlayers().call({
            from: accounts[0]
        });

        // Check if the player's address appears in players array
        assert.equal(accounts[0], players[0]);

        // Check to see there is only one player. Because we haven't added more than one player in our test
        assert.equal(1, players.length);
    });

    it('allows multiple accounts to enter', async () => {
        // Multiple players enter the lottery
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('0.02', 'ether')
        });
        await lottery.methods.enter().send({
            from: accounts[1],
            value: web3.utils.toWei('0.02', 'ether')
        });
        await lottery.methods.enter().send({
            from: accounts[2],
            value: web3.utils.toWei('0.02', 'ether')
        });

        // Get the list of players who entered the lottery
        const players = await lottery.methods.getPlayers().call({
            from: accounts[0]
        });

        // Check if the player's address appears in players array
        assert.equal(accounts[0], players[0]);
        assert.equal(accounts[1], players[1]);
        assert.equal(accounts[2], players[2]);

        // Check to see if there there is only three player. Because we haven't added more than three player in our test
        assert.equal(3, players.length);
    });
});