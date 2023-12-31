import {FC, MutableRefObject, useEffect, useRef, useState} from "react";
import {createEditor, Editor, Path} from "slate";
import ReactDOM from "react-dom";
import styles from "./contextMenu.module.scss";
import React from "react";
import {HistoryEditor} from "slate-history";
import {colorBack, colorFont, menus} from "./contextMenu.config";
import type {IMenu} from "./contextMenu.config";
import {PEditor} from "../../porket";
import {useSlate} from "slate-react";

interface ContextMenuProps {
    areaRef: MutableRefObject<HTMLDivElement | null>
}

/**
 * 自定义右键菜单
 * @param areaRef 生效范围
 * @constructor
 */
const ContextMenu: FC<ContextMenuProps> = ({areaRef}) => {

    const [visible, setVisible] = useState(false);
    const [top, setTop] = useState(20)
    const [left, setLeft] = useState(20)
    const menuRef: MutableRefObject<HTMLDivElement | null> = useRef(null);

    useEffect(() => {
        const parentEl = areaRef?.current
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
        const areaEl = areaRef.current // 菜单使用范围
        const menuEl = menuRef?.current // 菜单Dom
        if (areaEl && menuEl) {
            event.preventDefault()
            const areaRect = areaEl.getBoundingClientRect();
            const menuRect = menuEl.getBoundingClientRect();
            if (event.clientX + menuRect.width > areaRect.width + areaRect.left) {
                setLeft(areaRect.width + areaRect.left - menuRect.width)
            } else {
                setLeft(event.clientX)
            }
            const overScreen = event.clientY + menuRect.height > window.innerHeight // 是否超出屏幕
            const overArea = event.clientY + menuRect.height > areaRect.height + areaRect.top // 是否超出菜单使用区域
            if (overArea && overScreen) {
                // console.log('------俩都超出了------')
                const x1 = window.innerHeight - menuRect.height
                const x2 = areaRect.height + areaRect.top - menuRect.height
                setTop(x1 > x2 ? x2 : x1)
            } else if (overArea) {
                // console.log('------超出area触发------')
                setTop(areaRect.height + areaRect.top - menuRect.height)
            } else if (overScreen) {
                // console.log('------超出屏幕触发------')
                setTop(window.innerHeight - menuRect.height)
            } else {
                setTop(event.clientY)
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

    return ReactDOM.createPortal(
        <div
            ref={menuRef}
            className={styles.contextMenu}
            style={{
                position: 'fixed',
                visibility: visible ? "inherit" : "hidden",
                left: `${left}px`,
                top: `${top}px`,
            }}
        >
            {menus.map(i => <MenuItem menu={i} areaRef={areaRef} menuRef={menuRef} key={i.value}/>)}
        </div>,
        document.body
    );

};

/**
 * 菜单项组件
 * @param menu 菜单项数据
 * @param areaRef
 * @param menuRef
 */
const MenuItem = ({menu,areaRef,menuRef}:{menu: IMenu, areaRef: any, menuRef: any}) => {
    const menuItemHeight = 28
    const menuItemWidth = 130
    const editor = useSlate()
    const [showSubMenu, setShowSubMenu] = useState(false);
    const [top, setTop] = useState(0)
    const [left, setLeft] = useState(menuItemWidth)
    const menuItemRef: MutableRefObject<HTMLDivElement | null> = useRef(null); // 当前菜单项节点
    const subMenuRef: MutableRefObject<HTMLDivElement | null> = useRef(null); // 子菜单节点

    // 显示格式子菜单
    const handleShowFormat = () => {
        const menuEl = menuRef.current
        const menuItemEl = menuItemRef.current
        const subMenuEl = subMenuRef.current
        const areaEl = areaRef.current
        if (menuEl && areaEl && subMenuEl && menuItemEl) {
            const areaRect = areaEl.getBoundingClientRect();
            const menuRect = menuEl.getBoundingClientRect();
            const menuItemRect = menuItemEl.getBoundingClientRect();
            const subMenuRect = subMenuEl.getBoundingClientRect();
            if (menuRect.width + subMenuRect.width + menuRect.left > areaRect.width + areaRect.left) {
                setLeft(-subMenuRect.width)
            } else {
                setLeft(menuItemWidth)
            }
            const overScreen = menuItemRect.top + subMenuRect.height > window.innerHeight // 是否超出屏幕
            const overArea = menuItemRect.top + subMenuRect.height > areaRect.height + areaRect.top // 是否超出菜单使用区域
            if (overScreen || overArea) {
                const t = menuItemHeight - subMenuRect.height + 8
                setTop(t)
            } else {
                setTop(0)
            }

            setShowSubMenu(true);
        }
    };

    // 隐藏格式子菜单
    const handleHideFormat = () => {
        setShowSubMenu(false);
    };

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
        <div ref={menuItemRef}
             key={menu.value}
             className={styles.menuItem}
             onMouseEnter={() => handleShowFormat()}
             onMouseLeave={() => handleHideFormat()}>
            <div
                className={styles.menuText}
                onClick={(event) => handleMenuClick(menu, event)}
                style={{
                    height: `${menuItemHeight}px`,
                    width: `${menuItemWidth}px`
                }}
            >
                <span>{menu.title}</span>
                {(menu.children || menu.value === 'color') && <span>&rsaquo;</span>}
            </div>

            {menu.line && <div className={styles.line}/>}

            {menu.children && <div ref={subMenuRef} className={styles.contextMenu} style={{
                visibility: showSubMenu ? "inherit" : "hidden",
                left: `${left}px`,
                top: `${top}px`,
            }}>
                {menu.children.map(i => <MenuItem menu={i} areaRef={areaRef} menuRef={menuRef} key={i.value} />)}
            </div>}
            {menu.value === 'color' &&
            <div
                ref={subMenuRef}
                className={styles.colorMenu}
                style={{
                    visibility: showSubMenu ? "inherit" : "hidden",
                    left: `${left}px`,
                    top: `${top}px`,
                }}>
                {colorMenu()}
            </div>
            }
        </div>
    )
}

// 颜色菜单
const colorMenu = () => {
    /**
     * 设置字体颜色
     * @param hex
     */
    const handleColor = (hex: string) => {

    };

    /**
     * 设置背景颜色
     * @param hex
     */
    const handleBackColor = (hex: string) => {

    };

    /**
     * 清除颜色
     */
    const handleClearColor = () => {

    };

    return <>
        <div className={styles.colorBox}>
            {colorFont.map((item) => {
                return (
                    <div
                        className={styles.fontColorItem}
                        key={item.value}
                        style={{color: item.value}}
                        onClick={() => handleColor(item.value)}
                    >
                        A
                    </div>
                );
            })}
        </div>
        <div className={styles.colorBox}>
            {colorBack.map((item) => {
                return (
                    <div
                        className={styles.backColorItem}
                        key={item.value}
                        style={{backgroundColor: item.value}}
                        onClick={() => handleBackColor(item.value)}
                    />
                );
            })}
        </div>
        <div className={styles.clearBtn} onClick={() => handleClearColor()}>清除颜色</div>
    </>
}


export default ContextMenu