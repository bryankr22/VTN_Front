import React from 'react'
import { Header, Responsive } from "semantic-ui-react";
import CarruselMarcas from "../carrusel/CarruselMarcas";
export default function MarcasHome({marcas}) {
    return (
        <div
            style={{
            padding: "40px 0",
            margin: "10px 0",
            background: "rgb(242, 244, 246)",
            }}
        >
          <Header
            as="h2"
            textAlign="left"
            style={{ marginLeft: 20, marginBottom: 15, fontSize: "1.4rem", textTransform: "uppercase" }}
          >
            accede por marcas de carros
          </Header>
          <Responsive {...Responsive.onlyMobile}>
            <CarruselMarcas
                numberCards={2}
                data={marcas}
            />
          </Responsive>
          <Responsive {...Responsive.onlyTablet}>
            <CarruselMarcas
              numberCards={2}
              data={marcas}
            />
          </Responsive>

          <Responsive {...Responsive.onlyComputer}>
            <CarruselMarcas
              numberCards={10}
              data={marcas}
            />
          </Responsive>
        </div>
    )
}
