import React, {useState} from 'react'
import { Responsive } from "semantic-ui-react";
import CarruselHome from "../carrusel/CarruselHome";
import { useSelector } from "react-redux";
export default function SliderHome({ slider, sliderMobile }) {
    //const banners = useSelector(({ home }) => home.banners);
    //const bannersMobile = useSelector(({ home }) => home.bannersMobile);
    return (
        <div>
            <Responsive className="banner-home" {...Responsive.onlyComputer}>
            {slider.length > 0 && (
                <CarruselHome seccion="home" data={slider} />
            )}
            </Responsive>
            <Responsive className="banner-home" {...Responsive.onlyMobile}>
            {sliderMobile.length > 0 && (
                <CarruselHome seccion="home" data={sliderMobile} />
            )}
            </Responsive>
            <Responsive className="banner-home" {...Responsive.onlyTablet}>
            {sliderMobile.length > 0 && (
                <CarruselHome seccion="home" data={sliderMobile} />
            )}
            </Responsive>
        </div>
    )
}
