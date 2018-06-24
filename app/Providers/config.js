import { addrToBitpayFormat, toBTC, toETHFromWei } from './Wallets';
import { split } from 'ramda';

const apiKeys = {
  etherscan: '',
  blockcypher: ''
};

const config = {
  btc: {
    balance: address => `https://insight.bitpay.com/api/addr/${address}/balance`,
    normalizationBlance: response => toBTC(response),
    tx: address => `https://insight.bitpay.com/api/txs/?address=${address}`,
    utxo: address => `https://insight.bitpay.com/api/addr/${address}/utxo`,
    broadcastTX: () => 'https://insight.bitpay.com/api/tx/send?cors=true',
  },
  bch: {
    balance: address =>
      `https://bch-insight.bitpay.com/api/addr/${addrToBitpayFormat(address)}/balance`,
    normalizationBlance: response => response,
    tx: address => `https://bch-insight.bitpay.com/api/txs/?address=${addrToBitpayFormat(address)}`,
    utxo: address => `https://bch-insight.bitpay.com/api/addr/${addrToBitpayFormat(address)}/utxo`,
    broadcastTX: () => 'https://bch-insight.bitpay.com/api/tx/send?cors=true',
  },
  doge: {
    balance: address => `https://dogechain.info/api/v1/address/balance/${address}`,
    normalizationBlance: response => Number(response.balance),
    tx: address =>
      `https://api.blockcypher.com/v1/doge/main/addrs/${address}/full?token=${apiKeys.blockcypher}`,
    utxo: address => `https://dogechain.info/api/v1/unspent/${address}`,
    broadcastTX: () => 'https://dogechain.info/api/v1/pushtx',
  },
  ltc: {
    balance: address => `https://insight.litecore.io/api/addr/${address}/balance`,
    normalizationBlance: response => toBTC(response),
    tx: address => `https://insight.litecore.io/api/txs/?address=${address}`,
    utxo: address => `https://insight.litecore.io/api/addr/${address}/utxo`,
    broadcastTX: () => 'https://insight.litecore.io/api/tx/send?cors=true',
  },
  zec: {
    balance: address => `https://explorer.testnet.z.cash/api/addr/${address}/balance`,
    normalizationBlance: response => response,
    tx: address => `https://explorer.testnet.z.cash/api/txs/?address=${address}`,
    utxo: address => `https://explorer.testnet.z.cash/api/addr/${address}/utxo`,
    broadcastTX: () => 'https://explorer.testnet.z.cash/api/tx/send?cors=true',
  },
  dcr: {
    balance: address => `https://mainnet.decred.org/api/addr/${address}/balance`,
    normalizationBlance: response => response,
    tx: address => `https://mainnet.decred.org/api/txs/?address=${address}`,
    utxo: address => `https://mainnet.decred.org/api/addr/${address}/utxo`,
    broadcastTX: () => 'https://mainnet.decred.org/api/tx/send',
  },
  dash: {
    balance: address => `https://insight.dash.org/insight-api/addr/${address}/balance`,
    normalizationBlance: response => toBTC(response),
    tx: address => `https://insight.dash.org/insight-api/txs/?address=${address}`,
    utxo: address => `https://insight.dash.org/insight-api/addr/${address}/utxo`,
    broadcastTX: () => 'https://insight.dash.org/insight-api/tx/send',
  },
  btg: {
    balance: address => `https://btgexplorer.com/api/addr/${address}/balance`,
    normalizationBlance: response => toBTC(response),
    tx: address => `https://btgexplorer.com/api//txs/?address=${address}`,
    utxo: address => `https://btgexplorer.com/api/addr/${address}/utxo`,
    broadcastTX: () => 'https://btgexplorer.com/api/tx/send',
  },
  eth: {
    balance: address =>
      `https://api.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=${
        apiKeys.etherscan
      }`,
    normalizationBlance: response => toETHFromWei(Number(response.result)),
    tx: address =>
      `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=asc&apikey=${
        apiKeys.etherscan
      }`,
    tokens: address => `https://api.ethplorer.io/getAddressInfo/${address}/?apiKey=freekey`,
  },
  etc: {
    balance: address => `https://api.gastracker.io/v1/addr/${address}`,
    normalizationBlance: response => response.balance.ether,
    tx: address => `https://api.gastracker.io/v1/addr/${address}/transactions`,
  },
};

config.explorers = {
  btc: 'https://bitcoincash.blockexplorer.com',
  bch: 'https://blockexplorer.com',
};

config.hrefs = {
  btc: {
    transition: 'https://blockexplorer.com/tx/',
    address: 'https://blockexplorer.com/address/',
  },
  bch: {
    transition: 'https://bitcoincash.blockexplorer.com/tx/',
    address: 'https://bitcoincash.blockexplorer.com/address/',
  },
  ltc: {
    transition: 'https://insight.litecore.io/tx/',
    address: 'https://insight.litecore.io/address/',
  },
  dash: {
    transition: 'https://insight.dash.org/insight/tx/',
    address: 'https://insight.dash.org/insight/address/',
  },
  btg: {
    transition: 'https://btgexplorer.com/tx/',
    address: 'https://btgexplorer.com/address/',
  },
  doge: {
    transition: 'https://dogechain.info/tx/',
    address: 'https://dogechain.info/address/',
  },
  eth: {
    transition: 'https://etherscan.io/tx/',
    address: 'https://etherscan.io/address/',
  },
  etc: {
    transition: 'https://gastracker.io/tx/',
    address: 'http://gastracker.io/addr/',
  },
};

config.qr = data => `https://api.qrserver.com/v1/create-qr-code/?data=${data}`;

config.balance = (type, address) => config[type].balance(address);

config.utxo = (type, address) => config[type].utxo(address);

config.broadcastTX = type => config[type].broadcastTX();

config.apiChart = 'https://min-api.cryptocompare.com/data/';

config.exchange = 'https://shapeshift.io/';

config.exchangeApiKeys = {
  public:
    '',
  private:
    '',
};

config.transactionList = (type, address) => config[type].tx(address);

config.periodsForChart = {
  day: { aggregate: 1, limit: 24, api: 'histohour' },
  week: { aggregate: 24, limit: 7, api: 'histohour' },
  month: { aggregate: 1, limit: 30, api: 'histoday' },
  year: { aggregate: 1, limit: 365, api: 'histoday' },
};

export default config;
