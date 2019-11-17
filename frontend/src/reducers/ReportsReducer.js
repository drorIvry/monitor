import React from 'react';

const initState = {
    reports: [],
};

const reducer = (state = initState, action) => {
    switch (action.type) {
        case "UPDATE_REPORTS": {
            return {...state, monitors: action.payload};
        }
        default:
            return state
    }
};

export default reducer;