import React from 'react'
import { Responsive } from "semantic-ui-react";
import CarruselHome from "../carrusel/CarruselHome";
export default function SliderHome({ slider, sliderMobile }) {
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
