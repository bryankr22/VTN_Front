import React from 'react'
import { Header, Responsive } from "semantic-ui-react";
import { useSelector } from 'react-redux';
import { light, dark } from "../../helpers/colors";
import CarruselMarcas from "../carrusel/CarruselMarcas";

export default function MarcasHome({ marcas }) {
  const darkMode = useSelector(({ darkMode }) => darkMode.status);
  const colorText = darkMode === light ? dark : light;

  return (
    <div
      style={{
        padding: "40px 0",
        margin: "10px 0",
        background: darkMode === dark ? dark : "rgb(242, 244, 246)",
      }}
    >
      <Header
        as="h2"
        textAlign="left"
        style={{ marginLeft: 20, marginBottom: 15, fontSize: "1.4rem", textTransform: "uppercase", color: colorText }}
      >
        accede por marcas de carros
      </Header>
      <Responsive {...Responsive.onlyMobile}>
        <CarruselMarcas
          numberCards={2}
          data={marcas}
          darkMode={darkMode}
        />
      </Responsive>
      <Responsive {...Responsive.onlyTablet}>
        <CarruselMarcas
          numberCards={2}
          data={marcas}
          darkMode={darkMode}
        />
      </Responsive>

      <Responsive {...Responsive.onlyComputer}>
        <CarruselMarcas
          numberCards={10}
          data={marcas}
          darkMode={darkMode}
        />
      </Responsive>
    </div>
  )
}
