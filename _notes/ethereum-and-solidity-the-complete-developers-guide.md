---
layout: note
key: note
title: "Ethereum and Solidity: The Complete Developer's Guide"
index: 301
category: tools
---

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
![image](/public/notes/ethereum-and-solidity-the-complete-developers-guide/firstcontract.png)
Set message.
 ![image](/public/notes/ethereum-and-solidity-the-complete-developers-guide/setmessage.png)

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
