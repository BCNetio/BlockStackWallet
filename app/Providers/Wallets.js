import * as bitcoin from 'bitcoinjs-lib';
import * as bch from 'bitcoincashjs';
import { v4 } from 'uuid';
import * as eth from 'ethereumjs-wallet';
import * as ethUtil from 'ethereumjs-util';
import { compose, take, head, reduce } from 'ramda';
import { generateMnemonic } from 'bip39';
import { config, curNames } from '../AppConfig';

const Web3 = require('web3');

const abi = require('human-standard-token-abi');

const EthereumTx = require('ethereumjs-tx');

const createBuf = str => new Buffer(str);

const mkBCHpk = compose(bch.crypto.BN.fromBuffer, bch.crypto.Hash.sha256, createBuf);

export const toSatoshi = btc => btc * 100000000;

export const toBTC = satoshi => satoshi / 100000000;

export const toFiat = (value, course) => (value * course).toFixed(2);

export const toETH = gWei => gWei / 10000000000;

export const toGwei = v => v * 1000000000;

export const toETHFromWei = wei => wei / 1000000000000000000;

export const feeToETH = gasPrise => toETH(gasPrise) + 21000;

export const feeToETHToken = gasPrise => toETH(gasPrise) + 200000;

export const calculateTotalBalance = (walletBalanceList) => {
  const convertedBalances = walletBalanceList.map(
    walletInfo => walletInfo.balance * walletInfo.course.toFixed(10),
  );
  return reduce((balance, acc) => acc + balance, 0, convertedBalances).toFixed(6);
};

export const addrToBitpayFormat = (address) => {
  const bchAdr = new bch.Address(address);
  const format = bch.Address.BitpayFormat;
  return bchAdr.toString(format);
};

export const addrToBCHFormat = (address) => {
  const bchAdr = new bch.Address(address);
  const format = bch.Address.CashAddrFormat;
  return bchAdr.toString(format);
};

const generateRandomPair = type => `${config.avCurrencyes.get(type).name} ${take(2, generateMnemonic().split(' ')).join(
    '-',
  )}`;

export const btcLikeTransaction = (pKey, utxo, listOfReceivers, type) => {
  const rootKey = bitcoin.ECPair.fromWIF(pKey, config.networks[type]);
  const tx = new bitcoin.TransactionBuilder(config.networks[type]);
  const utxoArray = utxo.unspent_outputs ? utxo.unspent_outputs : utxo;
  if (type === curNames.DOGE) {
    utxoArray.forEach((item) => {
      tx.addInput(item.tx_hash, item.tx_output_n);
    });
  } else {
    utxoArray.forEach((item) => {
      tx.addInput(item.txid, item.vout);
    });
  }

  listOfReceivers.forEach(({ key, amount }) => {
    tx.addOutput(key, parseInt(amount, 10));
  });

  utxoArray.forEach((item, index) => {
    tx.sign(index, rootKey);
  });

  return tx.build().toHex();
};

export const bchTransaction = (pKey, utxo, listOfReceivers) => {
  const pk = new bch.PrivateKey(pKey);
  const tx = bch.Transaction().from(utxo.map(_ => ({ ..._, address: pk.toAddress().toString() })));
  listOfReceivers.forEach(receiver => tx.to(receiver.key, toSatoshi(receiver.amount)));
  tx.sign(pk);
  return tx.toString();
};

export const getEthLikeNonce = ({ type, address }) => {
  const node = config.nodes.get(type) ? config.nodes.get(type) : config.nodes.get(curNames.ETH);
  const web3P = new Web3(new Web3.providers.HttpProvider(node));
  return web3P.eth.getTransactionCount(address);
};

export const etcTransaction = (pKey, actualNonce, listOfReceivers, type, gasPrice, gasLimit) => {
  const web3P = new Web3(new Web3.providers.HttpProvider(config.nodes.get(type)));
  const tx = new EthereumTx({
    from: pKey,
    nonce: web3P.utils.toHex(actualNonce),
    to: head(listOfReceivers).key,
    value: web3P.utils.toHex(
      web3P.utils.toWei(head(listOfReceivers).amount.toString(), 'ether').toString(),
    ),
    gasLimit: web3P.utils.toHex(gasLimit.toString()),
    gasPrice: web3P.utils.toHex(gasPrice.toString()),
  });
  tx.sign(ethUtil.toBuffer(pKey));
  return web3P.eth.sendSignedTransaction(`0x${tx.serialize().toString('hex')}`);
};

export const ethTransaction = (pKey, actualNonce, listOfReceivers, type, gasPrice, gasLimit) => {
  const web3P = new Web3(new Web3.providers.HttpProvider(config.nodes.get(type)));
  const tx = new EthereumTx({
    from: pKey,
    nonce: web3P.utils.toHex(actualNonce),
    to: head(listOfReceivers).key,
    value: web3P.utils.toHex(
      web3P.utils.toWei(head(listOfReceivers).amount.toString(), 'ether').toString(),
    ),
    gasLimit: web3P.utils.toHex(gasLimit.toString()),
    gasPrice: web3P.utils.toHex(toGwei(gasPrice).toString()),
  });
  tx.sign(ethUtil.toBuffer(pKey));
  return web3P.eth.sendSignedTransaction(`0x${tx.serialize().toString('hex')}`);
};

