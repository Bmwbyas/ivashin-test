import React, {ChangeEvent, useCallback, useEffect, useReducer} from 'react';
import './App.scss';
import {Editor} from "./components/editor/Editor";
import {initialState, reducer} from "./store/store";
import CreateComponent from "./components/createComponent/CreateComponent";
import {getLocalStorage, saveInLocalStorage} from "./localStorage/localstorage";

function App() {

    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const localData = getLocalStorage()
        if (localData) {
            dispatch({type: "SET-STATE", payload: {state: localData}})
        }
    }, [])

    useEffect(() => {
        saveInLocalStorage(state)
    }, [state])

    let filtredNotes = state.notes.filter(n => n.hash.join(' ').includes(state.search))

    const onChangeSearchHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch({type: 'SET-SEARCH-TEXT', payload: {text: e.currentTarget.value}})
    }
    const createPostHandler = useCallback((text: string) => {
        dispatch({type: 'CREATE', payload: {text}})

    }, [dispatch])


    return (
        <div className={'App'}>
            <div className={'createNoteContainer'}>

                <CreateComponent
                    onClick={createPostHandler}
                    buttonName={'Cоздать заметку'}
                />
                <div>
                    <div>Поиск</div>
                    <input className={'inputSearch'} value={state.search} placeholder={'Поиск по тегу'}
                           onChange={onChangeSearchHandler}
                           type={"text"}/>
                </div>
            </div>
            <div className={'notesContainer'}>

                {filtredNotes.map(n => {

                    const removeNote = () => {
                        dispatch({type: 'DELETE', payload: {id: n.id}})
                    }
                    const toggleEditMode = () => {

                        dispatch({type: 'TOGGLE-EDIT-MODE', payload: {id: n.id}})
                    }

                    const addTag = (text: string) => {
                        dispatch({type: 'ADD-HASH', payload: {text, id: n.id}})
                    }

                    return <div key={n.id} className={'noteConteainer'}>
                        <Editor n={n} dispatch={dispatch}/>
                        {!n.editMode && <div>
                            {n.hash.map((h, index) => {


                                const removeTag = () => {
                                    dispatch({type: 'REMOVE-HASH', payload: {id: n.id, hash: h}})
                                }

                                return <div key={index}>{h}
                                    <button onClick={removeTag}>X</button>
                                </div>
                            })
                            }
                            <CreateComponent
                                onClick={addTag}
                                buttonName={'Cоздать Hash'}
                            />
                        </div>}
                        {!n.editMode &&
                            <>
                                <button onClick={removeNote}>удалить заметку</button>
                                <button onClick={toggleEditMode}>редактировать заметку</button>
                            </>
                        }
                    </div>
                })}
            </div>
        </div>
    );
}

export default App;
