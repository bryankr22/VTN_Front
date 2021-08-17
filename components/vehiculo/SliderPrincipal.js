import React from 'react'
import CarruselHome from '../carrusel/CarruselHome';
import { Dimmer } from "semantic-ui-react";

export default function SliderPrincipal({ imagenes }) {
    return (
        <div>
            {imagenes.length > 0 && (
                <div>
                    <CarruselHome seccion="desc" data={imagenes} description={'bbbbb'} />
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
                        description={'aaaaaa'}
                    />
                </Dimmer>
            )}
        </div>
    )
}
