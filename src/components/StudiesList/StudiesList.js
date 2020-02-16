import React, { useContext, useState, useCallback } from "react"
import { StudiesContext } from "../../mocks/StudiesContextProvider"
import { Redirect } from "react-router-dom"

import List from "../common/List"
import ListItem from "../common/ListItem"
import ListColumn from "../common/ListColumn"
import PageControl from "../common/PageControl"
import styles from "./StudiesList.module.scss"
import moment from "moment"
import cx from "classnames"

function getTags(data) {
    const tagsSet = new Set()

    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].tags.length; j++) {
            tagsSet.add(data[i].tags[j])
        }
    }
    return [...tagsSet]
}

export default function StudiesList() {
    const { studiesList } = useContext(StudiesContext)
    const [searchString, setSearchString] = useState("")
    const [activeTags, setActiveTags] = useState([])
    const [finishedFilter, setFinishedFilter] = useState(false)

    const handleTagFilter = useCallback(
        tag =>
            activeTags.includes(tag)
                ? setActiveTags(activeTags.filter(t => t !== tag))
                : setActiveTags([...activeTags, tag]),
        [activeTags]
    )

    if (!studiesList || !studiesList.data || !studiesList.meta)
        return <Redirect to={"/error/501"} />

    const { current_page, last_page, per_page, total } = studiesList.meta

    const tags = getTags(studiesList.data).map(tag => (
        <div
            className={cx(
                styles.tagFilter,
                activeTags.includes(tag) && styles.active
            )}
            key={tag}
            onClick={() => handleTagFilter(tag)}
        >
            {tag}
        </div>
    ))

    const studiesSelected = studiesList.data.filter(item => {
        if (
            searchString &&
            !item.name.includes(searchString) &&
            !item.tags.some(t => t.includes(searchString))
        )
            return false
        if (
            activeTags.length > 0 &&
            !activeTags.every(activeTag => item.tags.includes(activeTag))
        )
            return false
        if (finishedFilter && item.statusKey !== "finished") return false
        return true
    })

    return (
        <div className={cx("container", styles.root)}>
            <List>
                <ListItem header>
                    <ListColumn className="col-lg-5 justify-content-center">
                        Study
                    </ListColumn>
                    <ListColumn className="col-lg-1 justify-content-center">
                        Status
                    </ListColumn>
                    <ListColumn className="col-lg-1 justify-content-center">
                        Created
                    </ListColumn>
                    <ListColumn className="col-lg-1 justify-content-center">
                        Modified
                    </ListColumn>
                    <ListColumn className="col-lg-4 justify-content-center">
                        Tags
                    </ListColumn>
                </ListItem>
                <ListItem className={styles.controls}>
                    <ListColumn className="col-lg-5">
                        <div className={styles.control}>
                            <label>Search</label>
                            <input
                                onChange={e => setSearchString(e.target.value)}
                                type="text"
                                name="searchStudies"
                            />
                        </div>
                    </ListColumn>
                    <ListColumn className="col-lg-1">
                        <div className={styles.control}>
                            <label>Finished</label>
                            <input
                                onChange={e =>
                                    setFinishedFilter(e.target.checked)
                                }
                                checked={finishedFilter}
                                type="checkbox"
                                name="finished"
                            />
                        </div>
                    </ListColumn>
                    <ListColumn className="col-lg-offset-2 col-lg-4">
                        <div className={styles.tags}>{tags}</div>
                    </ListColumn>
                </ListItem>
                {studiesSelected.map(
                    (
                        {
                            id,
                            name,
                            statusKey,
                            createdAt,
                            updatedAt,
                            studyThumbnail,
                            tags
                        },
                        i
                    ) => (
                        <ListItem key={id} link={`/studies/${id}`}>
                            <ListColumn className="col-lg-5">
                                <div className={styles.study}>
                                    <img
                                        src={`${studyThumbnail}?random${i}`}
                                        alt={name}
                                    />
                                    <div>{name}</div>
                                </div>
                            </ListColumn>
                            <ListColumn className="col-lg-1">
                                {statusKey}
                            </ListColumn>
                            <ListColumn className="col-lg-1">
                                {moment(createdAt).format("YYYY-MM-DD")}
                            </ListColumn>
                            <ListColumn className="col-lg-1">
                                {moment(updatedAt).format("YYYY-MM-DD")}
                            </ListColumn>
                            <ListColumn className="col-lg-4">
                                <div>
                                    {tags.map((tag, i) => (
                                        <div
                                            className={cx(
                                                styles.tag,
                                                activeTags.includes(tag) &&
                                                    styles.active
                                            )}
                                            key={i}
                                        >
                                            {tag}
                                        </div>
                                    ))}
                                </div>
                            </ListColumn>
                        </ListItem>
                    )
                )}
                <PageControl
                    currentPage={current_page}
                    lastPage={last_page}
                    total={total}
                />
            </List>
        </div>
    )
}
