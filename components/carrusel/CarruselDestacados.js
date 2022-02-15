import { useState } from "react";
import ItemsCarousel from "react-items-carousel";
import CardProductsDesk from "./cards/CardProductsDesk";
import { Card } from "semantic-ui-react";
import { light, dark } from "../../helpers/colors";
const url =
  "https://d3bmp4azzreq60.cloudfront.net/fit-in/150x150/vendetunave/images/categorias/VTN_Otros.webp";
export default function CarruselDestacados(props) {
  const [activeItemIndex3, setActiveItemIndex3] = useState(0);
  const chevronWidth = 40;
  const colorText = props.darkMode === light ? dark : light;

  return (
    <div style={{ padding: `0 ${chevronWidth}px` }}>
      <ItemsCarousel
        requestToChangeActive={setActiveItemIndex3}
        activeItemIndex={activeItemIndex3}
        numberOfCards={props.numberCards}
        gutter={20}
        leftChevron={
          <button>
            <i className="angle left big icon" style={{ color: colorText }} />
          </button>
        }
        rightChevron={
          <button>
            <i className="angle right big icon" style={{ color: colorText }} />
          </button>
        }
        outsideChevron
        chevronWidth={chevronWidth}
      >
        {props.data.map((item, index) => {
          return (
            <div
              key={index}
              style={{ padding: 10, display: "flex", justifyContent: "center" }}
            >

              <CardProductsDesk {...props} item={item} />

            </div>
          );
        })}

        <div style={{ padding: 10, height: '100%' }}>
          <Card
            as="a"
            href="/vehiculos?categoria=carros&promocion=true"
            style={{
              boxShadow: "none",
              textDecoration: "none",
              padding: 10,
              backgroundColor: 'white',
              height: '100%'
            }}
          >
            <img
              loading="lazy"
              alt="Ver más botón"
              src={url}
              width={150}
              height={150}
              style={{
                margin: '0 auto',
                objectFit: "contain",
                borderRadius: 0,
                backgroundColor: 'white'
              }}
            />
            <Card.Content style={{ textAlign: "center", border: 'none' }}>
              <Card.Header>
                <span style={{ fontFamily: "Montserrat-Bold" }}>
                  Ver más
                </span>
              </Card.Header>
            </Card.Content>
          </Card>
        </div>
      </ItemsCarousel>
    </div>
  );
}
