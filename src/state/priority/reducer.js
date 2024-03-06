import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    getPrioritiesRequesting: false,
    getPrioritiesSuccess: false,
    getPrioritiesError: '',
    priorities: [],
};

export const prioritySlice = createSlice({
    name: 'priority',
    initialState,
    reducers: {
        getPriorities: state => {
            state.getPriorityRequesting = true;
        },
        getPrioritiesSuccess: (state, action) => {
            state.getPriorityRequesting = false;
            state.getPrioritiesSuccess = true;
            state.priorities = action.payload;
        },
        getPrioritiesFailure: (state, action) => {
            state.getPriorityRequesting = false;
            state.getPrioritiesError = action.payload;
        },
    },
});

export const {
    getPriorities,
    getPrioritiesSuccess,
    getPrioritiesFailure,
} = prioritySlice.actions;

export default prioritySlice.reducer;
