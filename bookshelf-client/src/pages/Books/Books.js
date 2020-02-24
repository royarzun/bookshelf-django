import React from "react";
import Book from "../../components/Book";

const Books = ({ books = [] }) => {
  return (
    <ul>
      {books.map(book => (
        <li key={book.isbn}>
          <Book {...book} />
        </li>
      ))}
    </ul>
  );
};

export default Books;
