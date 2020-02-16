import React, { useContext } from "react"
import { Link, Redirect } from "react-router-dom"
import { useParams } from "react-router-dom"
import { StudiesContext } from "../../mocks/StudiesContextProvider"
import ImageGallery from "react-image-gallery"
import styles from "./StudyView.module.scss"
import cx from "classnames"
import moment from "moment"
import ListItem from "../common/ListItem"
import ListColumn from "../common/ListColumn"

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
    const {
        id,
        name,
        createdAt,
        updatedAt,
        statusKey
    } = studiesDetails.meta.study
    if (id !== studyId) return <Redirect to={"/error/404"} />

    // "name": "Study",
    // "id": "5YyOD81QaLkPoxJvenZA",
    // "analysisType": "WEB",
    // "webPageType": "GENERAL",
    // "createdAt": "2020-02-10T19:22:08+00:00",
    // "updatedAt": "2020-02-10T19:23:42+00:00",
    // "statusKey": "finished"
    return (
        <div className={cx("container", styles.root)}>
            <Link to="/studies" className={styles.backBtn}>
                &laquo; Back to studies
            </Link>
            <ImageGallery
                showPlayButton={false}
                additionalClass={styles.gallery}
                items={studiesDetails.data.map((item, i) => ({
                    original: `${item.original}?random=${i}`,
                    thumbnail: `${item.thumbnail}?random=${i}`
                }))}
            />
            <h1 className={styles.title}>{name}</h1>
            <div className={styles.table}>
                <ListItem>
                    <ListColumn className="col-xs-6 justify-content-center">
                        Status
                    </ListColumn>
                    <ListColumn className="col-xs-6 justify-content-center">
                        {statusKey}
                    </ListColumn>
                </ListItem>
                <ListItem>
                    <ListColumn className="col-xs-6 justify-content-center">
                        Created at
                    </ListColumn>
                    <ListColumn className="col-xs-6 justify-content-center">
                        {moment(createdAt).format("YYYY-MM-DD")}
                    </ListColumn>
                </ListItem>
                <ListItem>
                    <ListColumn className="col-xs-6 justify-content-center">
                        Updated at
                    </ListColumn>
                    <ListColumn className="col-xs-6 justify-content-center">
                        {moment(updatedAt).format("YYYY-MM-DD")}
                    </ListColumn>
                </ListItem>
            </div>
        </div>
    )
}
