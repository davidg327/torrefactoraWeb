import {call, all, put, takeEvery} from 'redux-saga/effects';
import {getStatus, getStatusFailure, getStatusSuccess} from "./reducer";

const getStatusAPI = () => {
    return fetch(`http://localhost:4000/api/status`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    })
        .then(response => response.json())
        .then(json => {
            if (json.length > 0) {
                return json;
            }
        })
        .catch(error => {
            throw error;
        });
};

function* getStatusFlow(){
    try {
        const status = yield call(getStatusAPI);
        yield put(getStatusSuccess(status));
    } catch (error) {
        yield put(getStatusFailure(error));
    }
}

function* tasksWatcher() {
    yield all([
        takeEvery(getStatus.type, getStatusFlow),
    ]);
}

export default tasksWatcher;
