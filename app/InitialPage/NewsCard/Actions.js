import { createActions } from "redux-actions";
import { FETCH_LATEST, MOUNT_FETCHED } from "./ActionTypes";

const newsCardActions = createActions({
  [FETCH_LATEST]: () => {},
  [MOUNT_FETCHED]: news => news
});

export default newsCardActions;
