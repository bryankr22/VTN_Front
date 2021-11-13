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
        leftIcon={<i className="angle left icon ic-big white"></i>}
        rightIcon={<i className="angle right icon ic-big white"></i>}
        minIcon={<i className="close icon ic-big white mt-1"></i>}
        hasIndexBoardAtMax
        hasIndexBoard={false}
        maxIcon={null}
        playIcon={null}
      />
    </div>
  );
}
