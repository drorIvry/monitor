export function toggleDialog(isOpen) {
    return {
        type: "TOGGLE_MONITOR_DIALOG",
        payload: isOpen
    }
}

export function toggleProgressBar(isOpen) {
    return {
        type: "TOGGLE_MONITOR_PROGRESSBAR",
        payload: isOpen
    }
}

