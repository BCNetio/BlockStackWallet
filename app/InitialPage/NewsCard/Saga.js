import { put, call, takeLatest } from "redux-saga/effects";
import { FETCH_LATEST, MOUNT_FETCHED } from "./ActionTypes";
import XHRProvider from "../../Providers/XHRProvider";

function* fetchNews() {
  let news;
  try {
    const response = yield call(XHRProvider.getMediumPosts);
    news = response.map(({ title, uniqueSlug, createdAt }) => ({
      title,
      uniqueSlug,
      createdAt
    }));
  } catch (e) {
    console.log("Failed to fetch Dappy news from medium");
  }
  yield put({ type: MOUNT_FETCHED, payload: news });
}

export default function* newsCardSaga() {
  yield takeLatest(FETCH_LATEST, fetchNews);
}
