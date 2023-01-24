var web3 = require("web3");
const Web3Quorum = require("web3js-quorum");
let fs = require("fs");
const { stringify } = require("querystring");
const { runInContext } = require("vm");
var _ = require("underscore");

let appConfigFile = fs.readFileSync("../app-config.json");
let appConfig = JSON.parse(appConfigFile);



//let deployedContractsfile = fs.readFileSync("../deployedMembersContracts.json");





async function addNewMember(newMember) {   
    const functionAbi = _.find(
      deployedMembersContract._jsonInterface,
        o => o.name === 'addMember',
      );
    const functionArgs = web3Quorum.eth.abi
    .encodeParameters(functionAbi.inputs, [newMember])
    .slice(2);     
      
    const functionParams = {
      to: rawdeployedMembersContracts.membersContract,
      data: functionAbi.signature + functionArgs,      
      //gasPrice: "0x0", //ETH per unit of gas
      gas: "1000000" //max number of gas units the tx is allowed to use
    };   
    
    const signedTx = await web3Quorum.eth.accounts.signTransaction(functionParams, appConfig.privateKey);
    const txReceipt = await web3Quorum.eth.sendSignedTransaction(signedTx.rawTransaction);
    //const result = await web3Quorum.eth.waitForTransactionReceipt(txReceipt);
    console.log(`Transaction result: ${txReceipt}`);
    console.log(JSON.stringify(txReceipt));
  
  };
  


  async function getMembers(){
    
    const res = await deployedContract.methods.getMembers().call();
    console.log("Obtained value at deployed contract is: "+ res);
    return res
  }


  async function proposeOffer(offerProposal) {   
    const functionAbi = _.find(
        deployedOffersContract._jsonInterface,
        o => o.name === 'offerProposal',
      );
    const functionArgs = web3Quorum.eth.abi
    .encodeParameters(functionAbi.inputs, [offerProposal])
    .slice(2);     
      
    const functionParams = {
      to: rawdeployedOffersContracts.offersContract,
      data: functionAbi.signature + functionArgs,      
      //gasPrice: "0x0", //ETH per unit of gas
      gas: "4000000" //max number of gas units the tx is allowed to use
    };   
    
    const signedTx = await web3Quorum.eth.accounts.signTransaction(functionParams, sender.privateKey);
    const txReceipt = await web3Quorum.eth.sendSignedTransaction(signedTx.rawTransaction);
    //const result = await web3Quorum.eth.waitForTransactionReceipt(txReceipt);
    console.log(`Transaction result: ${txReceipt}`);
    console.log(JSON.stringify(txReceipt));
  
  };

  async function getOffersByMemebr(){    
    const res = await deployedOffersContract.methods.getOffersByMember(address).call();
    console.log("Obtained value at deployed contract is: "+ res);
    return res
  }

  async function getOffersByMemberAndOfferId(offerId){    
    const res = await deployedOffersContract.methods.getOffersByMember(address, offerId).call();
    console.log("Obtained value at deployed contract is: "+ res);
    return res
  }


  async function acceptOffer(offerId) {   
    const functionAbi = _.find(
        deployedOffersContract._jsonInterface,
        o => o.name === 'acceptOffer',
      );
    const functionArgs = web3Quorum.eth.abi
    .encodeParameters(functionAbi.inputs, [address, offerId])
    .slice(2);     
      
    const functionParams = {
      to: rawdeployedOffersContracts.offersContract,
      data: functionAbi.signature + functionArgs,      
      //gasPrice: "0x0", //ETH per unit of gas
      gas: "4000000" //max number of gas units the tx is allowed to use
    };   
    
    const signedTx = await web3Quorum.eth.accounts.signTransaction(functionParams, sender.privateKey);
    const txReceipt = await web3Quorum.eth.sendSignedTransaction(signedTx.rawTransaction);
    //const result = await web3Quorum.eth.waitForTransactionReceipt(txReceipt);
    console.log(`Transaction result: ${txReceipt}`);
    console.log(JSON.stringify(txReceipt));
  
  };

  async function proposeOfferPrivate(offerProposal, privateFor) {   
    const functionAbi = _.find(
        deployedOffersContract._jsonInterface,
        o => o.name === 'offerProposal',
      );
    const functionArgs = web3Quorum.eth.abi
    .encodeParameters(functionAbi.inputs, [offerProposal])
    .slice(2);     
      const functionParams = {
      to: rawdeployedOffersContracts.offersContract,
      data: functionAbi.signature + functionArgs,
      privateKey: sender.privateKey,
      privateFrom: sender.tesseraPubKey,
      privateFor: ['7IvRjIz9z2+ljEAGsyxZ9kOry2PrUcypVjnmbNDPuRg=']
    };
    
    //const signedTx = await web3Quorum.eth.accounts.signTransaction(functionParams, sender.privateKey);
    //const txReceipt = await web3Quorum.eth.sendSignedTransaction(signedTx.rawTransaction);
    //const result = await web3Quorum.eth.waitForTransactionReceipt(txReceipt);    

    const transactionHash = await web3Quorum.priv.generateAndSendRawTransaction(functionParams);
    console.log(`Transaction hash: ${transactionHash}`);
    const result = await web3Quorum.priv.waitForTransactionReceipt(transactionHash);
    console.log(`Transaction result: ${result}`);
    console.log(JSON.stringify(result));

    return result;
  
  };

  async function getOffersByMemebrPrivate(privateFor){    
   
    const functionAbi = _.find(
      deployedOffersContract._jsonInterface,
      o => o.name === 'getOffersByMember',
    );
    
    // const functionArgs = web3Quorum.eth.abi
    // .encodeParameters(functionAbi.inputs, [offerProposal])
    // .slice(2);     
    console.log(functionAbi.signature);
    const functionParams = {
      to: rawdeployedOffersContracts.offersContract,
      data: functionAbi.signature,
      privateKey: sender.privateKey,
      privateFrom: sender.tesseraPubKey,
      privateFor: ['7IvRjIz9z2+ljEAGsyxZ9kOry2PrUcypVjnmbNDPuRg=']
    };

    const transactionHash = await web3Quorum.priv.generateAndSendRawTransaction(functionParams); 
    const result = await web3Quorum.priv.waitForTransactionReceipt(transactionHash);
    console.log("" + nodeName + " value from deployed contract is: " + result.output);
    return result;

  }
  

