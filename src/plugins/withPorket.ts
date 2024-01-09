import {Editor} from "slate";

/**
 * proket相关
 * @param editor
 */
const withPorket = (editor: Editor) => {
    const {apply, insertText} = editor

    // @ts-ignore
    // editor.isBlockCard = (element) => {
    //     return false
    // }

    return editor
}

export default withPorket