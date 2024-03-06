import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    getTasksRequesting: false,
    getTasksSuccess: false,
    getTasksError: '',
    tasks: [],
    createTaskRequesting: false,
    createTaskSuccess: false,
    createTaskError: '',
    deleteTaskRequesting: false,
    deleteTaskSuccess: false,
    deleteTaskError: '',
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
        deleteTask: (state) => {
            state.deleteTaskRequesting = true;
        },
        deleteTaskSuccess: (state, action) => {
            console.log(action.payload);
            state.deleteTaskRequesting = false;
            state.deleteTaskSuccess = true;
            state.tasks = state.tasks.filter(item => item.id !== action.payload.id);
        },
        deleteTaskFailure: (state, action) => {
            state.deleteTaskRequesting = false;
            state.deleteTaskError =  action.payload;
        }
    },
});

export const {
    getTasks,
    getTasksSuccess,
    getTasksFailure,
    createTask,
    createTaskSuccess,
    createTaskFailure,
    deleteTask,
    deleteTaskSuccess,
    deleteTaskFailure,
} = tasksSlice.actions;

export default tasksSlice.reducer;
