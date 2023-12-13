import {FC, useEffect, useState, useRef} from "react";
import ReactDOM from "react-dom";
import styles from "./hoveringToolbar.module.scss";
import React from "react";
import type {IHoverToolbar} from "./hoveringToolbar.config";
import {hoverToolbar} from "./hoveringToolbar.config";
import {useFocused, useSlate} from "slate-react";
import {Editor, Range} from 'slate'
import {isMarkActive, toggleMark} from "../../utils";

interface ContextMenuProps {
    // editor: HistoryEditor;
}

const HoveringToolbar: FC<ContextMenuProps> = () => {

    const editor = useSlate()
    const inFocus = useFocused()
    const ref = useRef<HTMLDivElement | null>()
    const [visible, setVisible] = useState(false);
    const [top, setTop] = useState(-9999)
    const [left, setLeft] = useState(-9999)

    useEffect(() => {
        const el = ref.current
        const {selection} = editor
        if (!el) {
            return
        }
        if (
            !selection ||
            !inFocus ||
            Range.isCollapsed(selection) ||
            Editor.string(editor, selection) === ''
        ) {
            hideMenu()
            return
        } else {
            showMenu()
        }
    })

    // 显示菜单
    const showMenu = () => {
        const el = ref.current
        const domSelection = window.getSelection()
        const domRange = domSelection?.getRangeAt(0)
        const rect = domRange?.getBoundingClientRect()
        // @ts-ignore
        const top = rect.top + window.pageYOffset - el.offsetHeight
        // @ts-ignore
        const left = rect.left + window.pageXOffset - el.offsetWidth / 2 + rect.width / 2
        setTop(top)
        setLeft(left)
        setVisible(true)
    }

    // 隐藏菜单
    const hideMenu = () => {
        setVisible(false)
    }

    return ReactDOM.createPortal(
        <div
            // @ts-ignore
            ref={ref}
            className={styles.hoveringToolbar}
            style={{
                display: visible ? "flex" : "none",
                left: `${left}px`,
                top: `${top}px`,
            }}
        >
            {hoverToolbar.map(i => {
                return <MarkButton key={i.format} {...i}/>
            })}
        </div>,
        document.body
    );
};

const MarkButton = (menu: IHoverToolbar) => {
    const editor = useSlate()
    const className = `${styles.menuItem} ${isMarkActive(editor, menu.format) ? styles.menuItemActive : ''}`;
    return (
        <div
            key={menu.format}
            className={className}
            onMouseDown={event => {
                event.preventDefault()
                toggleMark(editor, menu.format)
            }}
        >{menu.title}</div>
    )
}

export default HoveringToolbar