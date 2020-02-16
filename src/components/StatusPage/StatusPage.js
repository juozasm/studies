import React from "react"
import { useParams, Link } from "react-router-dom"
import styles from "./StatusPage.module.scss"

function getStatusMsg(status) {
    switch (status) {
        case "404":
            return "404 Page not found."
        default:
            return `${status} Something went wrong`
    }
}
export default function StatusPage() {
    const { status } = useParams()
    return (
        <div className={styles.root}>
            <Link to="/" className={styles.backBtn}>
                &laquo; Back to home
            </Link>
            <h1>{getStatusMsg(status)}</h1>
        </div>
    )
}
