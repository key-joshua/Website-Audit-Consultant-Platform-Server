interface PaginationInterface {
    previousPage: number | null;
    nextPage: number | null;
    currentPage: number;
    totalPages: number;
    limitPage: number;
}

export const paginationUtils = (page: number = 1, limit: number = 100, count: number): PaginationInterface => {
    const limitPage = limit;
    const currentPage = page;
    const totalPages = Math.ceil(count / limit);
    const previousPage = page > 1 ? page - 1 : null;
    const nextPage = page < totalPages ? page + 1 : null;

    return { totalPages, nextPage, previousPage, currentPage, limitPage };
};
