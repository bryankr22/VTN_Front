import React, {Fragment, useState} from 'react'
import ItemsCarousel from "react-items-carousel";
import { Image, Card } from "semantic-ui-react";

export default function CarruselMarcas({ data = [], numberCards }) {
    const [activeItemIndex2, setActiveItemIndex2] = useState(0);
    const chevronWidth = 40;
    return (
        <div style={{ padding: `0 ${chevronWidth}px` }}>
            <ItemsCarousel
            requestToChangeActive={setActiveItemIndex2}
            activeItemIndex={activeItemIndex2}
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
                            href={`/vehiculos?marca=`+item.nombre}
                            style={{
                                textAlign: "center",
                                boxShadow: "none",
                                background: "transparent",
                            }}
                        >
                            <Image
                                src={item.url}
                                alt={item.url.replace("https://vendetunave.s3.amazonaws.com/vendetunave/images/marcas/", "" )}
                                style={{
                                    width: 50,
                                    margin: "0 auto",
                                    marginBottom: 5,
                                    background: "transparent",
                                }}
                            />
                            <span style={{ color: "#4775fc", fontWeight: 700 }}>
                                {item.nombre}
                            </span>
                        </Card>
                    </Fragment>
                    );
                })}
            </ItemsCarousel>
        </div>
    )
}
