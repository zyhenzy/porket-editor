// 导入 React 模块
import * as React from 'react';

interface PorketEditorProps {
    children: string;  // 要绘制的文本
}

// 导出按钮组件类型
declare const PorketEditor: React.ComponentType<PorketEditorProps>;

// 导出按钮组件
export default PorketEditor;