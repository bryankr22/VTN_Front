import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { useRouter } from "next/router";
import PrismaZoom from 'react-prismazoom'

export default function CarruselHome(props) {
  const [page, setPage] = useState(0);
  const router = useRouter();

  // const handleZoom = (page) => {
  //   setTimeout(() => {
  //     $(`#image_vehicle_${page}`).ezPlus({
  //       scrollZoom: true,
  //       zoomWindowWidth: 500,
  //       zoomWindowHeight: 500
  //     })
  //   }, 1000)
  // };

  // useEffect(() => {
  //   if (
  //     typeof window !== "undefined" &&
  //     router.asPath.includes("vehiculos/detalle")
  //   ) {
  //     handleZoom(page);
  //   }
  // }, [page]);

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
        onChange={setPage}
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
                  src={item.url}
                  style={{
                    objectFit: "fill",
                    width: "100%",
                    height: "100%",
                    objectPosition: "center center",
                  }}
                />
              </div>
            )}
            {props.seccion == "desc" && (
              <PrismaZoom
                style={{
                  objectFit: "contain",
                  width: "100%",
                  height: "100%",
                  objectPosition: "center",
                }}
              >
                <img
                  alt="image"
                  id={"image_vehicle_" + index}
                  data-zoom-image={item.url + item.extension}
                  data-image={item.url + item.extension}
                  key={index}
                  style={{
                    objectFit: "contain",
                    width: "100%",
                    height: "100%",
                    objectPosition: "center",
                  }}
                  src={item.url + item.extension}
                  zoomSrc={item.url + item.extension}
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
