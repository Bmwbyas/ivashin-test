import {ActionsType, Notes} from "../types/types";
import {v1} from "uuid";
import {divideHashText} from "../assets/function/divideHashText";
import {addHashText} from "../assets/function/addHashText";

type InitialStateType = typeof initialState
export const initialState = {
    notes: [] as Notes[],
    createText: '',
    hashText: '',
    search: ''
};

export function reducer(state: InitialStateType = initialState, action: ActionsType) {
    switch (action.type) {
        case 'CREATE':
            const data = divideHashText(state.createText)
            const note: Notes = {
                id: v1(),
                inputText: state.createText,
                textWithHash: data.textWithHash.join(' '),
                text: data.text.join(' ').trim(),
                hash: data.hashs,
                editMode: false
            }
            return {...state, notes: [...state.notes, note]};

        case 'DELETE':
            return {...state, notes: state.notes.filter(n => n.id !== action.payload)};

        case 'SET-CREATE-TEXT':
            return {...state, createText: action.payload};

        case 'SET-CREATE-HASH':
            return {...state, hashText: action.payload};

        case 'SET-SEARCH-TEXT':
            return {...state, search: action.payload};

        case 'TOGGLE-EDIT-MODE':
            return {
                ...state,
                notes: state.notes.map(n => n.id === action.payload
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
            const currentInputText = note.inputText.split(' ').filter(t => t!==action.payload.hash).join(' ')
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
            const note = state.notes.find(n => n.id === action.payload)
            if (!note) {
                return state
            }
            const newNote = addHashText(note, state.hashText)

            return {...state, notes: state.notes.map(n => n.id === action.payload ? newNote : n)}
        }
        default:
            return state
    }
}
