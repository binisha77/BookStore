import React, { useEffect, useState } from "react";

import Cards from "./Cards";
import { Link } from "react-router-dom";
import axios from "axios";

function Course() {
  const [book , setBook] = useState([]);
  useEffect(() => {
    const getBook = async() => {
      try {
       const res =await axios.get("http://localhost:4001/book")
       console.log(res.data);
       setBook(res.data);
      } catch (error) {
        console.error(error);
      
      }
    }
    getBook();
  }, []);
  return (
    <>
      <div className="max-w-screen-2xl mx-auto  md:px-20 px-4">
        <div className="mt-28 items-center justify-center text-center">
          <h1 className="text-2xl  md:text-4xl">
            We're delighted to have you{""}
            <span className="text-pink-500"> Here! :)</span>
          </h1>
          <p className="mt-12">
            Courses are structured programs of study designed to teach specific skills, knowledge, or subjects to learners. They provide a systematic way to gain expertise, whether for academic, professional, or personal development purposes. Through courses, individuals can explore new fields, improve existing skills, and stay updated with industry trends. They often combine theory with practical exercises, helping learners apply what they have learned in real-world scenarios. Online and offline courses offer flexibility, making education accessible to people of all ages and backgrounds. Ultimately, courses empower individuals to grow, achieve their goals, and enhance their career opportunities.
          </p>

          <Link to="/">
            <button className="mt-6 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300 ">
              Back
            </button>
          </Link>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4">
          {book.map((item) => (
            <Cards key={item.id} item={item} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Course;
