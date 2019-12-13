const initState = {
    progressbarVisible: false,
    snackbarVisible: false,
    snackbarText: '',
};

const reducer = (state = initState, action) => {
    switch (action.type) {
        case "TOGGLE_FRAME_PROGRESSBAR": {
            return {...state, progressbarVisible: action.payload};
        }
        case "TOGGLE_FRAME_SNACKBAR": {
            return {...state, ...action.payload};
        }
        default:
            return state
    }
};

export default reducer;