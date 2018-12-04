import axios from "axios";
import { append, reduce, omit, has } from "ramda";
import config from "./config";
import { curNames } from "../AppConfig";
import { toETH } from "./Wallets";
import { normalizeFunctions } from "./HistoryNormalization";
import { config as AppConfig } from "../AppConfig";

const instance = null;

const pathResolvers = {
  history: {
    [curNames.ETH]: "result",
    [curNames.ETC]: "items",
    [curNames.BCH]: "txs",
    [curNames.BTC]: "txs",
    [curNames.LTC]: "txs",
    [curNames.DASH]: "txs",
    [curNames.BTG]: "txs",
    [curNames.DOGE]: "txs"
  }
};

export default class XHRProvider {
  constructor() {
    if (instance !== null) {
      return instance;
    }
  }

  fetchGas = () =>
    axios
      .get("https://www.etherchain.org/api/gasPriceOracle")
      .then(response => response.data)
      .catch(error => console.log(error));

  fetchFee = () =>
    axios
      .get("https://bitcoinfees.earn.com/api/v1/fees/recommended")
      .then(response => response.data)
      .catch(error => console.log(error));

  getCourse = fiat =>
    axios
      .get(`${config.apiChart}pricemulti`, {
        params: {
          fsyms: Array.from(AppConfig.avCurrencyes)
            .map(currency => currency[1].abbr)
            .join(","),
          tsyms: `${fiat},BTC`
        }
      })
      .then(response => response.data)
      .catch(error => console.log(error));

  // TODO Отловить ошибку в попап
  getMarketInfo = pair =>
    axios
      .get(`${config.exchange}marketinfo/${pair}`)
      .then(response => response.data)
      .catch(error => {
        console.log(error);
        return {};
      });

  checkExchange = params =>
    axios
      .post(`${config.exchange}sendamount`, {
        ...params,
        apiKey: config.exchangeApiKeys.public
      })
      .then(response => response.data)
      .catch(error => {
        console.log(error);
        return {};
      });

  checkStatusDeposit = addrDeposit =>
    axios
      .get(`${config.exchange}txStat/${addrDeposit}`)
      .then(response => response.data)
      .catch(error => {
        console.log(error);
      });

  get = params =>
    axios
      .get(`${config.walletType[params.type]}${params.address}`, {
        params: { cors: true },
        crossDomain: true
      })
      .then(response => response)
      .catch(error => {
        console.log(error);
      });

  getWalletInfo = (type, address) =>
    axios
      .get(config.balance(type, address))
      .then(response => config[type].normalizationBlance(response.data));

  normalizeDataForChart = (response, period) => {
    const test = reduce(
      (acc, item) => ({
        labels: append(new Date(item.time * 1000), acc.labels),
        data: append(item.close, acc.data)
      }),
      { labels: [], data: [] },
      response
    );
    return {
      labels: test.labels,
      datasets: [{ data: test.data }]
    };
  };

  getChartApi = ({ currency, period, timestamp, fiat }) => {
    const params = omit(["api"], config.periodsForChart[period]);
    const request = axios
      .get(`${config.apiChart}${config.periodsForChart[period].api}`, {
        params: {
          fsym: currency,
          tsym: fiat,
          ...params,
          toTs: timestamp
        }
      })
      .then(response => this.normalizeDataForChart(response.data.Data, period));
    return request;
  };

  getTotalBalance = (listOfAddresses, course) =>
    Promise.all(
      listOfAddresses.map(wallet =>
        axios
          .get(config[wallet.type].balance(wallet.address))
          .then(response => ({
            wid: wallet.wid,
            type: wallet.type,
            balance: config[wallet.type].normalizationBlance(response.data),
            course: course[wallet.type.toUpperCase()].BTC
          }))
      )
    );

  getUtxo = (type, address) =>
    axios.get(config.utxo(type, address)).then(response => response);

  broadcastTX = (type, rawTx) =>
    axios
      .post(config.broadcastTX(type), { rawtx: rawTx })
      .then(response => response.data);

  broadcastBTCtx = rawTx =>
    axios
      .post(config.broadcastBTCtx, { rawtx: rawTx })
      .then(response => response);

  /* Transaction */
  normalizeData = (data, address, type, method) =>
    data.map(record => method(record, address, type));

  getTransactions = (address, type) =>
    axios
      .get(config.transactionList(type, address))
      .then(response =>
        this.normalizeData(
          response.data[pathResolvers.history[type]],
          address,
          type,
          normalizeFunctions[type]
        )
      );

  getTokenList = (type, address) =>
    axios.get(config[type].tokens(address)).then(response => response.data);
}
