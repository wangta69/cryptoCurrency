require('dotenv').config();
const TronGrid = require('trongrid');
const TronWeb = require('tronweb');

const tronWeb = new TronWeb({
    fullHost: process.env.TRON_FULLHOST
})
const fullNode = process.env.TRON_FULLHOST;
const solidityNode = process.env.TRON_SOLIDITYNODE;
const eventServer = process.env.TRON_EVENTSERVER;


// const tronWeb = new TronWeb(
//     fullNode,
//     solidityNode,
//     eventServer
//     // privateKey
// );

const tronGrid = new TronGrid(tronWeb);
tronWeb.plugin.register(TronGrid, {experimental: null});


/**
 * 출금처리 (사용자한테 보내는 것과 mainaddress로 이동하는 것)
 * 관리자 요청시 출금 처리한다.
 * @param amount : 1trx = 1000000 으로 전송시 계산하여 보낼것
 */
 const sendTrx = async(toAddress, amount, fromAddress, privateKey) => {
    // amount = amount * 1000000;
    const tronWeb = new TronWeb(
        fullNode,
        solidityNode,
        eventServer,
        privateKey
    );

    // console.log('sendTrx', toAddress, amount, fromAddress, privateKey);

    const tradeobj = await tronWeb.transactionBuilder.sendTrx(
        toAddress,
        amount,
        fromAddress
    );

    console.log(tradeobj);

    const signedtxn = await tronWeb.trx.sign(
        tradeobj,
        privateKey
    );
    const receipt = await tronWeb.trx.sendRawTransaction(
        signedtxn
    );
    // console.log('- Output:', receipt, '\n');
    return receipt;
 };



/**
 * amount = TRX 단위이므로 1 * 1000000 하여 처리한다.
 */
sendToAddress = function(to, amount, from, privateKey, callback) {
//    const transAmount = amount * 1000000;tronWeb.toSun(1)
    const transAmount = tronWeb.toSun(amount);


    sendTrx(to, transAmount, from, privateKey).then((receipt) => {
        if (receipt.result === true) {
            const param = {from, to, amount: (amount), txid: receipt.txid};
            callback(null, param);
            // 아래 두 부분은 PHP에서 콜백 받아서 처리
            // 1. insert to transaction_trx
            // 2. update withdrawals
        }
    }, (error) => {
        console.error(error);
        callback(error)
        // class org.tron.core.exception.ContractValidateException : Validate TransferContract error, balance is not sufficient.
    });
}


sendToAddress('TLw4qvqR1bjFTjRQzeSA1XPREQLWArLQVn', 1, 'TGCmUB3brB8JgzSqLb7VJ9TA9yXPwKTET8', '7814801E0C931A27DA6DF90D6652981CFE8E70B25C54AAA88DFF1D679A555DDA', function(error, result){
    if (error) {
        console.log(error);
    }

    console.log(result);
});
