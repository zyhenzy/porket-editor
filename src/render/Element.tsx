import React from 'react'
import PInput from "../porket/porket-input/PInput";
import CodeElement from "../porket/porket-code/PCode";

const Element = (props: any) => {
    const { attributes, children, element } = props
    switch (element.type) {
        case 'input':
            return <PInput {...props} />
        case 'code':
            return <CodeElement {...props} />
        default:
            return <DefaultElement {...props} />
    }
}

const DefaultElement = (props:any) => {
    return <p {...props.attributes}>{props.children}</p>
}

export default Element;
