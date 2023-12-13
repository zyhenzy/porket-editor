import React from 'react'
import styles from './PArea.module.scss'

const PArea = (props: any) => {
    return (
        <div className={styles.PArea}>
            <span>{props.children}</span>
        </div>
    )
}

export default PArea;
