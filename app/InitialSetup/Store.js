import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware } from 'redux';
import rootSaga from './RootSaga';
import { rootReducer } from './RootReducer';

const initialState = {};

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware( sagaMiddleware )
);

sagaMiddleware.run(rootSaga);
