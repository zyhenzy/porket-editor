import {FC, useEffect, useState} from "react";
import {createEditor, Editor, Path} from "slate";
import ReactDOM from "react-dom";
import styles from "./contextMenu.module.scss";
import React from "react";
import {HistoryEditor} from "slate-history";
import {menus} from "./contextMenu.config";
import type {IMenu} from "./contextMenu.config";
import {PEditor} from "../../porket";
import {useSlate} from "slate-react";

interface ContextMenuProps {
    // editor: HistoryEditor;
}

const ContextMenu: FC<ContextMenuProps> = () => {

    const [visible, setVisible] = useState(false);
    const [top, setTop] = useState(-9999)
    const [left, setLeft] = useState(-9999)
    const editor = useSlate()

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

    /**
     * 点击菜单项
     * @param menu
     * @param event
     */
    const handleMenuClick = ({value}: IMenu, event: React.MouseEvent<HTMLDivElement>) => {
        switch (value) {
            case 'add-area':
                PEditor.addArea(editor)
                break;
            case 'add-input':
                PEditor.addInput(editor)
                break;
        }
    }

    return ReactDOM.createPortal(
        <div
            className={styles.contextMenu}
            style={{
                display: visible ? "flex" : "none",
                left: `${left}px`,
                top: `${top}px`,
            }}
        >
            {menus.map(i => {
                return <div
                    className={styles.menuItem}
                    key={i.value}
                    onClick={(event) => handleMenuClick(i, event)}
                >{i.title}</div>
            })}
        </div>,
        document.body
    );
};

export default ContextMenu