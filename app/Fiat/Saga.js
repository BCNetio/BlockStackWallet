import { put, call, takeLatest, all } from "redux-saga/effects";
import { types } from "./ActionTypes";
import XHRProvider from "../Providers/XHRProvider";

const xhr = new XHRProvider();

function* fetchСourse(action) {
  try {
    const course = yield call(xhr.getCourse, action.payload.fiat);
    yield put({
      type: types.MOUNT_COURSE,
      payload: course
    });
  } catch (error) {
    console.log(error);
  }
}

function* fetchCourseComission(action) {
  try {
    const [fee, gas] = yield all([call(xhr.fetchFee), call(xhr.fetchGas)]);
    yield put({ type: types.MOUNT_COURSE_COMISSION, payload: { fee, gas } });
  } catch (error) {
    console.log(error);
  }
}

export function* fiatSaga() {
  yield takeLatest(types.FETCH_COURSE, fetchСourse);
  yield takeLatest(types.FETCH_COURSE_COMISSION, fetchCourseComission);
}
