import Carousel from "./../ExpCarousel/dist";

interface Image {
  url: string;
}

interface Props {
  images?: Image[];
  alt: string;
  mobile?: boolean;
}

export default function VehicleCarousel({ images = [], alt, mobile }: Props) {
  const imageList = images.map((image) => ({ src: image.url + "webp", alt }));
  return (
    <div>
      <Carousel
        images={imageList}
        shouldLazyLoad={false}
        objectFit={"contain"}
        style={{ height: mobile ? 400 : 500 }}
        shouldMaximizeOnClick
      />
      ;
    </div>
  );
}
