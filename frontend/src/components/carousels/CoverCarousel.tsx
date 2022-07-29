import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function CoverCarousel({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      {images.map((img, idx) => (
        <figure key={idx} className="w-full h-[260px] md:h-[400px]">
          <img
            className="w-full h-full object-cover rounded-xl shadow-header-light"
            src={img.replace("http://res", "https://res")}
            alt={alt}
          />
        </figure>
      ))}
    </Slider>
  );
}
