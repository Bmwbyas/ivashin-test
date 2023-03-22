import {initialState} from "../store/store";

export type Note = {
    id: string,
    inputText: string
    textWithHash: string
    text: string,
    hash: string []
    editMode: boolean
}
type CreateType = {
    type: "CREATE",
    payload: { text: string }
}
type RemoveType = {
    type: "DELETE",
    payload: { id: string }
}

type ToggleEditMode = {
    type: 'TOGGLE-EDIT-MODE',
    payload: { id: string }
}
type UpdateNote = {
    type: 'UPDATE-NOTE',
    payload: {
        id: string
        title: string
    }
}
type SetSearchText = {
    type: 'SET-SEARCH-TEXT',
    payload: { text: string }
}
type AddHashtag = {
    type: 'ADD-HASH',
    payload: {
        id: string
        text: string
    }
}
type RemoveHashtag = {
    type: 'REMOVE-HASH',
    payload: {
        id: string
        hash: string
    }
}
type SetState = {
    type: 'SET-STATE',
    payload: {
        state: InitialStateType
    }
}
export type ActionsType =
    | CreateType
    | RemoveType
    | ToggleEditMode
    | UpdateNote
    | SetSearchText
    | AddHashtag
    | RemoveHashtag
    | SetState

export type InitialStateType = typeof initialState
