const initState = {
    reports: [],
};

const reducer = (state = initState, action) => {
    switch (action.type) {
        case "UPDATE_REPORTS_SUMMERY": {
            return {...state, reports: action.payload};
        }
        default:
            return state
    }
};

export default reducer;