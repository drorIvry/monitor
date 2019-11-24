import React from 'react';

const initState = {
    CPU: [],
    Disk: {},
    Memory: {},
    data: [],
};

const reducer = (state = initState, action) => {
    switch (action.type) {
        case "UPDATE_DASHBOARD": {
            return {...state, ...action.payload};
        }
        default:
            return state
    }
};

export default reducer;