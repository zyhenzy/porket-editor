import React, {useState} from 'react'
import styles from './index.module.scss';
import {createEditor} from 'slate'
import {Slate, Editable, withReact} from 'slate-react'

interface PorketEditorProps {
    children: string;  // 要绘制的文本
}

const initialValue = [
    {
        type: 'paragraph',
        children: [{text: 'A line of text in a paragraph.'}],
    },
]

/**
 * 文本宽度自适应标签组件
 * @param props
 * @constructor
 */
const PorketEditor = (props: PorketEditorProps) => {
    const [editor] = useState(() => withReact(createEditor()))
    return (
        <>
            <Slate editor={editor} initialValue={initialValue}>
                <Editable className={styles.porketEditor}/>
            </Slate>
        </>
    )
}

export default PorketEditor;
