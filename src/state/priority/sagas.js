import {call, all, put, takeEvery} from 'redux-saga/effects';
import {getPriorities, getPrioritiesFailure, getPrioritiesSuccess,} from "./reducer";

const getPrioritiesAPI = () => {
    return fetch(`http://localhost:4000/api/priority`, {
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

function* getPrioritiesFlow(){
    try {
        const priorities = yield call(getPrioritiesAPI);
        yield put(getPrioritiesSuccess(priorities));
    } catch (error) {
        yield put(getPrioritiesFailure(error));
    }
}

function* priorityWatcher() {
    yield all([
        takeEvery(getPriorities.type, getPrioritiesFlow),
    ]);
}

export default priorityWatcher;
