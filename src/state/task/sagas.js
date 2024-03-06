import {call, all, put, takeEvery} from 'redux-saga/effects';
import {
    createTask,
    createTaskFailure,
    createTaskSuccess,
    deleteTaskSuccess,
    deleteTaskFailure,
    getTasks,
    getTasksFailure,
    getTasksSuccess, deleteTask, updateTaskSuccess, updateTaskFailure, updateTask
} from "./reducer";

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

const deleteTaskAPI = (values) => {
    return fetch(`http://localhost:4000/api/tasks/delete`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
    })
        .then(response => response.json())
        .then(json => {
            if (json?.message) {
                return json;
            }
        })
        .catch(error => {
            throw error;
        });
};

function* deleteTaskFlow(action){
    try {
        yield call(deleteTaskAPI, action.payload);
        yield put(deleteTaskSuccess(action.payload));
    } catch (error) {
        yield put(deleteTaskFailure(error));
    }
}

const updateTaskAPI = (values) => {
    return fetch(`http://localhost:4000/api/tasks/update`, {
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

function* updateTaskFlow(action){
    try {
        const task = yield call(updateTaskAPI, action.payload);
        yield put(updateTaskSuccess(task));
    } catch (error) {
        yield put(updateTaskFailure(error));
    }
}

function* tasksWatcher() {
    yield all([
        takeEvery(getTasks.type, getTasksFlow),
        takeEvery(createTask.type, createTaskFlow),
        takeEvery(deleteTask.type, deleteTaskFlow),
        takeEvery(updateTask.type, updateTaskFlow)
    ]);
}

export default tasksWatcher;
