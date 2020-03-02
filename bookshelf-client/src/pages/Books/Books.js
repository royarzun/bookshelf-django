import React, { useEffect, useState } from "react";
import WithHeader from "../../layouts/WithHeader";
import Book from "../../components/Book";
import { getBooks } from "../../services/api";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getBooks()
      .then(res => {
        setLoading(false);
        setBooks(res.books);
      })
      .catch(err => {
        setLoading(false);
      });
  }, []);

  return (
    <WithHeader>
      <ul className="max-w-screen-xl mx-auto my-12 flex flex-wrap justify-center">
        {!isLoading
          ? books.map(book => (
              <li key={book.id} className="w-1/2 md:w-1/4">
                <Book {...book} />
              </li>
            ))
          : [...new Array(16)].map((_book, index) => (
              <li key={index} className="w-1/2 md:w-1/4">
                <Book placeholder />
              </li>
            ))}
      </ul>
    </WithHeader>
  );
};

export default Books;
