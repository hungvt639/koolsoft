import React, { Fragment } from "react";

const Pagination = ({ total, page, setPage, limit }) => {
    // const [pagination, setPagination] = useState(countPage(total, page));
    function countPage(total, page) {
        let sum_page = Math.ceil(total / limit);
        let pages = [
            page - 3,
            page - 2,
            page - 1,
            page,
            page + 1,
            page + 2,
            page + 3,
        ];
        pages = pages.filter((p) => p > 0 && p <= sum_page);

        return pages;
    }
    function hasNext(total, page) {
        let sum_page = Math.ceil(total / limit);
        let next = true;
        if (page >= sum_page) {
            next = false;
        }
        return next;
    }
    function hasPrev(page) {
        // console.log("page", page, total);
        let prev = true;
        if (page <= 1) {
            prev = false;
        }
        return prev;
    }
    // console.log(pagina.tion);
    return (
        <div className="pagination">
            {hasPrev(page) ? (
                <button onClick={() => setPage(page - 1)}> &laquo;Prev </button>
            ) : (
                <Fragment />
            )}
            {countPage(total, page).length ? (
                countPage(total, page).map((p, i) => {
                    return (
                        <button
                            className={page === p ? "page-now" : ""}
                            onClick={() => setPage(p)}
                            key={i}
                        >
                            {p}
                        </button>
                    );
                })
            ) : (
                <Fragment />
            )}
            {hasNext(total, page) ? (
                <button onClick={() => setPage(page + 1)}> Next&raquo; </button>
            ) : (
                <Fragment />
            )}
        </div>
    );
};
export default Pagination;
