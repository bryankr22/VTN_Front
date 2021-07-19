import React from 'react'
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Image from 'next/image'
export default function CarruselHome(props) {
    console.log(">>>>>", props.showThumbs);
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
                            layout='fill'
                            objectFit='contain'
                            objectPosition='center'
                            src={item.url}
                            />
                        )}
                        {props.seccion == "desc" && (
                            <img
                            key={index}
                            style={{
                                objectFit: "cover",
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
