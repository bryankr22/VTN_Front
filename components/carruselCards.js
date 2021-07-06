import React, { useState, Fragment } from "react";
import ItemsCarousel from "react-items-carousel";
import { Image, Card, Icon } from "semantic-ui-react";

export default (props) => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const chevronWidth = props.type === "products" ? 30 : 40;
  let data =
    props.add && props.add === "plus" 
      ? [...props.data, { type: "plus", title: "Ver más" }]
      : props.data;

    data =
      props.add && props.add === "plus-rela" 
        ? [...props.data, { type: "plus-rela", title: "Ver más" }]
        : data;

  const pathS3 =
    "https://vendetunave.s3.amazonaws.com/vendetunave/images/vehiculos/";

  let cards = 1;
  /**if (screen.width > 450 && screen.width < 700) {
    cards = 1.5;
  } else if ((screen.width >= 700) & (screen.width < 800)) {
    cards = 2;
  } else if (screen.width >= 800 && screen.width < 1000) {
    cards = 2.5;
  } else if (screen.width >= 1000 && screen.width < 1100) {
    cards = 3;
  }
  if (screen.width >= 1100) {
    cards = props.numberCards;
  }**/

  /**let orientation = window.orientation;

  if (orientation == 90 || orientation == -90) {
    cards = 2.1;
  }**/

  return (
    <div style={{ padding: `0 ${chevronWidth}px` }}>
      <ItemsCarousel
        requestToChangeActive={setActiveItemIndex}
        activeItemIndex={activeItemIndex}
        numberOfCards={props.type === "marcas" ? props.numberCards : cards}
        gutter={20}
        leftChevron={
          <button
            className="button-nav"
            style={{ marginLeft: props.type === "products" ? 10 : 0 }}
          >
            <Icon
              color="grey"
              name="chevron left"
              style={{ fontSize: "2em" }}
            />
          </button>
        }
        rightChevron={
          <button
            className="button-nav"
            style={{ marginRight: props.type === "products" ? 10 : 0 }}
          >
            <Icon
              color="grey"
              name="chevron right"
              style={{ fontSize: "2em" }}
            />
          </button>
        }
        outsideChevron
        chevronWidth={chevronWidth}
        infiniteLoop={true}
      >
        {data.map((item, index) => {
          let encontrada = 0;

          return (
            <Fragment key={index}>
              {props.type === "products" && item.type !== "plus" && item.type !== "plus-rela" && (
                <Card as="a" style={{ margin: 5, height: "auto" }}>
                  <Card.Content style={{ padding: "0 2px 0 0" }}>
                    <a
                      href={
                        "/vehiculo/" +
                        item.title
                          .split(" ")
                          .join("-")
                          .split("?")
                          .join("") +
                        "-" +
                        item.id
                      }
                      style={{ textDecoration: "none" }}
                    >
                      {item.new_image === 1 && hasWebP && (
                        <Image
                          floated="left"
                          size="small"
                          src={pathS3 + item.nameImage + ".webp"}
                          style={{
                            marginBottom: 0,
                            height: 150,
                            objectFit: "cover",
                          }}
                        />
                      )}
                      {item.new_image === 0 && (
                        <Image
                          floated="left"
                          size="small"
                          src={pathS3 + item.nameImage + "." + item.extension}
                          style={{
                            marginBottom: 0,
                            height: 150,
                            objectFit: "cover",
                          }}
                        />
                      )}
                      {item.new_image === 1 && !hasWebP && (
                        <Image
                          floated="left"
                          size="small"
                          src={pathS3 + item.nameImage + "." + item.extension}
                          style={{
                            marginBottom: 0,
                            height: 150,
                            objectFit: "cover",
                          }}
                        />
                      )}
                      {item.new_image === 2 && hasWebP && (
                        <Image
                          floated="left"
                          size="small"
                          src={
                            pathS3.replace("vehiculos", "thumbnails") +
                            item.nameImage +
                            "300x300.webp"
                          }
                          style={{
                            marginBottom: 0,
                            height: 150,
                            objectFit: "cover",
                          }}
                        />
                      )}
                      {item.new_image === 2 && !hasWebP && (
                        <Image
                          floated="left"
                          size="small"
                          src={
                            pathS3.replace("vehiculos", "thumbnails") +
                            item.nameImage +
                            "300x300." +
                            item.extension
                          }
                          style={{
                            marginBottom: 0,
                            height: 150,
                            objectFit: "cover",
                          }}
                        />
                      )}
                    </a>
                    {localStorage.getItem("token") !== null &&
                      props.noFav == false && (
                        <Fragment>
                          {props.dataFav.map((itemFav) => {
                            if (encontrada == 0) {
                              if (itemFav.vehiculo_id == item.id) {
                                encontrada = 1;
                                return (
                                  <Icon
                                    id={"icon-fav-" + item.id}
                                    onClick={() => props.onClickFav(item.id)}
                                    style={{
                                      right: 8,
                                      position: "absolute",
                                      top: 8,
                                    }}
                                    name={"heart"}
                                    color="blue"
                                    size="large"
                                  />
                                );
                              }
                            }
                          })}
                          {encontrada == 0 && (
                            <Fragment>
                              <Icon
                                id={"icon-fav-" + item.id}
                                onClick={() => props.onClickFav(item.id)}
                                style={{
                                  right: 8,
                                  position: "absolute",
                                  top: 8,
                                }}
                                name={"heart outline"}
                                color="blue"
                                size="large"
                              />
                            </Fragment>
                          )}
                        </Fragment>
                      )}
                    <Card.Header style={{ fontSize: 12, marginTop: 30 }}>
                      <a
                        href={
                          "/vehiculo/" +
                          item.title
                            .split(" ")
                            .join("-")
                            .split("?")
                            .join("") +
                          "-" +
                          item.id
                        }
                        style={{
                          textDecoration: "none",
                          color: "black",
                          fontFamily: "Montserrat-Medium",
                        }}
                      >
                        {item.title}
                      </a>
                    </Card.Header>
                    <Card.Meta>
                      <a
                        href={
                          "/vehiculo/" +
                          item.title
                            .split(" ")
                            .join("-")
                            .split("?")
                            .join("") +
                          "-" +
                          item.id
                        }
                        style={{
                          textDecoration: "none",
                          color: "rgba(0, 0, 0, 1)",
                          fontFamily: "Montserrat-Regular",
                        }}
                      >
                        {item.ano}
                      </a>
                    </Card.Meta>
                    <Card.Header style={{ fontSize: 13, marginTop: 7 }}>
                      <a
                        href={
                          "/vehiculo/" +
                          item.title
                            .split(" ")
                            .join("-")
                            .split("?")
                            .join("") +
                          "-" +
                          item.id
                        }
                        style={{
                          textDecoration: "none",
                          color: "black",
                          fontFamily: "Montserrat-Bold",
                        }}
                      >
                        $ {new Intl.NumberFormat("de-DE").format(item.precio)}{" "}
                        COP
                      </a>
                    </Card.Header>
                  </Card.Content>
                </Card>
              )}
              {props.type === "products" && item.type === "plus" && (
                <Card
                  as="a"
                  href="/vehiculos/Carros-y-camionetas_1/Marca/Modelo/Estilo/Ubicacion/Ciudad/Anio/Combustible/Estado/Desde_0-Hasta_0/Desde_0-Hasta_0/Pagina_1/Promo_1/Permu_0/Buscar_/Orden_0"
                  style={{
                    boxShadow: "none",
                    textDecoration: "none",
                    padding: 10,
                  }}
                >
                  <Image
                    src="https://vendetunave.s3.amazonaws.com/vendetunave/images/categorias/VTN_Otros.jpg"
                    style={{
                      marginBottom: 0,
                      height: 150,
                      objectFit: "contain",
                      borderRadius: 0,
                      background: "white",
                    }}
                  />
                  <Card.Content
                    style={{
                      border: "none",
                      textAlign: "center",
                    }}
                  >
                    <Card.Header>Ver Más</Card.Header>
                  </Card.Content>
                </Card>
              )}
              {props.type === "products" && item.type === "plus-rela" && (
                <Card
                  as="a"
                  href={`/vehiculos/${props.category}/${props.marca}/${props.modelo}/Estilo/Ubicacion/Ciudad/Anio/Combustible/Blindaje_0/Transmision/Estado/Desde_0-Hasta_0/Desde_0-Hasta_0/Pagina_1/Promo_0/Permu_0/Buscar_/Orden_0`}
                  style={{
                    boxShadow: "none",
                    textDecoration: "none",
                    padding: 10,
                  }}
                >
                  <Image
                    src="https://vendetunave.s3.amazonaws.com/vendetunave/images/categorias/VTN_Otros.jpg"
                    style={{
                      marginBottom: 0,
                      height: 100,
                      objectFit: "contain",
                      borderRadius: 0,
                      background: "white",
                    }}
                  />
                  <Card.Content
                    style={{
                      border: "none",
                      textAlign: "center",
                    }}
                  >
                    <Card.Header>Ver Más</Card.Header>
                  </Card.Content>
                </Card>
              )}
              {props.type === "categories" && (
                <Card
                  as="a"
                  href={"/vehiculos/" + item.id}
                  style={{
                    margin: 5,
                    boxShadow: "none",
                    textDecoration: "none",
                    padding: 10,
                  }}
                >
                  <Image
                    src={item.path}
                    wrapped
                    ui={false}
                    className="image-card-home"
                    style={{
                      background: "white",
                      width: "40%",
                      display: "block",
                      margin: "auto",
                    }}
                  />
                  <Card.Content style={{ borderTop: "none" }}>
                    <Card.Header style={{ fontSize: 20, textAlign: "center" }}>
                      {item.nombre}
                    </Card.Header>
                  </Card.Content>
                </Card>
              )}
              {props.type === "marcas" && (
                <Card
                  as="a"
                  href={"/vehiculos/1/" + item.id}
                  style={{
                    textAlign: "center",
                    boxShadow: "none",
                    background: "transparent",
                  }}
                >
                  <Image
                    src={item.url}
                    style={{
                      width: 50,
                      margin: "0 auto",
                      marginBottom: 5,
                      background: "transparent",
                    }}
                  />
                  <span style={{ color: "#4775fc", fontWeight: 700 }}>
                    {item.nombre}
                  </span>
                </Card>
              )}
              {props.type === "products-desktop" && item.type !== "plus" && (
                <Card
                  as="a"
                  href={
                    "/vehiculo/" +
                    item.title
                      .split(" ")
                      .join("-")
                      .split("?")
                      .join("") +
                    "-" +
                    item.id
                  }
                  style={{
                    boxShadow: "none",
                    textDecoration: "none",
                    padding: 10,
                  }}
                >
                  {item.new_image === 1 && hasWebP && (
                    <Image
                      src={pathS3 + item.nameImage + ".webp"}
                      style={{
                        marginBottom: 0,
                        height: 150,
                        objectFit: "cover",
                        borderRadius: 0,
                      }}
                    />
                  )}
                  {item.new_image === 0 && (
                    <Image
                      src={pathS3 + item.nameImage + "." + item.extension}
                      style={{
                        marginBottom: 0,
                        height: 150,
                        objectFit: "cover",
                        borderRadius: 0,
                      }}
                    />
                  )}
                  {item.new_image === 1 && !hasWebP && (
                    <Image
                      src={pathS3 + item.nameImage + "." + item.extension}
                      style={{
                        marginBottom: 0,
                        height: 150,
                        objectFit: "cover",
                        borderRadius: 0,
                      }}
                    />
                  )}
                  {item.new_image === 2 && hasWebP && (
                    <Image
                      src={
                        pathS3.replace("vehiculos", "thumbnails") +
                        item.nameImage +
                        "300x300.webp"
                      }
                      style={{
                        marginBottom: 0,
                        height: 150,
                        objectFit: "cover",
                        borderRadius: 0,
                      }}
                    />
                  )}
                  {item.new_image === 2 && !hasWebP && (
                    <Image
                      src={
                        pathS3.replace("vehiculos", "thumbnails") +
                        item.nameImage +
                        "300x300." +
                        item.extension
                      }
                      style={{
                        marginBottom: 0,
                        height: 150,
                        objectFit: "cover",
                        borderRadius: 0,
                      }}
                    />
                  )}
                  <Card.Content>
                    <Card.Header>{item.title}</Card.Header>
                    <Card.Meta>
                      <span
                        className="date"
                        style={{ fontFamily: "Montserrat-Regular" }}
                      >
                        {item.ano}
                      </span>
                    </Card.Meta>
                    <Card.Header style={{ textAlign: "center" }}>
                      <span style={{ fontFamily: "Montserrat-Bold" }}>
                        $
                        {" " +
                          new Intl.NumberFormat("de-DE").format(item.precio) +
                          " "}
                        COP
                      </span>
                    </Card.Header>
                  </Card.Content>
                </Card>
              )}
              {props.type === "products-desktop" && item.type === "plus" && (
                <Card
                  as="a"
                  href="/vehiculos/Carros-y-camionetas_1/Marca/Modelo/Estilo/Ubicacion/Ciudad/Anio/Combustible/Estado/Desde_0-Hasta_0/Desde_0-Hasta_0/Pagina_1/Promo_1/Permu_0/Buscar_/Orden_0"
                  style={{
                    boxShadow: "none",
                    textDecoration: "none",
                    padding: 10,
                  }}
                >
                  <Image
                    src="https://vendetunave.s3.amazonaws.com/vendetunave/images/categorias/VTN_Otros.jpg"
                    style={{
                      marginBottom: 0,
                      height: 150,
                      objectFit: "cover",
                      borderRadius: 0,
                      background: "white",
                    }}
                  />
                  <Card.Content
                    style={{
                      border: "none",
                      marginTop: 20,
                      textAlign: "center",
                    }}
                  >
                    <Card.Header>Ver Más</Card.Header>
                  </Card.Content>
                </Card>
              )}
            </Fragment>
          );
        })}
      </ItemsCarousel>
    </div>
  );
};
