import React from 'react'
import { Header, Responsive } from "semantic-ui-react";
import { useSelector } from 'react-redux';
import { light, dark } from "../../helpers/colors";
import CarruselDestacados from "../carrusel/CarruselDestacados";

export default function DestacadosHome({ vehiculos }) {
    const darkMode = useSelector(({ darkMode }) => darkMode.status);
    const colorText = darkMode === light ? dark : light;

    return (
        <div>
            <Responsive {...Responsive.onlyMobile}>
                <Header
                    as="h2"
                    textAlign="left"
                    style={{ marginLeft: 16, fontSize: "1.4rem", textTransform: "uppercase", marginTop: '30px', color: colorText }}
                >
                    vehículos en promoción
                </Header>
                <CarruselDestacados
                    add="plus"
                    type="products"
                    noFav={true}
                    onClickFav={() => { }}
                    numberCards={1}
                    data={vehiculos}
                    darkMode={darkMode}
                />
            </Responsive>
            <Responsive {...Responsive.onlyTablet}>
                <Header
                    as="h2"
                    textAlign="left"
                    style={{ marginLeft: 16, fontSize: "1.4rem", textTransform: "uppercase", marginTop: '30px', color: colorText }}
                >
                    vehículos en promoción
                </Header>
                <CarruselDestacados
                    add="plus"
                    type="products-tablet"
                    noFav={true}
                    onClickFav={() => { }}
                    numberCards={2}
                    data={vehiculos}
                    darkMode={darkMode}
                />
            </Responsive>

            <Responsive {...Responsive.onlyComputer}>
                <Header
                    as="h2"
                    textAlign="center"
                    style={{ marginLeft: 16, marginBottom: 40, fontSize: "1.4rem", textTransform: "uppercase", marginTop: '30px', color: colorText }}
                >
                    vehículos en promoción
                </Header>
                <CarruselDestacados
                    add="plus"
                    type="products-desktop"
                    noFav={true}
                    onClickFav={() => { }}
                    numberCards={5}
                    data={vehiculos}
                    darkMode={darkMode}
                />
            </Responsive>
        </div>
    )
}
