import React, { useEffect } from "react";
import { Label, Card, Button, Container, Pagination, Image, Grid, Header, Icon } from "semantic-ui-react";
import HeaderVehiculo from "../../components/comparadores/HeaderVehiculo";
import { useLocalStorage } from "../../helpers/hooks/useLocalStorage";
import { useSelector, useDispatch } from "react-redux";
import { addVehiculo } from "../../store/comparadorSlice";
import dynamic from "next/dynamic";
import VehicleThumbnail from '../VehicleThumbnail';
import { dark, light } from "../../helpers/colors";
const ZoneAd = dynamic(() => import("../ZoneAd"));

export default function ListadoVehiculosMobile({
  params,
  listView,
  vehiculos,
  page,
  totalRecords,
}) {
  const compareList = useSelector(({ comparador }) => comparador.vehiculos);
  const dispatch = useDispatch();
  const [compare, setCompare] = useLocalStorage("compareVehiculos", "0");
  const [isComparing, setIsComparing] = useLocalStorage("isComparing", "0");
  // const pathS3 = "https://d3bmp4azzreq60.cloudfront.net/fit-in/200x200/vendetunave/images/vehiculos/";
  const pathS3 =
    "https://vendetunave.s3.amazonaws.com/vendetunave/images/thumbnails/";
  const normalize = (function () {
    var from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç",
      to = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc",
      mapping = {};

    for (var i = 0, j = from.length; i < j; i++)
      mapping[from.charAt(i)] = to.charAt(i);

    return function (str) {
      var ret = [];
      for (var i = 0, j = str.length; i < j; i++) {
        var c = str.charAt(i);
        if (mapping.hasOwnProperty(str.charAt(i))) ret.push(mapping[c]);
        else ret.push(c);
      }
      return ret.join("").split(" ").join("-").split("%").join("").split("?").join("").split("/").join("").split(".").join("").split("-").join("").split('•').join("");
    };
  })();
  const insertParam = (key, value) => {
    key = encodeURIComponent(key);
    value = encodeURIComponent(value);
    var kvp = document.location.search.substr(1).split("&");
    let i = 0;
    for (; i < kvp.length; i++) {
      if (kvp[i].startsWith(key + "=")) {
        let pair = kvp[i].split("=");
        pair[1] = value;
        kvp[i] = pair.join("=");
        break;
      }
    }
    if (i >= kvp.length) {
      kvp[kvp.length] = [key, value].join("=");
    }
    let params = kvp.join("&");
    document.location.search = params;
  };
  const handlePaginationChange = (e, { activePage }) => {
    insertParam("page", activePage);
  };
  const isOnStorage = (item) => {
    return compareList.some((element) => element.id === item.id);
  };
  const addComparar = (item) => {
    //console.log(">>>>", item);
    if (compareList.length < 3) {
      dispatch(addVehiculo(item));
      setIsComparing("0");
    } else {
      setCompare("0");
    }
    return;
  };

  useEffect(() => {
    if (compareList.length <= 0 && isComparing == "0") {
      setCompare("0");
    }
  }, [compareList]);

  const darkMode = useSelector(({ darkMode }) => darkMode.status);
  const colorText = darkMode === light ? undefined : light;
  const colorBorder = darkMode === light ? "#d4d4d5" : "#414141";

  return (
    <>
      <HeaderVehiculo />
      {!params.vendedor &&
        <ZoneAd slug={params.categoria} />
      }
      <style>{`
                .ui.card, .ui.cards>.card {
                -webkit-box-shadow: 0 1px 3px 0 ${colorBorder}, 0 0 0 1px ${colorBorder};
                box-shadow: 0 1px 3px 0 ${colorBorder}, 0 0 0 1px ${colorBorder};
                }
                
                .label-premium {
                background-color: rgb(198, 168, 29) !important;
                border-color: #78621c !important;
                }
            `}</style>
      <style>
        {`
                a:hover {
                text-decoration: none !important;
                }

                .image-ficha > img {
                    width: 120px !important;
                    height: 120px !important;
                }
                .ui.grid>.column:not(.row), .ui.grid>.row>.column {
                    padding-left: 1rem !important;
                    padding-right: 1rem !important;
                }
              `}
      </style>
      {vehiculos.length === 0 && (
        <p
          style={{
            textAlign: "center",
            margin: "25px 0",
            fontSize: 24,
          }}
        >
          No encontramos resultados
        </p>
      )}
      {vehiculos.length > 0 && (
        <>
          {!listView &&
            <Card.Group
              itemsPerRow={2}
              left="true"
              style={{ width: "100%", marginRight: 0, marginLeft: 0 }}
            >
              {vehiculos.map((item, index) => (
                <Card
                  key={"vehiculo2" + index}
                  as="a"
                  href={
                    "/vehiculos/detalle/" +
                    normalize(item.title)
                      .split(" ")
                      .join("-")
                      .split("%")
                      .join("")
                      .split("?")
                      .join("")
                      .split("/")
                      .join("") +
                    "-" +
                    item.id
                  }
                  style={{
                    width: "calc(50% - 1em)",
                    marginRight: 6,
                    marginLeft: 6,
                    textDecoration: "none",
                    backgroundColor: darkMode
                  }}
                >
                  {item.premium === 1 &&
                    <Label as='a' size="mini" className="label-premium" ribbon style={{
                      position: 'absolute',
                      zIndex: 10,
                      marginLeft: 14,
                      marginTop: 5,
                      color: light
                    }}>
                      Premium
                    </Label>
                  }
                  <VehicleThumbnail item={item} src={pathS3 + item.nameImage + "300x300.webp"} />
                  <Card.Content>
                    <Card.Description
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        marginBottom: 7,
                        color: colorText
                      }}
                    >
                      {item.title}
                    </Card.Description>
                    <Card.Header style={{ color: colorText }}>
                      $ {new Intl.NumberFormat("de-DE").format(item.precio)} COP
                    </Card.Header>
                    <Card.Description style={{ color: colorText }}>
                      {item.ano} -{" "}
                      {new Intl.NumberFormat("de-DE").format(item.kilometraje)} KM
                    </Card.Description>
                    <Card.Description style={{ color: colorText }}>
                      {item.labelCiudad.toLowerCase().charAt(0).toUpperCase() +
                        item.labelCiudad.toLowerCase().slice(1)}
                      {compare === 1 &&
                        compareList.length < 3 &&
                        !isOnStorage(item) && (
                          <Button
                            onClick={(e) => {
                              e.preventDefault();
                              addComparar(item);
                            }}
                            primary
                            floated="right"
                            compact
                            style={{ fontSize: 13 }}
                          >
                            Comparar
                          </Button>
                        )}
                    </Card.Description>
                  </Card.Content>
                </Card>
              ))}
            </Card.Group>
          }
          {!!listView &&
            <Card.Group
              itemsPerRow={2}
              left="true"
              style={{ width: "100%", marginRight: 0, marginLeft: 0 }}
            >
              {vehiculos.map((item, index) => (
                <Card
                  key={"vehiculo2" + index}
                  onClick={() => {
                    location.href = "/vehiculos/detalle/" +
                      normalize(item.title)
                        .split(" ")
                        .join("-")
                        .split("%")
                        .join("")
                        .split("?")
                        .join("")
                        .split("/")
                        .join("") +
                      "-" +
                      item.id
                  }}
                  style={{
                    width: "100%",
                    boxShadow: "0 4px 2px -4px grey",
                    margin: 3,
                    backgroundColor: darkMode
                  }}
                >
                  <Card.Content style={{ paddingBottom: 20 }}>
                    {item.premium === 1 &&
                      <Label as='a' size="small" className="label-premium" ribbon style={{
                        position: 'absolute',
                        zIndex: 10,
                        marginLeft: 28,
                        marginTop: 5,
                        color: light
                      }}>
                        Premium
                      </Label>
                    }
                    <Image
                      style={{ marginRight: 10 }}
                      className="image-ficha"
                      floated="left"
                      size="small"
                      src={pathS3 + item.nameImage + "300x300.webp"}
                      wrapped
                      ui={false}
                      alt={item.title}
                    />
                    <div style={{
                      position: 'absolute',
                      display: 'flex',
                      justifyContent: 'space-around',
                      bottom: 15,
                      width: 120,
                      height: 30,
                      backgroundColor: '#111112c2',
                      fontSize: 'large',
                      color: 'white',
                    }}>
                      {item.permuta == 1 && <Icon name="exchange" title="permuta" />}
                      {item.financiacion == 1 && (
                        <Icon name="wpforms" title="financiación" />
                      )}
                      {item.confiable == 1 && <Icon name="check" title="confiable" />}
                      {item.blindado == 1 && <Icon name="shield" title="blindado" />}
                      {item.peritaje && item.peritaje != "0" && (
                        <Icon name="clipboard check" title="peritaje" />
                      )}
                    </div>
                    <Card.Content>
                      <Card.Header
                        as="h2"
                        style={{
                          marginBottom: 10,
                          marginTop: 10,
                          fontSize: 14,
                          color: colorText,
                          fontWeight: "bold",
                        }}
                      >
                        {item.title}
                      </Card.Header>

                      <p
                        style={{
                          fontWeight: 700,
                          fontSize: 16,
                          marginBottom: 20,
                          textDecoration: "none",
                          color: darkMode === light ? 'rgba(0,0,0,.68)' : colorText,
                        }}
                      >
                        $ {new Intl.NumberFormat("de-DE").format(item.precio)}{" "}
                        COP
                      </p>

                      <Grid.Row>
                        <Grid.Column>
                          <Grid>
                            <Grid.Row
                              columns={2}
                              style={{ paddingTop: 0, paddingBottom: 0 }}
                            >
                              <Grid.Column>
                                <Header
                                  as="h3"
                                  style={{
                                    fontSize: '1rem',
                                    color: "gray",
                                    marginBottom: 0,
                                    fontSize: 12,
                                  }}
                                >
                                  Año:
                                </Header>
                                <p
                                  style={{
                                    display: "inline-block",
                                    fontWeight: 700,
                                    fontSize: 12,
                                    textDecoration: "none",
                                    color: colorText,
                                  }}
                                >
                                  {item.ano}
                                </p>
                              </Grid.Column>
                              <Grid.Column>
                                <Header
                                  as="h3"
                                  style={{
                                    fontSize: '1rem',
                                    color: "gray",
                                    marginBottom: 0,
                                    fontSize: 12,
                                  }}
                                >
                                  Kilometraje:
                                </Header>
                                <p
                                  style={{
                                    display: "inline-block",
                                    fontWeight: 700,
                                    fontSize: 12,
                                    textDecoration: "none",
                                    color: colorText,
                                  }}
                                >
                                  {new Intl.NumberFormat("de-DE").format(
                                    item.kilometraje
                                  )}{" "}
                                  Km
                                </p>
                              </Grid.Column>
                              <Grid.Column>
                                <Header
                                  as="h3"
                                  style={{
                                    fontSize: '1rem',
                                    color: "gray",
                                    marginBottom: 0,
                                    fontSize: 12,
                                  }}
                                >
                                  Ubicación:
                                </Header>
                                <p
                                  style={{
                                    display: "inline-block",
                                    fontWeight: 700,
                                    fontSize: 12,
                                    textDecoration: "none",
                                    color: colorText,
                                  }}
                                >
                                  {new Intl.NumberFormat("de-DE").format(
                                    item.kilometraje
                                  )}{" "}
                                  Km
                                </p>
                              </Grid.Column>
                            </Grid.Row>
                          </Grid>
                        </Grid.Column>
                      </Grid.Row>
                    </Card.Content>
                  </Card.Content>
                </Card>
              ))}
            </Card.Group>
          }
        </>
      )}
      {Math.ceil(totalRecords / 20) > 1 && (
        <Container fluid style={{ textAlign: "center", margin: 25 }}>
          {darkMode === dark &&
            <style>{`
                            .ui.secondary.pointing.menu .active.item {
                                color: ${colorText}
                            }
                            .ui.secondary.pointing.menu .item {
                                border-color: ${colorText};
                                color: ${colorText}
                            }
                        `}</style>
          }
          <Pagination
            pointing
            secondary
            boundaryRange={0}
            activePage={parseInt(page)}
            ellipsisItem={null}
            firstItem={null}
            lastItem={null}
            siblingRange={2}
            onPageChange={handlePaginationChange}
            totalPages={Math.ceil(totalRecords / 20)}
          />
        </Container>
      )}
    </>
  );
}
