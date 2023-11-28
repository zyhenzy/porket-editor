import {Editor} from 'slate'
import {HistoryEditor} from "slate-history";

export const PEditor = {
    ...Editor,
    insertImage(editor: Editor, url: string) {
        console.log(editor)
        console.log(url)
        console.log('插入了')
    },
    /**
     * 撤销功能
     * @param editor
     */
    undo(editor: HistoryEditor) {
        editor.undo()
    },
    /**
     * 恢复功能
     * @param editor
     */
    redo(editor: HistoryEditor) {
        editor.redo()
    },
}