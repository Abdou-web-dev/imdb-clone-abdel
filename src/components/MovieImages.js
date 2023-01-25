import { Button, Carousel } from "antd";
import { useRef, useState } from "react";
import nextIcon from "../assets/img/next.svg";
import prevIcon from "../assets/img/prev.svg";
import resetIcon from "../assets/img/reset.svg";
import skeleton from "../assets/img/skeleton.svg";
import "./styles.scss";

export function MovieImages({ movieImages: movieImagesUrls }) {
  const img_url = "http://image.tmdb.org/t/p/w500"; //w500 or 'original' for full size
  const ref = useRef();
  const [currentSlide, setcurrentSlide] = useState(0);

  return (
    <div className="movie-images-container">
      <div className="movie-images-carousel-btns">
        <Button
          className="btn-prev"
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
          className="btn-next"
          onClick={() => {
            ref.current.next();
          }}
        >
          <img width={`30px`} height="30px" src={nextIcon} alt="" />
        </Button>
      </div>
      <Carousel
        className="movie-images-carousel"
        dots
        dotPosition="right"
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
            <>
              <img
                className="carousel-image"
                key={index}
                src={path ? `${img_url}${path}` : skeleton}
              ></img>
            </>
          ))}
      </Carousel>
    </div>
  );
}
/* <Image
key={index}
// className="carousel-image"
loading={"lazy"}
// width={400}
// src={imagePath}
src={`${img_url}${path}`}
/> */
