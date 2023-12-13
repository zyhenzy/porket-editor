import React from 'react'
import PInput from "../porket/porket-input/PInput";
import PArea from "../porket/porket-area/PArea";

const Element = (props: any) => {
    const { attributes, children, element } = props
    switch (element.type) {
        case 'input':
            return <PInput {...props} />
        case 'area':
            return <PArea {...props} />
        default:
            return <DefaultElement {...props} />
    }
}

const DefaultElement = (props:any) => {
    return <p {...props.attributes}>{props.children}</p>
}

export default Element;
