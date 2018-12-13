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

![test](https://github.com/chuanqin3/Udacity-Blockchain-Ethereum-Project/blob/master/img/test.png)

### Deploy smart contract on Rinkeby test network
With all tests passed, we can now deploy this smart contract on a public test network. In this case, we use Rinkeby.

At first, we need to compile the contract using truffle:
`` truffle compile``

Secondly, we need to run a deploy command:
``truffle deploy --network rinkeby``

If deployed successfully, you should see a similar result as mine:

![deploy](https://github.com/chuanqin3/Udacity-Blockchain-Ethereum-Project/blob/master/img/deploy2.png)

In my case, my Star Notary is deployed at
```
Contract Address: 0xd56eccb93995c35159921044a64683531d85c0d2
Transaction ID: 0x79e39a2001bd4c98b25680cd7f4f0855d8048a6c6083f7582266e2f0134410b3
```
You can see more details about this contract using Etherscan (Rinkeby version): https://rinkeby.etherscan.io/address/0xd56eccb93995c35159921044a64683531d85c0d2

### Interact with the smart contract on Rinkeby
You can interact with this contract using a simple website. In your terminal, start the `http-server`:
```
cd <Project folder>
http-server
```
There are two links, and I personally use the second one:
```
http://127.0.0.1:8080
http://192.168.1.3:8080
```

After you open this website on your browser, you should see:
![webpage](https://github.com/chuanqin3/Udacity-Blockchain-Ethereum-Project/blob/master/img/webpage.png)

Then you can interact with the website (make sure you log on the Metamask at first!), as shown below:
![webpage](https://github.com/chuanqin3/Udacity-Blockchain-Ethereum-Project/blob/master/img/webpage2.png)

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
