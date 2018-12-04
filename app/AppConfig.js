export const curNames = {
  BTC: "btc",
  BCH: "bch",
  ETH: "eth",
  ETC: "etc",
  DOGE: "doge",
  LTC: "ltc",
  DASH: "dash",
  BTG: "btg"
};

export const config = {};

config.bsNodeProfile = "https://browser.blockstack.org/profiles";

config.avCurrencyes = new Map([
  [curNames.BTC, { name: "Bitcoin", abbr: "BTC", sysName: curNames.BTC }],
  [curNames.BCH, { name: "Bitcoin cash", abbr: "BCH", sysName: curNames.BCH }],
  [curNames.ETH, { name: "Ethereum", abbr: "ETH", sysName: curNames.ETH }],
  [
    curNames.ETC,
    { name: "Ethereum classic", abbr: "ETC", sysName: curNames.ETC }
  ],
  [curNames.DOGE, { name: "Dogecoin", abbr: "DOGE", sysName: curNames.DOGE }],
  [curNames.LTC, { name: "Litecoin", abbr: "LTC", sysName: curNames.LTC }],
  [curNames.DASH, { name: "Dash", abbr: "DASH", sysName: curNames.DASH }],
  [curNames.BTG, { name: "Bitcoin Gold", abbr: "BTG", sysName: curNames.BTG }]
]);

config.nodes = new Map([[curNames.ETH, ""], [curNames.ETC, ""]]);

config.networks = {
  [curNames.LTC]: {
    messagePrefix: "\x19Litecoin Signed Message:\n",
    bip32: {
      public: 0x019da462,
      private: 0x019d9cfe
    },
    pubKeyHash: 0x30,
    scriptHash: 0x32,
    wif: 0xb0
  },
  [curNames.DCR]: {
    messagePrefix: "\x18Bitcoin Signed Message:\n",
    bech32: "dc",
    bip32: {
      public: 0x0488b21e,
      private: 0x0488ade4
    },
    pubKeyHash: 0x00,
    scriptHash: 0x05,
    wif: 0x80
  },
  [curNames.BTC]: {
    messagePrefix: "\x18Bitcoin Signed Message:\n",
    bech32: "bc",
    bip32: {
      public: 0x0488b21e,
      private: 0x0488ade4
    },
    pubKeyHash: 0x00,
    scriptHash: 0x05,
    wif: 0x80
  },
  [curNames.BTG]: {
    messagePrefix: "\x18Bitcoin Gold Signed Message:\n",
    bip32: {
      public: 0x0488b21e,
      private: 0x0488ade4
    },
    pubKeyHash: 0x26,
    scriptHash: 0x17,
    wif: 0x80
  },
  [curNames.DOGE]: {
    messagePrefix: "\x19Dogecoin Signed Message:\n",
    bip32: {
      private: 0x02fac398,
      public: 0x02facafd
    },
    wif: 0x9e,
    pubKeyHash: 0x1e,
    scriptHash: 0x16
  },
  [curNames.DASH]: {
    messagePrefix: "\x19DarkCoin Signed Message:\n",
    bip32: {
      public: 0x02fe52f8,
      private: 0x02fe52cc
    },
    pubKeyHash: 0x4c,
    scriptHash: 0x10,
    wif: 0xcc
  }
};
