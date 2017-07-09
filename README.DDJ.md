### dev.fifs

```
$ sudo npm i -g ethereumjs-testrpc
+ ethereumjs-testrpc@4.0.1
$ sudo npm i -g truffle
+ truffle@3.4.3
$ cd ens && npm i 
$ testrpc
$ truffle migrate --network dev.fifs
```

### ddj tld

* ENS : https://rinkeby.etherscan.io/address/0xf918bb81a6e8dc5ba11c4a1a63c24ebcd805d662
* Registrar : https://rinkeby.etherscan.io/address/0x664bdd2718237df5f6dfba665a613b42a4b78e26

```
// bash
export TEST_MNEMONIC="rinkeby foo bar blah ..."
truffle migrate --network rinkeby --verbose-rpc
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

### ddj test

```
$ truffle compile
$ node ddj.js
dltdojo:ens$ node ddj.js
ENS.owner(namehash('eth.ddj'))= 0x0000000000000000000000000000000000000000
ENS.owner(namehash('y12.ddj'))= 0x7f36a05a8c81d6a89b282b333696e9274b3f43f0
ENS.owner(namehash('ddj'))= 0x664bdd2718237df5f6dfba665a613b42a4b78e26

```