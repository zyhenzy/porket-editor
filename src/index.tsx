import React from 'react';

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
        <div style={{color:'yellowgreen'}}>{children}</div>
    )
}

export default PorketEditor;
