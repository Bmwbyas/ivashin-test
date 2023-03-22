export type Notes = {
    id: string,
    inputText:string
    textWithHash: string
    text: string,
    hash: string []
    editMode: boolean
}
type CreateType = {
    type: "CREATE",
}
type RemoveType = {
    type: "DELETE",
    payload: string
}
type SetCreateText = {
    type: 'SET-CREATE-TEXT',
    payload: string
}
type SetCreateHash = {
    type: 'SET-CREATE-HASH',
    payload: string
}
type ToggleEditMode = {
    type: 'TOGGLE-EDIT-MODE',
    payload: string
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
    payload: string
}
type AddHashtag = {
    type: 'ADD-HASH',
    payload: string
}
type RemoveHashtag = {
    type: 'REMOVE-HASH',
    payload: {
        id: string
        hash: string
    }
}
export type ActionsType =
    | CreateType
    | RemoveType
    | SetCreateText
    | ToggleEditMode
    | SetCreateHash
    | UpdateNote
    | SetSearchText
    | AddHashtag
    | RemoveHashtag

