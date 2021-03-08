require('dotenv').config();
const TronGrid = require('trongrid');
const TronWeb = require('tronweb');

const tronWeb = new TronWeb({
    fullHost: process.env.TRON_FULLHOST
})
const fullNode = process.env.TRON_FULLHOST;
const solidityNode = process.env.TRON_SOLIDITYNODE;
const eventServer = process.env.TRON_EVENTSERVER;

function createAddress () {
    const account = tronWeb.createAccount();
    account.then((account) => {
        console.log(account);
// {
//   privateKey: '7814801E0C931A27DA6DF90D6652981CFE8E70B25C54AAA88DFF1D679A555DDA',
//   publicKey: '045065E5178243F9BF8096ECBA6FE2638F16EA8D0CDEE8B886C055A824922B2A6223AE5109F937A896DCEBCEC3C0028042B170ECDAF61CAD74D8D31C5F1C072F9E',
//   address: {
//     base58: 'TGCmUB3brB8JgzSqLb7VJ9TA9yXPwKTET8',
//     hex: '41446143C40AC2726B467490C9B6FAE6F7E309492C'
//   }
// }
        // this.addresses.push(account.address.base58);
    });
}


createAddress();
