import React from 'react';
import styles from './index.module.scss';

interface PorketEditorProps {
    children: string;  // 要绘制的文本
}

/**
 * 文本宽度自适应标签组件
 * @param props
 * @constructor
 */
const PorketEditor = (props: PorketEditorProps) => {
    const { children = '' } = props;

    return (
        <div className={styles.abc}>{children}</div>
    )
}

export default PorketEditor;
