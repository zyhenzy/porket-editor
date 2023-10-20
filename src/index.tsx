import React, {useEffect, useMemo, useRef, useState} from 'react';
import {createEditor, Descendant} from 'slate' // Import the Slate editor factory.
import { Slate, Editable, withReact } from 'slate-react' // Import the Slate components and React plugin.

// const initialValue = [
//     {
//         type: 'paragraph',
//         children: [{ text: 'A line of text in a paragraph.' }],
//     },
// ]

/**
 * 根组件
 * @constructor
 */
const App = (props) => {
    // const [editor] = useState(() => withReact(createEditor()))
    return (
        <div>
            {props.text}
            {/*<Slate editor={editor} initialValue={initialValue} >*/}
            {/*    <Editable/>*/}
            {/*</Slate>*/}
        </div>
    )
}

export default App;