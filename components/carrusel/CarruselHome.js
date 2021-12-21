import { Carousel } from "react-responsive-carousel";
import { useRouter } from "next/router";
import PrismaZoom from 'react-prismazoom'

export default function CarruselHome(props) {

  const router = useRouter();

  return (
    <div>
      <Carousel
        infiniteLoop
        showArrows={props.showArrows === false ? props.showArrows : true}
        showThumbs={props.showThumbs ? true : false}
        showIndicators={
          props.showIndicators === false ? props.showIndicators : true
        }
        showStatus={false}
        transitionTime={1000}
        swipeable={false}
        autoPlay={(props.autoPlay === false ? props.autoPlay : true) && !router.asPath.includes('vehiculos/detalle')}
        renderArrowNext={(click) => (
          <button className="control-arrow control-next" onClick={click}>
            <i className="angle right icon" />
          </button>
        )}
        renderArrowPrev={(click) => (
          <button className="control-arrow control-prev" onClick={click}>
            <i className="angle left icon" />
          </button>
        )}
        interval={8000}
      >
        {props.data.map((item, index) => (
          <div key={index} style={{ height: "100%", width: "100%" }}>
            {props.seccion == "home" && (
              <div className="d-flex full-height">
                <img
                  loading="lazy"
                  src={item.url.replace("https://vendetunave.s3.amazonaws.com", `https://d3bmp4azzreq60.cloudfront.net/fit-in/${props.desktop ? '1100x1100' : '400x400'}`)}
                  style={{
                    objectFit: "fill",
                    width: "100%",
                    height: "100%",
                    objectPosition: "center center",
                  }}
                  alt={props.alt}
                />
              </div>
            )}
            {props.seccion == "desc" && process.browser && (
              <PrismaZoom
                style={{
                  objectFit: "contain",
                  width: "100%",
                  height: "100%",
                  objectPosition: "center",
                }}
              >
                <img
                  loading="lazy"
                  alt={props.alt}
                  id={"image_vehicle_" + index}
                  data-zoom-image={item.url + "webp"}
                  data-image={item.url + "webp"}
                  key={index}
                  style={{
                    objectFit: "contain",
                    width: "100%",
                    height: "100%",
                    objectPosition: "center",
                  }}
                  src={item.url + "webp"}
                  zoomSrc={item.url + "webp"}
                  zoomScale={2}
                  hideCloseButton
                  hideHint
                />
              </PrismaZoom>
            )}
          </div>
        ))}
      </Carousel>
    </div>
  );
}
