export function toggleProgressBar(isOpen) {
    return {
        type: "TOGGLE_FRAME_PROGRESSBAR",
        payload: isOpen
    }
}

export function toggleSnackbar(isOpen, text) {
    return {
        type: "TOGGLE_FRAME_SNACKBAR",
        payload: {
            snackbarVisible: isOpen,
            snackbarText: text,
        }
    }
}