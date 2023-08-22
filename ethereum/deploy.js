const HDWalletProvider = require('@truffle/hdwallet-provider');
const { Web3 } = require('web3');
const compiledFactory = require('./build/CampaignFactory.json');

const provider = new HDWalletProvider(
    'purchase unveil movie end finish insect flee blue torch vocal laptop heart',
    // remember to change this to your own phrase!
    'https://sepolia.infura.io/v3/07ba09f85cc347d69e23bfebef30432d'
    // remember to change this to your own endpoint!
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account', accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
        .deploy({ data: compiledFactory.bytecode })
        .send({ gas: '10000000', from: accounts[0] });

    //this is what tell us the address where contract is deployed to
    console.log('Contract deployed to', result.options.address);
    provider.engine.stop();
};
deploy();