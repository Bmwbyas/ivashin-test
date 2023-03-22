import {InitialStateType} from "../types/types";

export const saveInLocalStorage = (state: InitialStateType) => {

    localStorage.setItem('state', JSON.stringify(state))
}

export const getLocalStorage = () => {
    const state = localStorage.getItem('state')
    if (state === null) {
        return null
    }
    let parseNotes: InitialStateType = JSON.parse(state)
    return parseNotes
}
