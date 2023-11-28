import {Editor} from "slate";

/**
 * 记录痕迹插件
 * @param editor
 */
const withTrace = (editor: Editor) => {
    const {apply, insertText} = editor

    editor.insertText = (text) => {
        insertText(text)
    }

    editor.apply = (operation) => {
        apply(operation)
    }

    return editor
}

export default withTrace