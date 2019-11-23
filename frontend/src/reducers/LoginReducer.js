import React from 'react';

const initState = {
    loggedIn: false,
    username:'',
    password:'',
    accountID:'',
    firstName:''
};

const reducer = (state = initState, action) => {
    switch (action.type) {
        case "LOGIN": {
            return {...state, ...action.payload, loggedIn: true};
        }
        case "LOGOUT": {
            return {...initState};
        }
        default:
            return state
    }
};

export default reducer;