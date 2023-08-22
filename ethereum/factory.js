import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0x7A330DA2FfEFF41cf50183cae48484d59695aeE6'
);

export default instance;
