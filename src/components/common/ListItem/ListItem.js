import React from "react"
import styles from "./ListItem.module.scss"
import cx from "classnames"
import { Link } from "react-router-dom"

export default function ListItem({
    children,
    className,
    header = false,
    link = ""
}) {
    return link ? (
        <Link to={link} className={cx(styles.root, className, styles.link)}>
            <div className="row h-100">{children}</div>
        </Link>
    ) : (
        <div className={cx(styles.root, className, header && styles.header)}>
            <div className="row h-100">{children}</div>
        </div>
    )
}
