const Web3 = require('web3');
const HDWalletProvider = require('truffle-hdwallet-provider')
const mnemonic = process.env.TEST_MNEMONIC
const provider = new HDWalletProvider(mnemonic, 'https://rinkeby.infura.io/')
const contract = require('truffle-contract')
const ENS = require('./build/contracts/ENS.json')
const FIFSRegistrar = require('./build/contracts/FIFSRegistrar.json')
const PublicResolver = require('./build/contracts/PublicResolver.json')
const ens = contract(ENS)
const registrar = contract(FIFSRegistrar)
const resolver = contract(PublicResolver)
const web3 = new Web3(provider)
ens.setProvider(provider)
registrar.setProvider(provider)
resolver.setProvider(provider)

const namehash = require('eth-ens-namehash');

function getAccounts(param){
    return new Promise(function(resolve,reject){
         web3.eth.getAccounts(function(err,data){
             if(err !== null) return reject(err);
             resolve(data);
         });
    });
}

function getEnsInstance(){
    return ens.at("0xf918bb81a6e8dc5ba11c4a1a63c24ebcd805d662")
}

async function getEnsOwner(name) {
    let ensInstance = await getEnsInstance()
    let ddjOwner = await ensInstance.owner(namehash(name))
    console.log(`ENS.owner(namehash('${name}'))=`, ddjOwner)
}

async function getEnsResolver(name) {
    let ensInstance = await getEnsInstance()
    let node = namehash(name)
    let ddjResolver = await ensInstance.resolver(node)
    console.log(`ENS.resolver(namehash('${name}'))=`, ddjResolver)
}

async function setResolver(nodeName, addressResolver){
    let ensInstance = await getEnsInstance()
    let accounts = await getAccounts()
    console.log(accounts)
    let node = namehash(nodeName)
    let tx = await ensInstance.setResolver(node, addressResolver, {from: accounts[0], gas:4.0e6})
    console.log(tx)
}

async function setAddr(nodeName, address){
    let ensInstance = await getEnsInstance()
    let node = namehash(nodeName)
    let resolverAddr = await ensInstance.resolver(node)
    let instance = await resolver.at(resolverAddr)
    let accounts = await getAccounts()
    let tx = await instance.setAddr(node, address, {from: accounts[0], gas:4.0e6})
    console.log(tx)
}

async function getAddr(nodeName, address){
    let ensInstance = await getEnsInstance()
    let node = namehash(nodeName)
    let resolverAddr = await ensInstance.resolver(node)
    let instance = await resolver.at(resolverAddr)
    let addr = await instance.addr(node)
    console.log(`Resolver.addr(namehash('${nodeName}'))=`, addr)
}

async function register(nodeName, address) {
    let accounts = await getAccounts()
    console.log(accounts)
    let instance = await registrar.at("0x664bdd2718237df5f6dfba665a613b42a4b78e26")
    let tx = await instance.register(web3.sha3(nodeName), address,{from: accounts[0]})
    console.log(tx)
}

getEnsOwner('ddj')
getEnsOwner('y12.ddj')
getEnsResolver('y12.ddj')
getAddr('y12.ddj')
getEnsOwner('eth.ddj')
// 
// register('y12', "0x7f36A05a8C81d6a89b282B333696e9274B3f43f0")
// PublicResolver: 0xccd16a2c1f623476f439975f5bad4fdd685aafb7
// setResolver('y12.ddj', "0xccd16a2c1f623476f439975f5bad4fdd685aafb7")
// setAddr('y12.ddj', '0x7f36A05a8C81d6a89b282B333696e9274B3f43f0')