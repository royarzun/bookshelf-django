export const getBooks = () => fetch("/api/v1/books").then(res => res.json());

export const getBookDetails = id =>
  fetch(`/api/v1/books/${id}`).then(res => res.json());
