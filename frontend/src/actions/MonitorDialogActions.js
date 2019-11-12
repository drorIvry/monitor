export function toggleDialog(isOpen) {
    return {
        type: "TOGGLE_MONITOR_DIALOG",
        payload: isOpen
    }
}

export function toggleProgressBard(isOpen) {
    return {
        type: "TOGGLE_MONITOR_PROGRESSBAR",
        payload: isOpen
    }
}

