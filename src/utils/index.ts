import {Editor} from "slate";

/**
 * 添加标记项
 * @param editor
 * @param format
 */
export const toggleMark = (editor: Editor, format: string) => {
    const isActive = isMarkActive(editor, format)
    if (isActive) {
        Editor.removeMark(editor, format)
    } else {
        Editor.addMark(editor, format, true)
    }
}

/**
 * 是否携带该标记
 * @param editor
 * @param format
 */
export const isMarkActive = (editor: Editor, format: string) => {
    const marks = Editor.marks(editor)
    // @ts-ignore
    return marks ? marks[format] === true : false
}