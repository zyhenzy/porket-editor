import {FC, MutableRefObject, useEffect, useRef, useState} from "react";
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
    // const [toLeft,setToLeft] = useState(false) // 菜单偏左显示
    // const [toTop,setToTop] = useState(false) // 菜单偏上显示
    const editor = useSlate()
    const menuRef: MutableRefObject<HTMLDivElement | null> = useRef(null);

    useEffect(() => {
        const parentEl = menuRef?.current?.parentElement
        // 右键事件监听
        parentEl?.addEventListener("contextmenu", showMenu)
        document.addEventListener("click", hideMenu)
        return () => {
            // 组件卸载移除事件监听
            parentEl?.removeEventListener("contextmenu", showMenu)
            document.removeEventListener("click", hideMenu)
        }
    }, [])

    const showMenu = (event: MouseEvent) => {
        const currentEl = menuRef?.current
        const parentEl = menuRef?.current?.parentElement
        if (currentEl && parentEl) {
            event.preventDefault()
            // 在 Chrome 浏览器中，layerX 和 offsetX 在右键点击事件上可能会出现差异。
            // 这是因为右键点击事件的 offsetX 值是相对于触发事件的元素的内部坐标系，
            // 而 layerX 的计算方式可能会受到鼠标指针相对于事件元素的祖先元素的影响。
            const rect = parentEl.getBoundingClientRect();
            const offsetX = event.clientX - rect.left;
            const offsetY = event.clientY - rect.top;
            const toLeft = (offsetX + currentEl.offsetWidth) > parentEl.offsetWidth
            const toTop = (offsetY + currentEl.offsetHeight) > parentEl.offsetHeight
            // console.log(event)
            if (toLeft) {
                setLeft(parentEl.offsetWidth - currentEl.offsetWidth + parentEl.offsetLeft)
            } else {
                setLeft(event.pageX)
            }
            if (toTop) {
                setTop(parentEl.offsetHeight - currentEl.offsetHeight + parentEl.offsetTop)
            } else {
                setTop(event.pageY)
            }
            setVisible(true)
        }
    }

    // 隐藏菜单
    const hideMenu = (event: MouseEvent) => {
        // setTop(-9999)
        // setLeft(-9999)
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
            case 'test':
                PEditor.test(editor)
        }
    }

    return (
        <div
            ref={menuRef}
            className={styles.contextMenu}
            style={{
                visibility: visible ? "inherit" : "hidden",
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
        </div>
    );
};

export default ContextMenu