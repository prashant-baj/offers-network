var web3 = require("web3")
let fs = require("fs");


//const web3http = new web3("http://20.219.225.121/member-1");
const web3http = new web3("http://localhost:8545");

web3http.eth.getBlockNumber().then((num) => {
    console.log(num);
    
})

const address = '0x9b9d58ab586b16362e7046b247d5926e680dce21' //'0xfe3b557e8fb62b89f4916b721be55ceb828dbd73' // Your account address goes here

web3http.eth.getBalance(address, (err, wei) => { 
    balance = web3.utils.fromWei(wei, 'ether') ;
    console.log("Balance - "+ balance);
})

web3http.eth.getAccounts((err, accounts) =>{
    console.log(accounts[0]);
});


const deployContract = async () => {
    let source = fs.readFileSync("../build/contracts/HelloWorld.json");
    let rawContract = JSON.parse(source);
    
    //console.log(rawContract.abi);

    const accounts = await web3http.eth.getAccounts();

    const contract = await new web3http.eth.Contract(rawContract.abi)
        .deploy({ data: rawContract.bytecode, arguments: ['Hello Prashant!!'] })
        .send({ gas: '10000000', from: accounts[0] });

    console.log('Contract deployed to', contract);

   
   
}

//deployContract();
//0x642Fa111edba00d562Fd64b025A08321b09fBc7c
const update = async () => {

    let source = fs.readFileSync("../build/contracts/HelloWorld.json");
    let rawContract = JSON.parse(source);
    
    var deployedContract = new web3http.eth.Contract(rawContract.abi, "0x642Fa111edba00d562Fd64b025A08321b09fBc7c");
    //const contract = web3http.eth.Contract(rawContract.abi);
    //var deployedContract = web3http.eth.contract(rawContract.abi).at("0x642Fa111edba00d562Fd64b025A08321b09fBc7c");
    //const deployedContract = contract.at(0x642Fa111edba00d562Fd64b025A08321b09fBc7c);

    const transactionObject = {
    from: '0xa0eD62FEAD4173E693c6613636E3Ae5DAA50c6f9',
    gas: '10000000'  
    };

    deployedContract.methods.update('new string').send({ from: '0xa0eD62FEAD4173E693c6613636E3Ae5DAA50c6f9' }).then(receipt => { 
        console.log(receipt);

   });
/*
    deployedContract.update.sendTransaction('Hi Prashant', transactionObject, (error, result) => { 
        // do something with error checking/result here 
        console.log(result);
    });
    */
}

//update();