/*
Example usage: node .\addMember.js '0x1fb63b0570f0fc87543c99731cd3b0f43d0018e2', 'Prashant & Company.', '0x1fb63b0570f0fc87543c99731cd3b0f43d0018e2', 'Merchant', 'Active'
*/

var args = process.argv
//addMember(args[2], args[3], args[4], args[5], args[6]);
const sender = _.find(
  appConfig.peers,
  o => o.name === args[3],
);

console.log ("Using node " + sender.name +" to send the transactions");
const address = sender.accountAddress;
const web3http = new web3('http://'+appConfig.nodeAddress+"/"+sender.name);
const web3Quorum = new Web3Quorum(web3http);
let memberSource = fs.readFileSync("../build/contracts/Members.json");
let rawMembersContract = JSON.parse(memberSource);
let deployedMembersContracts = fs.readFileSync("../deployedMembersContracts.json");
let rawdeployedMembersContracts = JSON.parse(deployedMembersContracts);     
let deployedMembersContract = new web3Quorum.eth.Contract(rawMembersContract.abi, rawdeployedMembersContracts.membersContract);

let offersSource = fs.readFileSync("../build/contracts/Offers.json");
let rawOffersContract = JSON.parse(offersSource);
let deployedOffersContracts = fs.readFileSync("../deployedOffersContracts.json");
let rawdeployedOffersContracts = JSON.parse(deployedOffersContracts);     
let deployedOffersContract = new web3Quorum.eth.Contract(rawOffersContract.abi, rawdeployedOffersContracts.offersContract);


let payloadSource = fs.readFileSync("./payloads.json");
let payloads = JSON.parse(payloadSource);
let command = args[2];
if (command == 'addMember'){
    const member = _.find(
      payloads.addMember,
      o => o.name === args[4],
    );
    addNewMember(member);
} else 
if (command == 'getAllMembers'){
    getMembers();
} else if(command == 'proposeOffer') {
    var d = new Date(payloads.proposeOffer.endDate);
    var eTimeStamp = d.getTime();
    payloads.proposeOffer.endDate = eTimeStamp;

    var s = new Date(payloads.proposeOffer.startDate);
    var sTimeStamp = s.getTime();
    payloads.proposeOffer.startDate = sTimeStamp;
    
    
    console.log(payloads.proposeOffer);
    proposeOffer(payloads.proposeOffer);


} else if(command == 'proposeOfferPrivate') {
  var d = new Date(payloads.proposeOffer.endDate);
  var eTimeStamp = d.getTime();
  payloads.proposeOffer.endDate = eTimeStamp;

  var s = new Date(payloads.proposeOffer.startDate);
  var sTimeStamp = s.getTime();
  payloads.proposeOffer.startDate = sTimeStamp;
  
  
  console.log(payloads.proposeOffer);
  proposeOfferPrivate(payloads.proposeOffer, ['7IvRjIz9z2+ljEAGsyxZ9kOry2PrUcypVjnmbNDPuRg=']);


} else if(command == 'getOffers') {
  getOffersByMemebr(['7IvRjIz9z2+ljEAGsyxZ9kOry2PrUcypVjnmbNDPuRg=']);
}else if(command == 'getOffersPrivate') {
  getOffersByMemebrPrivate();
}else if(command == 'getOffersByOfferId') {  
  if(args[3] != null){
  getOffersByMemberAndOfferId(args[3]);
  }else{
    console.log("Please provide offerId");
  }
}else if(command == 'acceptOffer'){
  acceptOffer("1005");
}
