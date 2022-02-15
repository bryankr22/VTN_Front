import { Fragment, useState } from 'react'
import ItemsCarousel from "react-items-carousel";
import { Image, Card } from "semantic-ui-react";
import { light, dark } from '../../helpers/colors';
export default function CarruselMarcas({ data = [], numberCards, darkMode }) {
    const [activeItemIndex2, setActiveItemIndex2] = useState(0);
    const chevronWidth = 40;

    const colorText = darkMode === light ? "#4775fc" : light;
    const colorChevron = darkMode === light ? dark : light;

    return (
        <div style={{ padding: `0 ${chevronWidth}px` }}>
            <ItemsCarousel
                requestToChangeActive={setActiveItemIndex2}
                activeItemIndex={activeItemIndex2}
                numberOfCards={numberCards}
                gutter={20}
                leftChevron={<button><i className="angle left big icon" style={{ color: colorChevron }} /></button>}
                rightChevron={<button><i className="angle right big icon" style={{ color: colorChevron }} /></button>}
                outsideChevron
                chevronWidth={chevronWidth}
            >
                {data.map((item, index) => {
                    return (
                        <Fragment key={index}>
                            <Card
                                as="a"
                                href={`/vehiculos?marca=` + item.nombre}
                                style={{
                                    textAlign: "center",
                                    boxShadow: "none",
                                    background: "transparent",
                                    textDecorationColor: colorText
                                }}
                            >

                                <Image
                                    quality={50}
                                    loading='lazy'
                                    className="lazyload"
                                    src={item.url.replace("https://vendetunave.s3.amazonaws.com", "https://d3bmp4azzreq60.cloudfront.net/fit-in/50x50")}
                                    alt={item.url.replace("https://vendetunave.s3.amazonaws.com/vendetunave/images/marcas/", "")}
                                    width="50px"
                                    height="50px"
                                    style={{
                                        margin: "0 auto",
                                        marginBottom: 5,
                                        background: "transparent",
                                        filter: darkMode === dark ? 'invert(1)' : ''
                                    }}
                                />
                                <span style={{ color: colorText, fontWeight: 700 }}>
                                    {item.nombre}
                                </span>
                            </Card>
                        </Fragment>
                    );
                })}
            </ItemsCarousel>
        </div >
    )
}
