import React from "react";
import classnames from "classnames";

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
  isPlaceholder
}) => {
  if (isPlaceholder) {
    return <PlaceholderBook />;
  }
  return (
    <div className="bg-white border rounded-lg overflow-hidden m-4">
      <div className="h-64 pt-6">
        <img className="h-full mx-auto" src={cover_img_url} alt={name} />
      </div>
      <div className="p-6">
        <h3 className="font-semibold text-lg truncate-2 leading-5 mb-2 text-gray-800">
          {name}
        </h3>
        <p className="text-gray-500 text-xs uppercase font-semibold mb-4">
          <span>{likes_count}</span> recommendations
        </p>
        <a
          href={`/books/${id}`}
          className={classnames({
            btn: isAvailable,
            "btn-disabled": !isAvailable
          })}
        >
          See Details
        </a>
      </div>
    </div>
  );
};

// Component to show when isPlaceholder is true
const PlaceholderBook = () => {
  return (
    <div className="bg-white border rounded-lg overflow-hidden m-4">
      <div className="h-64 pt-6">
        <div className="bg-gray-400 w-full h-full"></div>
      </div>
      <div className="p-6">
        <h3 className="font-semibold text-lg truncate-2 leading-5 mb-2 text-gray-800">
          <span className="block bg-gray-400 h-4"></span>
          <span className="block bg-gray-400 h-4"></span>
        </h3>
        <p className="text-gray-500 text-xs uppercase font-semibold mb-4">
          <span className="block bg-gray-400 h-4"></span>
        </p>
        <span className="px-4 py-2 bg-gray-400 text-gray-400 rounded-md">
          See Details
        </span>
      </div>
    </div>
  );
};

export default Book;
