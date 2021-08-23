import React from 'react'
import { Carousel } from "react-responsive-carousel";
import Image from 'next/image'
//import ReactImageZoom from 'react-image-zoom';
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
                renderArrowNext={(click) => <button className="control-arrow control-next" onClick={click}><i className="angle right icon" /></button>}
                renderArrowPrev={(click) => <button className="control-arrow control-prev" onClick={click}><i className="angle left icon" /></button>}
                interval={8000}
            >
                {props.data.map((item, index) => (
                    <div key={index} style={{ height: "100%", width: "100%" }}>
                        {props.seccion == "home" && (
                            <Image
                            layout='fill'
                            quality={50}
                            loading='lazy'
                            src={item.url}
                            />
                        )}
                        {props.seccion == "desc" && (
                            <img
                            id={'image_vehicle_'+index}
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
                            />
                        )}
                    </div>
                ))}
            </Carousel>
        </div>
    )
}
