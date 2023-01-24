var web3 = require("web3");
const Web3Quorum = require("web3js-quorum");
let fs = require("fs");
var _ = require("underscore");
const { delay } = require("underscore");

let appConfigFile = fs.readFileSync("../app-config.json");
let appConfig = JSON.parse(appConfigFile);
const web3http = new web3('http://'+appConfig.nodeAddress+"/network-leader");
const web3Quorum = new Web3Quorum(web3http);
const address = appConfig.ownerAddress;
const deployedMembersContractsfilePath = appConfig.deployedMembersContractsPath+"";
const deployedOffersContractsfilePath = appConfig.deployedOffersContractsPath+"";
const memberContractABIPath = appConfig.memberContractABIPath+"";
const offersContractABIPath = appConfig.offersContractABIPath;


async function getGasPrice() {
    while (true) {
        
        const nodeGasPrice = await web3Quorum.eth.getGasPrice();
        const userGasPrice = await scan(`Enter gas-price or leave empty to use ${nodeGasPrice}: `);
        if (/^\d+$/.test(userGasPrice))
            return userGasPrice;
        if (userGasPrice == "")
            return nodeGasPrice;
        console.log("Illegal gas-price");
    }
}

function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

const deployOffersContract = async () => {

    
    let memberContractAddressData = JSON.parse(fs.readFileSync(deployedMembersContractsfilePath));
    let memberContractAddress = memberContractAddressData.membersContract;
    /*** offers contract */
    
    let rawOffersContract = JSON.parse(fs.readFileSync(offersContractABIPath));    
    
  
    //const txnCountOffers = await web3Quorum.eth.getTransactionCount(address);
    accountNonce =  await web3Quorum.eth.getTransactionCount(address,'pending');//'0x' + (await web3Quorum.eth.getTransactionCount(address) + 1).toString(16)
    console.log(accountNonce);
    nonse = '0x' + accountNonce.toString(16);
    const offersContract = await new web3Quorum.eth.Contract(rawOffersContract.abi);
    const offersContractData = offersContract.deploy({ data: rawOffersContract.bytecode, arguments: [memberContractAddress] });
    const rawTxOptionsOffers = {
        nonse: nonse,
        from: address,
        to: null, //public tx
        value: "0x00",
        data: offersContractData.encodeABI(),//'0x'+contractBin+contractInit, // contract binary appended with initialization value
        gasPrice: "0x0", //ETH per unit of gas
        gas: "4200000" //max number of gas units the tx is allowed to use
      };    
    
    const signedTxOffers = await web3Quorum.eth.accounts.signTransaction(rawTxOptionsOffers, appConfig.privateKey);
    accountNonce =  await web3Quorum.eth.getTransactionCount(address,'pending');//'0x' + (await web3Quorum.eth.getTransactionCount(address) + 1).toString(16)
    console.log(accountNonce);  
    const offersContractDeployed = await web3Quorum.eth.sendSignedTransaction(signedTxOffers.rawTransaction);
    //console.log(offersContractDeployed);
    
    console.log("Offer transactionHash: " + offersContractDeployed.transactionHash);
    console.log("Offer contractAddress: " + offersContractDeployed.contractAddress);
    
    
    const offerProposedEventJsonInterface = _.find(
        offersContract._jsonInterface,
        o => o.name === 'offerProposed' && o.type === 'event',
      );
    var offerProposedEventOptions = {
        address: offersContractDeployed.contractAddress,
        topics: [offerProposedEventJsonInterface.signature]
    }; 

    const offerAcceptedEventJsonInterface = _.find(
        offersContract._jsonInterface,
        o => o.name === 'offerAccepted' && o.type === 'event',
      );
        
    var offerProposedEventOptions = {
        address: offersContractDeployed.contractAddress,
        topics: [offerAcceptedEventJsonInterface.signature]
    }; 
    
    
    /*
    const offersContract = await new web3http.eth.Contract(rawOffersContract.abi)
        .deploy({ data: rawOffersContract.bytecode, arguments: [membersContract._address] })
        .send({ gas: '2000000', from: address });   

    var offerProposedEventOptions = {
        address: offersContract._address.offersContract,
        topics: [offerProposedEventJsonInterface.signature]
    };

    */

   


    /*** generate deployedContracts.json */
    
    let deployedContractsJson = {
        //membersContract: membersContractDeployed.contractAddress,
        //memberAddedEventJsonInterface: memberAddedEventJsonInterface,
        //memberAddedEventOptions: memberAddedEventOptions,

        offersContract: offersContractDeployed.contractAddress,
        offerProposedEventJsonInterface: offerProposedEventJsonInterface,
        offerProposedEventOptions: offerProposedEventOptions,
        offerAcceptedEventJsonInterface: offerAcceptedEventJsonInterface,
        offerProposedEventOptions: offerProposedEventOptions,
        transactionReceipt: offersContractDeployed
    };
    
    //let deployedContracts = JSON.parse(deployedOffersContractsfilePath);
    //deployedContracts.push(JSON.stringify(deployedContractsJson, null, "\t"));
    let data = JSON.stringify(deployedContractsJson, null, "\t");
    console.log("Writing Contract address to - "+deployedOffersContractsfilePath);    
    fs.writeFileSync(deployedOffersContractsfilePath, data);    
    console.log("Saved Contract interface to - "+deployedOffersContractsfilePath);
   
}

