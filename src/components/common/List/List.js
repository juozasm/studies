import React from "react"
import styles from "./List.module.scss"

export default function List({ children }) {
    return <div className={styles.root}>{children}</div>
}
