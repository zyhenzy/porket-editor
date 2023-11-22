import React from "react"
import { createRoot } from 'react-dom/client';
import WidthAutoLabel from '../../src/index'; // 引入组件
import './index.scss';
// import WidthAutoLabel from 'text-width-auto-label';

const App = () => {
    return (
        <div className="container">
            <div className="style3">
                <WidthAutoLabel>my name is porket editor</WidthAutoLabel>
            </div>
        </div>
    );
}
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
