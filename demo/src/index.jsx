import React from "react"
import { createRoot } from 'react-dom/client';
// import PorketEditor from '../../src/index'; // 引入组件
import './index.scss';
import PorketEditor from 'porket-editor';

const App = () => {
    return (
        <div className="container">
            <div className="style3">
                <PorketEditor>my name is porket editor</PorketEditor>
            </div>
        </div>
    );
}
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
