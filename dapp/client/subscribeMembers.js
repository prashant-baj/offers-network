
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
    
    console.log("Connecting to" + 'ws://'+appConfig.nodeAddress+'/'+nodeName+'-ws');
    var web3http = new web3(web3.givenProvider || 'ws://'+appConfig.nodeAddress+'/'+nodeName+'-ws');
    //web3http.setProvider(new web3.providers.WebsocketProvider('ws://'+appConfig.nodeAddress));
    const web3Quorum = new Web3Quorum(web3http);
    let deployedContracts = JSON.parse(fs.readFileSync(appConfig.deployedMembersContractsPath));
    //console.log(deployedContracts.memberAddedEventOptions);
    //console.log(deployedContracts.memberAddedEventJsonInterface.inputs[0]);
    // 5yk7qulw/Y7TffOBQVLxQQc0oDT4nOftjyp9zWawHAE=
    // 
    //console.log(deployedContracts);
    var subscription = web3Quorum.eth.subscribe("logs", function(error, result){
        if (!error) console.log('New member event');
        else console.log(error);
    }).on("data", function(log){ 
            //console.log(log);           
        let result = web3Quorum.eth.abi.decodeLog([deployedContracts.memberAddedEventJsonInterface.inputs[0]],
            log.data,
            log.topics);        
         console.log(result);
          
    }).on("changed", function(log){
        console.log('changed');
    }).on("connected", function(id){
        console.log("Connected to OffersChain with subscriptionId :" +id +" and waiting for events..");
    });   
      
}
var args = process.argv
//addMember(args[2], args[3], args[4], args[5], args[6]);

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



// let options = {
//     url: "http://"+appConfig.nodeAddress+"ws",
//     method: "post",
//     headers:
//     { 
//      "content-type": "application/json"
//     },    
//     body: JSON.stringify({"id": 1, "method": "eth_subscribe", "params": ["newPendingTransactions", {"includeTransactions":false}]})};

// request(options, (error, response, body) => {
//     if (error) {
//         console.error('An error has occurred: ', error);
//     } else {
//         console.log('Post successful: response: ', body);
//     }
// });

// const ws = new WebSocket('ws://'+appConfig.nodeAddress+'ws',);

// ws.on('open', function open() {
//   ws.send('something');
// });

// ws.on('data', function message(data) {
//   console.log('received: %s', data);
// });

// ws.on('changed', function message(data) {
//     console.log('received: %s', data);
//   });

//   ws.on('connected', function message(id) {
//     console.log('connected', id);
//   });  

//   ws.on('open', function open() {
//     console.log('connected');
//   });

//{"id": 1, "method": "eth_subscribe", "params": ["newPendingTransactions", {"includeTransactions":false}]}
//{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}

//wscat -c ws://20.204.233.195/member-1ws

//{"id": 1, "method": "eth_subscribe", "params": ["logs",{}]}

//{"id": 1, "method": "priv_subscribe", "params": ["U7ltTsv5yEtKISPFUlWRIdm5yyC7+YxJBJzZsyabNXw=", "logs",{}]}
//{"id": 1, "method": "priv_subscribe", "params": ["U7ltTsv5yEtKISPFUlWRIdm5yyC7+YxJBJzZsyabNXw=", "logs", {"address": "0xDE87AF9156a223404885002669D3bE239313Ae33", "topics": ["0x7f191420f4d575c3b9211397df53ac7808c90263ca91163d27715c8dbba03dc3"]}]}




// {
//     "id": 1, 
//     "method": 
//     "eth_subscribe", 
//     "params": ["logs", 
//     {"address": "0x8320fe7702b96808f7bbc0d4a888ed1468216cfd", 
//     "topics": ["0xd78a0cb8bb633d06981248b816e7bd33c2a35a6089241d099fa519e361cab902"], 
//     "fromBlock":"0x0",
//     "toBlock":"latest"}]
// }
