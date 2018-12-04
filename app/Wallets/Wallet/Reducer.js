import { handleActions } from "redux-actions";
import { types } from "./ActionTypes";

const initialState = {
  chartData: [],
  walletInfo: {},
  wallet: {},
  transactions: [],
  fiat: {},
  walletList: [],
  trxId: "",
  status: "Pending"
};

export const wallet = handleActions(
  {
    [types.CHECK_OUT_INITIAL]: (state, action) => ({ ...action.payload }),
    [types.MOUNT_DATA_FOR_CHART]: (state, action) => ({
      ...state,
      chartData: action.payload
    }),
    [types.GET_WALLET]: (state, action) => ({
      ...state,
      wallet: action.payload.wallet,
      walletList: action.payload.walletList
    }),
    [types.MOUNT_WALLET_INFO]: (state, action) => ({
      ...state,
      walletInfo: action.payload
    }),
    [types.MOUNT_TRX_ID]: (state, action) => ({
      ...state,
      trxId: action.payload.txid,
      status: action.payload.status
    }),
    [types.MOUNT_TRANSACTIONS]: (state, action) => ({
      ...state,
      transactions: action.payload
    }),
    [types.MOUNT_FIAT]: (state, action) => ({ ...state, fiat: action.payload }),
    [types.MOUNT_TOKEN_INFO]: (state, action) => ({
      ...state,
      wallet: {
        ...state.wallet,
        tokens: {
          updated: new Date(),
          tokenList: action.payload
        }
      }
    })
  },
  initialState
);
