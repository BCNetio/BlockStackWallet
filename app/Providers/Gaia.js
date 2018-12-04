import { getFile, putFile } from "blockstack";
import { take } from "ramda";
import { generateInitialWalletList } from "./Wallets";
import * as dashbord from "./GaiaDicts/Dashbord";
import * as wlTMPL from "./GaiaTemplates/WalletList";

const PUT_OPTIONS = { encrypt: true };

const GET_OPTIONS = { decrypt: true };

const jsonParse = json => {
  let parsed;
  try {
    parsed = JSON.parse(json);
  } catch (e) {}
  return parsed;
};

export const setWalletList = (walletList = generateInitialWalletList()) =>
  putFile(
    dashbord.WALLET_LIST,
    wlTMPL.walletListTMPL(walletList),
    PUT_OPTIONS
  ).then(() => walletList);

export const initLog = () =>
  putFile(dashbord.DAPPY_LOG, JSON.stringify([]), PUT_OPTIONS).then(() => []);

export const getLogs = () =>
  getFile(dashbord.DAPPY_LOG, GET_OPTIONS)
    .then(json => (json ? jsonParse(json) : null))
    .catch(() => initLog());

export const logEvent = event =>
  getFile(dashbord.DAPPY_LOG, GET_OPTIONS).then(log => {
    const logList = take(29, JSON.parse(log));
    putFile(
      dashbord.DAPPY_LOG,
      JSON.stringify([event, ...logList]),
      PUT_OPTIONS
    );
  });

export const getWalletList = () =>
  getFile(dashbord.WALLET_LIST, GET_OPTIONS).then(json =>
    json ? jsonParse(json) : null
  );
