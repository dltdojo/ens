import ENS  from '../build/contracts/ENS.json'
import FIFSRegistrar from '../build/contracts/FIFSRegistrar.json'
import PublicResolver from '../build/contracts/PublicResolver.json'
import { default as Web3 } from 'web3'
import { default as contract } from 'truffle-contract'
const ens = contract(ENS)
const registrar = contract(FIFSRegistrar)
const resolver = contract(PublicResolver)
const namehash = require('eth-ens-namehash')

let injectedWeb3 = true

// MetaMask Compatibility Guide
// https://github.com/MetaMask/faq/blob/master/DEVELOPERS.md
//

function init(w) {
    var provider;
    if (typeof w.web3 !== 'undefined' && injectedWeb3) {
        provider = w.web3.currentProvider
    } else {
        provider = new Web3.providers.HttpProvider("http://localhost:8545")
    }
    ens.setProvider(provider)
    registrar.setProvider(provider)
    resolver.setProvider(provider)
    w.web3 = new Web3(provider)
    return w.web3
}

function getHello(s) {
    s.hello = '".ddj" ENS '
}

function getAccount(web3) {
    let account = web3.eth.accounts[0]
    console.log(account)
    return account
}

function getAddr(nodeName){
    let node = namehash(nodeName)
    return getResolverInstance(nodeName).then(resolverInstance=>{
        return resolverInstance.addr(node)
    })
}

function getResolverInstance(nodeName){
    let node = namehash(nodeName)
    return getDdjEns().then(ensInstance=>{
        return ensInstance.resolver(node)
    }).then(resolverAddr=>{
        return resolver.at(resolverAddr)
    })
}

function getRegistrarInstance(nodeName){
    let node = namehash(nodeName)
    return getDdjEns().then(ensInstance=>{
        return ensInstance.resolver(node)
    }).then(resolverAddr=>{
        return resolver.at(resolverAddr)
    })
}

function getOwner(nodeName){
    let node = namehash(nodeName)
    return getDdjEns().then(ensInstance=>{
        return ensInstance.owner(node)
    })
}

function getDdjEns(){
    return ens.at("0xf918bb81a6e8dc5ba11c4a1a63c24ebcd805d662")
}

function getDdjRegistrar(){
    return registrar.at("0x664bdd2718237df5f6dfba665a613b42a4b78e26")
}

function register(nodeName, address, account) {
    getDdjRegistrar().then(registrarInstance=>{
        return registrarInstance.register(web3.sha3(nodeName), address, {from: account})
    })
}

angular.module('myApp', [])
    .controller('MyController', function ($scope, $http, $window) {
        let web3 = init($window)
        
        getHello($scope)

        let account = getAccount(web3)
        
        $scope.account = account

        getAddr('y12.ddj').then(addr=>{
            console.log(`y12.ddj addr=${addr}`)
        })

        getOwner('y12.ddj').then(owner=>{
            console.log(`y12.ddj owner=${owner}`)
        })

        getOwner('eth.ddj').then(owner=>{
            console.log(`eth.ddj owner=${owner}`)
        })

        // register('eth', account, account)
})