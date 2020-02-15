import React, { useContext } from "react"
import { useParams } from "react-router-dom"
import { StudiesContext } from "../../mocks/StudiesContextProvider"
import ImageGallery from "react-image-gallery"
import styles from "./StudyView.module.scss"

export default function StudyView() {
    const { studyId } = useParams()
    const { studiesDetails } = useContext(StudiesContext)
    if (
        !studiesDetails ||
        !studiesDetails.data ||
        !studiesDetails.meta ||
        !studiesDetails.meta.study
    )
        return false
    const { id } = studiesDetails.meta.study
    if (id !== studyId) return false

    return (
        <div>
            <ImageGallery
                items={studiesDetails.data.map((item, i) => ({
                    original: `${item.original}?random=${i}`,
                    thumbnail: `${item.thumbnail}?random=${i}`
                }))}
            />
        </div>
    )
}
