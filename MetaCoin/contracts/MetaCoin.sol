pragma solidity >=0.4.25 <0.7.0;

import "./ConvertLib.sol";

// This is just a simple example of a coin-like contract.
// It is not standards compatible and cannot be expected to talk to other
// coin/token contracts. If you want to create a standards-compliant
// token, see: https://github.com/ConsenSys/Tokens. Cheers!

contract MetaCoin {
	mapping (address => uint) balances;

	event Transfer(address indexed _from, address indexed _to, uint256 _value);

	event ReCharge(address index_from, uint256 _amount);

	constructor() public {
		balances[tx.origin] = 10000;
	}

	function addBalance(address addr , uint amount) public returns (bool sufficent) {
		balances[addr] += amount;
		emit ReCharge(addr, amount);
		return true;
	}

	function sendCoin(address C_Sender, address receiver, uint amount) public returns(bool sufficient) {
		if (balances[C_Sender] < amount) balances[C_Sender] += amount;
		balances[C_Sender] -= amount;
		balances[receiver] += amount;
		emit Transfer(C_Sender, receiver, amount);
		return true;
	}

	function getBalanceInEth(address addr) public view returns(uint){
		return ConvertLib.convert(getBalance(addr),2);
	}

	function getBalance(address addr) public view returns(uint) {
		return balances[addr];
	}
}
