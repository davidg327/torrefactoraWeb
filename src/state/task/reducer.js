import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    getTasksRequesting: false,
    getTasksSuccess: false,
    getTasksError: '',
    tasks: [],
    createTaskRequesting: true,
    createTaskSuccess: false,
    createTaskError: '',
};

export const tasksSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        getTasks: state => {
            state.getTasksRequesting = true;
        },
        getTasksSuccess: (state, action) => {
            state.getTasksRequesting = false;
            state.getTasksSuccess = true;
            state.tasks = action.payload;
        },
        getTasksFailure: (state, action) => {
            state.getTasksRequesting = false;
            state.getTasksError = action.payload;
        },
        createTask: (state) => {
            state.createTaskRequesting = true;
        },
        createTaskSuccess: (state, action) => {
            state.createTaskRequesting = false;
            state.createTaskSuccess = true;
            state.tasks = [action.payload, ...state.tasks];
        },
        createTaskFailure: (state, action) => {
            state.createTaskRequesting = false;
            state.createTaskError = action.payload;
        },
    },
});

export const {
    getTasks,
    getTasksSuccess,
    getTasksFailure,
    createTask,
    createTaskSuccess,
    createTaskFailure,
} = tasksSlice.actions;

export default tasksSlice.reducer;
