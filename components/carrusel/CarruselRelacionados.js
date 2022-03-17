import { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
import ItemsCarousel from "react-items-carousel";

import CardProductsDesk from './cards/CardProductsDesk';
import { dark, light } from '../../helpers/colors';

export default function CarruselRelacionados(props) {
    const [activeItemIndex3, setActiveItemIndex3] = useState(0);
    const chevronWidth = 40;

    const darkMode = useSelector(({ darkMode }) => darkMode.status);
    const colorText = darkMode === light ? dark : light;
    return (
        <div style={{ padding: `0 ${chevronWidth}px` }}>
            <ItemsCarousel
                requestToChangeActive={setActiveItemIndex3}
                activeItemIndex={activeItemIndex3}
                numberOfCards={props.numberCards}
                gutter={20}
                leftChevron={<button><i className="angle left big icon" style={{ color: colorText }} /></button>}
                rightChevron={<button><i className="angle right big icon" style={{ color: colorText }} /></button>}
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
