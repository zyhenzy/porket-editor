// 导入 React 模块
import * as React from 'react';

declare module '*.scss' {
    const content: any;
    export default content;
}
