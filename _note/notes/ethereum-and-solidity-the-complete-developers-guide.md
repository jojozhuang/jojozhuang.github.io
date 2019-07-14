---
layout: tutorial
key: note
title: "Ethereum and Solidity: The Complete Developer's Guide(Draft)"
index: 9141
subcategory: notes
date: 2017-08-02
tags: [Block Chain, Digital Currency]
---

> Learn Block Chain, Digital Currency and Ethereum.

Course Link on Udemy:
https://www.udemy.com/ethereum-and-solidity-the-complete-developers-guide
Source codes for this course:
https://github.com/StephenGrider/EthereumCasts

Link to Original Bitcoin White Paper
In case you're interested, here are links to the original Bitcoin and Ethereum White Papers.
Bitcoin: A Peer-to-Peer Electronic Cash System (https://bitcoin.org/bitcoin.pdf)
Ethereum: The Ultimate Smart Contract and Decentralized Application Platform (http://web.archive.org/web/20131228111141/http://vbuterin.com/ethereum.html)

web3.js(for developer), Metamask(for customer)

Metamask: Account Address, Public Key, Private Key
Transaction: nonce, to, value, gasPrice, startGas/gasLimit, v/r/s

Demo of blockchain: https://anders.com/blockchain/block.html
Ethereum BlockTime History: https://etherscan.io/chart/blocktime

Contract Account Fields: balance, storage, code.

Solidity Programming Language
http://remix.ethereum.org/
First contract.
```javascript
pragma solidity ^0.4.17;

contract Inbox {
    string public message;

    function Inbox(string initialMessage) public {
        message = initialMessage;
    }

    function setMessage(string newMessage) public {
        message = newMessage;
    }

    function getMessage() public view returns (string) {
        return message;
    }
}
```
Get message.
![image](/public/images/note/9141/firstcontract.png)
Set message.
![image](/public/images/note/9141/setmessage.png)

* getMessage method is duplicated, since variable message is public, we can access it to get the message.
* getMessage has not cost. However, setMessage costs. After calling set method, ETH of your account is reduced.

1 ETH = 1,000,000,000,000,000,000 Wei.
https://etherconverter.online/

Gas and Transaction
gasPrice, gasLimit

Mnemonic Phrases:
12 words -> BIP39 mnemonic Algorithm -> Account1, Account2, ...
Mnemonic Code Converter: https://iancoleman.io/bip39/

Get more ether.
rinkeby-faucet.com
https://faucet.rinkeby.io/
plus.google.com

Boilerplate Design

Syntax Highlighters
Section 2, Lecture 32
Links to syntax highlighters are below.  Remember that syntax highlighting for Solidity code isn't strictly required, and we won't be writing a lot of Solidity inside our editor.  With that in mind, if you run into any installation issues I'd recommend continuing on rather than trying to troubleshoot it.

Atom - https://atom.io/packages/language-ethereum
Open the package installation manager in atom and search for 'language-ethereum'.  After installing the package, you might have to manually change the highlighter in the .sol file.  Look for the selector at the bottom right of your editor window.
Sublime - https://packagecontrol.io/packages/Ethereum
VSCode - https://github.com/juanfranblanco/vscode-solidity
Webstorm - https://plugins.jetbrains.com/plugin/9475-intellij-solidity
VIM - https://github.com/tomlion/vim-solidity


## Project File Walkthrough
```sh
npm install solc --save
```

```javascript
const path = require('path');
const fs = require('fs');
const solc = require('solc')

const inboxPath = path.resolve(__dirname,'contracts','Inbox.sol');
const source = fs.readFileSync(inboxPath, 'utf8');

console.log(solc.compile(source, 1));
```
Compile.
```sh
node compile.js
```

```sh
npm install mocha ganache-cli web3@1.0.0-beta.26 --save
```

Mocha Function: it, describe, before each.
Create file test/Inbox.test.js.
```javascript
const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3'); // W is capitalized

const web3 = new Web3(ganache.provider());

class Car {
    pack() {
        return 'stopped';
    }

    drive() {
        return 'vroom';
    }
}

describe('Car',() => {
    it('can park', () => {
        const car = new Car();
        assert.equal(car.pack(), 'stopped');
    });
});
```
update package.json
```javascript
"scripts": {
   "test": "mocha"
 },
```
run test.
```sh
npm run test
```
output
```sh
> mocha



  Car
    ✓ can park


  1 passing (16ms)
```

Fetch Accounts from Ganache
```javascript
const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3'); // W is capitalized

const web3 = new Web3(ganache.provider());

beforeEach(() => {
    // Get a list of all accounts
    web3.eth.getAccounts().then(fetchedAccounts => {
        console.log(fetchedAccounts);
    });

    // Use one of those accounts to deploy the contract
});

describe('Inbox', () => {
    it('deploys a contract', () => {});
});
```
run test.
```sh
npm run test
```
output
![image](/public/images/note/9141/ganacheaccounts.png)
```sh
> mocha



  Inbox
    ✓ deploys a contract


  1 passing (18ms)

[ '0x2b6786957F2c977D4dDE8D48007D7d64ED086BAb',
  '0x40d8a086f4670628F54708425ED94CcbA7b62220',
  '0x36aA9E1B0DAaAbA2DBb9918E8eD970344c9aB648',
  '0xBA443058049760a4828583C53Ad4A8DF05e9b65D',
  '0x46c07333171b367961A7B88C01EcD54BEf42cECa',
  '0x1A4f6DCEa7cC8AB38e818658164491EC0CE6BaE8',
  '0xf8D710f4C690efF4315d91320A283F7423Ef4343',
  '0x20EA3e36a4b7cD599D37Ba5591ef88CEabe71E2B',
  '0xf76d59434DbB94E7c6A2Bf1B39E7f745Ac822812',
  '0x7DEa0d27eCc59fce83b524720A97972554EAc0dd']
```
Async.
```javascript
const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3'); // W is capitalized

const web3 = new Web3(ganache.provider());

let accounts;
beforeEach(async() => {
    // Get a list of all accounts
    accounts = await web3.eth.getAccounts();

    // Use one of those accounts to deploy the contract
});

describe('Inbox', () => {
    it('deploys a contract', () => {
        console.log(accounts);
    });
});
```
![image](/public/images/note/9141/ganacheaccountsasync.png)

Deployment with Web3
```javascript
const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3'); // W is capitalized

const web3 = new Web3(ganache.provider());
const {interface, bytecode} = require ('../compile');

let accounts;
let inbox;

beforeEach(async() => {
    // Get a list of all accounts
    accounts = await web3.eth.getAccounts();

    // Use one of those accounts to deploy the contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({data: bytecode, arguments: ['Hi, there!']})
        .send({from: accounts[0], gas: '1000000'})

});

describe('Inbox', () => {
    it('deploys a contract', () => {
        console.log(inbox);
    });
});
```
![image](/public/images/note/9141/deploywithweb3.png)

45. Deployed Inbox Overview
Asserting Deployment
```javascript
describe('Inbox', () => {
    it('deploys a contract', () => {
        assert.ok(inbox.options.address);
    });
});
```
![image](/public/images/note/9141/deploymentassert.png)

50. Deployment with Infura
Register on https://infura.io/.
```sh
npm install truffle-hdwallet-provider --save
```
https://rinkeby.etherscan.io/

54. Deployment to Rinkeby
```sh
Johnny@Johnny-Mac:~$ node deploy.js
Attempting to deploy from account 0xC0413358d6C103f0cdf7f50BA8EEf83bBDA70051
Contract deployed to 0x672DBd70e0E4AD5FB59f1B1269535cB03f06Eb8A
```
If you get this Error: insufficient funds for gas * price + value, go to http://rinkeby-faucet.com/ to request more eth.
Find you contract.
https://rinkeby.etherscan.io/address/0xc0413358d6c103f0cdf7f50ba8eef83bbda70051
![image](/public/images/note/9141/findcontract.png)

55. Deployed Contracts in remix
![image](/public/images/note/9141/deployedcontract.png)

56.

## Source Files
* [Fist Smart Contract](https://github.com/jojozhuang/Note/tree/master/EthereumSolidity/SmartContract)

## Reference
* [truffle-hdwallet-provider](https://github.com/trufflesuite/truffle-hdwallet-provider)
