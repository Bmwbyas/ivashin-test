import {ActionsType, InitialStateType, Note} from "../types/types";
import {v1} from "uuid";
import {divideHashText} from "../assets/function/divideHashText";
import {addHashText} from "../assets/function/addHashText";


export const initialState = {
    notes: [] as Note[],
    hashText: '',
    search: ''
};

export function reducer(state: InitialStateType = initialState, action: ActionsType) {
    switch (action.type) {
        case 'CREATE':
            const data = divideHashText(action.payload.text)
            const note: Note = {
                id: v1(),
                inputText: action.payload.text,
                textWithHash: data.textWithHash.join(' '),
                text: data.text.join(' ').trim(),
                hash: data.hashs,
                editMode: false
            }
            return {...state, notes: [...state.notes, note]};

        case 'DELETE':
            return {...state, notes: state.notes.filter(n => n.id !== action.payload.id)};

        case 'SET-SEARCH-TEXT':
            return {...state, search: action.payload.text};

        case 'TOGGLE-EDIT-MODE':
            return {
                ...state,
                notes: state.notes.map(n => n.id === action.payload.id
                    ? {...n, editMode: !n.editMode}
                    : n)
            };

        case 'UPDATE-NOTE': {

            const data = divideHashText(action.payload.title)

            return {
                ...state,
                notes: state.notes
                    .map(n => n.id === action.payload.id
                        ? {
                            ...n,
                            text: data.text.join(' '),
                            hash: data.hashs,
                            textWithHash: data.textWithHash.join(' '),
                            inputText: action.payload.title
                        }
                        : n)
            };
        }
        case "REMOVE-HASH": {
            const note = state.notes.find(n => n.id === action.payload.id)

            if (!note) {
                return state
            }
            const currentInputText = note.inputText.split(' ').filter(t => t !== action.payload.hash).join(' ')
            const data = divideHashText(currentInputText)

            return {
                ...state,
                notes: state.notes
                    .map(n => n.id === action.payload.id
                        ? {
                            ...n,
                            text: data.text.join(' ').trim(),
                            hash: data.hashs,
                            textWithHash: data.textWithHash.join(' '),
                            inputText: currentInputText
                        }
                        : n)
            }
        }
        case "ADD-HASH": {
            const note = state.notes.find(n => n.id === action.payload.id)
            if (!note) {
                return state
            }
            const newNote = addHashText(note, action.payload.text)

            return {...state, notes: state.notes.map(n => n.id === action.payload.id ? newNote : n)}
        }
        case "SET-STATE":
            return {...action.payload.state}


        default:
            return state
    }
}
