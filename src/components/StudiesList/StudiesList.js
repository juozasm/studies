import React, { useContext } from "react"
import { StudiesContext } from "../../mocks/StudiesContextProvider"
import List from "../common/List"
import ListItem from "../common/ListItem"
import ListColumn from "../common/ListColumn"
import PageControl from "../common/PageControl"
import StudyNameWithImage from "./StudyNameWithImage/StudyNameWithImage"

export default function StudiesList() {
    const { studiesList } = useContext(StudiesContext)

    if (!studiesList || !studiesList.data || !studiesList.meta) return false

    const {
        current_page,
        last_page,
        per_page,
        total,
        from,
        to
    } = studiesList.meta

    console.log(studiesList)

    return (
        <List>
            <ListItem header>
                <ListColumn>{<p>Study</p>}</ListColumn>
                <ListColumn>{<p>Status</p>}</ListColumn>
                <ListColumn>{<p>Created</p>}</ListColumn>
                <ListColumn>{<p>Modified</p>}</ListColumn>
            </ListItem>
            {studiesList.data.map(
                (
                    {
                        id,
                        name,
                        statusKey,
                        createdAt,
                        updatedAt,
                        studyThumbnail,
                        imagesCount
                    },
                    studiesIndex
                ) => (
                    <ListItem key={id} link={`/list/${id}`}>
                        <ListColumn>
                            <StudyNameWithImage
                                images={Array(imagesCount)
                                    .fill(studyThumbnail)
                                    .map((el, i) => ({
                                        original: `${el}?random=${studiesIndex +
                                            i}`
                                        //thumbnail: `${el}?random=${i}`
                                    }))}
                                name={name}
                            />
                        </ListColumn>
                        <ListColumn>
                            <p>{statusKey}</p>
                        </ListColumn>
                        <ListColumn>
                            <p>{createdAt}</p>
                        </ListColumn>
                        <ListColumn>
                            <p>{updatedAt}</p>
                        </ListColumn>
                    </ListItem>
                )
            )}
            <PageControl
                perPage={per_page}
                from={from}
                to={to}
                currentPage={current_page}
                lastPage={last_page}
                total={total}
            />
        </List>
    )
}
