# Udacity Blockchain Nanodegree Program Project - Star Notary Dapp
This is a project that tests our knowledge to write and deploy a decentralized application on an Ethereum test network -- Rinkeby. This Dapp allows you to register and look up a star.

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites
The following packages are required:
```
node.js
npm
web3
http-server
openzeppelin-solidity
truffle-hdwallet-provider
ganache-cli
```

### Running the tests
You can clone/fork this repo and install all required packages by running ``npm install``

Go to terminal and start Ganache-cli:
``ganache-cli --mnemonic ...``
Please note that I run this command with a flag of mnemonic so I can access the same addressess everytime

In another terminal window, run the truffle test:
```
cd ~/smart_contracts
truffle test
```
You should see a similar result as mine:


### Deploy smart contract on Rinkeby test network
With all tests passed, we can now deploy this smart contract on a public test network. In this case, we use Rinkeby.

At first, we need to compile the contract using truffle:
`` truffle compile``

Secondly, we need to run a deploy command:
``truffle deploy --network rinkeby``

If deployed successfully, you should see a similar result as mine:

In my case, my Star Notary is deployed at
```
Contract Address: 0x1cD8Ade01457216952f2db7325BB8143C364b318
Transaction ID: 0x65b2029d9ab91c708136e6cb51378c072c0a61c98a21ec4fb00e6517c2c8bcb9
```
You can see more details about this contract using Etherscan (Rinkeby version): https://rinkeby.etherscan.io/address/0x1cd8ade01457216952f2db7325bb8143c364b318

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
