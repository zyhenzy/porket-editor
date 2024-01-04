import React, {MutableRefObject, useCallback, useRef, useState} from 'react'
import styles from './index.module.scss';
import {createEditor, Transforms, Range} from 'slate'
import {Slate, Editable, withReact} from 'slate-react'
import {withHistory} from 'slate-history'
import withTrace from "./plugins/withTrace";
import Toolbar from "./components/toolbar/toolbar";
import ContextMenu from "./components/contextMenu/contextMenu";
import Leaf from "./render/Leaf";
import Element from "./render/Element";
import HoveringToolbar from "./components/hoveringToolbar/hoveringToolbar";
import withInput from "./porket/porket-input/input-plugin";
import {isKeyHotkey} from 'is-hotkey'
import withArea from "./porket/porket-area/area-plugin";

interface PorketEditorProps {
    children: string;  // 要绘制的文本
}

const initialValue = [
    {
        type: 'paragraph',
        children: [
            {text: 'A line of text in a paragraph.'},
            {
                type: 'input',
                children: [{text: 'abc'}],
            },
            {text: ''}
        ],
    },
    {
        type: 'paragraph',
        children: [{text: 'abc'}],
    },
    {
        type: 'area',
        children: [
            {
                type: 'paragraph', children: [
                    {text: 'abc'}
                ]
            }
        ]
    },
    {
        type: 'paragraph', children: [
            {text: ''}
        ]
    }
]

/**
 * 文本宽度自适应标签组件
 * @param props
 * @constructor
 */
const PorketEditor = (props: PorketEditorProps) => {
    const [editor] = useState(() => withArea(withInput(withReact(withHistory(withTrace(createEditor()))))))
    const renderElement = useCallback((props: any) => <Element {...props} />, [])
    const renderLeaf = useCallback((props: any) => <Leaf {...props} />, [])
    const editableRef = useRef(null);

    // 处理inline节点光标左移、右移跳转问题
    const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = event => {
        const {selection} = editor

        // Default left/right behavior is unit:'character'.
        // This fails to distinguish between two cursor positions, such as
        // <inline>foo<cursor/></inline> vs <inline>foo</inline><cursor/>.
        // Here we modify the behavior to unit:'offset'.
        // This lets the user step into and out of the inline without stepping over characters.
        // You may wish to customize this further to only use unit:'offset' in specific cases.
        if (selection && Range.isCollapsed(selection)) {
            const {nativeEvent} = event
            if (isKeyHotkey('left', nativeEvent)) {
                event.preventDefault()
                Transforms.move(editor, {unit: 'offset', reverse: true})
                return
            }
            if (isKeyHotkey('right', nativeEvent)) {
                event.preventDefault()
                Transforms.move(editor, {unit: 'offset'})
                return
            }
        }
    }

    return (
        <div>
            <Toolbar editor={editor}/>
            <Slate editor={editor} initialValue={initialValue}>
                <HoveringToolbar/>
                <div ref={editableRef}>
                    <ContextMenu areaRef={editableRef}/>
                    <Editable className={styles.porketEditor} renderLeaf={renderLeaf} renderElement={renderElement}
                              onKeyDown={onKeyDown}/>
                </div>

            </Slate>
        </div>
    )
}

export default PorketEditor;
