import {Editor, Range, Transforms, Element,Node} from 'slate'
import {HistoryEditor} from "slate-history";
import {AreaElement, InputElement} from "./porket-types";

export const PEditor = {
    ...Editor,
    insertImage(editor: Editor, url: string) {
        console.log(editor)
        console.log(url)
        console.log('插入了')
    },
    /**
     * 添加区域
     * @param editor
     */
    addArea(editor: Editor) {
        // @ts-ignore
        const [areaTuple] = Editor.nodes(editor, {
            // @ts-ignore
            match: n => !Editor.isEditor(n) && Element.isElement(n) && n.type === 'area',
        })
        const inArea = !!areaTuple
        if (inArea) {
            alert('不能在区域中插入区域')
            return
        }
        const area: AreaElement = {type: 'area', children: [{text: 'abc'}]}
        Transforms.wrapNodes(
            editor,
            area,
            {
                // @ts-ignore
                match: n => Element.isElement(n) && n.type === 'paragraph',
                split: true,
            }
        )
    },
    /**
     * 添加文本控件
     * @param editor
     */
    addInput(editor: Editor) {
        const {selection} = editor
        const isCollapsed = selection && Range.isCollapsed(selection)
        const input: InputElement = {
            type: 'input',
            children: [{text: 'edit me!'}]
        }
        if (isCollapsed) {
            Transforms.insertNodes(editor, input)
        } else {
            Transforms.wrapNodes(editor, input, {split: true})
            Transforms.collapse(editor, {edge: 'end'})
        }
    },
    /**
     * 测试Descendants函数
     * @param editor
     */
    test(editor:Editor){
        // const g = Node.descendants(editor,{
        //     // @ts-ignore
        //     pass: ([node]) => node.type === 'area'
        // })
        // console.log(Array.from(g))
        console.log(editor.children)
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