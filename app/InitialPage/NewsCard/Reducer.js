import { handleActions } from "redux-actions";
import newsCardStore from "./Store";
import { MOUNT_FETCHED } from "./ActionTypes";

const newsCard = handleActions(
  {
    [MOUNT_FETCHED]: (state, { payload }) => state.set("posts", payload)
  },
  newsCardStore
);

export default newsCard;
