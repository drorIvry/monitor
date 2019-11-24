import React from 'react';

const initState = {
    darkMode: true,
};

const reducer = (state = initState, action) => {
    switch (action.type) {
        case "TOGGLE_DARK_MODE": {
            return {...state, darkMode: !state.darkMode};
        }

        default:
            return state
    }
};

export default reducer;