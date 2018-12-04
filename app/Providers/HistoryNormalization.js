import {
  filter,
  find,
  gt,
  lensPath,
  map,
  view,
  reduce,
  append,
  split
} from "ramda";
import { curNames } from "../AppConfig";
import config from "./config";
import {
  addrToBitpayFormat,
  toETHFromWei,
  convertCashAddrFormatToBTC,
  toBTC,
  addrToBCHFormat
} from "./Wallets";

const monthNames = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec"
];

const lessThenTen = v => (parseInt(v, 10) < 10 ? `0${v}` : v.toString());

const tsToReadableDate = timestamp => {
  const d = new Date(timestamp * 1000);
  return `${lessThenTen(d.getHours())}:${lessThenTen(
    d.getMinutes()
  )},  ${d.getDate()} ${monthNames[d.getMonth()]} ${d.getFullYear()} `;
};

const lensVout = lensPath(["scriptPubKey", "addresses", 0]);

const calculateSentValue = (vout, address, fee) =>
  reduce(
    (acc, el) => (address !== view(lensVout, el) ? +el.value + acc : acc),
    fee,
    vout
  ).toFixed(8);

const valueFindOut = (vout, address) =>
  find(el => address === view(lensVout, el))(vout).value;

const focusTxHref = currencyName =>
  view(lensPath(["hrefs", currencyName]), config);

const normalizeFuncForInsightApi = (record, address, wtype) => {
  const hrefs = focusTxHref(wtype);
  const type =
    filter(vin => vin.addr === address, record.vin).length !== 0
      ? "sent"
      : "received";
  return {
    type,
    time: tsToReadableDate(record.time),
    value:
      type === "sent"
        ? calculateSentValue(record.vout, address, record.fees)
        : valueFindOut(record.vout, address),
    info: {
      status: gt(record.confirmations, 0) ? "Success" : "Unconfirmed",
      confirmations: record.confirmations,
      hash: { href: `${hrefs.transition}${record.txid}`, hash: record.txid },
      from: [
        {
          href: `${hrefs.address}${record.vin[0].addr}`,
          address: record.vin[0].addr
        }
      ],
      to: [
        {
          href: `${hrefs.address}${view(lensVout, record.vout[0])}`,
          address: view(lensVout, record.vout[0])
        }
      ],
      fee: record.fees
    }
  };
};

export const normalizeFunctions = {
  [curNames.BTC]: normalizeFuncForInsightApi,
  [curNames.LTC]: normalizeFuncForInsightApi,
  [curNames.BTG]: normalizeFuncForInsightApi,
  [curNames.DASH]: normalizeFuncForInsightApi,
  [curNames.DOGE]: (record, address) => {
    const hrefs = focusTxHref(curNames.DOGE);
    const receive = record.outputs.find(el => el.addresses[0] === address);
    const type =
      filter(inputs => inputs.addresses[0] === address, record.inputs)
        .length !== 0
        ? "sent"
        : "received";
    return {
      type,
      time: tsToReadableDate(new Date(record.received) / 1000),
      value:
        type === "sent"
          ? toBTC(calculateSentValue(record.outputs, address, record.fees))
          : toBTC(receive.value),
      info: {
        status: gt(record.confirmations, 0) ? "Success" : "Unconfirmed",
        confirmations: record.confirmations,
        hash: { href: `${hrefs.transition}${record.hash}`, hash: record.hash },
        from: record.inputs.map(input => ({
          href: `${hrefs.address}${input.addresses[0]}`,
          address: input.addresses[0]
        })),
        to: record.outputs.map(output => ({
          href: `${hrefs.address}${output.addresses[0]}`,
          address: output.addresses[0]
        })),
        fee: toBTC(record.fees)
      }
    };
  },

  [curNames.BCH]: (record, address) => {
    const addrInBCHFormat = split(":", addrToBCHFormat(address))[1];
    const hrefs = focusTxHref(curNames.BCH);
    const type =
      filter(vin => vin.addr === addrInBCHFormat, record.vin).length !== 0
        ? "sent"
        : "received";
    return {
      type,
      time: tsToReadableDate(record.time),
      value:
        type === "sent"
          ? calculateSentValue(record.vout, addrInBCHFormat, record.fees)
          : valueFindOut(record.vout, addrInBCHFormat),
      info: {
        status: gt(record.confirmations, 0) ? "Success" : "Unconfirmed",
        confirmations: record.confirmations,
        hash: { href: `${hrefs.transition}${record.txid}`, hash: record.txid },
        from: [
          {
            href: `${hrefs.address}${record.vin[0].addr}`,
            address: record.vin[0].addr
          }
        ],
        to: [
          {
            href: `${hrefs.address}${view(lensVout, record.vout[0])}`,
            address: view(lensVout, record.vout[0])
          }
        ],
        fee: record.fees
      }
    };
  },
  [curNames.ETH]: (record, address) => {
    const hrefs = focusTxHref(curNames.ETC);
    const toGWei = gas => gas / 1000000000;
    return {
      value: toETHFromWei(record.value),
      type: record.from === address ? "sent" : "received",
      time: tsToReadableDate(record.timeStamp),
      info: {
        confirmations: record.confirmations,
        from: Array.isArray(record.from)
          ? { address: record.from, href: "" }
          : [{ address: record.from, href: `${hrefs.address}${record.from}` }],
        to: Array.isArray(record.to)
          ? record.to
          : [{ address: record.to, href: `${hrefs.address}${record.to}` }],
        hash: { href: `${hrefs.transition}${record.hash}`, hash: record.hash },
        status: gt(record.confirmations, 0) ? "Success" : "Unconfirmed",
        gasPrice: toGWei(record.gasPrice),
        gasLimit: record.gas,
        nonce: record.nonce
      }
    };
  },
  [curNames.ETC]: (record, address) => {
    const hrefs = focusTxHref(curNames.ETC);
    return {
      value: record.value.ether,
      type: record.from.toLowerCase() === address ? "sent" : "received",
      time: tsToReadableDate(new Date(record.timestamp) / 1000),
      info: {
        confirmations: record.confirmations,
        from: Array.isArray(record.from)
          ? { address: record.from, href: "" }
          : [{ address: record.from, href: `${hrefs.address}${record.from}` }],
        to: Array.isArray(record.to)
          ? record.to
          : [{ address: record.to, href: `${hrefs.address}${record.to}` }],
        hash: { href: `${hrefs.transition}${record.hash}`, hash: record.hash },
        status: gt(record.confirmations, 0) ? "Success" : "Unconfirmed",
        gasPrice: "-",
        gasLimit: "-",
        nonce: "-"
      }
    };
  }
};
