const initState = {
    dialogOpen: false,
    progressbarVisible: false,
};

const reducer = (state = initState, action) => {
    switch (action.type) {
        case "TOGGLE_MONITOR_DIALOG": {
            return {...state, dialogOpen: action.payload};
        }
        case "TOGGLE_MONITOR_PROGRESSBAR": {
            return {...state, progressbarVisible: action.payload};
        }
        default:
            return state
    }
};

export default reducer;