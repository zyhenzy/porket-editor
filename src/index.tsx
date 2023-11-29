import React, {useState} from 'react'
import styles from './index.module.scss';
import {createEditor, Transforms} from 'slate'
import {Slate, Editable, withReact} from 'slate-react'
import {withHistory} from 'slate-history'
import withTrace from "./plugins/withTrace";
import Toolbar from "./components/toolbar/toolbar";
import ContextMenu from "./components/contextMenu/contextMenu";

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
    const [editor] = useState(() => withReact(withHistory(withTrace(createEditor()))))

    return (
        <div>
            <Toolbar editor={editor}/>
            <Slate editor={editor} initialValue={initialValue}>
                <ContextMenu editor={editor}/>
                <Editable className={styles.porketEditor}/>
            </Slate>
        </div>
    )
}

export default PorketEditor;