const deployMemberContract = async () => {

    
    /*** members contract */    
    let rawMembersContract = JSON.parse(fs.readFileSync(memberContractABIPath));    
    var accountNonce =  await web3Quorum.eth.getTransactionCount(address,'pending');//'0x' + (await web3Quorum.eth.getTransactionCount(address) + 1).toString(16)
    console.log("accountNonce>> "+accountNonce);
    //console.log("Estimated gas price "+ await web3Quorum.eth.getGasPrice());
    //console.log("Pending Tr - "+ web3Quorum.eth.getPendingTransactions());
    nonse = accountNonce+3
    console.log(web3.utils.numberToHex(nonse));
    const rawTxOptionsMember = {
        from: address,
        to: null, //public tx
        value: "0x00",
        data: rawMembersContract.bytecode,//'0x'+contractBin+contractInit, // contract binary appended with initialization value
        gasPrice: "0x0", //ETH per unit of gas
        gas: "3000000" //max number of gas units the tx is allowed to use
      };
    
    const signedTxMember = await web3Quorum.eth.accounts.signTransaction(rawTxOptionsMember, appConfig.privateKey);
    const membersContractDeployed = await web3Quorum.eth.sendSignedTransaction(signedTxMember.rawTransaction);
    console.log("Member transactionHash: " + membersContractDeployed.transactionHash);
    console.log("Member contractAddress: " + membersContractDeployed.contractAddress);
    const membersContract = await new web3http.eth.Contract(rawMembersContract.abi);
    /*
      const membersContract = await new web3http.eth.Contract(rawMembersContract.abi)
        .deploy({ data: rawMembersContract.bytecode, arguments: [] })
        .send({ gas: '2000000', from: address, to: null, value: "0x00", });
        
    };
       */
    const memberAddedEventJsonInterface = _.find(
        membersContract._jsonInterface,
        o => o.name === 'memberAdded' && o.type === 'event',
      )

    var memberAddedEventOptions = {
        address: membersContractDeployed.contractAddress,
        topics: [memberAddedEventJsonInterface.signature]
    };
   

    /*** offers contract */
    
    let rawOffersContract = JSON.parse(fs.readFileSync(offersContractABIPath));    
   
    

    /*** generate deployedContracts.json */
    
    let deployedContractsJson = {
        //contract: membersContract,
        membersContract: membersContractDeployed.contractAddress,
        memberAddedEventJsonInterface: memberAddedEventJsonInterface,
        memberAddedEventOptions: memberAddedEventOptions,
        transactionReceipt: membersContractDeployed

    };
    
    let data = JSON.stringify(deployedContractsJson, null, "\t");
    
    fs.writeFileSync(deployedMembersContractsfilePath, data);
    console.log("Saved Contract interface to - "+deployedMembersContractsfilePath);
    
   
}




// function createAccount(){    
//     console.log("web3 version"+web3.version.api);
//     console.log(web3http.eth.accounts.create());
// }

//createAccount();
// web3http.eth.getAccounts((err, accounts) =>{
//     console.log(accounts);
// });

const deployContract = async () => {
    await deployMemberContract();
    await deployOffersContract();
}

deployContract();
const txCount = async () => {
    var accountNonce =  await web3Quorum.eth.getTransactionCount(address,'pending');//'0x' + (await web3Quorum.eth.getTransactionCount(address) + 1).toString(16)
    console.log("accountNonce>> "+accountNonce);
}

//txCount();



/*
var pndTxns = [];
const web3Ws = new web3("ws://"+appConfig.nodeAddress);
var pndTxns = [];

web3Ws.eth
      .subscribe("pendingTransactions", function (error, result) {
        if (!error) console.log(result);
      })
      .on("data", function (transaction) {
        pndTxns.push(transaction);
        console.log(pndTxns);
});

console.log(pndTxns);
*/