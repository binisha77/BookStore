import React from "react";

import "slick-carousel/slick/slick.css"

import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Cards from "./Cards";
import axios from "axios";
import { useEffect, useState } from "react";

function Freebook() {
    const [book , setBook] = useState([]);
    useEffect(() => {
    const getBook = async() => {
      try {
       const res =await axios.get("http://localhost:4001/book")
       const data = res.data.filter((data) => data.category === "Free")
       console.log(data);
       setBook(data)
      } catch (error) {
        console.error(error);
      
      }
    }
    getBook();
  }, []);

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className=" max-w-screen-3xl mx-auto md:px-20 px-4">
        <div>
          <h1 className="font-semibold text-xl pb-2">Free offered course</h1>
          <p>
            Books play a vital role in our lives as they are a rich
             source of knowledge, wisdom, and imagination. 
             They educate us about history, science, and the
              world around us while also enhancing our 
              creativity and critical thinking skills.
               Reading books improves our vocabulary, 
               communication, and comprehension, helping 
               us express ourselves more effectively.
                Beyond learning, books provide mental
                 relaxation and a way to escape stress, 
                 keeping the mind engaged and sharp. 
                 They also preserve culture, traditions, 
                 and historical events, allowing us to 
                 understand and appreciate diverse 
                 perspectives. Ultimately, books 
                 contribute to personal growth, 
                 shaping our thoughts, values, 
                 and lifelong learning.{" "}
          </p>
        </div>

        <div>
          <Slider {...settings}>
            {book.map((item) => (
              <Cards item={item} key={item._id} />
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
}

export default Freebook;
