const withInput = (editor:any) => {
    const { isInline, isVoid, markableVoid } = editor

    editor.isInline = (element:any) => {
        return element.type === 'input' ? true : isInline(element)
    }

    // editor.isVoid = (element:any) => {
    //     return element.type === 'input' ? true : isVoid(element)
    // }

    // editor.markableVoid = (element:any) => {
    //     return element.type === 'input' || markableVoid(element)
    // }

    return editor
}

export default withInput