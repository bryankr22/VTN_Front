import React, {useState} from 'react'
import { Header, Divider } from "semantic-ui-react";
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
            <CarruselCategories
                data={categories}
            />
        </div>
    )
}
