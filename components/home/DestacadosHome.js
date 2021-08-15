import React from 'react'
import { Header, Responsive } from "semantic-ui-react";
import CarruselDestacados from "../carrusel/CarruselDestacados";
export default function DestacadosHome({vehiculos}) {
    const onClickFav = () => { }
    return (
        <div>
            <Responsive {...Responsive.onlyMobile}>
                <Header
                    as="h2"
                    textAlign="left"
                    style={{ marginLeft: 16, fontSize: "1.4rem", textTransform: "uppercase" }}
                >
                    vehículos en promoción
                </Header>
                <CarruselDestacados
                    add="plus"
                    type="products"
                    noFav={true}
                    onClickFav={() => onClickFav()}
                    numberCards={1}
                    data={vehiculos}
                />
                </Responsive>
                <Responsive {...Responsive.onlyTablet}>
                <Header
                    as="h2"
                    textAlign="left"
                    style={{ marginLeft: 16, fontSize: "1.4rem", textTransform: "uppercase" }}
                >
                    vehículos en promoción
                </Header>
                <CarruselDestacados
                    add="plus"
                    type="products"
                    noFav={true}
                    onClickFav={() => onClickFav()}
                    numberCards={3}
                    data={vehiculos}
                />
                </Responsive>

                <Responsive {...Responsive.onlyComputer}>
                <Header
                    as="h2"
                    textAlign="center"
                    style={{ marginLeft: 16, marginBottom: 40, fontSize: "1.4rem", textTransform: "uppercase" }}
                >
                    vehículos en promoción
                </Header>
                <CarruselDestacados
                    add="plus"
                    type="products-desktop"
                    noFav={true}
                    onClickFav={() => onClickFav()}
                    numberCards={5}
                    data={vehiculos}
                />
                </Responsive>
        </div>
    )
}
