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
    updateTaskRequesting: false,
    updateTaskSuccess: false,
    updateTaskError: '',
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
            state.deleteTaskRequesting = false;
            state.deleteTaskSuccess = true;
            state.tasks = state.tasks.filter(item => item.id !== action.payload.id);
        },
        deleteTaskFailure: (state, action) => {
            state.deleteTaskRequesting = false;
            state.deleteTaskError =  action.payload;
        },
        updateTask: (state) => {
            state.updateTaskRequesting = true;
        },
        updateTaskSuccess: (state, action) => {
            state.updateTaskRequesting = false;
            state.updateTaskSuccess = true;
            state.tasks = state.tasks.map(task => (
                task.id === action.payload.id ? action.payload : task
            ));
        },
        updateTaskFailure: (state, action) => {
            state.updateTaskRequesting = false;
            state.updateTaskError =  action.payload;
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
    deleteTask,
    deleteTaskSuccess,
    deleteTaskFailure,
    updateTask,
    updateTaskSuccess,
    updateTaskFailure,
} = tasksSlice.actions;

export default tasksSlice.reducer;
