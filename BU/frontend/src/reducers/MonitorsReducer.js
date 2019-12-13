const initState = {
    monitors: [],
};

const reducer = (state = initState, action) => {
    switch (action.type) {
        case "UPDATE_MONITORS": {
            return {...state, monitors: action.payload};
        }
        default:
            return state
    }
};

export default reducer;