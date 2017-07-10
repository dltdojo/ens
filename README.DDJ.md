## Addresses

* ENS : https://rinkeby.etherscan.io/address/0xf918bb81a6e8dc5ba11c4a1a63c24ebcd805d662
* FIFSRegistrar : https://rinkeby.etherscan.io/address/0x664bdd2718237df5f6dfba665a613b42a4b78e26
* PublicResolver : https://rinkeby.etherscan.io/address/0xccd16a2c1f623476f439975f5bad4fdd685aafb7

### truffle test on dev.fifs 

```
$ sudo npm i -g ethereumjs-testrpc
+ ethereumjs-testrpc@4.0.1
$ sudo npm i -g truffle
+ truffle@3.4.3
$ cd ens && npm i 
$ testrpc
$ truffle migrate --network dev.fifs
```

### Deploy ENS/FIFSRegister


```
$ export TEST_MNEMONIC="rinkeby foo bar blah ..."
$ truffle migrate --network rinkeby --verbose-rpc
// Windows
// $env:TEST_MNEMONIC="rinkeby foo bar blah ..." ; truffle migrate --network rinkeby --verbose-rpc

Compiling ./contracts/AbstractENS.sol...
Compiling ./contracts/HashRegistrarSimplified.sol...
Compiling ./contracts/ResolverInterface.sol...
Writing artifacts to ./build/contracts

Using network 'rinkeby'.

Running migration: 1_initial_migration.js
  Replacing Migrations...
  Migrations: 0x786b2e73a42243757e63fea4eea35f0aaf2eb45f
Saving successful migration to network...
Saving artifacts...
Running migration: 2_deploy_contracts.js
  Deploying ENS...
  ENS: 0xf918bb81a6e8dc5ba11c4a1a63c24ebcd805d662
  Deploying FIFSRegistrar...
  FIFSRegistrar: 0x664bdd2718237df5f6dfba665a613b42a4b78e26
Saving successful migration to network...
Saving artifacts...
```
### Deploy PublicResolver

```
$ truffle compile
$ truffle migrate --network rinkeby
Compiling ./contracts/AbstractENS.sol...
Compiling ./contracts/HashRegistrarSimplified.sol...
Compiling ./contracts/ResolverInterface.sol...
Writing artifacts to ./build/contracts

Using network 'rinkeby'.

Running migration: 3_deploy_resolver..js
  Deploying PublicResolver...
  PublicResolver: 0xccd16a2c1f623476f439975f5bad4fdd685aafb7
Saving successful migration to network...
Saving artifacts...
```

### y12.ddj test

```
$ truffle compile
$ export TEST_MNEMONIC="rinkeby foo bar blah ..."
$ node ddj.js
ENS.owner(namehash('y12.ddj'))= 0x7f36a05a8c81d6a89b282b333696e9274b3f43f0
ENS.resolver(namehash('y12.ddj'))= 0xccd16a2c1f623476f439975f5bad4fdd685aafb7
ENS.owner(namehash('ddj'))= 0x664bdd2718237df5f6dfba665a613b42a4b78e26
ENS.owner(namehash('eth.ddj'))= 0x0000000000000000000000000000000000000000
Resolver.addr(namehash('y12.ddj'))= 0x7f36a05a8c81d6a89b282b333696e9274b3f43f0
```