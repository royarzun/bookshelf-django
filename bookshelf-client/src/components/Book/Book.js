import React from "react";

const Book = ({ isbn, title, image, isReserved }) => {
  return (
    <div>
      <img src={image} alt="title" />
      <h3>{title}</h3>
    </div>
  );
};

export default Book;
