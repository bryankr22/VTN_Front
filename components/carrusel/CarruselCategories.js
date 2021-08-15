import React, {Fragment, useState} from 'react'
import ItemsCarousel from "react-items-carousel";
import { Image, Card, Icon } from "semantic-ui-react";

export default function CarruselCategories({ data = [], numberCards }) {
    const [activeItemIndex, setActiveItemIndex] = useState(0);
    const chevronWidth = 40;
    const returnLink = (nombre) => {
        switch (nombre) {
            case 'Carros y camionetas':
                return `/vehiculos?categoria=carros`;
            case 'Camiones':
                return `/vehiculos?categoria=camiones`;
            case 'Carros de coleccion':
                return `/vehiculos?categoria=carros_coleccion`;
            case 'Motos':
                return `/vehiculos?categoria=motos`;
            case 'Otros':
                return `/vehiculos?categoria=otros`;
        }
    }
    return (
        <div style={{ padding: `0 ${chevronWidth}px` }}>
            <ItemsCarousel
            requestToChangeActive={setActiveItemIndex}
            activeItemIndex={activeItemIndex}
            numberOfCards={numberCards}
            gutter={20}
            leftChevron={<button>{'<'}</button>}
            rightChevron={<button>{'>'}</button>}
            outsideChevron
            chevronWidth={chevronWidth}
            >
            {data.map((item, index) => {
                    return (
                        <Fragment key={index}>
                            <Card
                            as="a"
                            href={returnLink(item.nombre)}
                            style={{
                                margin: 5,
                                boxShadow: "none",
                                textDecoration: "none",
                                padding: 10,
                            }}
                            >
                            <style>
                                {`
                                    .ui.card>.image>img, .ui.cards>.card>.image>img {
                                    height: auto !important
                                    }
                                `}
                            </style>
                            <Image
                                quality={50}
                                loading='lazy'
                                src={item.path}
                                alt={item.path.replace("https://vendetunave.s3.amazonaws.com/vendetunave/images/categorias/", "" )}
                                wrapped
                                ui={false}
                                className="image-card-home lazyload"
                                style={{
                                    background: "white",
                                    width: "40%",
                                    display: "block",
                                    margin: "auto",
                                }}
                            />
                            <Card.Content style={{ borderTop: "none" }}>
                                <Card.Header style={{ fontSize: 20, textAlign: "center" }}>
                                    {item.nombre}
                                </Card.Header>
                            </Card.Content>
                        </Card>
                    </Fragment>
                    );
                })}
            </ItemsCarousel>
        </div>
    )
}
