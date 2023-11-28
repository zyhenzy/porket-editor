import React, {useState} from 'react'
import styles from './toolbar.module.scss';
import {createEditor, Editor, Transforms} from 'slate'
import {Slate, Editable, withReact} from 'slate-react'
import {HistoryEditor} from "slate-history";
import {PEditor} from "../../porket";


interface ToolbarProps {
    editor: HistoryEditor,
}

/**
 * 文本宽度自适应标签组件
 * @param props
 * @constructor
 */
const Toolbar = (props: ToolbarProps) => {
    const {editor} = props

    const logJson = () => {
        console.log(editor.children)
    }

    const handleUndo = () => {
        PEditor.undo(editor)
    }

    const addMark = () => {
        Editor.addMark(editor, 'color', 'red')
    }

    const handleTest1 = () => {
        Editor.addMark(editor, 'color', 'red')
        Transforms.insertText(editor, 'abc')
    }

    return (
        <div className={styles.toolbar}>
            <button onClick={() => logJson()}>打印editor数据</button>
            <button onClick={() => handleUndo()}>撤销</button>
            <button onClick={() => addMark()}>addMark</button>
            <button onClick={() => handleTest1()}>test1</button>
        </div>
    )
}

export default Toolbar;
