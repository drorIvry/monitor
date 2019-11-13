import React from 'react';

const initState = {
    progressbarVisible: false,
};

const reducer = (state = initState, action) => {
    switch (action.type) {
        case "TOGGLE_FRAME_PROGRESSBAR": {
            return {...state, progressbarVisible: action.payload};
        }
        default:
            return state
    }
};

export default reducer;