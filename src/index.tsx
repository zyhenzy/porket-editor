import React from 'react';

interface WidthAutoLabelProps {
    children: string;  // 要绘制的文本
}

/**
 * 文本宽度自适应标签组件
 * @param props
 * @constructor
 */
const WidthAutoLabel = (props: WidthAutoLabelProps) => {
    const { children = '' } = props;

    return (
        <div style={{color:'yellowgreen'}}>{children}</div>
    )
}

export default WidthAutoLabel;
