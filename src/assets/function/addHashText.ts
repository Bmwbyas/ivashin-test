import {Note} from "../../types/types";
import {divideHashText} from "./divideHashText";

export const addHashText = (note: Note, newHash: string): Note => {
    const currentInputText: string[] = note.inputText.split(' ')
    currentInputText.push(`#${newHash}`)
    const newInputText = currentInputText.join(' ')
    const {text, textWithHash, hashs} = divideHashText(newInputText)

    return {
        ...note, inputText: newInputText,
        textWithHash: textWithHash.join(' '),
        text: text.join(' ').trim(),
        hash: hashs
    }
}
