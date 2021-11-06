import React, { useEffect } from "react";
import {
  Image,
  Card,
  Grid,
  Header,
  Button,
  Container,
  Pagination,
} from "semantic-ui-react";
import { useLocalStorage } from "../../helpers/hooks/useLocalStorage";
import { useSelector, useDispatch } from "react-redux";
import { addFicha } from "../../store/comparadorSlice";
import HeaderFicha from "../../components/comparadores/HeaderFicha";
export default function ListadoFichasMobile({ vehiculos, totalRecords, page }) {
  const compareList = useSelector(({ comparador }) => comparador.fichas);
  const dispatch = useDispatch();
  const [compare, setCompare] = useLocalStorage("compareFichatecnica", "0");
  const [isComparing, setIsComparing] = useLocalStorage("isComparing", "0");
  const pathS3 =
    "https://vendetunave.s3.amazonaws.com/vendetunave/images/ficha-tecnica/";
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
      return ret.join("");
    };
  })();
  const isOnStorage = (item) => {
    return compareList.some((element) => element.id === item.id);
  };
  const addComparar = (item) => {
    if (compareList.length < 3) {
      dispatch(addFicha(item));
      setIsComparing("0");
    } else {
      setCompare("0");
    }
    return;
  };
  const insertParam = (key, value, reset, persist) => {
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
    if (reset) {
      if (persist) {
        const url = new URL(location.href);
        const newUrl = new URL("http://test.com");
        url.searchParams.forEach((nValue, nKey) => {
          if (persist.includes(nKey)) {
            newUrl.searchParams.append(nKey, nValue);
          }
        });
        newUrl.searchParams.append(key, value);
        params = newUrl.search;
      } else {
        params = `${key}=${value}`;
      }
    }
    document.location.search = params;
  };
  const handlePaginationChange = (e, { activePage }) => {
    insertParam("page", activePage);
  };
  useEffect(() => {
    if (compareList.length <= 0 && isComparing == "0") {
      setCompare("0");
    }
  }, [compareList]);
  return (
    <div>
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
      <HeaderFicha />
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
                "/ficha-tecnica/detalle/" +
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
                width: "100%",
                boxShadow: "0 4px 2px -4px grey",
                margin: 3,
              }}
            >
              <Card.Content style={{ paddingBottom: 20 }}>
                <Image
                  style={{ marginRight: 10 }}
                  className="image-ficha"
                  floated="left"
                  size="small"
                  src={pathS3 + item.nameImage + "." + item.extension}
                  wrapped
                  ui={false}
                  alt={item.title}
                />
                <Card.Content>
                  <Card.Header
                    as="h2"
                    style={{
                      marginBottom: 10,
                      marginTop: 10,
                      fontSize: 14,
                      color: "black",
                      fontWeight: "bold",
                    }}
                  >
                    {item.title}
                  </Card.Header>
                  <Grid.Row>
                    <Grid.Column>
                      <Grid>
                        <Grid.Row columns={2} style={{ paddingBottom: 0 }}>
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
                              Precio:
                            </Header>
                            <p
                              style={{
                                display: "inline-block",
                                fontWeight: 700,
                                fontSize: 12,
                                textDecoration: "none",
                                color: "black",
                              }}
                            >
                              ${" "}
                              {new Intl.NumberFormat("de-DE").format(
                                item.price
                              )}{" "}
                              COP
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
                              Tipo de Motor:
                            </Header>
                            <p
                              style={{
                                display: "inline-block",
                                fontWeight: 700,
                                fontSize: 12,
                                textDecoration: "none",
                                color: "black",
                              }}
                            >
                              {item.combustibleLabel}
                            </p>
                          </Grid.Column>
                        </Grid.Row>
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
                                color: "black",
                              }}
                            >
                              {item.year}
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
                              Autonomía:
                            </Header>
                            <p
                              style={{
                                display: "inline-block",
                                fontWeight: 700,
                                fontSize: 12,
                                textDecoration: "none",
                                color: "black",
                              }}
                            >
                              {new Intl.NumberFormat("de-DE").format(
                                item.autonomy
                              )}{" "}
                              Km
                            </p>
                          </Grid.Column>
                        </Grid.Row>
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
                              Motor:
                            </Header>
                            <p
                              style={{
                                display: "inline-block",
                                fontWeight: 700,
                                fontSize: 12,
                                textDecoration: "none",
                                color: "black",
                              }}
                            >
                              {new Intl.NumberFormat("de-DE").format(
                                item.engine
                              )}{" "}
                              C.C.
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
                              Transmisión:
                            </Header>
                            <p
                              style={{
                                display: "inline-block",
                                fontWeight: 700,
                                fontSize: 12,
                                textDecoration: "none",
                                color: "black",
                              }}
                            >
                              {item.transmisionLabel}
                            </p>
                          </Grid.Column>
                        </Grid.Row>
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
                              Potencia:
                            </Header>
                            <p
                              style={{
                                display: "inline-block",
                                fontWeight: 700,
                                fontSize: 12,
                                textDecoration: "none",
                                color: "black",
                              }}
                            >
                              {new Intl.NumberFormat("de-DE").format(
                                item.power
                              )}{" "}
                              HP
                            </p>
                          </Grid.Column>
                          <Grid.Column>
                            {compare === 1 &&
                              compareList.length < 3 &&
                              !isOnStorage(item) && (
                                <Button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    addComparar(item);
                                  }}
                                  primary
                                  floated="left"
                                  compact
                                  style={{ fontSize: 13 }}
                                >
                                  Comparar
                                </Button>
                              )}
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
      )}
      {Math.ceil(totalRecords / 20) > 1 && (
        <Container fluid style={{ textAlign: "center", margin: 25 }}>
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
    </div>
  );
}
