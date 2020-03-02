export const getBooks = () => fetch("/api/v1/books").then(res => res.json());
