import Link from 'next/link';

function NewsPagination({ currentPage, totalPageCount, baseUrl }) {

    console.log(baseUrl);
    const generatePageLink = (page) => {

        if (page === 1) {
            return baseUrl;
        }

        if (baseUrl.includes('?')) {
            return `${baseUrl}&page=${page}`;
        } else {
            return `${baseUrl}?page=${page}`;
        }
    };

    // Calculate page numbers to display
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPageCount, currentPage + 2);

    // Adjust if near start
    if (currentPage === 1 || currentPage === 2) {
        endPage = 3;
    }

    // Adjust if near end
    if (currentPage === totalPageCount || currentPage === totalPageCount - 1) {
        startPage = totalPageCount - 2;
    }

    let pagesToShow = Array.from({ length: endPage - startPage + 1 }, (_, i) => i + startPage);
    if (totalPageCount === 2) {
        pagesToShow = [1, 2]
    }

    return (
        <div className="row justify-center pt-60 lg:pt-40">
            <div className="col-auto">
                <div className="pagination -buttons">
                    {currentPage !== 1 && (
                        <button className="pagination__button -prev">
                            <Link href={generatePageLink(currentPage - 1)}>
                                <i className="icon icon-chevron-left"></i>
                            </Link>
                        </button>
                    )}

                    <div className="pagination__count">
                        {/* Display the first page if not already shown */}
                        {!pagesToShow.includes(1) && (
                            <>
                                <Link href={generatePageLink(1)}>1</Link>
                                {startPage > 2 && <span>...</span>}
                            </>
                        )}
                        {pagesToShow.map(page => (
                            <Link key={page} href={generatePageLink(page)} className={currentPage === page ? "-count-is-active" : ""}>
                                {page}
                            </Link>
                        ))}
                        {/* Display the last page if not already shown */}
                        {!pagesToShow.includes(totalPageCount) && (
                            <>
                                {endPage < totalPageCount - 1 && <span>...</span>}
                                <Link href={generatePageLink(totalPageCount)}>
                                    {totalPageCount}
                                </Link>
                            </>
                        )}
                    </div>

                    {currentPage !== totalPageCount && (
                        <button className="pagination__button -next">
                            <Link href={generatePageLink(currentPage + 1)}>
                                <i className="icon icon-chevron-right"></i>
                            </Link>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
export default NewsPagination;

