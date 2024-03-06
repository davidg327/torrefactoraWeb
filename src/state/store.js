import {configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import {Sagas} from './sagas';
import taskReducer from './task/reducer';
import priorityReducer from './priority/reducer';
import statusReducer from './status/reducer';

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

export const store = configureStore({
    reducer: {
        task: taskReducer,
        priority: priorityReducer,
        status: statusReducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(middleware),
});
sagaMiddleware.run(Sagas);

export default store
