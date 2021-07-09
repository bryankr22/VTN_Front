import React from 'react'
import { Header, Responsive } from "semantic-ui-react";
import CarruselDestacados from "../carrusel/CarruselDestacados";
import { useSelector } from "react-redux";
export default function DestacadosHome() {
    const vehiculos_local = useSelector(({ home }) => home.vehiculos_promocion);
    const onClickFav = () => {

    }
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
                    numberCards={5}
                    data={vehiculos_local}
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
                    numberCards={5}
                    data={vehiculos_local}
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
                    data={vehiculos_local}
                />
                </Responsive>
        </div>
    )
}
