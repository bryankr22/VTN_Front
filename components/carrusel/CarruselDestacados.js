import { useState } from "react";
import ItemsCarousel from "react-items-carousel";
import CardProductsDesk from "./cards/CardProductsDesk";
import { Card } from "semantic-ui-react";
const url =
  "https://d3bmp4azzreq60.cloudfront.net/fit-in/150x150/vendetunave/images/categorias/VTN_Otros.webp";
export default function CarruselDestacados(props) {
  const [activeItemIndex3, setActiveItemIndex3] = useState(0);
  const chevronWidth = 40;
  return (
    <div style={{ padding: `0 ${chevronWidth}px` }}>
      <ItemsCarousel
        requestToChangeActive={setActiveItemIndex3}
        activeItemIndex={activeItemIndex3}
        numberOfCards={props.numberCards}
        gutter={20}
        leftChevron={
          <button>
            <i className="angle left big icon" />
          </button>
        }
        rightChevron={
          <button>
            <i className="angle right big icon" />
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

        <div style={{ padding: 10, display: "flex", justifyContent: "center" }}>
          <Card
            as="a"
            href="/vehiculos?categoria=carros&promocion=true"
            style={{
              boxShadow: "none",
              textDecoration: "none",
              padding: 10,
              backgroundColor: 'white'
            }}
          >
            <img
              loading="lazy"
              alt="Ver más botón"
              src={url}
              width={150}
              height={150}
              style={{
                marginBottom: 0,
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
