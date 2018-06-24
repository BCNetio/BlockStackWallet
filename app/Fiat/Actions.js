import { createAction } from 'redux-actions';
import { types } from './ActionTypes';

export const fetchCourse = createAction(types.FETCH_COURSE, fiat => ({ fiat }));

export const mountFiat = createAction(types.MOUNT_FIAT, fiat => ({ fiat }));

export const fetchCourseComission = createAction(types.FETCH_COURSE_COMISSION, () => ({}));
