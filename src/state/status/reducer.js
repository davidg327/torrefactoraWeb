import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    getStatusRequesting: false,
    getStatusSuccess: false,
    getStatusError: '',
    status: [],
};

export const statusSlice = createSlice({
    name: 'status',
    initialState,
    reducers: {
        getStatus: state => {
            state.getStatusRequesting = true;
        },
        getStatusSuccess: (state, action) => {
            state.getStatusRequesting = false;
            state.getStatusSuccess = true;
            state.status = action.payload;
        },
        getStatusFailure: (state, action) => {
            state.getStatusRequesting = false;
            state.getStatusError = action.payload;
        },
    },
});

export const {
    getStatus,
    getStatusSuccess,
    getStatusFailure,
} = statusSlice.actions;

export default statusSlice.reducer;
