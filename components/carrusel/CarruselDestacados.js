import React, {Fragment, useState} from 'react'
import ItemsCarousel from "react-items-carousel";
import { Image, Card, Icon } from "semantic-ui-react";

import CardProducts from './cards/CardProducts';
import CardProductsPlus from './cards/CardProductsPlus';
import CardProductsPlusRela from './cards/CardProductsPlusRela';
import CardProductsDesk from './cards/CardProductsDesk';
import CardProductsDeskPlus from './cards/CardProductsDeskPlus';

export default function CarruselDestacados(props) {
    const [activeItemIndex3, setActiveItemIndex3] = useState(0);
    const chevronWidth = 40;
    return (
        <div style={{ padding: `0 ${chevronWidth}px` }}>
            <ItemsCarousel
            requestToChangeActive={setActiveItemIndex3}
            activeItemIndex={activeItemIndex3}
            numberOfCards={5}
            gutter={20}
            leftChevron={<button>{'<'}</button>}
            rightChevron={<button>{'>'}</button>}
            outsideChevron
            chevronWidth={chevronWidth}
            >
            {props.data.map((item, index) => {
                    return (
                        <Fragment key={index}>
                            {props.type === "products" && item.type !== "plus" && item.type !== "plus-rela" && (
                                <CardProducts {...props} item={item} />
                            )}
                            {props.type === "products" && item.type === "plus" && (
                                <CardProductsPlus {...props} item={item} />
                            )}
                            {props.type === "products" && item.type === "plus-rela" && (
                                <CardProductsPlusRela {...props} item={item} />
                            )}
                            {props.type === "products-desktop" && item.type !== "plus" && (
                                <CardProductsDesk {...props} item={item} />
                            )}
                            {props.type === "products-desktop" && item.type === "plus" && (
                                <CardProductsDeskPlus {...props} item={item} />
                            )}
                        </Fragment>
                    );
                })}
            </ItemsCarousel>
        </div>
    )
}
