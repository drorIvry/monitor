import React from 'react';

const initState = {
    alerts: [],
};

const reducer = (state = initState, action) => {
    switch (action.type) {
        case "UPDATE_ALERTS": {
            return {...state, alerts: action.payload};
        }
        default:
            return state
    }
};

export default reducer;