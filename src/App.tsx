import React, {ChangeEvent, useCallback, useReducer} from 'react';
import './App.scss';
import {Editor} from "./components/editor/Editor";
import {initialState, reducer} from "./store/store";
import CreateComponent from "./components/createComponent/CreateComponent";

function App() {

    const [state, dispatch] = useReducer(reducer, initialState);

    let filtredNotes = state.notes.filter(n => n.hash.join(' ').includes(state.search))


    const onChangeSearchHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch({type: 'SET-SEARCH-TEXT', payload: e.currentTarget.value})
    }
    const createPostHandler = useCallback(() => {
        dispatch({type: 'CREATE'})
        dispatch({type: 'SET-CREATE-TEXT', payload: ''})
    },[dispatch])

    const onChangeCreate =useCallback( (e: ChangeEvent<HTMLTextAreaElement>) => {
        dispatch({type: 'SET-CREATE-TEXT', payload: e.currentTarget.value})
    },[dispatch])

    const onChangeCreateHash=useCallback( (e: ChangeEvent<HTMLTextAreaElement>) => {
        dispatch({type: 'SET-CREATE-HASH', payload: e.currentTarget.value})
    },[dispatch])

    return (
        <div className={'App'}>
            <div className={'createNoteContainer'}>

                <CreateComponent
                    value={state.createText}
                    onChange={onChangeCreate}
                    onClick={createPostHandler}
                    buttonName={'Cоздать заметку'}
                />
                <div>
                    <div>Поиск</div>
                    <input value={state.search} placeholder={'Поиск по тегу'} onChange={onChangeSearchHandler}
                           type={"text"}/>
                </div>
            </div>
            <div className={'notesContainer'}>

                {filtredNotes.map(n => {

                    const removeNote = () => {
                        dispatch({type: 'DELETE', payload: n.id})
                    }
                    const toggleEditMode = () => {

                        dispatch({type: 'TOGGLE-EDIT-MODE', payload: n.id})
                    }

                    const addTag = () => {
                        dispatch({type: 'ADD-HASH', payload: n.id})
                        dispatch({type:'SET-CREATE-HASH', payload:''})
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
                                value={state.hashText}
                                onChange={onChangeCreateHash}
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
