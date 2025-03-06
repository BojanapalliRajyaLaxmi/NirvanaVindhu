import React from "react";
import "./Slide.css";

const carouselItems = [
  { imgSrc: "https://tse3.mm.bing.net/th?id=OIP.9UFR5koGNJIN45SwLZdwJQHaFM&pid=Api&P=0&h=180", title: "https://tse2.mm.bing.net/th?id=OIP.fPUqYkv9eNBfviPiOpbLrgHaEK&pid=Api&P=0&h=180", unicode: "hello" },
  { imgSrc: "https://tse2.mm.bing.net/th?id=OIP.fPUqYkv9eNBfviPiOpbLrgHaEK&pid=Api&P=0&h=180", title: "https://tse2.mm.bing.net/th?id=OIP.fPUqYkv9eNBfviPiOpbLrgHaEK&pid=Api&P=0&h=180", unicode: "U+1F354" },
  { imgSrc: "https://tse2.mm.bing.net/th?id=OIP.fPUqYkv9eNBfviPiOpbLrgHaEK&pid=Api&P=0&h=180", title: "https://tse2.mm.bing.net/th?id=OIP.fPUqYkv9eNBfviPiOpbLrgHaEK&pid=Api&P=0&h=180", unicode: "U+1F363" },
  { imgSrc: "https://tse2.mm.bing.net/th?id=OIP.fPUqYkv9eNBfviPiOpbLrgHaEK&pid=Api&P=0&h=180", title: "https://tse1.mm.bing.net/th?id=OIP.mDby-4O-9JsuIcSz2MkwzwHaFj&pid=Api&P=0&h=180", unicode: "U+1F368" },
  { imgSrc: "https://tse2.mm.bing.net/th?id=OIP.fPUqYkv9eNBfviPiOpbLrgHaEK&pid=Api&P=0&h=180", title: "https://tse4.mm.bing.net/th?id=OIP.REL7TS65ziELY-HThzZmyQHaE8&pid=Api&P=0&h=180", unicode: "U+1F382" },
  { imgSrc: "/images/taco.gif", title: "https://tse1.mm.bing.net/th?id=OIP.mxtAYn_23QOfWSbH5wK8UwHaE8&pid=Api&P=0&h=180", unicode: "U+helo" },
  { imgSrc: "/images/donut.gif", title: "https://tse4.mm.bing.net/th?id=OIP.WZMdzAJ2IQIX0Bpy4t5mvQHaDZ&pid=Api&P=0&h=180", unicode: "U+1F369" },
  { imgSrc: "/images/fries.gif", title: "https://tse2.mm.bing.net/th?id=OIP.2hCD3BnBvEOnSRY_latscQHaFc&pid=Api&P=0&h=180", unicode: "U+1F35F" },
  { imgSrc: "/images/coffee.gif", title: "https://tse3.mm.bing.net/th?id=OIP.-lSl6Qr9yxUzbPqD57vlYgHaEK&pid=Api&P=0&h=180", unicode: "U+2615" },
];

const Carousel = () => {
  return (
    <div className="wrapper">
      <div className="carousel">
        {carouselItems.map((item, index) => (
          <div
            className="carousel__item"
            key={index}
            style={{ animationDelay: `${index * 3}s` }}
          >
            <div className="carousel__item-head">
              <img src={item.imgSrc} alt={item.title} />
            </div>
            <div className="carousel__item-body">
            <img src={item.title} alt={item.title} />
              <p>Unicode: {item.imgSrc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
