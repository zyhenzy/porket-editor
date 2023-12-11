import {FC, useEffect, useState} from "react";
import {Editor, Path} from "slate";
import ReactDOM from "react-dom";
import styles from "./contextMenu.module.scss";
import React from "react";
import {HistoryEditor} from "slate-history";
import type {IMenu} from "./contextMenu.config";
import {menus} from "./contextMenu.config";
import {useSlate} from "slate-react";
import {isMarkActive, toggleMark} from "../../utils";

interface ContextMenuProps {
    // editor: HistoryEditor;
}

const ContextMenu: FC<ContextMenuProps> = () => {

    const [visible, setVisible] = useState(false);
    const [top, setTop] = useState(-9999)
    const [left, setLeft] = useState(-9999)

    useEffect(() => {
        // 右键事件监听
        document.addEventListener("contextmenu", showMenu)
        document.addEventListener("click", hideMenu)
        return () => {
            // 组件卸载移除事件监听
            document.removeEventListener("contextmenu", showMenu)
            document.removeEventListener("click", hideMenu)
        }
    }, [])

    // 显示菜单
    const showMenu = (event: MouseEvent) => {
        event.preventDefault()
        setTop(event.pageY)
        setLeft(event.pageX)
        setVisible(true)
    }

    // 隐藏菜单
    const hideMenu = (event: MouseEvent) => {
        setVisible(false)
    }

    return ReactDOM.createPortal(
        <div
            className={styles.contextMenu}
            style={{
                display: visible ? "flex" : "none",
                left: `${left - 120}px`,
                top: `${top - 45}px`,
            }}
        >
            {menus.map(i => {
                return <MarkButton {...i}/>
            })}
        </div>,
        document.body
    );
};

const MarkButton = (menu: IMenu) => {
    const editor = useSlate()
    const className = `${styles.menuItem} ${isMarkActive(editor,menu.format)?styles.menuItemActive:''}`;
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

export default ContextMenu