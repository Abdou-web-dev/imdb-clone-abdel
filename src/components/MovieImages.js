import { Button, Carousel } from "antd";
import { useRef, useState } from "react";
import "./styles.scss";

import nextIcon from "../assets/img/next.svg";
import prevIcon from "../assets/img/prev.svg";
import resetIcon from "../assets/img/reset.svg";

export function MovieImages({ movieImages: movieImagesUrls }) {
  const img_url = "http://image.tmdb.org/t/p/w500"; //w500 or 'original' for full size
  const ref = useRef();
  const [currentSlide, setcurrentSlide] = useState(0);

  return (
    <div className="movie-images-container">
      <div className="home-carousel-btns">
        <Button
          onClick={() => {
            ref.current.prev();
          }}
        >
          <img width={`30px`} height="30px" src={prevIcon} alt="" />
        </Button>
        <Button
          className="reset-btn"
          onClick={() => {
            ref.current.goTo(0);
          }}
        >
          <img width={`30px`} height="30px" src={resetIcon} alt="" />
        </Button>
        <Button
          onClick={() => {
            ref.current.next();
          }}
        >
          <img width={`30px`} height="30px" src={nextIcon} alt="" />
        </Button>
      </div>
      <Carousel
        dots
        dotPosition="right"
        className="home-carousel-carousel"
        ref={ref}
        pauseOnHover
        autoplay={true}
        draggable={true}
        currentSlide={currentSlide}
        afterChange={(currentSlide) => {
          setcurrentSlide(currentSlide);
        }}
        //all works perfectly
      >
        {movieImagesUrls &&
          movieImagesUrls?.map((path, index) => (
            <img
              key={index}
              width={`200px`}
              height="200px"
              src={`${img_url}${path}`}
            ></img>
          ))}
      </Carousel>
    </div>
  );
}
