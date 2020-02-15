import React from "react"
import styles from "./ListItem.module.scss"
import cx from "classnames"

export default function ListItem({ children, header = false }) {
    return (
        <div className={cx(styles.root, header && styles.header)}>
            {children}
        </div>
    )
}
