import { BsArrowLeft } from "react-icons/bs";
import { BsArrowRight } from "react-icons/bs";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const Hero = () => {
  const images = [
    { image: "/images/hero/IMG_8084.jpg", caption: "j" },
    { image: "/images/hero/IMG_8085.jpg", caption: "j" },
    { image: "/images/hero/IMG_8086.jpg", caption: "j" },
    { image: "/images/hero/IMG_8087.jpg", caption: "j" },
    { image: "/images/hero/IMG_8088.jpg", caption: "j" },
    { image: "/images/hero/IMG_8089.jpg", caption: "j" },
    { image: "/images/hero/IMG_8090.jpg", caption: "j" },
    { image: "/images/hero/IMG_8091.jpg", caption: "j" },
    { image: "/images/hero/IMG_8092.jpg", caption: "j" },
    { image: "/images/hero/IMG_8093.jpg", caption: "j" },
    { image: "/images/hero/IMG_8094.jpg", caption: "j" },
    { image: "/images/hero/IMG_8095.jpg", caption: "j" },
    { image: "/images/hero/IMG_8096.jpg", caption: "j" },
    { image: "/images/hero/IMG_8097.jpg", caption: "j" },
    { image: "/images/hero/IMG_8098.jpg", caption: "j" },
    { image: "/images/hero/IMG_8099.jpg", caption: "j" },
    { image: "/images/hero/IMG_8100.jpg", caption: "j" },
    { image: "/images/hero/IMG_8101.jpg", caption: "j" },
    { image: "/images/hero/IMG_8102.jpg", caption: "j" },
    { image: "/images/hero/IMG_8103.jpg", caption: "j" },
    { image: "/images/hero/IMG_8104.jpg", caption: "j" },
    { image: "/images/hero/IMG_8105.jpg", caption: "j" },
    { image: "/images/hero/IMG_8106.jpg", caption: "j" },
    { image: "/images/hero/IMG_8107.jpg", caption: "j" },
    { image: "/images/hero/IMG_8108.jpg", caption: "j" },
    { image: "/images/hero/IMG_8109.jpg", caption: "j" },
    { image: "/images/hero/IMG_8110.jpg", caption: "j" },
    { image: "/images/hero/IMG_8111.jpg", caption: "j" },
    { image: "/images/hero/IMG_8112.jpg", caption: "j" },
    { image: "/images/hero/IMG_8113.jpg", caption: "j" },
    { image: "/images/hero/IMG_8114.jpg", caption: "j" },
    { image: "/images/hero/IMG_8115.jpg", caption: "j" },
    { image: "/images/hero/IMG_8116.jpg", caption: "j" },
    { image: "/images/hero/IMG_8117.jpg", caption: "j" },
    { image: "/images/hero/IMG_8118.jpg", caption: "j" },
  ];

  //styles @11:50
  //   prevArrow: (
  //     <div className="ml-10 top-40 md:top-72">
  //       <BsArrowLeft className="h-8 w-8 text-white cursor-pointer" />
  //     </div>
  //   ),
  //   nextArrow: (
  //     <div className="ml-10 top-40 md:top-72">
  //       <BsArrowRight className="h-8 w-8 text-white cursor-pointer" />
  //     </div>
  //   ),
  // };

  return (
    <main className="relative opacity-50">
      <Slide>
        {images.map((slideImage, index) => (
          <div key={index}>
            <img
              src={slideImage.image}
              className="w-full h-1/5"
              alt={slideImage.caption}
            />
          </div>
        ))}
      </Slide>
    </main>
  );
};

export default Hero;
