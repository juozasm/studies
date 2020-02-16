import React from "react"
import styles from "./ListColumn.module.scss"
import cx from "classnames"

export default function ListColumn({ children, className }) {
    return <div className={cx(styles.root, className)}>{children}</div>
}
