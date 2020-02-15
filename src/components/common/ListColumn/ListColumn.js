import React from "react"
import styles from "./ListColumn.module.scss"

export default function ListColumn({ children }) {
    return <div className={styles.root}>{children}</div>
}
