const Web3 = require('web3')
const net = require('net');

const web3 = new Web3('/Users/huypham/huyph/gr1/testnet/node1/geth.ipc', net, {});

const senderAddr = "0x87f8efb7d61ae2d8550079aca2d530c38092c713";
const recipientAddr = "0x4150f19681849abec4905f477e45044832ea2cc1";

let convertObjectToHex = (obj) => {
    const str = JSON.stringify(obj)
    return Buffer.from(str).toString('hex')
}

let convertHexToObject = (hex) => {
    let hexValue = hex;
    if (hexValue.startsWith("0x"))
        hexValue = hexValue.slice(2)

    const decoded = Buffer.from(hexValue, 'hex').toString()
    return JSON.parse(decoded)
}

let createTx = (from, to, value, data) => {
    return {
        from,
        to,
        value,
        data,
        chainId: 111
    }
}

let sendTransation = (tx, password) => {
    return web3.eth.personal.sendTransaction(tx, password)
}

let getTransaction = (txHash) => {
    return web3.eth.getTransaction(txHash)
}

let storeData = (obj) => {
    const encode = "0x" + convertObjectToHex(obj);
    const transaction = createTx(senderAddr, recipientAddr, 0, encode);
    return sendTransation(transaction, "1234")
}

let decodeTransactionInput = (tx) => {
    let { input } = tx
    return convertHexToObject(input)
}

let retrivedata = (txHash) => {
    let txHashValue = txHash
    if (!txHashValue.startsWith("0x"))
        txHashValue = "0x" + txHashValue

    return getTransaction(txHash)
        .then(tx => {
            if (!tx)
                throw { message: "Invalid transaction hash" }
            return decodeTransactionInput(tx)
        })
        .catch(err => { throw err; })
}

module.exports = {
    storeData,
    retrivedata
}
