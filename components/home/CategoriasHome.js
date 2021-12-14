import { Responsive, Divider, Header } from "semantic-ui-react";
import CarruselCategories from "../carrusel/CarruselCategories";
export default function CategoriasHome({ categorias }) {

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
                    numberCards={1}
                    data={categorias}
                />
            </Responsive>
            <Responsive {...Responsive.onlyTablet}>
                <CarruselCategories
                    numberCards={2}
                    data={categorias}
                />
            </Responsive>
            <Responsive {...Responsive.onlyComputer}>
                <CarruselCategories
                    numberCards={5}
                    data={categorias}
                />
            </Responsive>
        </div>
    )
}
