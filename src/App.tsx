import React, {ChangeEvent, useReducer} from 'react';
import {v1} from 'uuid';
import './App.scss';

type Notes = {
    id: string,
    textWithHash: string
    text: string,
    hash: string []
    editMode: boolean
}
type InitialStateType = typeof initialState
const initialState = {
    notes: [
        // {text: 'd', hash: ['#d', '#vv'], textWithHash: 'd #d #vv', editMode: false, id: "1"},
        // {text: 'q', hash: ['#e', '#vv'], textWithHash: 'q #e #vv', editMode: false, id: "1"},
        // {text: 'w', hash: ['#q', '#vv'], textWithHash: 'w #q #vv', editMode: false, id: "2"},
    ] as Notes[],
    createText: '',
    updateText: '',
    search: ''
};

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
type SetUpdateText = {
    type: 'SET-UPDATE-TEXT',
    payload: string
}
type ToggleEditMode = {
    type: 'TOGGLE-EDIT-MODE',
    payload: string
}
type UpdateNote = {
    type: 'UPDATE-NOTE',
    payload: string
}
type SetSearchText = {
    type: 'SET-SEARCH-TEXT',
    payload: string
}
// type Search = {
//     type: 'SEARCH',
// }
type ActionsType =
    | CreateType
    | RemoveType
    | SetCreateText
    | ToggleEditMode
    | SetUpdateText
    | UpdateNote
    | SetSearchText
// | Search

const divideHashText = (inputText: string) => {
    let value = inputText.split(' ');
    let hashs = [];
    let text = []

    for (let i = 0; i < value.length; i++) {

        if (value[i].charAt(0) === "#") {
            hashs.push(value[i]);
            text.push(value[i].substring(1))
        } else {
            text.push(value[i])
        }

    }
    return {hashs, text}
}

function reducer(state: InitialStateType = initialState, action: ActionsType) {
    switch (action.type) {
        case 'CREATE':
            const data = divideHashText(state.createText)
            const note = {
                id: v1(),
                textWithHash: state.createText,
                text: data.text.join(' ').trim(),
                hash: data.hashs,
                editMode: false
            }
            return {...state, notes: [...state.notes, note]};

        case 'DELETE':
            return {...state, notes: state.notes.filter(n => n.id !== action.payload)};

        case 'SET-CREATE-TEXT':
            return {...state, createText: action.payload};

        case 'SET-UPDATE-TEXT':
            return {...state, updateText: action.payload};

        case 'SET-SEARCH-TEXT':
            return {...state, search: action.payload };

        case 'TOGGLE-EDIT-MODE':
            return {
                ...state,
                notes: state.notes.map(n => n.id === action.payload
                    ? {...n, editMode: !n.editMode}
                    : n)
            };

        case 'UPDATE-NOTE': {
            const data = divideHashText(state.updateText)
            return {
                ...state, notes: state.notes
                    .map(n => n.id === action.payload
                        ? {...n, text: data.text.join(' ').trim(), hash: data.hashs, textWithHash: state.updateText}
                        : n)
            };
        }
        default:
            return state
    }
}


function App() {

    const [state, dispatch] = useReducer(reducer, initialState);

    let filtredNotes = state.notes.filter(n =>  n.hash.join(' ').includes(state.search))

    const createPostHandler = () => {
        dispatch({type: 'CREATE'})
    }

    const onChangeCreate = (e: ChangeEvent<HTMLTextAreaElement>) => {
        dispatch({type: 'SET-CREATE-TEXT', payload: e.currentTarget.value})
    }

    const onChangeSearchHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch({type: 'SET-SEARCH-TEXT', payload: e.currentTarget.value})
    }


    return (
        <div className={'App'}>
            <div className={'createNoteContainer'}>
                <div>
                    <textarea value={state.createText} onChange={onChangeCreate}/>
                    <button onClick={createPostHandler}>Создать заметку</button>
                </div>
                <div>
                    <div>Поиск</div>
                    <input value={state.search} placeholder={'Поиск по тегу'} onChange={onChangeSearchHandler} type={"text"}/>
                </div>
            </div>
            <div className={'notesContainer'}>

                {filtredNotes.map(n => {

                    const removeNote = () => {
                        dispatch({type: 'DELETE', payload: n.id})
                    }
                    const toggleEditMode = () => {

                        dispatch({type: 'TOGGLE-EDIT-MODE', payload: n.id})
                        dispatch({type: 'SET-UPDATE-TEXT', payload: n.textWithHash})
                    }
                    const updateNotes = () => {
                        dispatch({type: 'UPDATE-NOTE', payload: n.id})
                        dispatch({type: 'TOGGLE-EDIT-MODE', payload: n.id})
                    }
                    const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
                        dispatch({type: 'SET-UPDATE-TEXT', payload: e.currentTarget.value})
                    }
                    return <div key={n.id} className={'noteConteainer'}>
                        <div>
                            {n.editMode
                                ? <textarea
                                    autoFocus={true}
                                    value={state.updateText}
                                    onChange={onChangeHandler}
                                    onBlur={updateNotes}
                                />
                                : <span className={'editSpan'}>{n.text}</span>
                            }
                        </div>
                        <div>
                            {n.hash.map((h, index) => <div key={index}>{h}
                                <button>X</button>
                            </div>)}
                        </div>
                        <button onClick={removeNote}>удалить заметку</button>
                        <button onClick={toggleEditMode}>редактировать заметку</button>
                    </div>
                })}
            </div>
            <div contentEditable={true} suppressContentEditableWarning={true}
                 style={{height: " 300px", width: "100%", border: "solid", borderWidth: "1px", textAlign: 'left'}}>
                bla bvka <b>bla bla</b>#fdsfsdf
            </div>

        </div>
    );
}

export default App;
