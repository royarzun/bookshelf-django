import React from "react";

const Book = ({
  id,
  name,
  isbn,
  cover_img_url,
  likes,
  likes_count,
  created_at,
  comments,
  description,
  tags,
  isAvailable,
  placeholder
}) => {
  return (
    <div className="bg-white border rounded-lg overflow-hidden m-4">
      <div className="h-64 pt-6">
        {!placeholder ? (
          <img className="h-full mx-auto" src={cover_img_url} alt={name} />
        ) : (
          <div className="bg-gray-400 w-full h-full"></div>
        )}
      </div>
      <div className="p-6">
        <h3 className="font-semibold text-lg truncate-2 leading-5 mb-2 text-gray-800">
          {!placeholder ? (
            name
          ) : (
            <>
              <span className="block bg-gray-400 h-4"></span>
              <span className="block bg-gray-400 h-4"></span>
            </>
          )}
        </h3>
        <p className="text-gray-500 text-xs uppercase font-semibold mb-4">
          {!placeholder ? (
            <>
              <span>{likes_count}</span> recommendations
            </>
          ) : (
            <span className="block bg-gray-400 h-4"></span>
          )}
        </p>
        {!placeholder ? (
          <a
            href={`/books/${id}`}
            className="px-4 py-2 bg-teal-700 border rounded-md shadow-xl transition duration-500 text-white text-xs uppercase font-semibold hover:bg-teal-900"
          >
            Borrow
          </a>
        ) : (
          <span className="px-4 py-2 bg-gray-400 text-gray-400 rounded-md">
            Borrow
          </span>
        )}
      </div>
    </div>
  );
};

export default Book;
