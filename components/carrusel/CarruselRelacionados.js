import React, { Fragment, useState } from 'react'
import ItemsCarousel from "react-items-carousel";
import CardProducts from './cards/CardProducts';
import CardProductsDesk from './cards/CardProductsDesk';
export default function CarruselRelacionados(props) {
    const [activeItemIndex3, setActiveItemIndex3] = useState(0);
    const chevronWidth = 40;
    return (
        <div style={{ padding: `0 ${chevronWidth}px` }}>
            <ItemsCarousel
                requestToChangeActive={setActiveItemIndex3}
                activeItemIndex={activeItemIndex3}
                numberOfCards={props.numberCards}
                gutter={20}
                leftChevron={<button><i className="angle left big icon" /></button>}
                rightChevron={<button><i className="angle right big icon" /></button>}
                outsideChevron
                chevronWidth={chevronWidth}
            >
                {props.data.map((item, index) => {
                    return (
                        <Fragment key={index}>

                            <CardProductsDesk {...props} item={item} />

                        </Fragment>
                    );
                })}
            </ItemsCarousel>
        </div>
    )
}
