import React, {useState} from 'react'
import { Header, Divider, Responsive } from "semantic-ui-react";
import CarruselCategories from "../carrusel/CarruselCategories";
import { useSelector } from "react-redux";
export default function CategoriasHome() {
    const categories = useSelector(({ home }) => home.categories);
    return (
        <div>
            <Divider style={{ marginLeft: 20, marginRight: 20 }} />
            <Header
            as="h2"
            textAlign="left"
            style={{ marginLeft: 16, fontSize: "1.4rem", textTransform: "uppercase" }}
            >
            categorías de vehículos
            </Header>
            <Responsive {...Responsive.onlyMobile}>
            <CarruselCategories
                numberCards={2}
                data={categories}
            />
            </Responsive>
            <Responsive {...Responsive.onlyTablet}>
                <CarruselCategories
                numberCards={2}
                data={categories}
                />
            </Responsive>
            <Responsive {...Responsive.onlyComputer}>
                <CarruselCategories
                numberCards={5}
                data={categories}
                />
            </Responsive>
        </div>
    )
}
