import React from 'react'
import {useFocused, useSelected} from "slate-react";
import styles from './PInput.module.scss'

const PInput = ({attributes, children}: any) => {
    const selected = useSelected()
    const focused = useFocused()

    const style: React.CSSProperties = {
        boxShadow: selected && focused ? '0 0 0 2px #B4D5FF' : 'none',
    }

    return (
        /*
          Note that this is not a true button, but a span with button-like CSS.
          True buttons are display:inline-block, but Chrome and Safari
          have a bad bug with display:inline-block inside contenteditable:
          - https://bugs.webkit.org/show_bug.cgi?id=105898
          - https://bugs.chromium.org/p/chromium/issues/detail?id=1088403
          Worse, one cannot override the display property: https://github.com/w3c/csswg-drafts/issues/3226
          The only current workaround is to emulate the appearance of a display:inline button using CSS.
        */
        <span
            {...attributes}
            onClick={ev => ev.preventDefault()}
            // Margin is necessary to clearly show the cursor adjacent to the button
            style={style}
            className={styles.PInput}
        >
            <InlineChromiumBugfix/>
            {children}
            <InlineChromiumBugfix/>
        </span>
    )
}

// Put this at the start and end of an inline component to work around this Chromium bug:
// https://bugs.chromium.org/p/chromium/issues/detail?id=1249405
const InlineChromiumBugfix = () => (
    <span
        contentEditable={false}
        style={{fontSize: 0}}
    >
        {String.fromCodePoint(160) /* Non-breaking space */}
    </span>
)

export default PInput;
