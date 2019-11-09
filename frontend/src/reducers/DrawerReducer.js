import React from 'react';

const initState = {
    open: false,
};

const reducer = (state = initState, action) => {
    switch (action.type) {
        case "TOGGLE_DRAWER": {
            return {...state, open: action.payload};
        }

        default:
            return state
    }
};

export default reducer;