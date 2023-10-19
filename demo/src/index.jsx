import React from "react"
import {createRoot} from 'react-dom/client';
import WidthAutoLabel from '../../src/index'; // 引入组件

const App = () => {
    return (
        <div>
            <WidthAutoLabel/>
        </div>
    );
}
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App/>);