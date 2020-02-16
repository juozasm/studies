import React from "react"
import styles from "./List.module.scss"
import cx from "classnames"

export default function List({ children, className }) {
    return <div className={cx(styles.root, className)}>{children}</div>
}
