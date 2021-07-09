import React, {useState} from 'react'
import { Responsive } from "semantic-ui-react";
import CarruselHome from "../carrusel/CarruselHome";
import { useSelector } from "react-redux";
export default function SliderHome() {
    const banners = useSelector(({ home }) => home.banners);
    const bannersMobile = useSelector(({ home }) => home.bannersMobile);
    return (
        <div>
            <Responsive className="banner-home" {...Responsive.onlyComputer}>
            {banners.length > 0 && (
                <CarruselHome seccion="home" data={banners} />
            )}
            </Responsive>

            <Responsive className="banner-home" {...Responsive.onlyMobile}>
            {bannersMobile.length > 0 && (
                <CarruselHome seccion="home" data={bannersMobile} />
            )}
            </Responsive>
            <Responsive className="banner-home" {...Responsive.onlyTablet}>
            {bannersMobile.length > 0 && (
                <CarruselHome seccion="home" data={bannersMobile} />
            )}
            </Responsive>
        </div>
    )
}
