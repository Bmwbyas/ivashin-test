export const divideHashText = (inputText: string) => {
    let value = inputText.split(' ');
    let hashs = [];
    let text = []
    let textWithHash = []
    for (let i = 0; i < value.length; i++) {

        if (value[i].charAt(0) === "#") {
            hashs.push(value[i]);
            text.push(value[i].substring(1))
            // textWithHash.push(`<span>${value[i]}</span>`)
            textWithHash.push(`<span>${value[i]}</span>`)
        }

        else {
            textWithHash.push(value[i])
            text.push(value[i])
        }

    }
    return {hashs, text, textWithHash}
}
