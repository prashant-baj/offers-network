
var web3 = require("web3")
const Web3Utils = require('web3-utils');
const Web3Quorum = require("web3js-quorum");
let fs = require("fs");
var _ = require("underscore");
const request = require('request');
const WebSocket = require('ws');

let appConfigFile = fs.readFileSync("../app-config.json");
let appConfig = JSON.parse(appConfigFile);
let nodeName = "";

function subscribeToEvent(){
    //const web3http = new web3('ws://'+appConfig.nodeAddress);
    var web3http = new web3(web3.givenProvider || 'ws://'+appConfig.nodeAddress+'/'+nodeName+'-ws');
    //web3http.setProvider(new web3.providers.WebsocketProvider('ws://'+appConfig.nodeAddress));
    const web3Quorum = new Web3Quorum(web3http);
    let deployedContracts = JSON.parse(fs.readFileSync(appConfig.deployedOffersContractsPath));
    
    // 5yk7qulw/Y7TffOBQVLxQQc0oDT4nOftjyp9zWawHAE=
    // 
    var subscription = web3Quorum.eth.subscribe("logs", function(error, result){
        if (!error) console.log('New Offer acceptance received');
        else console.log(error);
    }).on("data", function(log){ 
            console.log(log);           
        let result = web3Quorum.eth.abi.decodeLog([
            deployedContracts.offerAcceptedEventJsonInterface.inputs[0],
            deployedContracts.offerAcceptedEventJsonInterface.inputs[1],
            deployedContracts.offerAcceptedEventJsonInterface.inputs[2]
        ],
            log.data,
            log.topics);        
         console.log(result);
          
    }).on("changed", function(log){
        console.log('changed');
    }).on("connected", function(id){
        console.log("Connected to OffersChain with subscriptionId :" +id +" and waiting for events..");
    });   
      
}

var args = process.argv;

if(args[1] != null){
    const subscriber = _.find(
    appConfig.peers,
    o => o.name === args[2],
    );
    console.log ("Using node " + subscriber.name +" to send the transactions");
        nodeName = subscriber.name;
        subscribeToEvent();

}else{
    console.log("Member node name required");
}
