export function login(username, password, accountID, firstName) {
    return {
        type: "LOGIN",
        payload: {
            username,
            password,
            accountID,
            firstName,
        }
    }
}

export function logout(){
    return {
        type: "LOGOUT",
    }
}

