import React from 'react'
import CarruselHome from '../carrusel/CarruselHome';
import { Dimmer } from "semantic-ui-react";

export default function SliderPrincipal({ imagenes, alt }) {
    return (
        <div>
            {imagenes.length > 0 && (
                <div>
                    <CarruselHome seccion="desc" data={imagenes} description={'N/a'} alt={alt} />
                </div>
            )}
            {imagenes.length > 0 && (
                <Dimmer
                    page
                    style={{ padding: "1em 0" }}
                >
                    <CarruselHome
                        showArrows={false}
                        showIndicators={false}
                        autoPlay={false}
                        showThumbs={false}
                        seccion="desc"
                        data={imagenes}
                        description={'N/a'}
                        alt={alt}
                    />
                </Dimmer>
            )}
        </div>
    )
}
