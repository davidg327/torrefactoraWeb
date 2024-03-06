import {call, all, put, takeEvery} from 'redux-saga/effects';
import {createTask, createTaskFailure, createTaskSuccess, getTasks, getTasksFailure, getTasksSuccess} from "./reducer";

const getTasksAPI = () => {
    return fetch(`http://localhost:4000/api/tasks`, {
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

function* getTasksFlow(){
    try {
        const tasks = yield call(getTasksAPI);
        yield put(getTasksSuccess(tasks));
    } catch (error) {
        yield put(getTasksFailure(error));
    }
}

const createTaskAPI = (values) => {
    return fetch(`http://localhost:4000/api/tasks`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
    })
        .then(response => response.json())
        .then(json => {
            if (json?.id) {
                return json;
            }
        })
        .catch(error => {
            throw error;
        });
};

function* createTaskFlow(action){
    try {
        const task = yield call(createTaskAPI, action.payload);
        yield put(createTaskSuccess(task));
    } catch (error) {
        yield put(createTaskFailure(error));
    }
}

function* tasksWatcher() {
    yield all([
        takeEvery(getTasks.type, getTasksFlow),
        takeEvery(createTask.type, createTaskFlow),
    ]);
}

export default tasksWatcher;
