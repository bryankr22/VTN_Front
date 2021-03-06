import { useState, useEffect } from "react";
import {
  Label,
  Container,
  Input,
  Card,
  Select,
  Grid,
  Pagination,
  Button,
} from "semantic-ui-react";
import { useLocalStorage } from "../../helpers/hooks/useLocalStorage";
import HeaderVehiculo from "../../components/comparadores/HeaderVehiculo";
import { useSelector, useDispatch } from "react-redux";
import { addVehiculo } from "../../store/comparadorSlice";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import VehicleThumbnail from '../VehicleThumbnail';
import { dark, light } from "../../helpers/colors";

const ZoneAd = dynamic(() => import("../ZoneAd"));

export default function ListadoVehiculos({
  params,
  vehiculos,
  page,
  totalRecords,
}) {
  const compareList = useSelector(({ comparador }) => comparador.vehiculos);
  const dispatch = useDispatch();
  const [compare, setCompare] = useLocalStorage("compareVehiculos", "0");
  const [isComparing, setIsComparing] = useLocalStorage("isComparing", "0");
  const pathS3 =
    "https://vendetunave.s3.amazonaws.com/vendetunave/images/thumbnails/";
  const filter = [
    { key: 0, value: 'MAS_RECIENTE', text: "Más reciente" },
    { key: 1, value: 'NUEVO', text: "Nuevo" },
    { key: 2, value: 'USADO', text: "Usado" },
    { key: 3, value: 'PRECIO_MAS_BAJO', text: "Precio más bajo" },
    { key: 4, value: 'PRECIO_MAS_ALTO', text: "Precio más alto" },
  ];
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
  const handleChangeFilter = (e, { value }) => {
    insertParam("orden", value);
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
  const router = useRouter();
  const [query, setQuery] = useState("");
  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleSubmit();
    }
  };
  const handleSubmit = () => {
    router.push("/vehiculos?q=" + query);
  };
  useEffect(() => {
    setQuery(params.q);
  }, []);

  useEffect(() => {
    if (compareList.length <= 0 && isComparing == "0") {
      setCompare("0");
    }
  }, [compareList]);
  //useEffect

  const darkMode = useSelector(({ darkMode }) => darkMode.status);
  const colorText = darkMode === light ? undefined : light;
  const colorBorder = darkMode === light ? "#d4d4d5" : "#414141";
  return (
    <Grid.Column width={13} style={{ backgroundColor: darkMode }}>
      <style>{`
        .ui.card, .ui.cards>.card {
          -webkit-box-shadow: 0 1px 3px 0 ${colorBorder}, 0 0 0 1px ${colorBorder};
          box-shadow: 0 1px 3px 0 ${colorBorder}, 0 0 0 1px ${colorBorder};
        }
      `}</style>

      <Container fluid style={{ textAlign: "center", margin: 10 }}>
        <Grid>
          <Grid.Column width={12}>
            {!params.vendedor &&
              <Input
                style={{ width: "100%" }}
                onChange={(e, { value }) => setQuery(value)}
                defaultValue={query}
                onKeyDown={(e) => handleKeyDown(e)}
                action={{
                  icon: "search",
                  onClick: () => handleSubmit(),
                }}
                placeholder="Buscar..."
              />
            }
          </Grid.Column>
          <Grid.Column width={4}>
            <Select
              onChange={handleChangeFilter}
              value={params.orden}
              fluid
              placeholder="Ordenar por..."
              search
              options={filter}
            />
          </Grid.Column>
        </Grid>
      </Container>
      <HeaderVehiculo />
      {!params.vendedor &&
        <ZoneAd slug={params.categoria} />
      }
      <style>{`
        .label-premium {
          background-color: rgb(198, 168, 29) !important;
          border-color: #78621c !important;
        }
      `}</style>
      {vehiculos.length === 0 && (
        <p
          style={{
            textAlign: "center",
            marginTop: "25%",
            fontSize: 24,
          }}
        >
          No encontramos resultados
        </p>
      )}
      {vehiculos.length > 0 && (
        <Card.Group itemsPerRow={4}>
          {vehiculos.map((item, index) => (
            <Card
              key={index}
              as="a"
              style={{ textDecoration: "none", backgroundColor: darkMode }}
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
            >
              {item.premium === 1 &&
                <Label as='a' size="small" className="label-premium" ribbon style={{
                  position: 'absolute',
                  zIndex: 10,
                  marginLeft: darkMode === dark ? 13 : 14,
                  marginTop: 5,
                  color: light
                }}>
                  Premium
                </Label>
              }
              <VehicleThumbnail
                src={pathS3 + item.nameImage + "300x300.webp"}
                item={item}
              />
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
                  <h2 className="fnt-size-inherit">{item.title}</h2>
                </Card.Description>
                <Card.Header style={{ color: colorText }}>
                  <h3 className="fnt-size-inherit">
                    $ {new Intl.NumberFormat("de-DE").format(item.precio)} COP
                  </h3>
                </Card.Header>
                <Card.Description style={{ color: colorText }}>
                  <h4 className="fnt-size-inherit">
                    {item.ano} -{" "}
                    {new Intl.NumberFormat("de-DE").format(item.kilometraje)} KM
                  </h4>
                </Card.Description>
                <Card.Description as="h4" style={{ fontSize: "12px", color: colorText }}>
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
      )}
      {Math.ceil(totalRecords / 20) > 1 && (
        <Container fluid style={{ textAlign: "center", margin: 25, color: colorText }}>
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
            style={{ color: colorText }}
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
    </Grid.Column>
  );
}
