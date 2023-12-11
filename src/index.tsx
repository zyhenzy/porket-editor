import React, {useCallback, useState} from 'react'
import styles from './index.module.scss';
import {createEditor, Transforms} from 'slate'
import {Slate, Editable, withReact} from 'slate-react'
import {withHistory} from 'slate-history'
import withTrace from "./plugins/withTrace";
import Toolbar from "./components/toolbar/toolbar";
import ContextMenu from "./components/contextMenu/contextMenu";
import Leaf from "./render/Leaf";
import HoveringToolbar from "./components/hoveringToolbar/hoveringToolbar";

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
    const renderLeaf = useCallback((props: any) => <Leaf {...props} />, [])

    return (
        <div>
            <Toolbar editor={editor}/>
            <Slate editor={editor} initialValue={initialValue}>
                <HoveringToolbar/>
                <ContextMenu/>
                <Editable className={styles.porketEditor} renderLeaf={renderLeaf}/>
            </Slate>
        </div>
    )
}

export default PorketEditor;
