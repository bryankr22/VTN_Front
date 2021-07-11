import React from 'react'
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Image from 'next/image'
export default function CarruselHome(props) {
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
                emulateTouch
                autoPlay={props.autoPlay === false ? props.autoPlay : true}
                interval={8000}
            >
                {props.data.map((item, index) => (
                    <div key={index} style={{ height: "100%", width: "100%" }}>
                        {props.seccion == "home" && (
                            <Image
                                priority={true}
                                layout='fill'
                                style={{
                                    objectFit: "cover",
                                    width: "100%",
                                    height: "100%",
                                    objectPosition: "center",
                                }}
                                src={item.url}
                            />
                        )}
                        {props.seccion == "desc" &&
                            (item.new_image === 1 || item.new_image === 2) &&
                            hasWebP && (
                                <Image
                                layout='fill'
                                    id={`image_vehicle_${index}`}
                                    data-zoom-image={item.url + "webp"}
                                    style={{
                                        objectFit: "contain",
                                        width: "100%",
                                        height: "100%",
                                        objectPosition: "center",
                                    }}
                                    src={item.url + "webp"}
                                />
                            )}
                        {props.seccion == "desc" && item.new_image === 0 && (
                            <Image
                            layout='fill'
                                id={`image_vehicle_${index}`}
                                data-zoom-image={item.url + item.extension}
                                style={{
                                    objectFit: "contain",
                                    width: "100%",
                                    height: "100%",
                                    objectPosition: "center",
                                }}
                                src={item.url + item.extension}
                            />
                        )}
                        {props.seccion == "desc" &&
                            (item.new_image === 1 || item.new_image === 2) &&
                            !hasWebP && (
                                <Image
                                layout='fill'
                                    id={`image_vehicle_${index}`}
                                    data-zoom-image={item.url + item.extension}
                                    style={{
                                        objectFit: "contain",
                                        width: "100%",
                                        height: "100%",
                                        objectPosition: "center",
                                    }}
                                    src={item.url + item.extension}
                                />
                            )}
                    </div>
                ))}
            </Carousel>
        </div>
    )
}
