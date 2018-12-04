import { handleActions } from "redux-actions";
import { types } from "./ActionTypes";

const initialState = {
  amount: null,
  depositWallet: null,
  reciveAddr: null,
  balanceDeposit: null,
  wallets: [],
  marketInfo: {},
  activeTabId: 0,
  exchangeDetails: {},
  trx: {},
  shapeShiftError: "",
  statusDeposit: ""
};

export const exchange = handleActions(
  {
    [types.MOUNT_WALLETS]: (state, action) => ({
      ...state,
      wallets: action.payload
    }),
    [types.MOUNT_WALLET_BALANCE]: (state, action) => ({
      ...state,
      balanceDeposit: action.payload
    }),
    [types.MOUNT_MARKET_INFO]: (state, action) => ({
      ...state,
      marketInfo: action.payload
    }),
    [types.MOUNT_ACTIVE_TAB]: (state, action) => ({
      ...state,
      activeTabId: action.payload.tabId
    }),
    [types.MOUNT_EXCHANE_DETAILS]: (state, action) => ({
      ...state,
      exchangeDetails: action.payload.details,
      statusDeposit: ""
    }),
    [types.MOUNT_EXCHANGE_CHECK]: (state, action) => ({
      ...state,
      trx: action.payload,
      shapeShiftError: ""
    }),
    [types.MOUNT_STATUS_DEPOSIT]: (state, action) => ({
      ...state,
      statusDeposit: action.payload
    }),
    [types.MOUNT_EXCHANGE_CHECK_ERROR]: (state, action) => ({
      ...state,
      shapeShiftError: action.payload,
      trx: {}
    })
  },

  initialState
);
