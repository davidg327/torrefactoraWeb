import {all, fork} from 'redux-saga/effects';
import TasksSagas from './task/sagas';
import PrioritySagas from './priority/sagas';
import StatusSagas from './status/sagas';

export function* Sagas() {
    yield all([
        fork(TasksSagas),
        fork(PrioritySagas),
        fork(StatusSagas),
    ]);
}
