import { Responsive, Divider, Header } from "semantic-ui-react";
import { useSelector } from 'react-redux';
import { light, dark } from "../../helpers/colors";
import CarruselCategories from "../carrusel/CarruselCategories";
export default function CategoriasHome({ categorias }) {

    const darkMode = useSelector(({ darkMode }) => darkMode.status);
    const colorText = darkMode === light ? dark : light;

    return (
        <div>
            <Divider style={{ marginLeft: 20, marginRight: 20 }} />
            <Header
                as="h2"
                textAlign="left"
                style={{ marginLeft: 16, fontSize: "1.4rem", textTransform: "uppercase", color: colorText }}
            >
                categorías de vehículos
            </Header>
            <Responsive {...Responsive.onlyMobile}>
                <CarruselCategories
                    numberCards={1}
                    data={categorias}
                    darkMode={darkMode}
                />
            </Responsive>
            <Responsive {...Responsive.onlyTablet}>
                <CarruselCategories
                    numberCards={2}
                    data={categorias}
                    darkMode={darkMode}
                />
            </Responsive>
            <Responsive {...Responsive.onlyComputer}>
                <CarruselCategories
                    numberCards={5}
                    data={categorias}
                    darkMode={darkMode}
                />
            </Responsive>
        </div>
    )
}
