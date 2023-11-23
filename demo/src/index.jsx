import React from "react"
import { createRoot } from 'react-dom/client';
import styles from './index.module.scss';
import PorketEditor from '../../src/index'; // 引入组件
// import PorketEditor from 'porket-editor';
// import "porket-editor/lib/index.min.css";

const App = () => {
    return (
        <div className={styles.container}>
            <div>
                <PorketEditor>my name is porket editor</PorketEditor>
            </div>
        </div>
    );
}
const container = document.getElementById('root');
// @ts-ignore
const root = createRoot(container);
root.render(<App />);
