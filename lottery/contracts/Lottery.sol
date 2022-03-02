pragma solidity ^0.4.25;

contract Lottery {
  address public manager;
  address[] public players; // if you want to limit the # of players use fixed array; address[10], means 10 people can join.
  
  constructor() public {
    manager = msg.sender; // msg is the global variable, no need to create anywere. Available through solidity.
  }
  
  // User will send some eth to enter the Lottery
  // We will add user's address to players dynamic array.
  function enter() public payable { // payable means someone who calls this function might send ether along
    require(msg.value > 1); // use syntax '.01 ether' to convert ether to WEI. Makes it more readible.
    
    players.push(msg.sender); // msg.sender has the address of the external account that invokes this function.
  }

  function pickWinner() public restricted {
    uint index = random() % players.length; // 72. Selecting a Winner
    
    // 69. Validation with Require Statements
    // players[index] returns address type (address[] public players)
    // This is a special object that you can call specific function on it like transfer();
    // this.balance refers to the total amount of money the contract has. The money players sent to the contract while entering.
        // this refers to this instance of the contract
        // balance is the amount of money the current contract has available to it.
    players[index].transfer(this.balance);
    players = new address[](0); // 74. Resetting Contract State

  }

  // 71. Pseudo-Random Number Generator
  // DO NOT USE THIS RANDOM FUNCTION IN A REAL APP
  function random() private view returns (uint) {
      return uint(keccak256(block.difficulty, now, players));
  }

  // 76. Function Modifiers
  modifier restricted() {
    require(msg.sender == manager);  // 75. Requiring Managers: ensures nobody can call this method except manager, who is the original contract creator.
    _;
  }

  // 77. Returning Players Array
  function getPlayers() public view returns(address[]) { // public: because we want anyone to get list of players. view: because we are not changint the contract. returns(address[]) this function will return a dynamic array of addresses.
    return players;
  }
}