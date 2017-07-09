const Web3 = require('web3');
const HDWalletProvider = require('truffle-hdwallet-provider')
const mnemonic = process.env.TEST_MNEMONIC
const provider = new HDWalletProvider(mnemonic, 'https://rinkeby.infura.io/')
const contract = require('truffle-contract')
const ENS = require('./build/contracts/ENS.json')
const FIFSRegistrar = require('./build/contracts/FIFSRegistrar.json')
var ens = contract(ENS)
var registrar = contract(FIFSRegistrar)
const web3 = new Web3(provider)
ens.setProvider(provider)
registrar.setProvider(provider)

const namehash = require('eth-ens-namehash');

function getAccounts(param){
    return new Promise(function(resolve,reject){
         web3.eth.getAccounts(function(err,data){
             if(err !== null) return reject(err);
             resolve(data);
         });
    });
}

async function getEnsOwner(name) {
    var ensInstance = await ens.at("0xf918bb81a6e8dc5ba11c4a1a63c24ebcd805d662")
    ddjnode = namehash(name)
    var ddjOwner = await ensInstance.owner(ddjnode)
    console.log(`ENS.owner(namehash('${name}'))=`, ddjOwner)
}

async function register(name, address) {

    let accounts = await getAccounts()
    console.log(accounts)
    let instance = await registrar.at("0x664bdd2718237df5f6dfba665a613b42a4b78e26")
    let tx = instance.register(web3.sha3(name), address,{from: accounts[0]})
    console.log(tx)
}
getEnsOwner('ddj')
getEnsOwner('y12.ddj')
getEnsOwner('eth.ddj')
//register('y12', "0x7f36A05a8C81d6a89b282B333696e9274B3f43f0")
