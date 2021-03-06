import { Fragment, useState } from 'react'
import ItemsCarousel from "react-items-carousel";
import { Image, Card } from "semantic-ui-react";
import { light, dark } from '../../helpers/colors';

export default function CarruselCategories({ data = [], numberCards, darkMode }) {
    const [activeItemIndex, setActiveItemIndex] = useState(0);
    const chevronWidth = 40;
    const returnLink = (nombre) => {
        switch (nombre) {
            case 'Carros y camionetas':
                return `/vehiculos?categoria=carros`;
            case 'Camiones':
                return `/vehiculos?categoria=camiones`;
            case 'Carros de colección':
                return `/vehiculos?categoria=carros_coleccion`;
            case 'Motos':
                return `/vehiculos?categoria=motos`;
            case 'Otros':
                return `/vehiculos?categoria=otros`;
        }
    }

    const colorText = darkMode === light ? dark : light;

    return (
        <div style={{ padding: `0 ${chevronWidth}px` }}>
            <ItemsCarousel
                requestToChangeActive={setActiveItemIndex}
                activeItemIndex={activeItemIndex}
                numberOfCards={numberCards}
                gutter={20}
                leftChevron={<button><i className="angle left big icon" style={{ color: colorText }} /></button>}
                rightChevron={<button><i className="angle right big icon" style={{ color: colorText }} /></button>}
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
                                    backgroundColor: darkMode,
                                }}
                            >
                                <style>
                                    {`
                                    .ui.card>.image>img, .ui.cards>.card>.image>img {
                                        height: auto !important;
                                        ${darkMode === dark && 'filter: invert(1);'}
                                    }
                                `}
                                </style>
                                <Image
                                    quality={50}
                                    loading='lazy'
                                    src={item.path.replace("https://vendetunave.s3.amazonaws.com", "https://d3bmp4azzreq60.cloudfront.net/fit-in/300x300")}
                                    alt={item.path.replace("https://vendetunave.s3.amazonaws.com/vendetunave/images/categorias/", "")}
                                    wrapped
                                    ui={false}
                                    className="image-card-home lazyload"
                                    style={{
                                        width: "40%",
                                        display: "block",
                                        margin: "auto",
                                        backgroundColor: darkMode,
                                    }}
                                />
                                <Card.Content style={{ borderTop: "none" }}>
                                    <Card.Header style={{ fontSize: 20, textAlign: "center", color: colorText }}>
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
