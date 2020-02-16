import React from "react"
import ReactPaginate from "react-paginate"
import styles from "./PageControl.module.scss"

export default function PageControl({ total, currentPage, lastPage }) {
    return (
        <div className={styles.root}>
            <div className={styles.total}>Total results: {total}</div>
            <ReactPaginate
                previousLabel={<span>&laquo;</span>}
                nextLabel={<span>&raquo;</span>}
                breakLabel={"..."}
                breakClassName={styles.break}
                pageCount={lastPage}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={data => console.log(data)}
                initialPage={currentPage - 1}
                containerClassName={styles.pagination}
                subContainerClassName={styles.subPagination}
                activeClassName={styles.active}
            />
        </div>
    )
}