const ethTokenTransaction = (wallet, actualNonce, listOfReceivers, type, gasPrice, gasLimit) => {
  const web3P = new Web3(new Web3.providers.HttpProvider(config.nodes.get(curNames.ETH)));
  const tokenContract = new web3P.eth.Contract(abi, wallet.token.tokenInfo.address, { from: wallet.address });
  const tx = new EthereumTx({
    from: wallet.address,
    nonce: web3P.utils.toHex(actualNonce),
    to: wallet.token.tokenInfo.address,
    value: '0x0',
    gasLimit: web3P.utils.toHex(gasLimit),
    gasPrice: web3P.utils.toHex(gasPrice),
    data: tokenContract.methods.transfer(head(listOfReceivers).key, web3P.utils.toHex(
      web3P.utils.toWei((head(listOfReceivers).amount * 10 ** wallet.token.tokenInfo.decimals).toString(), 'ether').toString(),
    )).encodeABI(),
  });
  tx.sign(ethUtil.toBuffer(wallet.privateKey));
  return web3P.eth.sendSignedTransaction(`0x${tx.serialize().toString('hex')}`);
};

export const generateBTCLikeWallet = (type, keychain = v4()) => {
  const keyPair = new bitcoin.ECPair.makeRandom({ network: config.networks[type] });
  return {
    privateKey: keyPair.toWIF(),
    address: keyPair.getAddress(),
    wid: v4(),
    alias: generateRandomPair(type),
    type,
    created: new Date(),
    readOnly: false,
    balance: 0,
  };
};

export const generateBCHWallet = (keychain = v4()) => {
  const pk = new bch.PrivateKey(mkBCHpk(keychain));
  return {
    privateKey: pk.toWIF(),
    address: pk.toAddress().toString(),
    wid: v4(),
    alias: generateRandomPair(curNames.BCH),
    type: curNames.BCH,
    created: new Date(),
    readOnly: false,
    balance: 0,
  };
};

export const generateETHWallet = (keychain = v4()) => {
  const pk = eth.generate();
  return {
    privateKey: pk.getPrivateKeyString(),
    address: pk.getAddressString(),
    wid: v4(),
    alias: generateRandomPair(curNames.ETH),
    type: curNames.ETH,
    created: new Date(),
    readOnly: false,
    balance: 0,
  };
};

export const generateETCWallet = (keychain = v4()) => {
  const pk = eth.generate();
  return {
    privateKey: pk.getPrivateKeyString(),
    address: pk.getAddressString(),
    wid: v4(),
    alias: generateRandomPair(curNames.ETC),
    type: curNames.ETC,
    created: new Date(),
    readOnly: false,
    balance: 0,
  };
};

export const recoverETHWallet = WIF => ({
  privateKey: WIF,
  address: eth
    .fromPrivateKey(ethUtil.toBuffer(/^0x.*?$/.test(WIF) ? WIF : `0x${WIF}`))
    .getAddressString(),
  wid: v4(),
  alias: generateRandomPair(curNames.ETH),
  type: curNames.ETH,
  created: new Date(),
  readOnly: false,
});

export const recoverETCWallet = WIF => ({
  privateKey: WIF,
  address: eth
    .fromPrivateKey(ethUtil.toBuffer(/^0x.*?$/.test(WIF) ? WIF : `0x${WIF}`))
    .getAddressString(),
  wid: v4(),
  alias: generateRandomPair(curNames.ETC),
  type: curNames.ETC,
  created: new Date(),
  readOnly: false,
});

export const recoverBTCLikeWallet = (WIF, type) => ({
  privateKey: WIF,
  address: bitcoin.ECPair.fromWIF(WIF, config.networks[type]).getAddress(),
  wid: v4(),
  alias: generateRandomPair(type),
  type,
  created: new Date(),
  readOnly: false,
});

export const recoverBCHWallet = WIF => ({
  privateKey: WIF,
  address: new bch.PrivateKey(WIF).toAddress().toString(),
  wid: v4(),
  type: curNames.BCH,
  alias: generateRandomPair(curNames.BCH),
  created: new Date(),
  readOnly: false,
});

export const transactionByType = new Map([
  [curNames.BTC, btcLikeTransaction],
  [curNames.BCH, bchTransaction],
  [curNames.LTC, btcLikeTransaction],
  [curNames.DOGE, btcLikeTransaction],
  [curNames.LTC, btcLikeTransaction],
  [curNames.DASH, btcLikeTransaction],
  [curNames.BTG, btcLikeTransaction],
  [curNames.ETH, ethTransaction],
  [curNames.ETC, etcTransaction],
  ['token', ethTokenTransaction],
]);

const recoverDict = new Map([
  [curNames.BTC, recoverBTCLikeWallet],
  [curNames.LTC, recoverBTCLikeWallet],
  [curNames.DOGE, recoverBTCLikeWallet],
  [curNames.LTC, recoverBTCLikeWallet],
  [curNames.DASH, recoverBTCLikeWallet],
  [curNames.BTG, recoverBTCLikeWallet],
  [curNames.BCH, recoverBCHWallet],
  [curNames.ETH, recoverETHWallet],
  [curNames.ETC, recoverETCWallet],
]);

const walletDict = new Map([
  [curNames.BTC, generateBTCLikeWallet],
  [curNames.BCH, generateBCHWallet],
  [curNames.ETH, generateETHWallet],
  [curNames.ETC, generateETCWallet],
  [curNames.LTC, generateBTCLikeWallet],
  [curNames.DASH, generateBTCLikeWallet],
  [curNames.BTG, generateBTCLikeWallet],
  [curNames.DOGE, generateBTCLikeWallet],
  [curNames.LTC, generateBTCLikeWallet],
]);

export const generateInitialWalletList = () =>
  Array.from(walletDict).map(currency => currency[1](currency[0]));

export const walletGenerator = (typeList, keychain) =>
  typeList
    .map(currency => walletDict.get(currency))
    .filter(currency => currency)
    .map((generator, idx) => generator(typeList[idx], keychain));

export const recoverWallet = (wType, pKey) => recoverDict.get(wType)(pKey, wType);
