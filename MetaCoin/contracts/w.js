function Coin(Contract) {
    this.web3 = null;
    this.instance = null;
    this.Contract = Contract;
}

// Initialize the `Coin` object and create an instance of the web3js library,
Coin.prototype.init = function() {
    // The initialization function defines the interface for the contract using
    // the web3js contract object and then defines the address of the instance
    // of the contract for the `Coin` object.

    // Create a new Web3 instance using either the Metamask provider
    // or an independent provider created as the endpoint configured for the contract.
    this.web3 = new Web3(
        (window.web3 && window.web3.currentProvider) ||
        new Web3.providers.HttpProvider(this.Contract.endpoint));

    // Create the contract interface using the ABI provided in the configuration.
    var contract_interface = this.web3.eth.contract(this.Contract.abi);

    // Create the contract instance for the specific address provided in the configuration.
    this.instance = contract_interface.at(this.Contract.address);
    var accounts = this.web3.eth.getAccounts()
};

//let instance = await MetaCoin.deployed()

Coin.prototype.balanceCheck = function() {
    var that = this;

    // Get input values for address and amount
    var i = $("#create-address").val();
    let balance = that.instance.getBalance(accounts[i]);
    $("#message2").text(balance.toNumber());
  }


Coin.prototype.SendCash = function() {
      var that = this;

      // Get input values for address and amount
      var amount = $("#create-amount").val();
      let result = that.instance.sendCoin(accounts[1], amount);
      if(result == true)
        $("#message1").text("Successful");


    }

    Coin.prototype.bindButtons = function() {
        var that = this;

        $(document).on("click", "#button-create", function() {
            that.SendCash();
        });

        $(document).on("click", "#button-check", function() {
            that.balanceCheck();
        });
    }


    // Create the instance of the `Coin` object
    Coin.prototype.onReady = function() {
        this.bindButtons();
        this.init();
    };
    if(typeof(Contracts) === "undefined") var Contracts={ MetaCoin: { abi: [] }};
    var coin = new Coin(Contracts['MetaCoin']);

    $(document).ready(function() {
        coin.onReady();
    });
