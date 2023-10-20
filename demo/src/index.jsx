import React from "react"
import {createRoot} from 'react-dom/client';
// import PorketEditor from '../../src/index'; // 引入组件
import PorketEditor from 'porket-editor'; // 引入node-modules中的组件


const App = () => {
    return (
        <div>
            <PorketEditor text={'我是自定义组件'}/>
        </div>
    );
}
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App/>);