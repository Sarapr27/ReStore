"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Navbar } from "../components/navbar/navbar";

const Rating = ({ searchParams }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const router = useRouter();

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const submitRating = async () => {
    await axios.put(
      `https://re-store.onrender.com/categories/technology/rating/${searchParams.product}/${searchParams.user}`,
      {
        rate: rating,
        comment: comment,
        product: searchParams.product,
        user: searchParams.user,
      }
    );
    router.push(`/user`);
  };
  
  
  const handleRatingClick = (selectedRating) => {
    setRating(selectedRating);
  };

  return (
    <div>
      {console.log(rating, comment)}
      <Navbar />
      <div className="flex flex-col items-center">
        <div className="flex items-center mt-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg
              key={star}
              xmlns="http://www.w3.org/2000/svg"
              fill={star <= rating ? "yellow" : "none"}
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 cursor-pointer"
              onClick={() => handleRatingClick(star)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
              />
            </svg>
          ))}
        </div>
        <p className="text-black-500 mt-2">{rating} De 5 estrellas</p>
        <textarea
          className="mt-4 p-2 border border-gray-300 rounded h-40 w-1/2 resize-none"
          placeholder="Deja tu comentario"
          value={comment}
          onChange={handleCommentChange}
        ></textarea>
        <button
          className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          onClick={submitRating}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Rating;