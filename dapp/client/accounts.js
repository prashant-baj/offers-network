var web3 = require("web3");
const Web3Quorum = require("web3js-quorum");
let fs = require("fs");
var _ = require("underscore");

let appConfigFile = fs.readFileSync("../app-config.json");
let appConfig = JSON.parse(appConfigFile);
const web3http = new Web3Quorum(new web3('http://'+appConfig.nodeAddress));


//console.log(web3http.eth.accounts.create());


web3http.eth.getAccounts((err, accounts) =>{
    console.log(accounts);
});