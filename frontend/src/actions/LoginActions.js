export function login(username, accountID, firstName) {
    return {
        type: "LOGIN",
        payload: {
            username,
            accountID,
            firstName,
        }
    }
}

export function logout(){
    return {
        type: "LOGIN",
    }
}

