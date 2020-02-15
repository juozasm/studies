import React from "react"
import styles from "./StudyNameWithImage.module.scss"
import ImageGallery from "react-image-gallery"

export default function StudyNameWithImage({ images = [], name = "" }) {
    return (
        <div className={styles.root}>
            <ImageGallery items={images} />
            <p>{name}</p>
        </div>
    )
}
