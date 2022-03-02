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

    it('requires a minimum amount of ether to enter', async () => {
        try {
            await lottery.method.enter().send({
                from: accounts[0],
                value: 0 // We are sending less than 2, so this will fail; require(msg.value > 1); 
            });
            assert(false); // We need to add this. Because if the await code excecution is successfull it will not throw an error. So we are failing the test inentially using assert(false)
        } catch (err) {
            assert.ok(err); // Check if there is an error. There should be an error. If there is an error this test is successfull.
        }
    });

    it('requires manager to pick a winner', async () => {
        try {
            await lottery.methods.pickWinner().call({
                from: accounts[1] // this account is not manager. We defined manager as account[0] in beforeEach mocha test function.
            });
            assert(false);
        } catch (err) {
            assert.ok(err); // Check if there is an error. There should be an error. If there is an error this test is successfull.
        }
    });

    it('sends money to the winner and resets the players array', async () => {
        const beforeLottery = await web3.eth.getBalance(accounts[0]);
        console.log("beforeLottery: " + beforeLottery);
        // Enter the lottery
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('2', 'ether')
        });

        // Get the balance before we pick a winner.
        const initialBalance = await web3.eth.getBalance(accounts[0]);

        console.log("initialBalance: " + initialBalance);
        
        // Pick a winner
        const res = await lottery.methods.pickWinner().call({
            from: accounts[0]
        });

        // Sleep 300 ms
        await new Promise(r => setTimeout(r, 600));

        // Get the balance after we pick a winner.
        const finalBalance = await web3.eth.getBalance(accounts[0]);
        console.log("finalBalance  : " + finalBalance);

        // finalBalance - initialBalance will be smaller than 2, because of gas prices.
        // So we will check if this amount is slightly less than 2 ether.
        const difference = finalBalance - initialBalance;
        console.log("difference " + difference);
        assert(difference > web3.utils.toWei('1.8', 'ether')); // 1.8 allows some amount of gas. So that we can test this without actually calculating the exact gas.
    });
});