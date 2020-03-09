import React, { useEffect, useState } from "react";
import { format, parseISO } from "date-fns";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import WithHeader from "../../layouts/WithHeader";
import { BOOKS } from "../../constants/routes";
import { getBookDetails } from "../../services/api";

const BookDetails = () => {
  const [book, setBook] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    getBookDetails(id)
      .then(res => {
        setLoading(false);
        setBook(res.book);
      })
      .catch(err => {
        setLoading(false);
      });
  }, [id]);

  // TODO: render a placeholder
  if (isLoading && !book)
    return (
      <WithHeader>
        <p>Loading...</p>
      </WithHeader>
    );

  if (!book) {
    return (
      <WithHeader>
        <p>Book not found</p>
      </WithHeader>
    );
  }

  const { name, cover_img_url, tags, description, isAvailable, copies } = book;

  return (
    <WithHeader>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, translateY: "100px" },
          visible: { opacity: 1, translateY: 0 }
        }}
        className="flex flex-col md:flex-row justify-center w-10/12 md:w-3/4 border border-gray-200 rounded-lg shadow-lg p-16 bg-white mx-auto mt-8"
      >
        <div className="mb-10 w-64 md:mr-12 flex justify-center md:justify-end">
          <img src={cover_img_url} alt={name} />
        </div>

        <div>
          <h1 className="text-2xl font-semibold mb-2">{name}</h1>
          <ul className="flex mb-4">
            {tags.map(tag => (
              <li
                key={`tag-${tag}`}
                className="border border-teal-700 rounded-lg mr-4 text-xs uppercase"
              >
                <a href={`${BOOKS}?tags=${tag}`} className="py-1 px-4 block">
                  {tag}
                </a>
              </li>
            ))}
          </ul>

          <div className="border-t border-b border-teal-500 py-4 mb-4">
            <p className="text-base truncate-2">{description}</p>
          </div>

          <div>
            <p className="text-gray-600 font-medium mb-4">
              This book has{" "}
              <span className="font-bold text-gray-800">{copies.length}</span>{" "}
              {copies.length === 1 ? "copy" : "copies"}
            </p>
            {!isAvailable && (
              <div className="mb-4">
                <p className="w-full font-bold text-pink-600 uppercase">
                  None of the copies are available
                </p>
                <p className="text-xs">
                  But you can still make a reservation. When the current reserve
                  ends an email will be sent to the person who has the book to
                  deliver it to you.
                </p>
              </div>
            )}
            <div className="flex flex-col md:flex-row flex-wrap">
              {copies.map(copy => (
                <div
                  key={copy.id}
                  className="p-4 bg-teal-700 shadow-2xl w-full rounded-lg flex flex-row justify-between mb-4"
                >
                  <div>
                    <p className="text-white font-extrabold">
                      {copy.location} has it
                    </p>
                    <p className="text-gray-300">
                      {copy.isAvailable
                        ? "Available now!"
                        : `Available on ${format(
                            parseISO(copy.availabilityDate),
                            "dd-MM-yyyy"
                          )}`}
                    </p>
                  </div>
                  <div className="flex justify-center align-center">
                    <button type="button" className="btn">
                      Reserve
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </WithHeader>
  );
};

export default BookDetails;
